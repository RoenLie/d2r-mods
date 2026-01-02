import { QuestItemId, QuestWeaponId } from '../../Enums/QuestItemId';
import { EiLvlDigits } from '../../Settings/Enums/EiLvlDigits';

/**
 * Quest item and weapon constants.
 *
 * Organizes quest-related items by act and provides special handling
 * for items that need custom display configurations.
 */
export abstract class QuestConstants {

	/** Standard quest items (non-weapons) */
	static readonly questItems: QuestItemId[] = [
		// Act 1
		QuestItemId.SCROLL_INIFUSS,
		QuestItemId.SCROLL_INIFUSS_DECIPHERED,
		// Act 2
		QuestItemId.HORADRIC_SCROLL,
		QuestItemId.AMULET_VIPER,
		// Act 3
		QuestItemId.JADE_FIGURINE,
		QuestItemId.GOLDEN_BIRD,
		QuestItemId.LAM_ESEN_TOME,
		QuestItemId.KHALIM_EYE,
		QuestItemId.KHALIM_HEART,
		QuestItemId.KHALIM_BRAIN,
		QuestItemId.MEPHISTO_SOULSTONE,
		// Act 4: none
		// Act 5: see exceptions below
		// Extra
		QuestItemId.LAM_ESEN_TOME_ALT,
	];

	/** Quest items with special handling for Acts 2-3 */
	static readonly questItemExceptionsAct23: QuestItemId[] = [
		QuestItemId.BOOK_OF_SKILL,
		QuestItemId.POTION_OF_LIFE,
	];

	/** Quest items with special handling for Act 5 */
	static readonly questItemExceptionsAct5: QuestItemId[] = [
		QuestItemId.MALAH_POTION,
		QuestItemId.SCROLL_RESISTANCE,
	];

	/** Horadric Cube */
	static readonly cube = QuestItemId.HORADRIC_CUBE;

	/** Quest weapons with their item level digit display configuration */
	static readonly questWeapons: { key: QuestWeaponId | string; digits: EiLvlDigits; }[] = [
		// Act 1
		{ key: QuestWeaponId.WIRT_LEG, digits: EiLvlDigits.Double },
		{ key: QuestWeaponId.HORADRIC_MALUS, digits: EiLvlDigits.Double },
		// Act 2
		{ key: QuestWeaponId.STAFF_OF_KINGS, digits: EiLvlDigits.Double },
		{ key: QuestWeaponId.HORADRIC_STAFF, digits: EiLvlDigits.Single },
		// Act 3
		{ key: QuestWeaponId.GIDBINN, digits: EiLvlDigits.Double },
		{ key: QuestWeaponId.KHALIM_FLAIL, digits: EiLvlDigits.Double },
		{ key: QuestWeaponId.KHALIM_WILL, digits: EiLvlDigits.Single },
		// Act 4
		{ key: QuestWeaponId.HELL_FORGE_HAMMER, digits: EiLvlDigits.Double },
		// Alternate keys (for translated/alternate item names)
		{ key: QuestWeaponId.STAFF_OF_KINGS_ALT, digits: EiLvlDigits.Double },
		{ key: QuestWeaponId.AMULET_VIPER_ALT, digits: EiLvlDigits.Double },
		{ key: QuestWeaponId.HORADRIC_STAFF_ALT, digits: EiLvlDigits.Single },
		{ key: QuestWeaponId.KHALIM_FLAIL_ALT, digits: EiLvlDigits.Double },
		{ key: QuestWeaponId.KHALIM_WILL_ALT, digits: EiLvlDigits.Single },
		{ key: QuestWeaponId.HELL_FORGE_HAMMER_ALT, digits: EiLvlDigits.Double },
	];

}
