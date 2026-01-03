import { readItemNames, writeItemNames } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';

/**
 * Jewels and Charms Filter
 *
 * Handles filtering and highlighting for:
 * - Rainbow Facets (jewels with highlight options)
 * - Unidentified charms (small, large, grand)
 * - Unique LoD charms (Annihilus, Hellfire Torch, Gheed's Fortune)
 * - Sunder charms (D2R 2.5+)
 */

export function applyJewelsCharmsFilter(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const itemNames = readItemNames();
	applyJewelsToData(itemNames, config.jewels);
	applyCharmsToData(itemNames, config.charms);
	writeItemNames(itemNames);
}

// ============================================================================
// Jewels (Rainbow Facets)
// ============================================================================

function applyJewelsToData(
	itemNames: JSONData,
	jewelConfig: FilterConfig['jewels'],
): void {
	if (jewelConfig.highlight === 'disabled')
		return;

	// Rainbow Facet is a unique jewel
	const facetKey = 'Rainbow Facet';

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry['*ID'];
		if (key !== facetKey)
			return;

		// Apply highlight based on config
		if (jewelConfig.highlight === 'rainbow') {
			// Rainbow highlight (cycling colors)
			entry['ÿc1*'] = '';
			entry['ÿc8*'] = '';
			entry['ÿc9*'] = '';
			entry['ÿc2*'] = '';
			entry['ÿc3*'] = '';
			entry['ÿc;*'] = '';
		}
		else if (jewelConfig.highlight === 'highlight') {
			// Large red highlight
			entry['ÿc1*'] = '';
			entry['  ÿc1*'] = '';
		}
	});
}

// ============================================================================
// Charms
// ============================================================================

function applyCharmsToData(
	itemNames: JSONData,
	charmConfig: FilterConfig['charms'],
): void {
	// Apply unidentified charm highlighting
	if (charmConfig.highlightMagic)
		applyUnidentifiedCharmHighlights(itemNames);

	// Apply unique charm highlighting
	if (charmConfig.highlightUnique !== 'disabled')
		applyUniqueCharmHighlights(itemNames, charmConfig.highlightUnique);
}

/**
 * Highlight unidentified charms (small, large, grand)
 * Adds red "Charm" text to magic-quality charms
 */
function applyUnidentifiedCharmHighlights(itemNames: JSONData): void {
	const charms = [
		{ key: 'cm1', size: 'Small' },
		{ key: 'cm2', size: 'Large' },
		{ key: 'cm3', size: 'Grand' },
	];

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const code = entry.code as string;
		const charm = charms.find(c => c.key === code);
		if (!charm)
			return;

		// Set name to "Small/Large/Grand ÿc1Charmÿc3" (red "Charm" in magic blue text)
		entry['*ID'] = `${ charm.size } ÿc1Charmÿc3`;
	});
}

/**
 * Apply highlighting to unique charms
 * Includes LoD uniques (Annihilus, Torch, Gheed's) and Sunder charms
 */
function applyUniqueCharmHighlights(
	itemNames: JSONData,
	mode: FilterConfig['charms']['highlightUnique'],
): void {
	// LoD unique charms
	const lodUniques = [
		'Annihilus',
		'Hellfire Torch',
		"Gheed's Fortune",
	];

	// Sunder charms with colors for alternate highlighting
	const sunderCharms = [
		{ id: 'Black Cleft', color: 'ÿc5' },   // Magic - gray
		{ id: 'Bone Break', color: 'ÿc0' },    // Physical - white
		{ id: 'Cold Rupture', color: 'ÿc3' },  // Cold - light blue
		{ id: 'Crack of the Heavens', color: 'ÿc9' }, // Lightning - yellow
		{ id: 'Flame Rift', color: 'ÿc1' },    // Fire - red
		{ id: 'Rotting Fissure', color: 'ÿc2' }, // Poison - green
	];

	const allUniqueCharms = [ ...lodUniques, ...sunderCharms.map(s => s.id) ];

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const name = entry['*ID'] as string;
		if (!allUniqueCharms.includes(name))
			return;

		// Apply highlight based on mode
		if (mode === 'hl-default') {
			// Default: large red highlight for all unique charms
			entry['ÿc1*'] = '';
			entry['  ÿc1*'] = '';
		}
		else if (mode === 'hl-sa') {
			// Alternate: sunder charms get colored highlights
			const sunder = sunderCharms.find(s => s.id === name);
			if (sunder) {
				// Colored highlight for sunder charms
				entry[`${ sunder.color }*`] = '';
				entry[`  ${ sunder.color }*`] = '';
			}
			else {
				// Default red highlight for LoD uniques
				entry['ÿc1*'] = '';
				entry['  ÿc1*'] = '';
			}
		}
	});
}
