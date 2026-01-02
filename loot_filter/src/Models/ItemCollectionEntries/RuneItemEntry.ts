import { CharConstants } from '../../Constants/CharConstants';
import { RuneConstants } from '../../Constants/Items/RuneConstants';
import { EBigTooltipSetting } from '../../Settings/Enums/EBigTooltipSetting';
import { RunesSettings } from '../../Settings/Filter/RunesSettings';
import { D2Color } from '../Colors/D2Color';
import { IHighlight } from '../Highlights/Interfaces/IHighlight';
import { Rune } from '../Items/Rune';
import { IItemEntry } from './Interfaces/IItemEntry';
import { ItemEntry } from './ItemEntry';

export class RuneItemEntry extends ItemEntry implements IItemEntry {

	protected readonly rune:         Rune;
	protected readonly numberColor?: D2Color | null;

	constructor(
		rune: Rune,
		nameColor?: D2Color | null,
		numberColor?: D2Color | null,
		highlight?: IHighlight | null,
		bigToolipSetting?: EBigTooltipSetting | null,
	) {
		super(rune.key, CharConstants.empty, nameColor, highlight, bigToolipSetting);
		this.rune = rune;
		this.numberColor = numberColor;
	}

	// tier 1 no highlight, orange name
	// tier 2 red highlight, orange name/number
	// tier 3 red highlight/number, orange name
	// tier 4 all red
	generateDisplayName(localizedName: string): string {
		let displayName = this.removeRuneAffix(localizedName);
		displayName = this.applyNameColor(displayName);
		displayName = this.addRuneNumber(displayName);
		// TODO: create EDoubleHighlightPattern with values none/small/large/xl/rainbow
		displayName = this.applyHighlightPattern(displayName);
		displayName = this.applyBigTooltip(displayName);
		displayName = this.removeRedundantColorCodes(displayName);

		return displayName;
	}

	protected removeRuneAffix(localizedName: string): string {
		if (!RunesSettings.shouldHideAffix)
			return localizedName;

		RuneConstants.translatedAffixes.some(affix => {
			if (!localizedName.includes(affix))
				return false;

			localizedName = localizedName.replace(affix, CharConstants.empty);

			return true;
		});

		return localizedName;
	}

	protected addRuneNumber(displayName: string): string {
		if (!RunesSettings.shouldAddNumber)
			return displayName;

		return `${ displayName } ${ this.numberColor ?? CharConstants.empty }(${ this.rune.number })`;
	}

}
