import { CharmId, SunderCharmId } from '../../Enums/CharmId';
import { SunderCharm } from '../../Models/Items/SunderCharm';
import { ColorConstants } from '../Colors/ColorConstants';

/**
 * Charm-related constants and collections.
 *
 * Provides arrays of charm IDs for iteration and sunder charm instances
 * with their associated display colors.
 */
export abstract class CharmConstants {

	/** Array of basic charm type IDs (small, large, grand) */
	static charmIds: CharmId[] = [
		CharmId.SMALL,
		CharmId.LARGE,
		CharmId.GRAND,
	];

	/** Array of unique LoD charm IDs */
	static uniqueLodCharmIds: CharmId[] = [
		CharmId.ANNIHILUS,
		CharmId.TORCH,
		CharmId.GHEEDS,
	];

	/** Sunder Charms with their display names and colors */
	static sunderCharms: SunderCharm[] = [
		new SunderCharm(SunderCharmId.MAGIC, SunderCharmId.MAGIC, ColorConstants.gray),
		new SunderCharm(SunderCharmId.PHYSICAL, SunderCharmId.PHYSICAL, ColorConstants.white),
		new SunderCharm(SunderCharmId.COLD, SunderCharmId.COLD, ColorConstants.lightBlue),
		new SunderCharm(SunderCharmId.LIGHTNING, SunderCharmId.LIGHTNING, ColorConstants.yellow),
		new SunderCharm(SunderCharmId.FIRE, SunderCharmId.FIRE, ColorConstants.red),
		new SunderCharm(SunderCharmId.POISON, SunderCharmId.POISON, ColorConstants.green),
	];

}
