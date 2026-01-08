/**
 * Force Rejuvenation Potions
 *
 * Replaces all healing and mana potion drops with rejuvenation potions.
 * Useful for endgame when you only want rejuvs to drop.
 */

import type { FilterConfig } from '../mod_config';


function isPotionCode(code: string): boolean {
	if (!code)
		return false;

	const c = String(code).toLowerCase();

	return (
		c.startsWith('hp')      // hp1..hp5, h-potion...
	 || c.startsWith('mp')      // mp1..mp5, m-potion...
	 || c.startsWith('potion')
	 || c.startsWith('hpotion')
	 || c.startsWith('mpotion')
	 || c === 'rvs'             // small rejuv
	 || c === 'rvl'             // full rejuv
	);
}


function convertPotionsToRejuv(row: TSVDataRow, rejuvType: 'small' | 'full', dropMultiplier: number): void {
	for (let i = 1; i <= 10; i++) {
		const itemKey = `Item${ i }`;
		const probKey = `Prob${ i }`;
		if (!row[itemKey])
			continue;

		const item = String(row[itemKey]).toLowerCase();

		// HP/MP potions become rejuv at modified drop rate
		if (isPotionCode(item)) {
			row[itemKey] = rejuvType === 'full' ? 'rvl' : 'rvs';
			const original = Number(row[probKey] || 0);
			row[probKey] = Math.max(1, Math.floor(original * dropMultiplier)).toString();
		}
	}
}

/**
 * Apply the force rejuvenation modification
 * Replaces all potion drops with rejuvenation potions
 */
export function applyForceRejuvenation(config: FilterConfig): void {
	if (!config.enabled || !config.forceRejuvenation.enabled)
		return;

	const treasureFilename = 'global\\excel\\treasureclassex.txt';
	const treasure = D2RMM.readTsv(treasureFilename);

	const rejuvType = config.forceRejuvenation.type;
	const dropMultiplier = config.forceRejuvenation.dropMultiplier;

	treasure.rows.forEach(row => convertPotionsToRejuv(row, rejuvType, dropMultiplier));

	D2RMM.writeTsv(treasureFilename, treasure);
}
