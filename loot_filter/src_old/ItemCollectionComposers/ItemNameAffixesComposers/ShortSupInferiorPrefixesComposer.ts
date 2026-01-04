import { CharConstants } from '../../Constants/CharConstants';
import { D2Color } from '../../Models/Colors/D2Color';
import { ItemEntry } from '../../Models/ItemCollectionEntries/ItemEntry';
import { ShortSupInfPrefixesSettings } from '../../Settings/Filter/ShortSupInfPrefixesSettings';
import { IItemCollectionComposer } from '../IItemCollectionComposer';
import { ItemCollectionComposerBase } from '../ItemCollectionComposerBase';


export class ShortSupInferiorPrefixesComposer extends ItemCollectionComposerBase implements IItemCollectionComposer {

	applyFilter(): void {
		if (!ShortSupInfPrefixesSettings.isEnabled)
			return;

		const supKey = 'Hiquality';
		const infKeys = [ 'Damaged', 'Cracked', 'Low Quality', 'Crude' ];

		let supPrefix: string = CharConstants.empty;
		let infPrefix: string = CharConstants.empty;
		const infColor: D2Color | null = ShortSupInfPrefixesSettings.inferiorItemsColor;
		switch (ShortSupInfPrefixesSettings.style) {
		case 'plusminus': // Enable
			supPrefix = `${ CharConstants.plus }`;
			infPrefix = `${ CharConstants.minus }`;
			break;
		case 'supinf': // Enable
			supPrefix = `Sup`;
			infPrefix = `Inf`;
			break;
		default:
			// If style doesn't result in valid prefixes, don't modify anything
			// This preserves the original vanilla names like "Superior", "Low Quality", etc.
			return;
		}

		this.collection.upsert(new ItemEntry(supKey, supPrefix));
		infKeys.forEach(key => this.collection.upsert(new ItemEntry(key, `${ infColor ?? CharConstants.empty }${ infPrefix }`)));
	}

}
