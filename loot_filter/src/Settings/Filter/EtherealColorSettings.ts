import { D2rColor } from '../../Models/Colors/D2rColor';
import { RawSettings } from '../RawSettings';


export abstract class EtherealColorSettings {

	static readonly isEnabled: boolean  = RawSettings.filter.statsAndModifiers.ethColor.isEnabled;
	static readonly color:     D2rColor = new D2rColor(RawSettings.filter.statsAndModifiers.ethColor.color);

}
