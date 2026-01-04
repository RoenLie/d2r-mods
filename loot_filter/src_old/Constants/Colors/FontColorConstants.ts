import { D2rColor } from '../../Models/Colors/D2rColor';
import { ED2rColor } from '../../Models/Colors/ED2rColor';


/**
 * Font color variables set in _profilehd.json, _profilelv.json, etc
 */
export abstract class FontColorConstants {

	static beige:         D2rColor = new D2rColor(ED2rColor.BEIGE);
	static black:         D2rColor = new D2rColor(ED2rColor.BLACK);
	static currencyGold:  D2rColor = new D2rColor(ED2rColor.CURRENCY_GOLD);
	static darkGreen:     D2rColor = new D2rColor(ED2rColor.DARK_GREEN);
	static green:         D2rColor = new D2rColor(ED2rColor.GREEN);
	static lightBlue:     D2rColor = new D2rColor(ED2rColor.LIGHT_BLUE);
	static lightGray:     D2rColor = new D2rColor(ED2rColor.LIGHT_GRAY);
	static lightPurple:   D2rColor = new D2rColor(ED2rColor.LIGHT_PURPLE);
	static lightRed:      D2rColor = new D2rColor(ED2rColor.LIGHT_RED);
	static lightTeal:     D2rColor = new D2rColor(ED2rColor.LIGHT_TEAL);
	static red:           D2rColor = new D2rColor(ED2rColor.RED);
	static veryLightGray: D2rColor = new D2rColor(ED2rColor.VERY_LIGHT_GRAY);
	static white:         D2rColor = new D2rColor(ED2rColor.WHITE);

}
