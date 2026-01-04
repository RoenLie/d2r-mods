// Quest item IDs (codes from D2R game files)
export const QuestItemIds = {
	// Quest Weapons
	WIRTS_LEG:                 'leg',
	HORADRIC_MALUS:            'hdm',
	STAFF_OF_KINGS:            'msf',
	HORADRIC_STAFF:            'hst',
	GIDBINN:                   'g33',
	KHALIM_FLAIL:              'qf1',
	KHALIM_WILL:               'qf2',
	HELL_FORGE_HAMMER:         'hfh',
	// Quest Items (non-weapon)
	SCROLL_INIFUSS:            'bks',
	SCROLL_INIFUSS_DECIPHERED: 'bkd',
	HORADRIC_SCROLL:           'tr1',
	BOOK_OF_SKILL:             'ass',
	HORADRIC_CUBE:             'box',
	AMULET_VIPER:              'vip',
	JADE_FIGURINE:             'j34',
	GOLDEN_BIRD:               'g34',
	POTION_OF_LIFE:            'xyz',
	LAM_ESEN_TOME:             'bbb',
	KHALIM_EYE:                'qey',
	KHALIM_HEART:              'qhr',
	KHALIM_BRAIN:              'qbr',
	MEPHISTO_SOULSTONE:        'mss',
	MALAH_POTION:              'ice',
	SCROLL_RESISTANCE:         'tr2',
} as const;

// Alternative quest item IDs (used in some game files)
export const QuestItemIdsAlt = {
	LAM_ESEN_TOME:     'LamTome',
	AMULET_VIPER:      'Amulet of the Viper',
	STAFF_OF_KINGS:    'Staff of Kings',
	HORADRIC_STAFF:    'Horadric Staff',
	KHALIM_FLAIL:      'KhalimFlail',
	KHALIM_WILL:       'SuperKhalimFlail',
	HELL_FORGE_HAMMER: 'Hell Forge Hammer',
} as const;

// Endgame item IDs (codes from D2R game files)
export const EndgameItemIds = {
	TOKEN:             'toa',
	STANDARD:          'std',
	ESSENCE_TWISTED:   'tes',
	ESSENCE_CHARGED:   'ceh',
	ESSENCE_BURNING:   'bet',
	ESSENCE_FESTERING: 'fed',
	KEY_TERROR:        'pk1',
	KEY_HATE:          'pk2',
	KEY_DESTRUCTION:   'pk3',
	ORGAN_HORN:        'dhn',
	ORGAN_EYE:         'bey',
	ORGAN_BRAIN:       'mbr',
} as const;
