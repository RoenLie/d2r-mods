import { runEnforceFullRejuvPotions } from '../force_rejuv_only';
import { runRemoveClutterItems } from '../remove_clutter_items';


export function runModifyExcelTreasureClassEx() {
	const treasureFilename = 'global\\excel\\treasureclassex.txt';
	const treasure = D2RMM.readTsv(treasureFilename);

	runEnforceFullRejuvPotions(treasure.rows);
	//runRemoveClutterItems(treasure.rows);
	//runClampPotionBundles(treasure.rows);

	D2RMM.writeTsv(treasureFilename, treasure);
}