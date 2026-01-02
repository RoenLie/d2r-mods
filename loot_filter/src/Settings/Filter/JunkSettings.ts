import { RawSettings } from '../RawSettings';


export abstract class JunkSettings {

	static readonly goldTooltipColors: string = RawSettings.filter.junk.goldTooltipColors;
	static readonly goldSuffix:        string = RawSettings.filter.junk.goldSuffix;
	static readonly healingPotions:    string = RawSettings.filter.junk.healingPotions;
	static readonly buffPotions:       string = RawSettings.filter.junk.buffPotions;
	static readonly throwingPotions:   string = RawSettings.filter.junk.throwingPotions;
	static readonly scrollsTomes:      string = RawSettings.filter.junk.scrollsTomes;
	static readonly arrowsBolts:       string = RawSettings.filter.junk.arrowsBolts;
	static readonly keys:              string = RawSettings.filter.junk.keys;

}
