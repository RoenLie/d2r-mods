import { readItemNameAffixes, readItemNames, writeItemNameAffixes, writeItemNames } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';

// Rune IDs (El=1 to Zod=33)
enum RuneId {
	EL = 1, ELD = 2, TIR = 3, NEF = 4, ETH = 5, ITH = 6, TAL = 7, RAL = 8,
	ORT = 9, THUL = 10, AMN = 11, SOL = 12, SHAEL = 13, DOL = 14, HEL = 15,
	IO = 16, LUM = 17, KO = 18, FAL = 19, LEM = 20, PUL = 21, UM = 22,
	MAL = 23, IST = 24, GUL = 25, VEX = 26, OHM = 27, LO = 28, SUR = 29,
	BER = 30, JAH = 31, CHAM = 32, ZOD = 33,
}

interface RuneTier {
	name:        string;
	runes:       { id: RuneId; name: string; }[];
	isVisible:   boolean;
	nameColor:   string | null;
	numberColor: string | null;
	highlight:   string | null;
}

/**
 * Applies rune filtering - tier-based filtering with rune numbers and color coding
 */
export function applyRuneFilter(config: FilterConfig): void {
	if (!config.enabled || !config.runes.isEnabled)
		return;

	const tiers = buildRuneTiers(config.runes);
	const itemNames = readItemNames();
	const modifiedNames = applyRuneFilterToNames(itemNames, tiers, config.runes);
	writeItemNames(modifiedNames);

	// Also handle rune affixes if needed
	if (config.runes.shouldHideAffix) {
		const itemAffixes = readItemNameAffixes();
		const modifiedAffixes = hideRuneAffixes(itemAffixes);
		writeItemNameAffixes(modifiedAffixes);
	}
}

/**
 * Builds the rune tier configuration based on settings
 */
function buildRuneTiers(runeConfig: FilterConfig['runes']): RuneTier[] {
	// Low tier: El(1) to Dol(14), except Ral(8)
	const lowRunes = [
		{ id: RuneId.EL,    name: 'El'    },
		{ id: RuneId.ELD,   name: 'Eld'   },
		{ id: RuneId.TIR,   name: 'Tir'   },
		{ id: RuneId.NEF,   name: 'Nef'   },
		{ id: RuneId.ETH,   name: 'Eth'   },
		{ id: RuneId.ITH,   name: 'Ith'   },
		{ id: RuneId.TAL,   name: 'Tal'   },
		{ id: RuneId.ORT,   name: 'Ort'   },
		{ id: RuneId.THUL,  name: 'Thul'  },
		{ id: RuneId.AMN,   name: 'Amn'   },
		{ id: RuneId.SOL,   name: 'Sol'   },
		{ id: RuneId.SHAEL, name: 'Shael' },
		{ id: RuneId.DOL,   name: 'Dol'   },
	];

	// Low-Mid tier: Ral(8), Hel(15) to Fal(19)
	const lowMidRunes = [
		{ id: RuneId.RAL, name: 'Ral' },
		{ id: RuneId.HEL, name: 'Hel' },
		{ id: RuneId.IO, name: 'Io' },
		{ id: RuneId.LUM, name: 'Lum' },
		{ id: RuneId.KO, name: 'Ko' },
		{ id: RuneId.FAL, name: 'Fal' },
	];

	// Mid tier: Lem(20) to Gul(25)
	const midRunes = [
		{ id: RuneId.LEM, name: 'Lem' },
		{ id: RuneId.PUL, name: 'Pul' },
		{ id: RuneId.UM, name: 'Um' },
		{ id: RuneId.MAL, name: 'Mal' },
		{ id: RuneId.IST, name: 'Ist' },
		{ id: RuneId.GUL, name: 'Gul' },
	];

	// High tier: Vex(26) to Zod(33)
	const highRunes = [
		{ id: RuneId.VEX, name: 'Vex' },
		{ id: RuneId.OHM, name: 'Ohm' },
		{ id: RuneId.LO, name: 'Lo' },
		{ id: RuneId.SUR, name: 'Sur' },
		{ id: RuneId.BER, name: 'Ber' },
		{ id: RuneId.JAH, name: 'Jah' },
		{ id: RuneId.CHAM, name: 'Cham' },
		{ id: RuneId.ZOD, name: 'Zod' },
	];

	return [
		{
			name:        'low',
			runes:       lowRunes,
			isVisible:   runeConfig.low.isVisible,
			nameColor:   parseColorCode(runeConfig.low.nameColor),
			numberColor: parseColorCode(runeConfig.low.numberColor),
			highlight:   parseHighlightSetting(runeConfig.low.highlight, runeConfig.low.highlightColor),
		},
		{
			name:        'lowMid',
			runes:       lowMidRunes,
			isVisible:   runeConfig.lowMid.isVisible,
			nameColor:   parseColorCode(runeConfig.lowMid.nameColor),
			numberColor: parseColorCode(runeConfig.lowMid.numberColor),
			highlight:   parseHighlightSetting(runeConfig.lowMid.highlight, runeConfig.lowMid.highlightColor),
		},
		{
			name:        'mid',
			runes:       midRunes,
			isVisible:   runeConfig.mid.isVisible,
			nameColor:   parseColorCode(runeConfig.mid.nameColor),
			numberColor: parseColorCode(runeConfig.mid.numberColor),
			highlight:   parseHighlightSetting(runeConfig.mid.highlight, runeConfig.mid.highlightColor),
		},
		{
			name:        'high',
			runes:       highRunes,
			isVisible:   runeConfig.high.isVisible,
			nameColor:   parseColorCode(runeConfig.high.nameColor),
			numberColor: parseColorCode(runeConfig.high.numberColor),
			highlight:   parseHighlightSetting(runeConfig.high.highlight, runeConfig.high.highlightColor),
		},
	];
}

