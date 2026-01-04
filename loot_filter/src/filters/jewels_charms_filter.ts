import { CharmCodes, CharmSizes, JewelCodes, LodUniqueCharms, SunderCharms } from '../constants/charms';
import { COLOR } from '../constants/colors';
import { readItemNames, writeItemNames } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';
import { transformAllLanguages } from '../utils/entry_utils';


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


function applyJewelsToData(
	itemNames: FileTypes.ItemNames.File,
	jewelConfig: FilterConfig['jewels'],
): void {
	if (jewelConfig.highlight === 'none')
		return;

	for (const entry of itemNames) {
		const key = entry.Key;
		if (key !== JewelCodes.RAINBOW_FACET)
			continue;

		// Apply highlight based on config
		if (jewelConfig.highlight === 'rainbow') {
			// Rainbow highlight (cycling colors) - 5 asterisks per color
			transformAllLanguages(entry, originalName => {
				const pad3 = ' '.repeat(3);
				const pad4 = ' '.repeat(4);
				const pad6 = ' '.repeat(6);

				const rainbowStart = `${ pad6 }${ COLOR.RED }${ pad4 } ${ COLOR.YELLOW }${ pad4 }`
				+ ` ${ COLOR.BLUE }${ pad4 } ${ COLOR.GREEN }${ pad4 }${ COLOR.GOLD }${ pad3 }`;
				const rainbowEnd = `${ pad3 }${ COLOR.GREEN }${ pad4 } ${ COLOR.BLUE }${ pad4 }`
				+ ` ${ COLOR.YELLOW }${ pad4 } ${ COLOR.RED }${ pad4 }${ COLOR.GOLD }${ COLOR.SET }`;

				return rainbowStart + `${ COLOR.SET }${ originalName }` + rainbowEnd;
			});
		}
		else if (jewelConfig.highlight === 'highlight') {
			const pad10 = ' '.repeat(10);

			// Large red highlight
			transformAllLanguages(entry, originalName => {
				return `${ COLOR.RED }${ pad10 }     ${ originalName }     ${ COLOR.RED }${ pad10 }`;
			});
		}
	}
}


function applyCharmsToData(
	itemNames: FileTypes.ItemNames.File,
	charmConfig: FilterConfig['charms'],
): void {
	// Apply unidentified charm highlighting
	if (charmConfig.highlightMagic)
		applyUnidentifiedCharmHighlights(itemNames);

	// Apply unique charm highlighting
	if (charmConfig.highlightUnique !== 'none')
		applyUniqueCharmHighlights(itemNames, charmConfig.highlightUnique);
}

/**
 * Highlight unidentified charms (small, large, grand)
 * Adds red "Charm" text to magic-quality charms
 */
function applyUnidentifiedCharmHighlights(itemNames: FileTypes.ItemNames.File): void {
	const charms = [
		{ key: CharmCodes.SMALL, size: CharmSizes[CharmCodes.SMALL] },
		{ key: CharmCodes.LARGE, size: CharmSizes[CharmCodes.LARGE] },
		{ key: CharmCodes.GRAND, size: CharmSizes[CharmCodes.GRAND] },
	];

	itemNames.forEach(entry => {
		const key = entry.Key;
		const charm = charms.find(c => c.key === key);
		if (!charm)
			return;

		// Set name to "Small/Large/Grand {RED}Charm{LIGHT_BLUE}" using transformAllLanguages
		transformAllLanguages(entry, () => `${ charm.size } ${ COLOR.RED }Charm${ COLOR.LIGHT_BLUE }`);
	});
}

/**
 * Apply highlighting to unique charms
 * Includes LoD uniques (Annihilus, Torch, Gheed's) and Sunder charms
 */
function applyUniqueCharmHighlights(
	itemNames: FileTypes.ItemNames.File,
	mode: FilterConfig['charms']['highlightUnique'],
): void {
	const allUniqueCharms = [
		...LodUniqueCharms,
		...SunderCharms.map(s => s.id),
	];

	itemNames.forEach(entry => {
		const key = entry.Key;
		if (!allUniqueCharms.includes(key))
			return;

		// Determine highlight color
		// Default: red
		let highlightColor: typeof COLOR[keyof typeof COLOR] = COLOR.RED;

		if (mode === 'hl-sa') {
			// Alternate mode: sunder charms get their element colors
			const sunder = SunderCharms.find(s => s.id === key);
			if (sunder)
				highlightColor = sunder.color;
		}

		// Apply transformations to all languages
		transformAllLanguages(entry, originalName => {
			// Pattern: 6 spaces +
			// {highlightColor}**********     {goldColor}{name}     {highlightColor}**********{goldColor}
			// Gold/Set color is used for unique item names
			const nameColor     = COLOR.SET;
			const padding       = ' '.repeat(5);
			const stars         = '*'.repeat(10);
			const leadingSpaces = ' '.repeat(6);

			return ''
				+ leadingSpaces + highlightColor + stars + padding
				+ nameColor     + originalName
				+ padding       + highlightColor + stars + nameColor;
		});
	});
}
