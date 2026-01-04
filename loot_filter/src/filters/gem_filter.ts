/**
 * Gem Filter
 *
 * Filters gems by quality and applies highlighting/colors.
 * Handles both item-names.json (most gems) and item-nameaffixes.json (some regular gems).
 */

import { COLOR, GEM_COLOR } from '../constants/colors.ts';
import { readItemNameAffixes, readItemNames, writeItemNameAffixes, writeItemNames } from '../io/game_files';
import { FilterConfig } from '../io/mod_config';
import { transformAllLanguages, updateAllLanguages } from '../utils/entry_utils';

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
};

// Regular gems in item-nameaffixes.json (due to naming conflicts)
const GEM_EXCEPTIONS = [
	'gsw', // Diamond
	'gsg', // Emerald
	'gsr', // Ruby
	'gsb', // Sapphire
];

// Map gem codes to their colors
const GEM_CODE_TO_COLOR: Record<string, string> = {
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

// Highlight character
const HIGHLIGHT_CHAR = 'o';
const HIGHLIGHT_PADDING = ' ';

// Hidden item name (spaces to maintain tooltip width)
const HIDDEN_NAME = '                    '; // 20 spaces

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Strip redundant color codes from a display name.
 * Removes adjacent duplicate colors.
 * For the specific case of white highlight (o Name), simplifies redundant patterns.
 */
function stripRedundantColors(name: string): string {
	let result = name;

	// Special case: if pattern is "{WHITE}o {WHITE}Name", simplify to "o Name"
	// This handles white-highlighted gems (Diamond, Skull)
	// Must do this BEFORE removing adjacent duplicates
	if (result.startsWith(`${ COLOR.WHITE }o ${ COLOR.WHITE }`)) {
		// Remove both the leading color and the color after the space
		result = result.replace(new RegExp(`^${ COLOR.WHITE }o ${ COLOR.WHITE }`), 'o ');
	}

	// Remove adjacent duplicate color codes (e.g., duplicate color codes)
	let prevResult = '';
	while (result !== prevResult) {
		prevResult = result;
		// Match any color code followed by the same color code
		result = result.replace(/(ÿc.)\1/g, '$1');
	}

	return result;
}

/**
 * Apply highlight pattern to a gem name
 */
function applyHighlight(name: string, gemCode: string): string {
	const highlightColor = GEM_CODE_TO_COLOR[gemCode] || COLOR.WHITE;
	const nameColor = COLOR.WHITE;

	// Pattern: {highlightColor}{o}{space}{nameColor}{name}
	// Then strip redundant colors (removes leading white, adjacent duplicates)
	const raw = `${ highlightColor }${ HIGHLIGHT_CHAR }${ HIGHLIGHT_PADDING }${ nameColor }${ name }`;

	return stripRedundantColors(raw);
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
	data: FileTypes.ItemNames.File,
	visibleGems: string[],
	hiddenGems: string[],
	enableHighlight: boolean,
): FileTypes.ItemNames.File {
	for (const entry of data) {
		const key = entry['Key'];
		// Check if this is a gem we should modify
		if (hiddenGems.includes(key)) {
			// Hide this gem
			updateAllLanguages(entry, hideGem());
		}
		else if (visibleGems.includes(key) && enableHighlight) {
			// Apply highlight to this gem
			transformAllLanguages(entry, name => applyHighlight(name, key));
		}
	}

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
