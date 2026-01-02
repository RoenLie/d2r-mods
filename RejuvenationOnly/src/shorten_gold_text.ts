export function runShortenGoldText(itemNameAffixes: TSVDataRow[]) {
	itemNameAffixes.forEach((item) => {
		if (item.Key === 'gld') {
			for (const key in item) {
				if (key !== 'id' && key !== 'Key') {
						item[key] = 'g';
				}
			}
		}
	});
}
