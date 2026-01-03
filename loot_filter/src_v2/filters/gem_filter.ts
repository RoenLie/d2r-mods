/**
 * Gem Filter
 *
 * Filters gems by quality and applies highlighting/colors.
 * Handles both item-names.json (most gems) and item-nameaffixes.json (some regular gems).
 */

import { readItemNameAffixes, readItemNames, writeItemNameAffixes, writeItemNames } from '../io/game_files';
import { FilterConfig } from '../io/mod_config';

// ============================================================================
// Constants
// ============================================================================

// Gem item codes by quality
const GEM_CODES = {
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
		// Note: Diamond, Emerald, Ruby, Sapphire are in item-nameaffixes.json
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
};

// Regular gems in item-nameaffixes.json (due to naming conflicts)
const GEM_EXCEPTIONS = [
	'gsw', // Diamond
	'gsg', // Emerald
	'gsr', // Ruby
	'gsb', // Sapphire
];

// Gem colors for highlighting
const GEM_COLORS = {
	amethyst: 'ÿc;', // Purple
	diamond:  'ÿc0', // White
	emerald:  'ÿc2', // Green
	ruby:     'ÿc1', // Red
	sapphire: 'ÿc3', // Blue
	topaz:    'ÿc9', // Yellow
	skull:    'ÿc5', // Gray
};

// Map gem codes to their colors
const GEM_CODE_TO_COLOR: Record<string, string> = {
	// Amethyst
	'gcv': GEM_COLORS.amethyst,
	'gfv': GEM_COLORS.amethyst,
	'gsv': GEM_COLORS.amethyst,
	'gzv': GEM_COLORS.amethyst,
	'gpv': GEM_COLORS.amethyst,
	// Diamond
	'gcw': GEM_COLORS.diamond,
	'gfw': GEM_COLORS.diamond,
	'gsw': GEM_COLORS.diamond,
	'glw': GEM_COLORS.diamond,
	'gpw': GEM_COLORS.diamond,
	// Emerald
	'gcg': GEM_COLORS.emerald,
	'gfg': GEM_COLORS.emerald,
	'gsg': GEM_COLORS.emerald,
	'glg': GEM_COLORS.emerald,
	'gpg': GEM_COLORS.emerald,
	// Ruby
	'gcr': GEM_COLORS.ruby,
	'gfr': GEM_COLORS.ruby,
	'gsr': GEM_COLORS.ruby,
	'glr': GEM_COLORS.ruby,
	'gpr': GEM_COLORS.ruby,
	// Sapphire
	'gcb': GEM_COLORS.sapphire,
	'gfb': GEM_COLORS.sapphire,
	'gsb': GEM_COLORS.sapphire,
	'glb': GEM_COLORS.sapphire,
	'gpb': GEM_COLORS.sapphire,
	// Topaz
	'gcy': GEM_COLORS.topaz,
	'gfy': GEM_COLORS.topaz,
	'gsy': GEM_COLORS.topaz,
	'gly': GEM_COLORS.topaz,
	'gpy': GEM_COLORS.topaz,
	// Skull
	'skc': GEM_COLORS.skull,
	'skf': GEM_COLORS.skull,
	'sku': GEM_COLORS.skull,
	'skl': GEM_COLORS.skull,
	'skz': GEM_COLORS.skull,
};

// Highlight character
const HIGHLIGHT_CHAR = 'o';
const HIGHLIGHT_PADDING = ' ';

// Hidden item name (spaces to maintain tooltip width)
const HIDDEN_NAME = '                    '; // 20 spaces

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Apply highlight pattern to a gem name
 */
function applyHighlight(name: string, gemCode: string): string {
	const color = GEM_CODE_TO_COLOR[gemCode] || 'ÿc0';

	return `${ color }${ HIGHLIGHT_CHAR }${ HIGHLIGHT_PADDING }${ name }`;
}

/**
 * Hide a gem by setting its name to spaces
 */
