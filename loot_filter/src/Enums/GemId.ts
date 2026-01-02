/**
 * Gem type identifiers.
 */
export enum GemType {
	AMETHYST = 'Amethyst',
	DIAMOND = 'Diamond',
	EMERALD = 'Emerald',
	RUBY = 'Ruby',
	SAPPHIRE = 'Sapphire',
	TOPAZ = 'Topaz',
	SKULL = 'Skull',
}

/**
 * Gem quality levels.
 */
export enum GemQuality {
	CHIPPED = 'Chipped',
	FLAWED = 'Flawed',
	NORMAL = 'Normal',
	FLAWLESS = 'Flawless',
	PERFECT = 'Perfect',
}

/**
 * Gem item code identifiers.
 * These are the actual item codes used in D2 game files.
 */
export enum GemId {
	// Chipped
	CHIPPED_AMETHYST = 'gcv',
	CHIPPED_DIAMOND = 'gcw',
	CHIPPED_EMERALD = 'gcg',
	CHIPPED_RUBY = 'gcr',
	CHIPPED_SAPPHIRE = 'gcb',
	CHIPPED_TOPAZ = 'gcy',
	CHIPPED_SKULL = 'skc',

	// Flawed
	FLAWED_AMETHYST = 'gfv',
	FLAWED_DIAMOND = 'gfw',
	FLAWED_EMERALD = 'gfg',
	FLAWED_RUBY = 'gfr',
	FLAWED_SAPPHIRE = 'gfb',
	FLAWED_TOPAZ = 'gfy',
	FLAWED_SKULL = 'skf',

	// Normal (Regular)
	AMETHYST = 'gsv',
	DIAMOND = 'gsw',
	EMERALD = 'gsg',
	RUBY = 'gsr',
	SAPPHIRE = 'gsb',
	TOPAZ = 'gsy',
	SKULL = 'sku',

	// Flawless
	FLAWLESS_AMETHYST = 'gzv',
	FLAWLESS_DIAMOND = 'glw',
	FLAWLESS_EMERALD = 'glg',
	FLAWLESS_RUBY = 'glr',
	FLAWLESS_SAPPHIRE = 'glb',
	FLAWLESS_TOPAZ = 'gly',
	FLAWLESS_SKULL = 'skl',

	// Perfect
	PERFECT_AMETHYST = 'gpv',
	PERFECT_DIAMOND = 'gpw',
	PERFECT_EMERALD = 'gpg',
	PERFECT_RUBY = 'gpr',
	PERFECT_SAPPHIRE = 'gpb',
	PERFECT_TOPAZ = 'gpy',
	PERFECT_SKULL = 'skz',
}
