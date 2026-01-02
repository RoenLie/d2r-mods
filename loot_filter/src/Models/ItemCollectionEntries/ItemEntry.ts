import { CharConstants } from '../../Constants/CharConstants';
import { GemConstants } from '../../Constants/Items/GemConstants';
import { EBigTooltipSetting } from '../../Settings/Enums/EBigTooltipSetting';
import { FilterSettings } from '../../Settings/Filter/FilterSettings';
import { BigTooltip } from '../BigTooltip';
import { D2Color } from '../Colors/D2Color';
import { ED2ColorCode } from '../Colors/ED2ColorCode';
import { IHighlight } from '../Highlights/Interfaces/IHighlight';
import { SingleHighlight } from '../Highlights/SingleHighlight';
import { Gem } from '../Items/Gem';
import { IItemEntry } from './Interfaces/IItemEntry';

export class ItemEntry implements IItemEntry {

	/**
   * Key / item code
   */
	private readonly _key: string;
	get key(): string {
		return this._key;
	}

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

	/**
   * Name color
   */
	private readonly _nameColor: D2Color | null;
	protected get nameColor(): D2Color | null {
		return this._nameColor;
	}

	/**
   * Name replacement. Leave empty to use vanilla translated name.
   */
	private readonly _newName: string | null;
	protected get newName(): string | null {
		return this._newName;
	}

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
		this._key = key;
		this._newName = newName ??= null;
		this._nameColor = nameColor ??= null;
		this._highlight = highlight ??= null;
		this._bigTooltip = (bigTooltipSetting != undefined && bigTooltipSetting != EBigTooltipSetting.DISABLED) ? new BigTooltip(bigTooltipSetting) : null;
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
		displayName = this.removeRedundantColorCodes(displayName);

		return displayName;
	}

	protected applyNewName(translatedName: string) {
		return (this.newName == null || this.newName === CharConstants.empty) ? translatedName : this.newName;
	}

	protected applyNameColor(displayName: string) {
		return `${ this.nameColor ?? CharConstants.empty }${ displayName }`;
	}

	protected applyHighlightPattern(displayName: string): string {
		if (this.highlight == null)
			return displayName;

		return this.highlight.apply(displayName);
	}

	protected applyBigTooltip(displayName: string): string {
		if (this.bigTooltip == null)
			return displayName;

		return this.bigTooltip.apply(displayName, this.highlight);
	}

	/**
   * Removes all adjacent redundant color codes from a name. Assumes occurrences of "ÿc" are always followed by a valid color code character.
   * @param name The item name.
   * @param startColor The item's default or current tooltip color (defaults to nameColor).
   * @returns The provided name with all duplicate adjacent color codes removed.
   */
	protected removeRedundantColorCodes(name: string, startColor?: D2Color): string {
		// Use nameColor as default for first call
		const currentColor = startColor ?? this.nameColor;

		if (name.length < 3) // name too short to have a color code
			return name;

		const i = name.indexOf(D2Color.prefix);
		if (i == -1) // no color code found
			return name;

		const nextColorCode = name[i + 2] as ED2ColorCode;
		const nextColor = new D2Color(nextColorCode);

		// if adjacent color code matches currentColor, remove it and proceed with next recursive iteration
		if (currentColor && nextColor.equals(currentColor)) {
			// Remove the redundant color code (3 characters: prefix + 'c' + code) at position i
			const beforeCode = name.slice(0, i);
			const afterCode = name.slice(i + 3);
			const cleanedName = beforeCode + afterCode;

			return this.removeRedundantColorCodes(cleanedName, currentColor);
		}

		// if next color code does not match, keep it and continue searching after this color code
		const beforeCode = name.slice(0, i + 3);
		const afterCode = name.slice(i + 3);

		return beforeCode + this.removeRedundantColorCodes(afterCode, nextColor);
	}

}
