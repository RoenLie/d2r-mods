/**
 * Item Affixes Filter
 *
 * Handles modifications to item-nameaffixes.json:
 * - Shortens Superior/Inferior prefixes (+/- or Sup/Inf)
 * - Hides gem affixes based on quality filter
 *
 * This complements gem-filter.ts which modifies item-names.json.
 * Both work together to properly hide lower quality gems.
 */

import { readItemNameAffixes, writeItemNameAffixes } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';
import { updateAllLanguages } from '../utils/entry_utils';

/**
 * Apply item affix modifications.
 * Shortens Superior/Inferior prefixes, hides gem affixes, and applies gold customization.
 */
export function applyItemAffixesFilter(config: FilterConfig): void {
	const affixes = readItemNameAffixes();
	let modified = false;

	// Apply Superior/Inferior prefix shortening
	if (config.itemAffixes.enabled) {
		applySuperiorInferiorPrefixes(affixes, config.itemAffixes);
		modified = true;
	}

	// Hide gem affixes based on gem filter settings
	if (config.gems.mode !== 'all') {
		hideGemAffixes(affixes, config.gems.mode);
		modified = true;
	}

	// Apply gold customization
	if (config.gold.suffix !== 'none' || config.gold.tooltipColors !== 'none') {
		applyGoldCustomization(affixes, config.gold);
		modified = true;
	}

	if (modified)
		writeItemNameAffixes(affixes);
}

/**
 * Shorten Superior and Inferior prefixes.
 *
 * Superior items normally show "Superior" prefix.
 * Inferior items show "Damaged", "Cracked", "Low Quality", or "Crude".
 *
 * This shortens them to:
 * - plusminus: + for Superior, - for Inferior
 * - supinf: Sup for Superior, Inf for Inferior
 *
 * If style is not 'plusminus' or 'supinf', no changes are applied
 * (keeps original vanilla names like "Superior", "Low Quality", etc.)
 */
function applySuperiorInferiorPrefixes(
	affixes: JSONData,
	affixConfig: FilterConfig['itemAffixes'],
): void {
	let superiorPrefix: string | null = null;
	let inferiorPrefix: string | null = null;

	if (affixConfig.style === 'plusminus') {
		superiorPrefix = '+';
		inferiorPrefix = '-';
	}
	else if (affixConfig.style === 'supinf') {
		superiorPrefix = 'Sup';
		inferiorPrefix = 'Inf';
	}

	// If style doesn't result in actual prefixes, don't modify anything
	// This preserves the original vanilla names like "Superior", "Low Quality", etc.
	if (superiorPrefix === null || inferiorPrefix === null)
		return;


	const superiorKey = 'Hiquality';
	const inferiorKeys = [ 'Damaged', 'Cracked', 'Low Quality', 'Crude' ];

	// Apply Superior prefix
	const superiorKey_numeric = Object.keys(affixes).find(
		key => (affixes as any)[key].Key === superiorKey,
	);
	if (superiorKey_numeric)
		updateAllLanguages((affixes as any)[superiorKey_numeric], superiorPrefix);


	// Apply Inferior prefix with optional color
	// Convert 'none' to empty string - 'none' means no color
	const inferiorColor = (affixConfig.inferiorColor === 'none' || !affixConfig.inferiorColor) ? '' : affixConfig.inferiorColor;
	const fullInferiorPrefix = inferiorColor + inferiorPrefix;

	for (const inferiorKey of inferiorKeys) {
		const key_numeric = Object.keys(affixes).find(
			key => (affixes as any)[key].Key === inferiorKey,
		);
		if (key_numeric)
			updateAllLanguages((affixes as any)[key_numeric], fullInferiorPrefix);
	}
}

/**
 * Hide gem affixes based on quality filter.
 *
 * Gems have two representations:
 * 1. item-names.json - The base gem item
 * 2. item-nameaffixes.json - The quality affix (Chipped, Flawed, Flawless, Perfect)
 *
 * To fully hide a gem, we need to hide both.
 * gem-filter.ts handles item-names.json, this handles item-nameaffixes.json.
 */
