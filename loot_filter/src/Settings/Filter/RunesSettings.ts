import { D2Color } from '../../Models/Colors/D2Color';
import { ED2ColorCode } from '../../Models/Colors/ED2ColorCode';
import { DoubleHighlight } from '../../Models/Highlights/DoubleHighlight';
import { EDoubleHighlightSetting } from '../../Models/Highlights/EDoubleHighlightSetting';
import { IHighlight } from '../../Models/Highlights/Interfaces/IHighlight';
import { EBigTooltipSetting } from '../Enums/EBigTooltipSetting';
import { RawSettings } from '../RawSettings';

class RuneTierSetting {

	readonly isVisible:   boolean;
	readonly highlight:   IHighlight | null;
	readonly nameColor:   D2Color | null;
	readonly numberColor: D2Color | null;
	readonly bigTooltip:  EBigTooltipSetting;

	constructor(
		isVisible: boolean,
		hlSetting: EDoubleHighlightSetting,
		hlColorCode: ED2ColorCode,
		nameColorCode: ED2ColorCode,
		numberColorCode: ED2ColorCode,
		bttSetting: EBigTooltipSetting,
	) {
		const hlColor = D2Color.create(hlColorCode, RawSettings.filter.settings.defaultHighlightColor)!;
		this.isVisible = isVisible;
		this.highlight = hlSetting == EDoubleHighlightSetting.DISABLED ? null : new DoubleHighlight(hlSetting, hlColor, bttSetting);
		this.nameColor = D2Color.create(nameColorCode);
		this.numberColor = D2Color.create(numberColorCode);
		this.bigTooltip = bttSetting;
	}

}

// TODO: fix default highlight color
export abstract class RunesSettings {

	static readonly isEnabled:       boolean = RawSettings.filter.runes.isEnabled;
	static readonly shouldHideAffix: boolean = RawSettings.filter.runes.shouldHideAffix;
	static readonly shouldAddNumber: boolean = RawSettings.filter.runes.shouldAddNumber;

	static readonly low: RuneTierSetting = new RuneTierSetting(
		RawSettings.filter.runes.low.isVisible,
		RawSettings.filter.runes.low.highlight,
		RawSettings.filter.runes.low.highlightColor,
		RawSettings.filter.runes.low.nameColor,
		RawSettings.filter.runes.low.numberColor,
		RawSettings.filter.runes.low.bigTooltip,
	);

	static readonly lowMid: RuneTierSetting = new RuneTierSetting(
		RawSettings.filter.runes.lowMid.isVisible,
		RawSettings.filter.runes.lowMid.highlight,
		RawSettings.filter.runes.lowMid.highlightColor,
		RawSettings.filter.runes.lowMid.nameColor,
		RawSettings.filter.runes.lowMid.numberColor,
		RawSettings.filter.runes.lowMid.bigTooltip,
	);

	static readonly mid: RuneTierSetting = new RuneTierSetting(
		RawSettings.filter.runes.mid.isVisible,
		RawSettings.filter.runes.mid.highlight,
		RawSettings.filter.runes.mid.highlightColor,
		RawSettings.filter.runes.mid.nameColor,
		RawSettings.filter.runes.mid.numberColor,
		RawSettings.filter.runes.mid.bigTooltip,
	);

	static readonly high: RuneTierSetting = new RuneTierSetting(
		RawSettings.filter.runes.high.isVisible,
		RawSettings.filter.runes.high.highlight,
		RawSettings.filter.runes.high.highlightColor,
		RawSettings.filter.runes.high.nameColor,
		RawSettings.filter.runes.high.numberColor,
		RawSettings.filter.runes.high.bigTooltip,
	);

}
