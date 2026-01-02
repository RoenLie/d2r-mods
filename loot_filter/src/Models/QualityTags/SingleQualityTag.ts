import { ItemQualitySettings } from '../../Settings/Filter/ItemQualitySettings';
import { QualityTagBase } from './QualityTagBase';

export class SingleQualityTag extends QualityTagBase {

	apply(displayName: string): string {
		const tag = `${ ItemQualitySettings.openChar }${ this._indicator }${ ItemQualitySettings.closeChar }`;

		return ItemQualitySettings.placement === 'prefix'
			? `${ tag } ${ displayName }`
			: `${ displayName } ${ tag }`;
	}

}