function hideGemAffixes(affixes: JSONData, mode: FilterConfig['gems']['mode']): void {
	// Gem quality affixes that need hiding
	const gemQualityAffixes = [
		'gcha', // Chipped Amethyst
		'gcv',  // Chipped Diamond
		'gce',  // Chipped Emerald
		'gcr',  // Chipped Ruby
		'gcs',  // Chipped Sapphire
		'gct',  // Chipped Topaz
		'gcy',  // Chipped Skull
		'gfha', // Flawed Amethyst
		'gfv',  // Flawed Diamond
		'gfe',  // Flawed Emerald
		'gfr',  // Flawed Ruby
		'gfs',  // Flawed Sapphire
		'gft',  // Flawed Topaz
		'gfy',  // Flawed Skull
		'gla',  // Amethyst (regular)
		'glv',  // Diamond (regular)
		'gle',  // Emerald (regular)
		'glr',  // Ruby (regular)
		'gls',  // Sapphire (regular)
		'glt',  // Topaz (regular)
		'gly',  // Skull (regular)
		'gzha', // Flawless Amethyst
		'gzv',  // Flawless Diamond
		'gze',  // Flawless Emerald
		'gzr',  // Flawless Ruby
		'gzs',  // Flawless Sapphire
		'gzt',  // Flawless Topaz
		'gzy',  // Flawless Skull
	];

	// Hide affixes based on mode
	for (const affixKey of gemQualityAffixes) {
		const key_numeric = Object.keys(affixes).find(
			key => (affixes as any)[key].Key === affixKey,
		);
		if (!key_numeric)
			continue;

		const shouldHide = shouldHideGemAffix(affixKey, mode);
		if (shouldHide)
			updateAllLanguages((affixes as any)[key_numeric], '');
	}
}

/**
 * Determine if a gem affix should be hidden based on filter mode.
 */
function shouldHideGemAffix(affixKey: string, mode: FilterConfig['gems']['mode']): boolean {
	const isChipped = affixKey.startsWith('gc');
	const isFlawed = affixKey.startsWith('gf');
	const isRegular = affixKey.startsWith('gl');
	const isFlawless = affixKey.startsWith('gz');

	if (mode === 'flawless') {
		// Hide chipped, flawed, and regular
		return isChipped || isFlawed || isRegular;
	}
	else if (mode === 'perfect') {
		// Hide chipped, flawed, regular, and flawless
		return isChipped || isFlawed || isRegular || isFlawless;
	}
	else if (mode === 'hide') {
		// Hide all gem affixes
		return true;
	}

	return false;
}

// ==================== Gold Customization ====================

/**
 * Apply gold suffix customization.
 * Modifies the 'gld' affix that displays after gold amounts.
 */
function applyGoldCustomization(
	data: JSONData,
	goldConfig: FilterConfig['gold'],
): void {
	if (typeof data !== 'object' || data === null)
		return;

	// Handle both array format (actual JSON) and object format
	const entries = Array.isArray(data) ? data : Object.values(data);

	for (const entry of entries) {
		if (typeof entry !== 'object' || entry === null || Array.isArray(entry))
			continue;

		const key = entry['Key'];
		if (key !== 'gld')
			continue;

		// Apply gold suffix customization
		const goldText = getGoldText(goldConfig);
		if (goldText !== null)
			updateAllLanguages(entry, goldText);

		break; // Only one 'gld' entry exists
	}
}

/**
 * Get the gold suffix text based on configuration.
 */
function getGoldText(goldConfig: FilterConfig['gold']): string | null {
	const color = getGoldColor(goldConfig.tooltipColors);

	switch (goldConfig.suffix) {
	case 'none':
		// Default: "1234 Gold"
		if (color != null)
			return `${ color }Gold`;

		return null; // No change needed
	case 'g':
		// Shortened: "1234 G"
		return `${ color ?? '' }G`;
	case 'hide':
		// Hidden: "1234" (no suffix)
		return '';
	default:
		return null;
	}
}

/**
 * Get the gold color code based on tooltip color setting.
 */
function getGoldColor(tooltipColors: string): string | null {
	switch (tooltipColors) {
	case 'wg':
		// White stacks, Gold suffix
		return 'ÿc4'; // Gold color
	case 'gw':
		// Gold stacks, White suffix
		return 'ÿc0'; // White color
	case 'g':
		// All gold
		return 'ÿc4'; // Gold color
	case 'none':
	default:
		return null; // No color change
	}
}
