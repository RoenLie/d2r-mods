/**
 * Diablo 2 Resurrected Color Codes
 *
 * These are the standard D2R text color codes used for item names,
 * highlights, and other text formatting.
 *
 * Usage: prefix text with these codes to change color, e.g., `${COLOR.RED}Item Name`
 */

export const COLOR = {
	/** White - ÿc0 */
	WHITE:        'ÿc0',
	/** Red - ÿc1 */
	RED:          'ÿc1',
	/** Green - ÿc2 */
	GREEN:        'ÿc2',
	/** Blue - ÿc3 */
	BLUE:         'ÿc3',
	/** Gold - ÿc4 */
	GOLD:         'ÿc4',
	/** Gray - ÿc5 */
	GRAY:         'ÿc5',
	/** Black - ÿc6 */
	BLACK:        'ÿc6',
	/** Tan - ÿc7 */
	TAN:          'ÿc7',
	/** Orange - ÿc8 */
	ORANGE:       'ÿc8',
	/** Yellow - ÿc9 */
	YELLOW:       'ÿc9',
	/** Dark Green - ÿc: */
	DARK_GREEN:   'ÿc:',
	/** Purple - ÿc; */
	PURPLE:       'ÿc;',
	/** Dark Gold - ÿc< */
	DARK_GOLD:    'ÿc<',
	/** Light Gray - ÿc= */
	LIGHT_GRAY:   'ÿc=',
	/** Light Gold - ÿc> */
	LIGHT_GOLD:   'ÿc>',
	/** Light White - ÿc? */
	LIGHT_WHITE:  'ÿc?',
	/** Light Red - ÿc@ */
	LIGHT_RED:    'ÿc@',
	/** Light Green - ÿcA */
	LIGHT_GREEN:  'ÿcA',
	/** Light Blue - ÿcB */
	LIGHT_BLUE:   'ÿcB',
	/** Unique/Crafted - ÿcC */
	UNIQUE:       'ÿcC',
	/** Set Items - ÿcD */
	SET:          'ÿcD',
	/** Magic - ÿcE */
	MAGIC:        'ÿcE',
	/** Rare - ÿcF */
	RARE:         'ÿcF',
	/** Corrupted - ÿcG */
	CORRUPTED:    'ÿcG',
	/** Crafted - ÿcH */
	CRAFTED:      'ÿcH',
	/** Ethereal - ÿcI */
	ETHEREAL:     'ÿcI',
	/** Sockets - ÿcJ */
	SOCKETS:      'ÿcJ',
	/** Rune Word - ÿcK */
	RUNE_WORD:    'ÿcK',
	/** Socketed - ÿcL */
	SOCKETED:     'ÿcL',
	/** Superior - ÿcM */
	SUPERIOR:     'ÿcM',
	/** Quest - ÿcN */
	QUEST:        'ÿcN',
	/** Error - ÿcO */
	ERROR:        'ÿcO',
	/** Tribal - ÿcP */
	TRIBAL:       'ÿcP',
	/** Quest Error - ÿcQ */
	QUEST_ERROR:  'ÿcQ',
	/** Rare Alt - ÿcR */
	RARE_ALT:     'ÿcR',
	/** Green Alt - ÿcS */
	GREEN_ALT:    'ÿcS',
	/** Sky Blue - ÿcT */
	SKY_BLUE:     'ÿcT',
	/** Bright White - ÿcU */
	BRIGHT_WHITE: 'ÿcU',
} as const;

/**
 * Semantic color aliases for common use cases
 */
export const SEMANTIC_COLOR = {
	/** Default/Base color */
	DEFAULT:     COLOR.WHITE,
	/** Physical damage type */
	PHYSICAL:    COLOR.WHITE,
	/** Fire damage type */
	FIRE:        COLOR.RED,
	/** Poison damage type */
	POISON:      COLOR.GREEN,
	/** Cold damage type */
	COLD:        COLOR.SKY_BLUE,
	/** Lightning damage type */
	LIGHTNING:   COLOR.YELLOW,
	/** Magic damage type */
	MAGIC_DMG:   COLOR.GRAY,
	/** Health/Life */
	HEALTH:      COLOR.RED,
	/** Mana */
	MANA:        COLOR.BLUE,
	/** Rejuvenation */
	REJUV:       COLOR.PURPLE,
	/** Unique item names */
	UNIQUE_NAME: COLOR.SET,  // Gold (ÿcD)
	/** Highlight marker */
	HIGHLIGHT:   COLOR.GRAY,
} as const;

/**
 * Color code mapping for configuration-driven color parsing
 * Maps color names to their D2R color codes
 */
export const COLOR_NAME_MAP: Record<string, string> = {
	white:      COLOR.WHITE,
	red:        COLOR.RED,
	green:      COLOR.GREEN,
	blue:       COLOR.BLUE,
	gold:       COLOR.GOLD,
	gray:       COLOR.GRAY,
	black:      COLOR.BLACK,
	tan:        COLOR.TAN,
	orange:     COLOR.ORANGE,
	yellow:     COLOR.YELLOW,
	darkgreen:  COLOR.DARK_GREEN,
	purple:     COLOR.PURPLE,
	darkgold:   COLOR.DARK_GOLD,
	lightgray:  COLOR.LIGHT_GRAY,
	lightgold:  COLOR.LIGHT_GOLD,
	lightwhite: COLOR.LIGHT_WHITE,
	lightred:   COLOR.LIGHT_RED,
};

/**
 * Gem-specific colors
 */
export const GEM_COLOR = {
	AMETHYST: COLOR.PURPLE,
	DIAMOND:  COLOR.WHITE,
	EMERALD:  COLOR.GREEN,
	RUBY:     COLOR.RED,
	SAPPHIRE: COLOR.BLUE,
	TOPAZ:    COLOR.YELLOW,
	SKULL:    COLOR.GRAY,
} as const;

/**
 * Sunder charm colors by element type
 */
export const SUNDER_COLOR = {
	PHYSICAL:  COLOR.WHITE,
	FIRE:      COLOR.RED,
	POISON:    COLOR.GREEN,
	COLD:      COLOR.SKY_BLUE,
	LIGHTNING: COLOR.YELLOW,
	MAGIC:     COLOR.GRAY,
} as const;
