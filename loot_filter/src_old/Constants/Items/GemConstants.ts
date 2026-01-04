import { GemId, GemQuality, GemType } from '../../Enums/GemId';
import { D2Color } from '../../Models/Colors/D2Color';
import { Gem } from '../../Models/Items/Gem';
import { JewelrySettings } from '../../Settings/Filter/JewelrySettings';
import { CharConstants } from '../CharConstants';
import { ColorConstants } from '../Colors/ColorConstants';
import { SettingsConstants } from '../SettingsConstants';
import { HighlightConstants } from './HighlightConstants';

/**
 * Gem-related constants and collections.
 *
 * Provides gem color mappings and organized collections of gems by quality tier.
 */
export abstract class GemConstants {

	/** Gem type color mappings */
	static readonly gemColors: Record<GemType, D2Color> = {
		[GemType.AMETHYST]: ColorConstants.purple,
		[GemType.DIAMOND]:  ColorConstants.white,
		[GemType.EMERALD]:  ColorConstants.green,
		[GemType.RUBY]:     ColorConstants.red,
		[GemType.SAPPHIRE]: ColorConstants.blue,
		[GemType.TOPAZ]:    ColorConstants.yellow,
		[GemType.SKULL]:    ColorConstants.gray,
	};

	/** Default gem name color */
	static clrName = ColorConstants.white;
	/** Default gem highlight character */
	static highlight = CharConstants.o;
	/** Default gem highlight padding */
	static padding = HighlightConstants.padding.p1;

	/** Returns indent for pick-up message based on gem filter settings */
	static getPickUpMessageIndent(): string {
		const setting = JewelrySettings.gems.filter;
		if (setting === SettingsConstants.all || setting === 'flawless' || setting === 'perfect')
			return CharConstants.getSpaces(2);

		return CharConstants.empty;
	}

	/** Chipped, Flawed, and Regular (Normal) gems */
	static chippedFlawedRegularGems: Gem[] = [
		// Chipped
		new Gem(GemId.CHIPPED_AMETHYST, this.gemColors[GemType.AMETHYST], GemQuality.CHIPPED),
		new Gem(GemId.CHIPPED_DIAMOND, this.gemColors[GemType.DIAMOND], GemQuality.CHIPPED),
		new Gem(GemId.CHIPPED_EMERALD, this.gemColors[GemType.EMERALD], GemQuality.CHIPPED),
		new Gem(GemId.CHIPPED_RUBY, this.gemColors[GemType.RUBY], GemQuality.CHIPPED),
		new Gem(GemId.CHIPPED_SAPPHIRE, this.gemColors[GemType.SAPPHIRE], GemQuality.CHIPPED),
		new Gem(GemId.CHIPPED_TOPAZ, this.gemColors[GemType.TOPAZ], GemQuality.CHIPPED),
		new Gem(GemId.CHIPPED_SKULL, this.gemColors[GemType.SKULL], GemQuality.CHIPPED),
		// Flawed
		new Gem(GemId.FLAWED_AMETHYST, this.gemColors[GemType.AMETHYST], GemQuality.FLAWED),
		new Gem(GemId.FLAWED_DIAMOND, this.gemColors[GemType.DIAMOND], GemQuality.FLAWED),
		new Gem(GemId.FLAWED_EMERALD, this.gemColors[GemType.EMERALD], GemQuality.FLAWED),
		new Gem(GemId.FLAWED_RUBY, this.gemColors[GemType.RUBY], GemQuality.FLAWED),
		new Gem(GemId.FLAWED_SAPPHIRE, this.gemColors[GemType.SAPPHIRE], GemQuality.FLAWED),
		new Gem(GemId.FLAWED_TOPAZ, this.gemColors[GemType.TOPAZ], GemQuality.FLAWED),
		new Gem(GemId.FLAWED_SKULL, this.gemColors[GemType.SKULL], GemQuality.FLAWED),
		// Regular (some gems are in gemExceptions due to D2 file structure)
		new Gem(GemId.AMETHYST, this.gemColors[GemType.AMETHYST], GemType.AMETHYST),
		new Gem(GemId.TOPAZ, this.gemColors[GemType.TOPAZ], GemType.TOPAZ),
		new Gem(GemId.SKULL, this.gemColors[GemType.SKULL], GemType.SKULL),
	];

	/** Flawless gems */
	static flawlessGems: Gem[] = [
		new Gem(GemId.FLAWLESS_AMETHYST, this.gemColors[GemType.AMETHYST], GemQuality.FLAWLESS),
		new Gem(GemId.FLAWLESS_DIAMOND, this.gemColors[GemType.DIAMOND], GemQuality.FLAWLESS),
		new Gem(GemId.FLAWLESS_EMERALD, this.gemColors[GemType.EMERALD], GemQuality.FLAWLESS),
		new Gem(GemId.FLAWLESS_RUBY, this.gemColors[GemType.RUBY], GemQuality.FLAWLESS),
		new Gem(GemId.FLAWLESS_SAPPHIRE, this.gemColors[GemType.SAPPHIRE], GemQuality.FLAWLESS),
		new Gem(GemId.FLAWLESS_TOPAZ, this.gemColors[GemType.TOPAZ], GemQuality.FLAWLESS),
		new Gem(GemId.FLAWLESS_SKULL, this.gemColors[GemType.SKULL], GemQuality.FLAWLESS),
	];

	/** Perfect gems */
	static perfectGems: Gem[] = [
		new Gem(GemId.PERFECT_AMETHYST, this.gemColors[GemType.AMETHYST], GemQuality.PERFECT),
		new Gem(GemId.PERFECT_DIAMOND, this.gemColors[GemType.DIAMOND], GemQuality.PERFECT),
		new Gem(GemId.PERFECT_EMERALD, this.gemColors[GemType.EMERALD], GemQuality.PERFECT),
		new Gem(GemId.PERFECT_RUBY, this.gemColors[GemType.RUBY], GemQuality.PERFECT),
		new Gem(GemId.PERFECT_SAPPHIRE, this.gemColors[GemType.SAPPHIRE], GemQuality.PERFECT),
		new Gem(GemId.PERFECT_TOPAZ, this.gemColors[GemType.TOPAZ], GemQuality.PERFECT),
		new Gem(GemId.PERFECT_SKULL, this.gemColors[GemType.SKULL], GemQuality.PERFECT),
	];

	/**
	 * Regular gems stored in item-nameaffixes.json (likely due to affix name conflicts).
	 * These are separate from the gems above despite being the same quality tier.
	 */
	static gemExceptions: Gem[] = [
		new Gem(GemId.DIAMOND, this.gemColors[GemType.DIAMOND], GemType.DIAMOND),
		new Gem(GemId.EMERALD, this.gemColors[GemType.EMERALD], GemType.EMERALD),
		new Gem(GemId.RUBY, this.gemColors[GemType.RUBY], GemType.RUBY),
		new Gem(GemId.SAPPHIRE, this.gemColors[GemType.SAPPHIRE], GemType.SAPPHIRE),
	];

}
