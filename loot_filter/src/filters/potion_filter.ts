/**
 * Potion Filter
 *
 * Filters healing potions, mana potions, and rejuvenation potions.
 * Allows customizing which potions to show/hide and applies shortened names with highlights.
 */

import { COLOR, SEMANTIC_COLOR } from '../constants/colors';
import { HealingPotionCodes, ManaPotionCodes, RejuvPotionCodes } from '../constants/potions';
import { FilterConfig } from '../mod_config';
import { updateAllLanguages } from '../utils/entry_utils';


// Highlight character
const HIGHLIGHT = '+';

// Hidden item name
const HIDDEN = ' '.repeat(20);


/**
 * Apply potion filtering.
 *
 * Flow:
 * 1. Determine which potions to show/hide based on mode
 * 2. Load item-names.json
 * 3. Apply filtering (hide some, rename others)
 * 4. Save modified data
 */
export function applyPotionFilter(config: FilterConfig): void {
	if (!config.enabled || config.potions.mode === 'none')
		return;

	const visibility = getPotionVisibility(config.potions.mode);

	// Apply to item-names.json
	const itemNames = gameFiles.itemNames.read();
	const modified = applyPotionFilterToData(itemNames, visibility);
	gameFiles.itemNames.write(modified);
}


/**
 * Create a potion display name with highlight and color
 */
function createPotionName(shortName: string, color: string): string {
	return `${ color }${ HIGHLIGHT }${ COLOR.WHITE }${ shortName }`;
}

/**
 * Determine which potions to show based on filter mode
 */
