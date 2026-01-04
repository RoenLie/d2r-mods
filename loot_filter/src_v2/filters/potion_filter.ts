/**
 * Potion Filter
 *
 * Filters healing potions, mana potions, and rejuvenation potions.
 * Allows customizing which potions to show/hide and applies shortened names with highlights.
 */

import { readItemNames, writeItemNames } from '../io/game_files';
import { FilterConfig } from '../io/mod_config';
import { updateAllLanguages } from '../utils/entry_utils';

// ============================================================================
// Constants
// ============================================================================

// Potion item codes
const POTIONS = {
	// Healing potions
	hp1: 'hp1', // Minor Healing Potion
	hp2: 'hp2', // Light Healing Potion
	hp3: 'hp3', // Healing Potion
	hp4: 'hp4', // Greater Healing Potion
	hp5: 'hp5', // Super Healing Potion

	// Mana potions
	mp1: 'mp1', // Minor Mana Potion
	mp2: 'mp2', // Light Mana Potion
	mp3: 'mp3', // Mana Potion
	mp4: 'mp4', // Greater Mana Potion
	mp5: 'mp5', // Super Mana Potion

	// Rejuvenation potions
	rvs: 'rvs', // Rejuvenation Potion (small)
	rvl: 'rvl', // Full Rejuvenation Potion
};

// Potion colors
const COLORS = {
	heal:  'ÿc1', // Red
	mana:  'ÿc3', // Blue
	rejuv: 'ÿc;', // Purple
	white: 'ÿc0', // White
};

// Highlight character
const HIGHLIGHT = '+';

// Hidden item name
const HIDDEN = '                    '; // 20 spaces

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Create a potion display name with highlight and color
 */
function createPotionName(shortName: string, color: string): string {
	return `${ color }${ HIGHLIGHT }${ COLORS.white }${ shortName }`;
}

/**
 * Determine which potions to show based on filter mode
 */
