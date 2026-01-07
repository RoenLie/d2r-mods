const REJUV_DROP_MULTIPLIER = 1; // Multiplier for converting HP/MP potion drops to rejuvs (0.5 = 50%)


export function isPotionCode(code: string): boolean {
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

export function adjustDrops(row: TSVDataRow): void {
	for (let i = 1; i <= 10; i++) {
		const itemKey = `Item${ i }`;
		const probKey = `Prob${ i }`;
		if (!row[itemKey])
			continue;

		const item = String(row[itemKey]).toLowerCase();

		// HP/MP potions become Full Rejuv at modified drop rate
		if (isPotionCode(item)) {
			row[itemKey] = 'rvl';
			const original = Number(row[probKey] || 0);
			row[probKey] = Math.max(1, Math.floor(original * REJUV_DROP_MULTIPLIER)).toString();
		}
	}
}


export function runEnforceFullRejuvPotions(treasureRows: TSVDataRow[]): void {
	treasureRows.forEach(adjustDrops);
}
