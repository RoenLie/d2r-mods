import { ItemQualitySettings } from '../../Settings/Filter/ItemQualitySettings';
import { QualityTagBase } from './QualityTagBase';

export class DoubleQualityTag extends QualityTagBase {

	apply(displayName: string): string {
		// todo
		const tag = `${ ItemQualitySettings.openChar }${ this._indicator }${ ItemQualitySettings.closeChar }`;

		return `${ tag }${ displayName }${ tag }`;
	}

}
