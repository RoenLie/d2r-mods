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

/**
 * Apply item affix modifications.
 * Shortens Superior/Inferior prefixes and hides gem affixes.
 */
export function applyItemAffixesFilter(config: FilterConfig): void {
	if (!config.itemAffixes.enabled && config.gems.mode === 'all')
		return; // Nothing to do


	const affixes = readItemNameAffixes();

	// Apply Superior/Inferior prefix shortening
	if (config.itemAffixes.enabled)
		applySuperiorInferiorPrefixes(affixes, config.itemAffixes);


	// Hide gem affixes based on gem filter settings
	if (config.gems.mode !== 'all')
		hideGemAffixes(affixes, config.gems.mode);


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
		(affixes as any)[superiorKey_numeric].enUS = superiorPrefix;


	// Apply Inferior prefix with optional color
	// Convert 'none' to empty string - 'none' means no color
	const inferiorColor = (affixConfig.inferiorColor === 'none' || !affixConfig.inferiorColor) ? '' : affixConfig.inferiorColor;
	const fullInferiorPrefix = inferiorColor + inferiorPrefix;

	for (const inferiorKey of inferiorKeys) {
		const key_numeric = Object.keys(affixes).find(
			key => (affixes as any)[key].Key === inferiorKey,
		);
		if (key_numeric)
			(affixes as any)[key_numeric].enUS = fullInferiorPrefix;
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
			(affixes as any)[key_numeric].enUS = '';
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