function getPotionVisibility(mode: string): {
	visible:     string[];
	hidden:      string[];
	customNames: Record<string, string>;
} {
	const allPotions = [
		...Object.values(HealingPotionCodes),
		...Object.values(ManaPotionCodes),
		...Object.values(RejuvPotionCodes),
	];

	switch (mode) {
	case 'disabled':
		return { visible: [], hidden: [], customNames: {} };

	case 'all':
		// Show all with custom names
		return {
			visible:     allPotions,
			hidden:      [],
			customNames: {
				[HealingPotionCodes.MINOR]:   createPotionName('HP1', SEMANTIC_COLOR.HEALTH),
				[HealingPotionCodes.LIGHT]:   createPotionName('HP2', SEMANTIC_COLOR.HEALTH),
				[HealingPotionCodes.NORMAL]:  createPotionName('HP3', SEMANTIC_COLOR.HEALTH),
				[HealingPotionCodes.GREATER]: createPotionName('HP4', SEMANTIC_COLOR.HEALTH),
				[HealingPotionCodes.SUPER]:   createPotionName('HP5', SEMANTIC_COLOR.HEALTH),
				[ManaPotionCodes.MINOR]:      createPotionName('MP1', SEMANTIC_COLOR.MANA),
				[ManaPotionCodes.LIGHT]:      createPotionName('MP2', SEMANTIC_COLOR.MANA),
				[ManaPotionCodes.NORMAL]:     createPotionName('MP3', SEMANTIC_COLOR.MANA),
				[ManaPotionCodes.GREATER]:    createPotionName('MP4', SEMANTIC_COLOR.MANA),
				[ManaPotionCodes.SUPER]:      createPotionName('MP5', SEMANTIC_COLOR.MANA),
				[RejuvPotionCodes.SMALL]:     createPotionName('RPS', SEMANTIC_COLOR.REJUV),
				[RejuvPotionCodes.FULL]:      createPotionName('RPF', SEMANTIC_COLOR.REJUV),
			},
		};

	case 'hide3':
		// Hide lvl 1-3, show 4-5 and rejuvs
		return {
			visible: [
				HealingPotionCodes.GREATER,
				HealingPotionCodes.SUPER,
				ManaPotionCodes.GREATER,
				ManaPotionCodes.SUPER,
				RejuvPotionCodes.SMALL,
				RejuvPotionCodes.FULL,
			],
			hidden: [
				HealingPotionCodes.MINOR,
				HealingPotionCodes.LIGHT,
				HealingPotionCodes.NORMAL,
				ManaPotionCodes.MINOR,
				ManaPotionCodes.LIGHT,
				ManaPotionCodes.NORMAL,
			],
			customNames: {
				[HealingPotionCodes.GREATER]: createPotionName('HP4', SEMANTIC_COLOR.HEALTH),
				[HealingPotionCodes.SUPER]:   createPotionName('HP5', SEMANTIC_COLOR.HEALTH),
				[ManaPotionCodes.GREATER]:    createPotionName('MP4', SEMANTIC_COLOR.MANA),
				[ManaPotionCodes.SUPER]:      createPotionName('MP5', SEMANTIC_COLOR.MANA),
				[RejuvPotionCodes.SMALL]:     createPotionName('RPS', SEMANTIC_COLOR.REJUV),
				[RejuvPotionCodes.FULL]:      createPotionName('RPF', SEMANTIC_COLOR.REJUV),
			},
		};

	case 'hide4':
		// Hide lvl 1-4, show 5 and rejuvs
		return {
			visible: [
				HealingPotionCodes.SUPER,
				ManaPotionCodes.SUPER,
				RejuvPotionCodes.SMALL,
				RejuvPotionCodes.FULL,
			],
			hidden: [
				HealingPotionCodes.MINOR,
				HealingPotionCodes.LIGHT,
				HealingPotionCodes.NORMAL,
				HealingPotionCodes.GREATER,
				ManaPotionCodes.MINOR,
				ManaPotionCodes.LIGHT,
				ManaPotionCodes.NORMAL,
				ManaPotionCodes.GREATER,
			],
			customNames: {
				[HealingPotionCodes.SUPER]: createPotionName('HP5', SEMANTIC_COLOR.HEALTH),
				[ManaPotionCodes.SUPER]:    createPotionName('MP5', SEMANTIC_COLOR.MANA),
				[RejuvPotionCodes.SMALL]:   createPotionName('RPS', SEMANTIC_COLOR.REJUV),
				[RejuvPotionCodes.FULL]:    createPotionName('RPF', SEMANTIC_COLOR.REJUV),
			},
		};

	case 'hide3sr':
		// Hide lvl 1-3 and small rejuv, show 4-5 and full rejuv
		return {
			visible: [
				HealingPotionCodes.GREATER,
				HealingPotionCodes.SUPER,
				ManaPotionCodes.GREATER,
				ManaPotionCodes.SUPER,
				RejuvPotionCodes.FULL,
			],
			hidden: [
				HealingPotionCodes.MINOR,
				HealingPotionCodes.LIGHT,
				HealingPotionCodes.NORMAL,
				ManaPotionCodes.MINOR,
				ManaPotionCodes.LIGHT,
				ManaPotionCodes.NORMAL,
				RejuvPotionCodes.SMALL,
			],
			customNames: {
				[HealingPotionCodes.GREATER]: createPotionName('HP4', SEMANTIC_COLOR.HEALTH),
				[HealingPotionCodes.SUPER]:   createPotionName('HP5', SEMANTIC_COLOR.HEALTH),
				[ManaPotionCodes.GREATER]:    createPotionName('MP4', SEMANTIC_COLOR.MANA),
				[ManaPotionCodes.SUPER]:      createPotionName('MP5', SEMANTIC_COLOR.MANA),
				[RejuvPotionCodes.FULL]:      createPotionName('RPF', SEMANTIC_COLOR.REJUV),
			},
		};

	case 'hide4sr':
		// Hide lvl 1-4 and small rejuv, show 5 and full rejuv
		return {
			visible: [
				HealingPotionCodes.SUPER,
				ManaPotionCodes.SUPER,
				RejuvPotionCodes.FULL,
			],
			hidden: [
				HealingPotionCodes.MINOR,
				HealingPotionCodes.LIGHT,
				HealingPotionCodes.NORMAL,
				HealingPotionCodes.GREATER,
				ManaPotionCodes.MINOR,
				ManaPotionCodes.LIGHT,
				ManaPotionCodes.NORMAL,
				ManaPotionCodes.GREATER,
				RejuvPotionCodes.SMALL,
			],
			customNames: {
				[HealingPotionCodes.SUPER]: createPotionName('HP5', SEMANTIC_COLOR.HEALTH),
				[ManaPotionCodes.SUPER]:    createPotionName('MP5', SEMANTIC_COLOR.MANA),
				[RejuvPotionCodes.FULL]:    createPotionName('RPF', SEMANTIC_COLOR.REJUV),
			},
		};

	case 'sfr':
		// Show only rejuvs (small and full)
		return {
			visible: [
				RejuvPotionCodes.SMALL,
				RejuvPotionCodes.FULL,
			],
			hidden: [
				HealingPotionCodes.MINOR,
				HealingPotionCodes.LIGHT,
				HealingPotionCodes.NORMAL,
				HealingPotionCodes.GREATER,
				HealingPotionCodes.SUPER,
				ManaPotionCodes.MINOR,
				ManaPotionCodes.LIGHT,
				ManaPotionCodes.NORMAL,
				ManaPotionCodes.GREATER,
				ManaPotionCodes.SUPER,
			],
			customNames: {
				[RejuvPotionCodes.SMALL]: createPotionName('RPS', SEMANTIC_COLOR.REJUV),
				[RejuvPotionCodes.FULL]:  createPotionName('RPF', SEMANTIC_COLOR.REJUV),
			},
		};

	case 'fr':
		// Show only full rejuvs
		return {
			visible: [ RejuvPotionCodes.FULL ],
			hidden:  [
				HealingPotionCodes.MINOR,
				HealingPotionCodes.LIGHT,
				HealingPotionCodes.NORMAL,
				HealingPotionCodes.GREATER,
				HealingPotionCodes.SUPER,
				ManaPotionCodes.MINOR,
				ManaPotionCodes.LIGHT,
				ManaPotionCodes.NORMAL,
				ManaPotionCodes.GREATER,
				ManaPotionCodes.SUPER,
				RejuvPotionCodes.SMALL,
			],
			customNames: {
				[RejuvPotionCodes.FULL]: createPotionName('RPF', SEMANTIC_COLOR.REJUV),
			},
		};
	case 'hide':
		// Hide all potions
		return {
			visible:     [],
			hidden:      allPotions,
			customNames: {},
		};

	default:
		return { visible: [], hidden: [], customNames: {} };
	}
}

/**
 * Apply potion filtering to item names data
 */
function applyPotionFilterToData(
	data: FileTypes.ItemNames.File,
	visibility: ReturnType<typeof getPotionVisibility>,
): FileTypes.ItemNames.File {
	// Process each entry
	for (const entry of data) {
		const key = entry.Key;

		// Check if this is a potion we should modify
		if (visibility.hidden.includes(key)) {
			// Hide this potion
			updateAllLanguages(entry, HIDDEN);
		}
		else if (key in visibility.customNames) {
			// Apply custom name (abbreviated codes like "HP5", "MP3" - same for all languages)
			const customName = visibility.customNames[key];
			updateAllLanguages(entry, customName);
		}
	}

	return data;
}
