import { CharmConstants } from './CharmConstants';

export abstract class JewelryConstants {

	static ringId = 'rin';
	static amuletId = 'amu';
	static jewelId = 'jew';

	static iLvlJewelry: string[] = [
		this.ringId,
		this.amuletId,
		this.jewelId,
		// JewelryConstants.ringId,
		// JewelryConstants.amuletId,
		// JewelryConstants.jewelId,
		CharmConstants.charmSmallId,
		CharmConstants.charmLargeId,
		CharmConstants.charmGrandId,
	];

}
