import { EBigTooltipSetting } from '../../Settings/Enums/EBigTooltipSetting';
import { D2Color } from '../Colors/D2Color';
import { IHighlight } from '../Highlights/Interfaces/IHighlight';
import { Rune } from './Rune';

export class RuneTier {

	readonly number:            number;
	readonly runes:             Rune[];
	readonly isVisible:         boolean;
	readonly nameColor:         D2Color;
	readonly numberColor:       D2Color;
	readonly highlight:         IHighlight | null;
	readonly bigTooltipSetting: EBigTooltipSetting;
	readonly hasLightPillar:    boolean;
	readonly dropSound:         string;

	constructor(
		number: number,
		runes: Rune[],
		isVisible: boolean,
		nameColor: D2Color,
		numberColor: D2Color,
		highlight: IHighlight | null,
		bigTooltipSetting: EBigTooltipSetting,
		hasLightPillar: boolean,
		dropSound: string,
	) {
		this.number = number;
		this.runes = runes;
		this.isVisible = isVisible;
		this.nameColor = nameColor;
		this.numberColor = numberColor;
		this.highlight = highlight;
		this.bigTooltipSetting = bigTooltipSetting;
		this.hasLightPillar = hasLightPillar;
		this.dropSound = dropSound;
	}

	getKeys(): string[] {
		return this.runes.map<string>(rune => rune.key);
	}

}
