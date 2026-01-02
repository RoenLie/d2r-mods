import { CharConstants } from '../../Constants/CharConstants';
import { D2Color } from '../../Models/Colors/D2Color';
import { RawSettings } from '../RawSettings';


export class FilterSettings {

	static readonly isEnabled:                 boolean = RawSettings.filter.isEnabled;
	static readonly isCustomFilterListEnabled: boolean = RawSettings.filter.isCustomFilterListEnabled;

	static readonly defaultHighlightColor: D2Color = D2Color.create(RawSettings.filter.settings.defaultHighlightColor)!;
	static readonly highlightCharacter:    string = RawSettings.filter.settings.highlightCharacter;
	static readonly hidden:                string = CharConstants.space.repeat(RawSettings.filter.settings.hidden);

}
