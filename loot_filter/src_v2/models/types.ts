/**
 * Core type definitions for the loot filter mod.
 * Simple, flat types - no classes.
 */

// Sound effect types
export interface SoundEffectPair {
	readonly sd: string;
	readonly hd: string;
}

export type DropSoundType
	= 'default'
	| string; // any key from SOUND_EFFECTS

// Rune types
export interface Rune {
	readonly key:    string;
	readonly name:   string;
	readonly number: number;
}

export interface RuneTier {
	readonly number:         number;
	readonly runes:          Rune[];
	readonly isVisible:      boolean;
	readonly hasLightPillar: boolean;
	readonly dropSound:      string;
}

// Gem types
export type GemQuality = 'chipped' | 'flawed' | 'normal' | 'flawless' | 'perfect';
export type GemType = 'amethyst' | 'diamond' | 'emerald' | 'ruby' | 'sapphire' | 'topaz' | 'skull';

export interface Gem {
	readonly key:     string;
	readonly quality: GemQuality;
	readonly type:    GemType;
	readonly name:    string;
}

// Filter modes
export type GemFilterMode = 'all' | 'flawless' | 'perfect' | 'hide';
export type RuneFilterMode = 'all' | string; // tier-based

// Item entry for filtering
export interface ItemEntry {
	readonly key:  string;
	readonly name: string;
	hidden?:       boolean;
	highlight?:    string;
	bigTooltip?:   boolean;
}

// Quest item IDs (codes from D2R game files)
export const QuestItemIds = {
	// Quest Weapons
	WIRT_LEG:                  'leg',
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
	POTION_OF_LIFE:            'xyz',  // Fixed: was 'bkd' (that's Scroll of Inifuss deciphered)
	LAM_ESEN_TOME:             'bbb',  // Fixed: was 'tr1' (that's Horadric Scroll)
	KHALIM_EYE:                'qey',  // Fixed: was 'eyz' (generic Eye organ)
	KHALIM_HEART:              'qhr',  // Fixed: was 'hrt' (generic Heart organ)
	KHALIM_BRAIN:              'qbr',  // Fixed: was 'bbb' (that's Lam Esen's Tome)
	MEPHISTO_SOULSTONE:        'mss',  // Fixed: was 'msf' (that's Staff of Kings!)
	MALAH_POTION:              'ice',  // Fixed: was 'xyz' (that's Potion of Life)
	SCROLL_RESISTANCE:         'tr2',  // Fixed: was 'ass' (that's Book of Skill)
} as const;

// Endgame item IDs (codes from D2R game files)
export const EndgameItemIds = {
	TOKEN:             'toa',
	STANDARD:          'std',  // Fixed: was 'flag'
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

// File paths
export const FilePaths = {
	// Excel TSV files
	SOUNDS:            'global\\excel\\sounds.txt',
	WEAPONS:           'global\\excel\\weapons.txt',
	ARMOR:             'global\\excel\\armor.txt',
	MISC:              'global\\excel\\misc.txt',
	// Localized JSON string files
	ITEM_NAMES:        'local\\lng\\strings\\item-names.json',
	ITEM_NAME_AFFIXES: 'local\\lng\\strings\\item-nameaffixes.json',
	ITEM_RUNES:        'local\\lng\\strings\\item-runes.json',
	ITEM_MODIFIERS:    'local\\lng\\strings\\item-modifiers.json',
	UI:                'local\\lng\\strings\\ui.json',
	// UI layouts
	PROFILE_HD:        'global\\ui\\layouts\\_profilehd.json',
} as const;
