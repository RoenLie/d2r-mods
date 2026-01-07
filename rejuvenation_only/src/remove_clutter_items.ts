// Items to remove entirely from drops
const clutterItems = [
	'aqv',
	'cqv',
	'isc',
	'tsc',
	'key',
	'vps',
	'wms',
	'yps',
	'gpl',
	'gpm',
	'gps',
	'opl',
	'opm',
	'ops',
];


export function removeClutter(row: TSVDataRow): void {
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


export function runRemoveClutterItems(treasureRows: TSVDataRow[]): void {
	treasureRows.forEach(removeClutter);
}
