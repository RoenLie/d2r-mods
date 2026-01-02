import { CharConstants } from '../../Constants/CharConstants';
import { GemConstants } from '../../Constants/Items/GemConstants';
import { EBigTooltipSetting } from '../../Settings/Enums/EBigTooltipSetting';
import { FilterSettings } from '../../Settings/Filter/FilterSettings';
import { BigTooltip } from '../BigTooltip';
import { D2Color } from '../Colors/D2Color';
import { IHighlight } from '../Highlights/Interfaces/IHighlight';
import { SingleHighlight } from '../Highlights/SingleHighlight';
import { Gem } from '../Items/Gem';
import { IItemEntry } from './Interfaces/IItemEntry';


export class ItemEntry implements IItemEntry {

	readonly key: string;

	/**
   * Visibility
   */
	private _isVisible: boolean = true;
	get isVisible(): boolean {
		return this._isVisible;
	}

	set isVisible(value: boolean) {
		this._isVisible = value;
	}

	protected readonly nameColor: D2Color | null;
	protected readonly newName:   string | null;

	/**
   * Highlight pattern
   */
	private _highlight: IHighlight | null;
	get highlight(): IHighlight | null {
		return this._highlight;
	}

	protected set highlight(value: IHighlight) {
		this._highlight = value;
	}

	/**
   * Big tooltip
   */
	private _bigTooltip: BigTooltip | null;
	get bigTooltip(): BigTooltip | null {
		return this._bigTooltip;
	}

	protected set bigTooltip(value: BigTooltip) {
		this._bigTooltip = value;
	}

	constructor(
		key: string,
		newName?: string | null,
		nameColor?: D2Color | null,
		highlight?: IHighlight | null,
		bigTooltipSetting?: EBigTooltipSetting | null,
	) {
		this.key = key;
		this.newName = newName ??= null;
		this.nameColor = nameColor ??= null;
		this._highlight = highlight ??= null;
		this._bigTooltip = (bigTooltipSetting != undefined && bigTooltipSetting != EBigTooltipSetting.DISABLED)
			? new BigTooltip(bigTooltipSetting)
			: null;
	}

	static createArray(items: [string, string][]): ItemEntry[] {
		return items.map<ItemEntry>(item => new ItemEntry(item[0], item[1]));
	}

	static createHidden(key: string): ItemEntry {
		const entry = new ItemEntry(key);
		entry.isVisible = false;

		return entry;
	}

	static fromGem(gem: Gem, hasHighlight: boolean, bigTooltipSetting: EBigTooltipSetting): ItemEntry {
		const highlight = hasHighlight ? new SingleHighlight(GemConstants.highlight, gem.color, GemConstants.padding) : null;

		return new ItemEntry(gem.key, null, GemConstants.clrName, highlight, bigTooltipSetting);
	}

	static fromGems(gems: Gem[], hasHighlight: boolean, bigTooltipSetting: EBigTooltipSetting): ItemEntry[] {
		return gems.map<ItemEntry>(gem => this.fromGem(gem, hasHighlight, bigTooltipSetting));
	}

	generateDisplayName(translatedName: string): string {
		if (!this.isVisible)
			return FilterSettings.hidden;


		let displayName = this.applyNewName(translatedName);
		displayName = this.applyNameColor(displayName);
		displayName = this.applyHighlightPattern(displayName);
		displayName = this.applyBigTooltip(displayName);
		displayName = this.removeRedundantColorCodes(displayName); // TODO: fix

		return displayName;
	}

	protected applyNewName(translatedName: string): string {
		return (this.newName === null || this.newName === CharConstants.empty) ? translatedName : this.newName;
	}

	protected applyNameColor(displayName: string): string {
		return `${ this.nameColor ?? CharConstants.empty }${ displayName }`;
	}

	protected applyHighlightPattern(displayName: string): string {
		if (this.highlight === null)
			return displayName;

		return this.highlight.apply(displayName);
	}

	protected applyBigTooltip(displayName: string): string {
		if (this.bigTooltip === null)
			return displayName;

		return this.bigTooltip.apply(displayName, this.highlight);
	}

	// TODO: fix
	/**
   * Removes all adjacent redundant color codes from a name. Assumes occurrences of "ÿc" are always followed by a valid color code character.
   * @param name The item name.
   * @param startColor The item's default or current tooltip color.
   * @returns The provided name with all duplicate adjacent color codes removed.
   */
	protected removeRedundantColorCodes(name: string, startColor?: D2Color): string {
		return name;
		// TODO: fix
		//if (name.length < 3) // name too short to have a color code
		//	return name;

		//const i = name.indexOf(D2Color.prefix);
		//if (i === -1) // no color code found
		//	return name;

		//const nextColor = new D2Color(name[i + 2] as ED2ColorCode);

		//// if adjacent color code matches startColor, remove it and proceed with next recursive iteration
		//if (nextColor.equals(startColor)) {
		//	name = name.replace(startColor.toString(), CharConstants.empty);

		//	return this.removeRedundantColorCodes(name, startColor);
		//}

		//// if next color code does not match, proceed to search from there on
		//return this.removeRedundantColorCodes(name.slice(i + 3), nextColor);
	}

}