function hideGem(): string {
	return HIDDEN_NAME;
}

/**
 * Determine which gems to show based on filter mode
 */
function getVisibleGems(mode: FilterConfig['gems']['mode']): string[] {
	switch (mode) {
	case 'all':
		return [
			...GEM_CODES.chipped,
			...GEM_CODES.flawed,
			...GEM_CODES.normal,
			...GEM_CODES.flawless,
			...GEM_CODES.perfect,
		];
	case 'flawless':
		return [
			...GEM_CODES.flawless,
			...GEM_CODES.perfect,
		];
	case 'perfect':
		return GEM_CODES.perfect;
	case 'hide':
		return [];
	}
}

/**
 * Determine which gems to hide based on filter mode
 */
function getHiddenGems(mode: FilterConfig['gems']['mode']): string[] {
	switch (mode) {
	case 'all':
		return [];
	case 'flawless':
		return [
			...GEM_CODES.chipped,
			...GEM_CODES.flawed,
			...GEM_CODES.normal,
		];
	case 'perfect':
		return [
			...GEM_CODES.chipped,
			...GEM_CODES.flawed,
			...GEM_CODES.normal,
			...GEM_CODES.flawless,
		];
	case 'hide':
		return [
			...GEM_CODES.chipped,
			...GEM_CODES.flawed,
			...GEM_CODES.normal,
			...GEM_CODES.flawless,
			...GEM_CODES.perfect,
		];
	}
}

/**
 * Apply gem filtering to item names data
 */
function applyGemFilterToData(
	data: JSONData,
	visibleGems: string[],
	hiddenGems: string[],
	enableHighlight: boolean,
): JSONData {
	if (typeof data !== 'object' || Array.isArray(data))
		return data;

	// Process each entry in the file
	Object.keys(data).forEach(index => {
		const entry = data[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry['Key'];
		if (typeof key !== 'string')
			return;

		// Check if this is a gem we should modify
		if (hiddenGems.includes(key)) {
			// Hide this gem
			Object.keys(entry).forEach(lang => {
				if (lang === 'id' || lang === 'Key')
					return;
				if (typeof entry[lang] === 'string')
					entry[lang] = hideGem();
			});
		}
		else if (visibleGems.includes(key) && enableHighlight) {
			// Apply highlight to this gem
			Object.keys(entry).forEach(lang => {
				if (lang === 'id' || lang === 'Key')
					return;
				if (typeof entry[lang] === 'string' && entry[lang].trim() !== '')
					entry[lang] = applyHighlight(entry[lang], key);
			});
		}
	});

	return data;
}

// ============================================================================
// Main Entry Point
// ============================================================================

/**
 * Apply gem filtering.
 *
 * Flow:
 * 1. Determine which gems to show/hide based on mode
 * 2. Load item-names.json (most gems)
 * 3. Load item-nameaffixes.json (gem exceptions)
 * 4. Apply filtering and highlighting
 * 5. Save modified data
 */
export function applyGemFilter(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const visibleGems = getVisibleGems(config.gems.mode);
	const hiddenGems = getHiddenGems(config.gems.mode);

	// Apply to item-names.json (most gems)
	const itemNames = readItemNames();
	const modifiedItemNames = applyGemFilterToData(
		itemNames,
		visibleGems,
		hiddenGems,
		config.gems.enableHighlight,
	);
	writeItemNames(modifiedItemNames);

	// Apply to item-nameaffixes.json (gem exceptions: diamond, emerald, ruby, sapphire)
	const itemNameAffixes = readItemNameAffixes();
	const modifiedAffixes = applyGemFilterToData(
		itemNameAffixes,
		GEM_EXCEPTIONS.filter(code => visibleGems.includes(code)),
		GEM_EXCEPTIONS.filter(code => hiddenGems.includes(code)),
		config.gems.enableHighlight,
	);
	writeItemNameAffixes(modifiedAffixes);
}
