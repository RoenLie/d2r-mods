import { COLOR, COLOR_NAME_MAP } from '../constants/colors';
import { HIGH_RUNES, LOW_MID_RUNES, LOW_RUNES, MID_RUNES, RUNE_AFFIXES, type RuneData } from '../constants/runes';
import { readItemRunes, writeItemRunes } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';
import { applyBigTooltip } from '../utils/big_tooltip';
import { transformAllLanguages, updateAllLanguages } from '../utils/entry_utils';


interface RuneTier {
	name:        string;
	runes:       RuneData[];
	isVisible:   boolean;
	nameColor:   string | null;
	numberColor: string | null;
	highlight:   { prefix: string; suffix: string; } | null;
	bigTooltip?: string;
}


/**
 * Removes rune affix from a localized rune name
 */
function removeRuneAffix(localizedName: string): string {
	for (const affix of RUNE_AFFIXES) {
		if (localizedName.includes(affix))
			return localizedName.replace(affix, '');
	}

	return localizedName;
}


/**
 * Applies rune filtering - tier-based filtering with rune numbers and color coding
 */
export function applyRuneFilter(config: FilterConfig): void {
	if (!config.enabled || !config.runes.isEnabled)
		return;

	const tiers = buildRuneTiers(config.runes);
	const itemRunes = readItemRunes();
	const modifiedRunes = applyRuneFilterToNames(itemRunes, tiers, config.runes);
	writeItemRunes(modifiedRunes);

	// Note: We do NOT modify item-nameaffixes.json for rune affixes.
	// Instead, we remove the " Rune" suffix from each rune name during transformation.
	// The "Rune" key in item-nameaffixes.json should remain as "Rune".
}

/**
 * Builds the rune tier configuration based on settings
 */
function buildRuneTiers(runeConfig: FilterConfig['runes']): RuneTier[] {
	return [
		{
			name:        'low',
			runes:       LOW_RUNES,
			isVisible:   runeConfig.low.isVisible,
			nameColor:   parseColorCode(runeConfig.low.nameColor),
			numberColor: parseColorCode(runeConfig.low.numberColor),
			highlight:   parseHighlightSetting(
				runeConfig.low.highlight,
				runeConfig.low.highlightColor,
				runeConfig.low.bigTooltip,
			),
			bigTooltip: runeConfig.low.bigTooltip,
		},
		{
			name:        'lowMid',
			runes:       LOW_MID_RUNES,
			isVisible:   runeConfig.lowMid.isVisible,
			nameColor:   parseColorCode(runeConfig.lowMid.nameColor),
			numberColor: parseColorCode(runeConfig.lowMid.numberColor),
			highlight:   parseHighlightSetting(
				runeConfig.lowMid.highlight,
				runeConfig.lowMid.highlightColor,
				runeConfig.lowMid.bigTooltip,
			),
			bigTooltip: runeConfig.lowMid.bigTooltip,
		},
		{
			name:        'mid',
			runes:       MID_RUNES,
			isVisible:   runeConfig.mid.isVisible,
			nameColor:   parseColorCode(runeConfig.mid.nameColor),
			numberColor: parseColorCode(runeConfig.mid.numberColor),
			highlight:   parseHighlightSetting(
				runeConfig.mid.highlight,
				runeConfig.mid.highlightColor,
				runeConfig.mid.bigTooltip,
			),
			bigTooltip: runeConfig.mid.bigTooltip,
		},
		{
			name:        'high',
			runes:       HIGH_RUNES,
			isVisible:   runeConfig.high.isVisible,
			nameColor:   parseColorCode(runeConfig.high.nameColor),
			numberColor: parseColorCode(runeConfig.high.numberColor),
			highlight:   parseHighlightSetting(
				runeConfig.high.highlight,
				runeConfig.high.highlightColor,
				runeConfig.high.bigTooltip,
			),
			bigTooltip: runeConfig.high.bigTooltip,
		},
	];
}

/**
 * Applies rune filtering to item-names.json
 */
function applyRuneFilterToNames(
	itemNames: FileTypes.ItemRunes.File,
	tiers: RuneTier[],
	runeConfig: FilterConfig['runes'],
): FileTypes.ItemRunes.File {
	// Process each entry in the file
	itemNames.forEach(entry => {
		const key = entry['Key'];
		if (!key.startsWith('r'))
			return;

		// Find which tier this rune belongs to
		for (const tier of tiers) {
			const rune = tier.runes.find(r => `r${ r.id.toString().padStart(2, '0') }` === key);
			if (!rune)
				continue;

			if (!tier.isVisible) {
				// Hide this rune tier
				updateAllLanguages(entry, '');

				return;
			}

			// Apply transformations preserving localized rune names
			transformAllLanguages(entry, (originalName) => {
				let displayName = originalName;

				// Remove rune affix if enabled (e.g., "El Rune" -> "El")
				if (runeConfig.shouldHideAffix)
					displayName = removeRuneAffix(displayName);

				// Add color to rune name
				if (tier.nameColor)
					displayName = `${ tier.nameColor }${ displayName }`;

				// Add rune number
				if (runeConfig.shouldAddNumber) {
					const numberText = tier.numberColor
						? `${ tier.numberColor }(${ rune.id })`
						: `(${ rune.id })`;
					displayName = `${ displayName } ${ numberText }`;
				}

				// Apply highlight pattern (with prefix and suffix)
				if (tier.highlight)
					displayName = `${ tier.highlight.prefix }${ displayName }${ tier.highlight.suffix }`;

				// Apply Big Tooltip if available
				if (tier.bigTooltip)
					displayName = applyBigTooltip(displayName, tier.bigTooltip);

				// Remove redundant adjacent color codes (V1 ItemEntry.removeRedundantColorCodes)
				displayName = removeRedundantColorCodes(displayName, tier.nameColor);

				return displayName;
			});
		}
	});

	return itemNames;
}

