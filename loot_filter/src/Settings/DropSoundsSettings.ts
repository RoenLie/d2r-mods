import { RawSettings } from './RawSettings';

export abstract class DropSoundsSettings {

	static readonly isEnabled:              boolean = RawSettings.dropSounds.isEnabled;
	static readonly shouldExcludeForHidden: boolean = RawSettings.dropSounds.shouldExcludeForHidden;

	static readonly runes = {
		low:    RawSettings.dropSounds.runes.low,
		lowMid: RawSettings.dropSounds.runes.lowMid,
		mid:    RawSettings.dropSounds.runes.mid,
		high:   RawSettings.dropSounds.runes.high,
	};

	static readonly questEndgame = {
		questItems: RawSettings.dropSounds.questEndgame.questItems,
		essences:   RawSettings.dropSounds.questEndgame.essences,
		tokens:     RawSettings.dropSounds.questEndgame.tokens,
		keys:       RawSettings.dropSounds.questEndgame.keys,
		organs:     RawSettings.dropSounds.questEndgame.organs,
		standard:   RawSettings.dropSounds.questEndgame.standard,
	};

}
