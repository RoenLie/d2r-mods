/**
 * Vendor Rejuvenation Potions
 *
 * Enables vendors to sell rejuvenation potions.
 * Useful when you want to be able to buy rejuvs from NPCs.
 */

import type { FilterConfig } from '../mod_config';


function enableRejuvAtVendors(misc: TSVData): void {
	const potions = [ 'Rejuvenation Potion', 'Full Rejuvenation Potion' ]
		.map(name => misc.rows.find(row => row.name === name))
		.filter(row => row !== undefined);

	potions.forEach(potion => {
		potion.spawnable = '1';
		potion.PermStoreItem = '1';
		potion.multibuy = '1';
		potion.AkaraMin = '1';
		potion.AkaraMax = '1';
		potion.LysanderMin = '1';
		potion.LysanderMax = '1';
		potion.OrmusMin = '1';
		potion.OrmusMax = '1';
		potion.MalahMin = '1';
		potion.MalahMax = '1';
		potion.JamellaMin = '1';
		potion.JamellaMax = '1';
	});
}


/**
 * Apply the vendor rejuvenation modification
 * Enables vendors to sell rejuvenation potions
 */
export function applyVendorRejuvenation(config: FilterConfig): void {
	if (!config.enabled || !config.vendorRejuvenation.enabled)
		return;

	const miscFilename = 'global\\excel\\misc.txt';
	const misc = D2RMM.readTsv(miscFilename);

	enableRejuvAtVendors(misc);

	D2RMM.writeTsv(miscFilename, misc);
}
