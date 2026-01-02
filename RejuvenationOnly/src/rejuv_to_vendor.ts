export function runRejuvToVendor(misc: TSVData) {
	const potions = ['Rejuvenation Potion', 'Full Rejuvenation Potion']
		.map(name => misc.rows.find(row => row.name === name))
		.filter(row => row !== undefined);

	potions.forEach(potion => {
		potion.spawnable = "1";
		potion.PermStoreItem = "1";
		potion.multibuy = "1";
		potion.AkaraMin = "1";
		potion.AkaraMax = "1";
		potion.LysanderMin = "1";
		potion.LysanderMax = "1";
		potion.OrmusMin = "1";
		potion.OrmusMax = "1";
		potion.MalahMin = "1";
		potion.MalahMax = "1";
		potion.JamellaMin = "1";
		potion.JamellaMax = "1";
	})
}