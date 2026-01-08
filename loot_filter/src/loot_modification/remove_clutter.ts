/**
 * Remove Clutter Items Filter
 *
 * Removes low-value clutter items from drop tables entirely.
 * These items are typically vendor trash that clutter the screen.
 */

import type { FilterConfig } from '../mod_config';


// Item categories for removal
const clutterItemCategories = {
	arrowsBolts: [
		'aqv',  // Arrows (quiver)
		'cqv',  // Bolts (quiver)
	],
	scrolls: [
		'isc',  // Identify scroll
		'tsc',  // Town Portal scroll
	],
	keys:        [ 'key'	],
	buffPotions: [
		'vps',  // Stamina potion
		'wms',  // Thawing potion
		'yps',  // Antidote potion
	],
	lowHealingPotions: [
		'gpl',  // Minor Healing potion
		'gpm',  // Light Healing potion
		'gps',  // Healing potion
	],
	lowManaPotions: [
		'opl',  // Minor Mana potion
		'opm',  // Light Mana potion
		'ops',  // Mana potion
	],
};


function buildClutterItemList(config: FilterConfig): string[] {
	const itemsToRemove: string[] = [];

	// If "Remove All" is enabled, add all categories
	if (config.removeClutter.all) {
		itemsToRemove.push(...clutterItemCategories.arrowsBolts);
		itemsToRemove.push(...clutterItemCategories.scrolls);
		itemsToRemove.push(...clutterItemCategories.keys);
		itemsToRemove.push(...clutterItemCategories.buffPotions);
		itemsToRemove.push(...clutterItemCategories.lowHealingPotions);
		itemsToRemove.push(...clutterItemCategories.lowManaPotions);

		return itemsToRemove;
	}

	// Otherwise, check individual toggles
	if (config.removeClutter.arrowsBolts)
		itemsToRemove.push(...clutterItemCategories.arrowsBolts);

	if (config.removeClutter.scrolls)
		itemsToRemove.push(...clutterItemCategories.scrolls);

	if (config.removeClutter.keys)
		itemsToRemove.push(...clutterItemCategories.keys);

	if (config.removeClutter.buffPotions)
		itemsToRemove.push(...clutterItemCategories.buffPotions);

	if (config.removeClutter.lowHealingPotions)
		itemsToRemove.push(...clutterItemCategories.lowHealingPotions);

	if (config.removeClutter.lowManaPotions)
		itemsToRemove.push(...clutterItemCategories.lowManaPotions);

	return itemsToRemove;
}


function removeClutter(row: TSVDataRow, clutterItems: string[]): void {
	for (let i = 1; i <= 10; i++) {
		const itemKey = `Item${ i }`;
		const probKey = `Prob${ i }`;
		if (!row[itemKey])
			continue;

		const item = String(row[itemKey]).toLowerCase();

		// Remove misc clutter items completely
		if (clutterItems.includes(item)) {
			row[itemKey] = '';
			row[probKey] = '0';
		}
	}
}


/**
 * Apply the remove clutter items filter
 * Removes specified junk items from treasure class drop tables
 */
export function applyRemoveClutterItems(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const clutterItems = buildClutterItemList(config);

	// If no items are selected for removal, skip
	if (clutterItems.length === 0)
		return;

	const treasureFilename = 'global\\excel\\treasureclassex.txt';
	const treasure = D2RMM.readTsv(treasureFilename);

	treasure.rows.forEach(row => removeClutter(row, clutterItems));

	D2RMM.writeTsv(treasureFilename, treasure);
}