function getPotionVisibility(mode: string): {
	visible:     string[];
	hidden:      string[];
	customNames: Record<string, string>;
} {
	const allPotions = Object.values(POTIONS);

	switch (mode) {
	case 'disabled':
		return { visible: [], hidden: [], customNames: {} };

	case 'all':
		// Show all with custom names
		return {
			visible:     allPotions,
			hidden:      [],
			customNames: {
				[POTIONS.hp1]: createPotionName('HP1', COLORS.heal),
				[POTIONS.hp2]: createPotionName('HP2', COLORS.heal),
				[POTIONS.hp3]: createPotionName('HP3', COLORS.heal),
				[POTIONS.hp4]: createPotionName('HP4', COLORS.heal),
				[POTIONS.hp5]: createPotionName('HP5', COLORS.heal),
				[POTIONS.mp1]: createPotionName('MP1', COLORS.mana),
				[POTIONS.mp2]: createPotionName('MP2', COLORS.mana),
				[POTIONS.mp3]: createPotionName('MP3', COLORS.mana),
				[POTIONS.mp4]: createPotionName('MP4', COLORS.mana),
				[POTIONS.mp5]: createPotionName('MP5', COLORS.mana),
				[POTIONS.rvs]: createPotionName('RPS', COLORS.rejuv),
				[POTIONS.rvl]: createPotionName('RPF', COLORS.rejuv),
			},
		};

	case 'hide3':
		// Hide lvl 1-3, show 4-5 and rejuvs
		return {
			visible: [
				POTIONS.hp4,
				POTIONS.hp5,
				POTIONS.mp4,
				POTIONS.mp5,
				POTIONS.rvs,
				POTIONS.rvl,
			],
			hidden: [
				POTIONS.hp1,
				POTIONS.hp2,
				POTIONS.hp3,
				POTIONS.mp1,
				POTIONS.mp2,
				POTIONS.mp3,
			],
			customNames: {
				[POTIONS.hp4]: createPotionName('HP4', COLORS.heal),
				[POTIONS.hp5]: createPotionName('HP5', COLORS.heal),
				[POTIONS.mp4]: createPotionName('MP4', COLORS.mana),
				[POTIONS.mp5]: createPotionName('MP5', COLORS.mana),
				[POTIONS.rvs]: createPotionName('RPS', COLORS.rejuv),
				[POTIONS.rvl]: createPotionName('RPF', COLORS.rejuv),
			},
		};

	case 'hide4':
		// Hide lvl 1-4, show 5 and rejuvs
		return {
			visible: [
				POTIONS.hp5,
				POTIONS.mp5,
				POTIONS.rvs,
				POTIONS.rvl,
			],
			hidden: [
				POTIONS.hp1,
				POTIONS.hp2,
				POTIONS.hp3,
				POTIONS.hp4,
				POTIONS.mp1,
				POTIONS.mp2,
				POTIONS.mp3,
				POTIONS.mp4,
			],
			customNames: {
				[POTIONS.hp5]: createPotionName('HP5', COLORS.heal),
				[POTIONS.mp5]: createPotionName('MP5', COLORS.mana),
				[POTIONS.rvs]: createPotionName('RPS', COLORS.rejuv),
				[POTIONS.rvl]: createPotionName('RPF', COLORS.rejuv),
			},
		};

	case 'hide3sr':
		// Hide lvl 1-3 and small rejuv, show 4-5 and full rejuv
		return {
			visible: [
				POTIONS.hp4,
				POTIONS.hp5,
				POTIONS.mp4,
				POTIONS.mp5,
				POTIONS.rvl,
			],
			hidden: [
				POTIONS.hp1,
				POTIONS.hp2,
				POTIONS.hp3,
				POTIONS.mp1,
				POTIONS.mp2,
				POTIONS.mp3,
				POTIONS.rvs,
			],
			customNames: {
				[POTIONS.hp4]: createPotionName('HP4', COLORS.heal),
				[POTIONS.hp5]: createPotionName('HP5', COLORS.heal),
				[POTIONS.mp4]: createPotionName('MP4', COLORS.mana),
				[POTIONS.mp5]: createPotionName('MP5', COLORS.mana),
				[POTIONS.rvl]: createPotionName('RPF', COLORS.rejuv),
			},
		};

	case 'hide4sr':
		// Hide lvl 1-4 and small rejuv, show 5 and full rejuv
		return {
			visible: [
				POTIONS.hp5,
				POTIONS.mp5,
				POTIONS.rvl,
			],
			hidden: [
				POTIONS.hp1,
				POTIONS.hp2,
				POTIONS.hp3,
				POTIONS.hp4,
				POTIONS.mp1,
				POTIONS.mp2,
				POTIONS.mp3,
				POTIONS.mp4,
				POTIONS.rvs,
			],
			customNames: {
				[POTIONS.hp5]: createPotionName('HP5', COLORS.heal),
				[POTIONS.mp5]: createPotionName('MP5', COLORS.mana),
				[POTIONS.rvl]: createPotionName('RPF', COLORS.rejuv),
			},
		};

	case 'sfr':
		// Show only rejuvs (small and full)
		return {
			visible: [
				POTIONS.rvs,
				POTIONS.rvl,
			],
			hidden: [
				POTIONS.hp1,
				POTIONS.hp2,
				POTIONS.hp3,
				POTIONS.hp4,
				POTIONS.hp5,
				POTIONS.mp1,
				POTIONS.mp2,
				POTIONS.mp3,
				POTIONS.mp4,
				POTIONS.mp5,
			],
			customNames: {
				[POTIONS.rvs]: createPotionName('RPS', COLORS.rejuv),
				[POTIONS.rvl]: createPotionName('RPF', COLORS.rejuv),
			},
		};

	case 'fr':
		// Show only full rejuvs
		return {
			visible: [ POTIONS.rvl ],
			hidden:  [
				POTIONS.hp1,
				POTIONS.hp2,
				POTIONS.hp3,
				POTIONS.hp4,
				POTIONS.hp5,
				POTIONS.mp1,
				POTIONS.mp2,
				POTIONS.mp3,
				POTIONS.mp4,
				POTIONS.mp5,
				POTIONS.rvs,
			],
			customNames: {
				[POTIONS.rvl]: createPotionName('RPF', COLORS.rejuv),
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
	data: JSONData,
	visibility: ReturnType<typeof getPotionVisibility>,
): JSONData {
	if (typeof data !== 'object' || data === null)
		return data;

	// Handle both array format (actual JSON) and object format
	const entries = Array.isArray(data) ? data : Object.values(data);

	// Process each entry
	for (const entry of entries) {
		if (typeof entry !== 'object' || entry === null || Array.isArray(entry))
			continue;

		const key = entry['Key'];
		if (typeof key !== 'string')
			continue;

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

// ============================================================================
// Main Entry Point
// ============================================================================

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
	const itemNames = readItemNames();
	const modified = applyPotionFilterToData(itemNames, visibility);
	writeItemNames(modified);
}
