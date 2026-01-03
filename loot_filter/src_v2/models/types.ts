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

// Quest item IDs
export const QuestItemIds = {
	WIRT_LEG:           'leg',
	HORADRIC_MALUS:     'hdm',
	STAFF_OF_KINGS:     'msf',
	HORADRIC_STAFF:     'hst',
	GIDBINN:            'g33',
	KHALIM_FLAIL:       'qf1',
	KHALIM_WILL:        'qf2',
	HELL_FORGE_HAMMER:  'hfh',
	SCROLL_INIFUSS:     'bks',
	HORADRIC_CUBE:      'box',
	AMULET_VIPER:       'vip',
	JADE_FIGURINE:      'j34',
	GOLDEN_BIRD:        'g34',
	POTION_OF_LIFE:     'bkd',
	LAM_ESEN_TOME:      'tr1',
	KHALIM_EYE:         'eyz',
	KHALIM_HEART:       'hrt',
	KHALIM_BRAIN:       'bbb',
	MEPHISTO_SOULSTONE: 'msf',
	MALAH_POTION:       'xyz',
	SCROLL_RESISTANCE:  'ass',
} as const;

// Endgame item IDs
export const EndgameItemIds = {
	TOKEN:             'toa',
	STANDARD:          'flag',
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
	SOUNDS:            'global\\excel\\sounds.txt',
	WEAPONS:           'global\\excel\\weapons.txt',
	ARMOR:             'global\\excel\\armor.txt',
	MISC:              'global\\excel\\misc.txt',
	ITEM_NAMES:        'global\\excel\\item-names.json',
	ITEM_NAME_AFFIXES: 'global\\excel\\item-nameaffixes.json',
	ITEM_RUNES:        'global\\excel\\item-runes.json',
	ITEM_MODIFIERS:    'global\\excel\\item-modifiers.json',
	UI:                'global\\ui\\layouts\\_profilehd.json',
	PROFILE_HD:        'hd\\global\\ui\\layouts\\_profilehd.json',
} as const;
