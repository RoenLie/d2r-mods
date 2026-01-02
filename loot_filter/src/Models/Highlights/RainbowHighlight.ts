import { CharConstants } from '../../Constants/CharConstants';
import { ColorConstants } from '../../Constants/Colors/ColorConstants';
import { HighlightConstants } from '../../Constants/Items/HighlightConstants';
import { EBigTooltipSetting } from '../../Settings/Enums/EBigTooltipSetting';
import { BigTooltip } from '../BigTooltip';
import { DoubleHighlightBase } from './DoubleHighlightBase';

export class RainbowHighlight extends DoubleHighlightBase {

	protected readonly patternsPadding = HighlightConstants.padding.p1;
	protected readonly patternColors = [
		ColorConstants.red,
		ColorConstants.yellow,
		ColorConstants.blue,
		ColorConstants.green,
	];

	protected readonly nameColor = ColorConstants.gold;

	// TODO
	constructor(bigTooltipSetting?: EBigTooltipSetting) {
		const pattern = BigTooltip.hasPickUpMessage(bigTooltipSetting ?? EBigTooltipSetting.DISABLED)
			? HighlightConstants.pattern.p3
			: HighlightConstants.pattern.p5;

		super(pattern, HighlightConstants.padding.p3);
	}

	protected getPrefix(): string {
		let prefix = CharConstants.empty;

		// all: clr/pattern/paddingPatterns
		this.patternColors.forEach((clr, i) => {
			// if last, use clrName+paddingName, else use paddingPatterns
			const next = (i === this.patternColors.length - 1) ? `${ this.nameColor }${ this.padding }` : this.patternsPadding;
			prefix += `${ clr }${ this.pattern }${ next }`;
		});

		return prefix;
	}

	protected getSuffix(): string {
		let suffix = CharConstants.empty;

		// first: paddingName/clr/pattern
		// rest:  paddingPatterns/clr/pattern
		// end:   altClrName
		this.patternColors.reverse().forEach((clr, i) => {
			const next = (i === 0) ? this.padding : this.patternsPadding;
			suffix += `${ next }${ clr }${ this.pattern }`;
		});

		return `${ suffix }${ this.nameColor }`;
	}

}
