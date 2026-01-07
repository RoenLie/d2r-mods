export function runShortenGoldText(itemNameAffixes: TSVDataRow[]): void {
	itemNameAffixes.forEach((item) => {
		if (item.Key === 'gld') {
			for (const key in item) {
				if (key !== 'id' && key !== 'Key')
					item[key] = 'g';
			}
		}
	});
}
