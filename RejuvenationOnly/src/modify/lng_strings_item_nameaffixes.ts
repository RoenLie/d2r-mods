import { runShortenGoldText } from '../shorten_gold_text';


export function modifyLngStringsItemNameAffixes() {
	const itemNameAffixesFilename = 'local\\lng\\strings\\item-nameaffixes.json';
	const itemNameAffixes = D2RMM.readJson(itemNameAffixesFilename) as any[];

	runShortenGoldText(itemNameAffixes);

	D2RMM.writeJson(itemNameAffixesFilename, itemNameAffixes);
}