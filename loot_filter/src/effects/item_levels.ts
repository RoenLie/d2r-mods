/**
 * Item Level Effect
 *
 * Shows item levels (iLvl) on weapons, armor, and jewelry/charms.
 * Simple feature: set ShowLevel flag to '1' for relevant items.
 */

import { readArmor, readMisc, readWeapons, writeArmor, writeMisc, writeWeapons } from '../io/game_files';
import { ItemLevelConfig } from '../io/mod_config';
import { QuestItemIds } from '../constants/item_ids';

// ============================================================================
// Constants
// ============================================================================

// Items that should NOT show iLvl
const WEAPON_EXCLUSIONS = [ 'tpot' /* throwing pots */ ];

const QUEST_WEAPONS = [
	QuestItemIds.WIRTS_LEG,
	QuestItemIds.HORADRIC_MALUS,
	QuestItemIds.STAFF_OF_KINGS,
	QuestItemIds.HORADRIC_STAFF,
	QuestItemIds.GIDBINN,
	QuestItemIds.KHALIM_FLAIL,
	QuestItemIds.KHALIM_WILL,
	QuestItemIds.HELL_FORGE_HAMMER,
];

// Jewelry/charm codes that should show iLvl
const ILVL_MISC_ITEMS = [
	// Rings & Amulets & Jewels
	'rin', // Ring
	'amu', // Amulet
	'jew', // Jewel (socketable gem) - was missing!

	// Charms
	'cm1', // Small Charm
	'cm2', // Large Charm
	'cm3', // Grand Charm
];

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Enable ShowLevel for all items except those in the exclusion list
 */
function enableShowLevelExcept(
	data: FileTypes.Armor.File | FileTypes.Weapons.File,
	exclusions: string[],
): FileTypes.Armor.File | FileTypes.Weapons.File {
	data.rows.forEach(row => {
		if (!exclusions.includes(row.code) && !exclusions.includes(row.type))
			row.ShowLevel = '1';
	});

	return data;
}

/**
 * Enable ShowLevel only for items in the inclusion list
 */
function enableShowLevelFor(data: FileTypes.Misc.File, inclusions: string[]): FileTypes.Misc.File {
	data.rows.forEach(row => {
		if (inclusions.includes(row.code))
			row.ShowLevel = '1';
	});

	return data;
}

// ============================================================================
// Feature Functions
// ============================================================================

/**
 * Enable iLvl display on weapons (except excluded items)
 */
function enableForWeapons(config: ItemLevelConfig): void {
	const weaponsData = readWeapons();

	// Build exclusion list
	const exclusions = [ ...WEAPON_EXCLUSIONS ];

	// If we should hide on big tooltips, exclude quest weapons
	// (assuming they have big tooltips enabled)
	if (config.hideOnBigTooltips)
		exclusions.push(...QUEST_WEAPONS);

	enableShowLevelExcept(weaponsData, exclusions);
	writeWeapons(weaponsData);
}

/**
 * Enable iLvl display on armor (no exclusions)
 */
function enableForArmor(): void {
	const armorData = readArmor();
	enableShowLevelExcept(armorData, []);
	writeArmor(armorData);
}

/**
 * Enable iLvl display on specific misc items (jewelry, charms)
 */
function enableForMiscItems(config: ItemLevelConfig): void {
	const miscData = readMisc();

	// Only enable for jewelry and charms
	// If hideOnBigTooltips is enabled, we might want to exclude some items,
	// but for now we'll keep it simple - the original code has a TODO about this
	enableShowLevelFor(miscData, ILVL_MISC_ITEMS);

	writeMisc(miscData);
}

// ============================================================================
// Main Entry Point
// ============================================================================

/**
 * Apply item level display modifications.
 *
 * Simple, linear flow:
 * 1. Check if enabled
 * 2. Enable for weapons (with exclusions)
 * 3. Enable for armor (all)
 * 4. Enable for specific misc items
 */
export function applyItemLevels(config: ItemLevelConfig): void {
	if (!config.enabled)
		return;

	enableForWeapons(config);
	enableForArmor();
	enableForMiscItems(config);
}
