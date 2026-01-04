/**
 * Quest item identifiers (non-weapon).
 * These items are used in various quest objectives.
 */
export enum QuestItemId {
	// Act 1
	/** Scroll of Inifuss */
	SCROLL_INIFUSS = 'bks',
	/** Scroll of Inifuss (deciphered) */
	SCROLL_INIFUSS_DECIPHERED = 'bkd',

	// Act 2
	/** Horadric Scroll */
	HORADRIC_SCROLL = 'tr1',
	/** Amulet of the Viper */
	AMULET_VIPER = 'vip',

	// Act 3
	/** A Jade Figurine */
	JADE_FIGURINE = 'j34',
	/** The Golden Bird */
	GOLDEN_BIRD = 'g34',
	/** Lam Esen's Tome */
	LAM_ESEN_TOME = 'bbb',
	/** Lam Esen's Tome (alternate) */
	LAM_ESEN_TOME_ALT = 'LamTome',
	/** Khalim's Eye */
	KHALIM_EYE = 'qey',
	/** Khalim's Heart */
	KHALIM_HEART = 'qhr',
	/** Khalim's Brain */
	KHALIM_BRAIN = 'qbr',
	/** Mephisto's Soulstone */
	MEPHISTO_SOULSTONE = 'mss',

	// Act 5
	/** Book of Skill */
	BOOK_OF_SKILL = 'ass',
	/** Potion of Life */
	POTION_OF_LIFE = 'xyz',
	/** Malah's Potion */
	MALAH_POTION = 'ice',
	/** Scroll of Resistance */
	SCROLL_RESISTANCE = 'tr2',

	// Special
	/** Horadric Cube */
	HORADRIC_CUBE = 'box',
}

/**
 * Quest weapon identifiers.
 * These weapons are used in quest objectives.
 */
export enum QuestWeaponId {
	// Act 1
	/** Wirt's Leg */
	WIRT_LEG = 'leg',
	/** Horadric Malus */
	HORADRIC_MALUS = 'hdm',

	// Act 2
	/** Staff of Kings */
	STAFF_OF_KINGS = 'msf',
	/** Staff of Kings (alternate) */
	STAFF_OF_KINGS_ALT = 'Staff of Kings',
	/** Horadric Staff */
	HORADRIC_STAFF = 'hst',
	/** Horadric Staff (alternate) */
	HORADRIC_STAFF_ALT = 'Horadric Staff',
	/** Amulet of the Viper (alternate) */
	AMULET_VIPER_ALT = 'Amulet of the Viper',

	// Act 3
	/** The Gidbinn */
	GIDBINN = 'g33',
	/** Khalim's Flail */
	KHALIM_FLAIL = 'qf1',
	/** Khalim's Flail (alternate) */
	KHALIM_FLAIL_ALT = 'KhalimFlail',
	/** Khalim's Will */
	KHALIM_WILL = 'qf2',
	/** Khalim's Will (alternate) */
	KHALIM_WILL_ALT = 'SuperKhalimFlail',

	// Act 4
	/** Hell Forge Hammer */
	HELL_FORGE_HAMMER = 'hfh',
	/** Hell Forge Hammer (alternate) */
	HELL_FORGE_HAMMER_ALT = 'Hell Forge Hammer',
}
