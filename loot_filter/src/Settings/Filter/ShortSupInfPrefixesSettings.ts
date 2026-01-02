import { D2Color } from '../../Models/Colors/D2Color';
import { RawSettings } from '../RawSettings';

export abstract class ShortSupInfPrefixesSettings {

	static readonly isEnabled:          boolean = RawSettings.filter.statsAndModifiers.shortSupInfPrefixes.isEnabled;
	static readonly style:              string  = RawSettings.filter.statsAndModifiers.shortSupInfPrefixes.style;
	static readonly inferiorItemsColor: D2Color | null = D2Color.create(RawSettings.filter.statsAndModifiers.shortSupInfPrefixes.inferiorItemsColor);

}
