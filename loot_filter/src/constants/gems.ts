import { GEM_COLOR } from './colors';


// Gem item codes by quality
export const GemCodes = {
	chipped: [
		'gcv', // Chipped Amethyst
		'gcw', // Chipped Diamond
		'gcg', // Chipped Emerald
		'gcr', // Chipped Ruby
		'gcb', // Chipped Sapphire
		'gcy', // Chipped Topaz
		'skc', // Chipped Skull
	],
	flawed: [
		'gfv', // Flawed Amethyst
		'gfw', // Flawed Diamond
		'gfg', // Flawed Emerald
		'gfr', // Flawed Ruby
		'gfb', // Flawed Sapphire
		'gfy', // Flawed Topaz
		'skf', // Flawed Skull
	],
	normal: [
		'gsv', // Amethyst
		'gsy', // Topaz
		'sku', // Skull
		// Regular gems that are in item-nameaffixes.json (due to naming conflicts)
		'gsw', // Diamond
		'gsg', // Emerald
		'gsr', // Ruby
		'gsb', // Sapphire
	],
	flawless: [
		'gzv', // Flawless Amethyst
		'glw', // Flawless Diamond
		'glg', // Flawless Emerald
		'glr', // Flawless Ruby
		'glb', // Flawless Sapphire
		'gly', // Flawless Topaz
		'skl', // Flawless Skull
	],
	perfect: [
		'gpv', // Perfect Amethyst
		'gpw', // Perfect Diamond
		'gpg', // Perfect Emerald
		'gpr', // Perfect Ruby
		'gpb', // Perfect Sapphire
		'gpy', // Perfect Topaz
		'skz', // Perfect Skull
	],
} as const;

// Regular gems in item-nameaffixes.json (due to naming conflicts)
export const GemExceptions = [
	'gsw', // Diamond
	'gsg', // Emerald
	'gsr', // Ruby
	'gsb', // Sapphire
] as const;

// Map gem codes to their colors
export const GemCodeToColor: Record<string, string> = {
	// Amethyst
	'gcv': GEM_COLOR.AMETHYST,
	'gfv': GEM_COLOR.AMETHYST,
	'gsv': GEM_COLOR.AMETHYST,
	'gzv': GEM_COLOR.AMETHYST,
	'gpv': GEM_COLOR.AMETHYST,
	// Diamond
	'gcw': GEM_COLOR.DIAMOND,
	'gfw': GEM_COLOR.DIAMOND,
	'gsw': GEM_COLOR.DIAMOND,
	'glw': GEM_COLOR.DIAMOND,
	'gpw': GEM_COLOR.DIAMOND,
	// Emerald
	'gcg': GEM_COLOR.EMERALD,
	'gfg': GEM_COLOR.EMERALD,
	'gsg': GEM_COLOR.EMERALD,
	'glg': GEM_COLOR.EMERALD,
	'gpg': GEM_COLOR.EMERALD,
	// Ruby
	'gcr': GEM_COLOR.RUBY,
	'gfr': GEM_COLOR.RUBY,
	'gsr': GEM_COLOR.RUBY,
	'glr': GEM_COLOR.RUBY,
	'gpr': GEM_COLOR.RUBY,
	// Sapphire
	'gcb': GEM_COLOR.SAPPHIRE,
	'gfb': GEM_COLOR.SAPPHIRE,
	'gsb': GEM_COLOR.SAPPHIRE,
	'glb': GEM_COLOR.SAPPHIRE,
	'gpb': GEM_COLOR.SAPPHIRE,
	// Topaz
	'gcy': GEM_COLOR.TOPAZ,
	'gfy': GEM_COLOR.TOPAZ,
	'gsy': GEM_COLOR.TOPAZ,
	'gly': GEM_COLOR.TOPAZ,
	'gpy': GEM_COLOR.TOPAZ,
	// Skull
	'skc': GEM_COLOR.SKULL,
	'skf': GEM_COLOR.SKULL,
	'sku': GEM_COLOR.SKULL,
	'skl': GEM_COLOR.SKULL,
	'skz': GEM_COLOR.SKULL,
};

// Gem quality affix codes (item-nameaffixes.json)
// These are the quality prefix codes that appear on gems
export const GemAffixCodes = [
	'gcha', // Chipped Amethyst
	'gcv',  // Chipped Diamond
	'gce',  // Chipped Emerald
	'gcr',  // Chipped Ruby
	'gcs',  // Chipped Sapphire
	'gct',  // Chipped Topaz
	'gcy',  // Chipped Skull
	'gfha', // Flawed Amethyst
	'gfv',  // Flawed Diamond
	'gfe',  // Flawed Emerald
	'gfr',  // Flawed Ruby
	'gfs',  // Flawed Sapphire
	'gft',  // Flawed Topaz
	'gfy',  // Flawed Skull
	'gla',  // Amethyst (regular)
	'glv',  // Diamond (regular)
	'gle',  // Emerald (regular)
	'glr',  // Ruby (regular)
	'gls',  // Sapphire (regular)
	'glt',  // Topaz (regular)
	'gly',  // Skull (regular)
	'gzha', // Flawless Amethyst
	'gzv',  // Flawless Diamond
	'gze',  // Flawless Emerald
	'gzr',  // Flawless Ruby
	'gzs',  // Flawless Sapphire
	'gzt',  // Flawless Topaz
	'gzy',  // Flawless Skull
] as const;
