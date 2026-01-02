import { CharmId } from '../../Enums/CharmId';
import { JewelryId } from '../../Enums/JewelryId';


/**
 * Jewelry and charm constants.
 *
 * Defines items that can display item level (iLvl) in tooltips.
 */
export abstract class JewelryConstants {

	/** Items that should display item level when configured */
	static iLvlJewelry: (JewelryId | CharmId)[] = [
		JewelryId.RING,
		JewelryId.AMULET,
		JewelryId.JEWEL,
		CharmId.SMALL,
		CharmId.LARGE,
		CharmId.GRAND,
	];

}