/**
 * Parses color code from settings
 * Accepts either named colors ("orange", "red") or single character codes ("8", "1")
 * Returns D2R color code string or null if "none"/"default"
 */
function parseColorCode(colorSetting: string): string | null {
	if (!colorSetting || colorSetting === 'none' || colorSetting === 'default')
		return null;

	// If it's already a single character (direct color code), return it with ÿc prefix
	if (colorSetting.length === 1)
		return `ÿc${ colorSetting }`;

	// Use centralized color name mapping
	return COLOR_NAME_MAP[colorSetting.toLowerCase()] || null;
}

/**
 * Removes adjacent redundant color codes from a string
 * Replicates V1 ItemEntry.removeRedundantColorCodes behavior
 * When the same color code appears twice in a row, the second one is removed
 */
function removeRedundantColorCodes(name: string, startColor: string | null): string {
	const colorPrefix = 'ÿc';

	// Use startColor as the current color context
	const currentColor = startColor;

	if (name.length < 3) // Too short to have a color code
		return name;

	const i = name.indexOf(colorPrefix);
	if (i === -1) // No color code found
		return name;

	// Extract the color code character (e.g., '8', ';', '1')
	const nextColorCode = name[i + 2];
	const nextColor = `ÿc${ nextColorCode }`;

	// If adjacent color code matches currentColor, remove it
	if (currentColor && nextColor === currentColor) {
		// Remove the redundant color code (3 characters: ÿc + code)
		const beforeCode = name.slice(0, i);
		const afterCode = name.slice(i + 3);
		const cleanedName = beforeCode + afterCode;

		return removeRedundantColorCodes(cleanedName, currentColor);
	}

	// If next color code is different, keep it and continue searching after it
	const beforeCode = name.slice(0, i + 3);
	const afterCode = name.slice(i + 3);

	return beforeCode + removeRedundantColorCodes(afterCode, nextColor);
}

/**
 * Parses highlight setting and creates highlight pattern string
 * Returns object with prefix and suffix for centering the name
 * Mode values: "0" = Disable, "1" = Small, "2" = Medium, "3" = Large, "4" = Extra Large, "5" = Extra Extra Large
 *
 * Replicates V1 DoubleHighlight behavior:
 * - When mode is "5" (EXTRA_EXTRA_LARGE) AND Big Tooltip is enabled (not "0"),
 *   mode downgrades to "4" (EXTRA_LARGE) and NO color codes are applied
 */
function parseHighlightSetting(
	highlightMode: string,
	highlightColor: string,
	bigTooltipMode: string,
): { prefix: string; suffix: string; } | null {
	if (highlightMode === '0') // Disable
		return null;

	// V1 DoubleHighlight.ts line 19: if mode 5 + Big Tooltip enabled, downgrade to mode 4 with no color
	let effectiveMode = highlightMode;
	let useColor = true;
	if (highlightMode === '5' && bigTooltipMode !== '0') {
		effectiveMode = '4'; // Downgrade from EXTRA_EXTRA_LARGE to EXTRA_LARGE
		useColor = false;    // V1 doesn't apply color codes in this case
	}

	// Parse color - defaults to red when "none"/null for modes 1-4
	const parsedColor = parseColorCode(highlightColor);
	const color = useColor
		? (parsedColor !== null ? parsedColor : COLOR.RED)
		: '';

	const pad2 = ' '.repeat(2);
	const pad3 = ' '.repeat(3);
	const pad5 = ' '.repeat(5);

	const ast2  = '*'.repeat(2);
	const ast5  = '*'.repeat(5);
	const ast10 = '*'.repeat(10);

	// Highlight patterns based on effective mode (matching V1 HighlightConstants)
	switch (effectiveMode) {
	case '1': // Small: 2 asterisks, 2-space padding
		return {
			prefix: color + ast2 + pad2,
			suffix: pad2 + color + ast2,
		};
	case '2': // Medium: 5 asterisks, 3-space padding
		return {
			prefix: color + ast5 + pad3,
			suffix: pad3 + color + ast5,
		};
	case '3': // Large: 10 asterisks, 5-space padding
		return {
			prefix: color + ast10 + pad5,
			suffix: pad5 + color + ast10,
		};
	case '4': // Extra Large: double 10 asterisks, 5-space padding
		return {
			prefix: color + ast10 + pad2 + ast10 + pad5,
			suffix: pad5 + color + ast10 + pad2 + ast10,
		};
	case '5': // Extra Extra Large: triple 10 asterisks, 5-space padding
		// (never reached due to downgrade logic above)
		return {
			prefix: color + ast10 + pad2 + ast10 + pad2 + ast10 + pad5,
			suffix: pad5 + color + ast10 + pad2 + ast10 + pad2 + ast10,
		};
	default:
		return null;
	}
}
