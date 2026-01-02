import { CharConstants } from '../../Constants/CharConstants';
import { RawSettings } from '../RawSettings';

export abstract class ItemLevelSettings {

	static readonly isEnabled:               boolean = RawSettings.filter.statsAndModifiers.itemLevel.isEnabled;
	static readonly shouldFixIndentation:    boolean = RawSettings.filter.statsAndModifiers.itemLevel.shouldFixIndentation;
	static readonly shouldHideOnBigTooltips: boolean = RawSettings.filter.statsAndModifiers.itemLevel.shouldHideOnBigTooltips;

	static singleDigitIndent: string = CharConstants.space.repeat(4); // for single digit ilvl items
	static doubleDigitIndent: string = CharConstants.space.repeat(6); // for double digit ilvl items

}
