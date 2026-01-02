import { D2Color } from '../../Models/Colors/D2Color';
import { ED2ColorCode } from '../../Models/Colors/ED2ColorCode';

/**
 * Commonly used D2 color constants.
 *
 * These wrap the ED2ColorCode enum with D2Color instances for convenient use
 * throughout the loot filter.
 *
 * @see {@link file://./../../docs/D2_COLOR_CODES.md} for detailed color code reference
 */
export abstract class ColorConstants {

	static readonly white:     D2Color = new D2Color(ED2ColorCode.WHITE);
	static readonly gray:      D2Color = new D2Color(ED2ColorCode.GRAY_DIMMER);
	static readonly black:     D2Color = new D2Color(ED2ColorCode.BLACK);
	static readonly red:       D2Color = new D2Color(ED2ColorCode.TOMATO);
	static readonly green:     D2Color = new D2Color(ED2ColorCode.LIME);
	static readonly darkGreen: D2Color = new D2Color(ED2ColorCode.GREEN);
	static readonly blue:      D2Color = new D2Color(ED2ColorCode.CORN_FLOWER_BLUE);
	static readonly lightBlue: D2Color = new D2Color(ED2ColorCode.LIGHT_SKY_BLUE);
	static readonly yellow:    D2Color = new D2Color(ED2ColorCode.YELLOW);
	static readonly orange:    D2Color = new D2Color(ED2ColorCode.ORANGE);
	static readonly gold:      D2Color = new D2Color(ED2ColorCode.TAN);
	static readonly purple:    D2Color = new D2Color(ED2ColorCode.DARK_VIOLET);
	static readonly pink:      D2Color = new D2Color(ED2ColorCode.VIOLET);

	static readonly magic:  D2Color = new D2Color(ED2ColorCode.CORN_FLOWER_BLUE_2); // $FontColorMagic
	static readonly unique: D2Color = new D2Color(ED2ColorCode.TAN_3); // $FontColorUnique

}