/**
 * Applies rune filtering to item-names.json
 */
function applyRuneFilterToNames(
	itemNames: JSONData,
	tiers: RuneTier[],
	runeConfig: FilterConfig['runes'],
): JSONData {
	if (typeof itemNames !== 'object' || Array.isArray(itemNames))
		return itemNames;

	// Process each entry in the file
	Object.keys(itemNames).forEach(index => {
		const entry = itemNames[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry['Key'];
		if (typeof key !== 'string' || !key.startsWith('r'))
			return;

		// Find which tier this rune belongs to
		for (const tier of tiers) {
			const rune = tier.runes.find(r => `r${ r.id.toString().padStart(2, '0') }` === key);
			if (!rune)
				continue;

			if (!tier.isVisible) {
				// Hide this rune tier
				entry['enUS'] = '';
			}
			else {
				// Apply customization
				let displayName = rune.name;

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

				// Apply highlight pattern
				if (tier.highlight)
					displayName = `${ tier.highlight }${ displayName }`;

				entry['enUS'] = displayName;
			}

			break; // Found the rune, no need to check other tiers
		}
	});

	return itemNames;
}

/**
 * Hides rune affixes from item-nameaffixes.json
 */
function hideRuneAffixes(itemAffixes: JSONData): JSONData {
	if (typeof itemAffixes !== 'object' || Array.isArray(itemAffixes))
		return itemAffixes;

	// Find and clear rune affix (typically labeled "Rune")
	Object.keys(itemAffixes).forEach(index => {
		const entry = itemAffixes[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry['Key'];
		if (key === 'Rune' || key === 'rune')
			entry['enUS'] = '';
	});

	return itemAffixes;
}

/**
 * Parses color code from settings (e.g., "orange", "red", "default")
 * Returns D2R color code string or null if default
 */
function parseColorCode(colorSetting: string): string | null {
	if (!colorSetting || colorSetting === 'default')
		return null;

	// D2R color codes mapping
	const colorMap: Record<string, string> = {
		'white':      'ÿc0',
		'red':        'ÿc1',
		'green':      'ÿc2',
		'blue':       'ÿc3',
		'gold':       'ÿc4',
		'gray':       'ÿc5',
		'black':      'ÿc6',
		'tan':        'ÿc7',
		'orange':     'ÿc8',
		'yellow':     'ÿc9',
		'darkgreen':  'ÿc:',
		'purple':     'ÿc;',
		'darkgold':   'ÿc<',
		'lightgray':  'ÿc=',
		'lightgold':  'ÿc>',
		'lightwhite': 'ÿc?',
		'lightred':   'ÿc@',
	};

	return colorMap[colorSetting.toLowerCase()] || null;
}

/**
 * Parses highlight setting and creates highlight pattern string
 */
function parseHighlightSetting(
	highlightMode: 'disabled' | 'small' | 'large' | 'xl',
	highlightColor: string,
): string | null {
	if (highlightMode === 'disabled')
		return null;

	const color = parseColorCode(highlightColor) || 'ÿc1'; // Default to red

	// Double highlight patterns based on mode
	switch (highlightMode) {
	case 'small':
		return `${ color }*`;
	case 'large':
		return `${ color }**`;
	case 'xl':
		return `${ color }***`;
	default:
		return null;
	}
}
