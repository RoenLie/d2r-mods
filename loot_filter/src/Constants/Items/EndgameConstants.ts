import { EndgameItemId, EssenceId, PandemoniumKeyId, PandemoniumOrganId } from '../../Enums/EndgameItemId';
import { ColorConstants } from '../Colors/ColorConstants';

/**
 * Endgame item constants.
 *
 * Includes Token of Absolution components (essences), Pandemonium Event items
 * (keys, organs), and other endgame-specific items.
 */
export abstract class EndgameConstants {

	/** Default color for endgame item names */
	static clrName = ColorConstants.orange;

	/** Essence item IDs (used to create Token of Absolution) */
	static essences: EssenceId[] = [
		EssenceId.TWISTED,
		EssenceId.CHARGED,
		EssenceId.BURNING,
		EssenceId.FESTERING,
	];

	/** Pandemonium key item IDs */
	static keys: PandemoniumKeyId[] = [
		PandemoniumKeyId.TERROR,
		PandemoniumKeyId.HATE,
		PandemoniumKeyId.DESTRUCTION,
	];

	/** Pandemonium organ item IDs */
	static organs: PandemoniumOrganId[] = [
		PandemoniumOrganId.HORN,
		PandemoniumOrganId.EYE,
		PandemoniumOrganId.BRAIN,
	];

	/** Token of Absolution (respec item) */
	static token = EndgameItemId.TOKEN;

	/** Standard of Heroes */
	static standard = EndgameItemId.STANDARD;

}
