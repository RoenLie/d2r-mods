/**
 * Gem Filter
 *
 * Filters gems by quality and applies highlighting/colors.
 * Handles both item-names.json (most gems) and item-nameaffixes.json (some regular gems).
 */

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

// Default name color (white)
const DEFAULT_NAME_COLOR = 'ÿc0';

// Hidden item name (spaces to maintain tooltip width)
const HIDDEN_NAME = '                    '; // 20 spaces

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Strip redundant color codes from a display name.
 * Removes adjacent duplicate colors.
 * For the specific case of white highlight (ÿc0o ÿc0Name), simplifies to (o Name).
 */
function stripRedundantColors(name: string): string {
	let result = name;

	// Special case: if pattern is "ÿc0o ÿc0Name", simplify to "o Name"
	// This handles white-highlighted gems (Diamond, Skull)
	// Must do this BEFORE removing adjacent duplicates
	if (result.startsWith('ÿc0o ÿc0')) {
		// Remove both the leading "ÿc0" and the "ÿc0" after the space
		result = result.replace(/^ÿc0o ÿc0/, 'o ');
	}

	// Remove adjacent duplicate color codes (e.g., ÿc0ÿc0 -> ÿc0)
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
	const highlightColor = GEM_CODE_TO_COLOR[gemCode] || DEFAULT_NAME_COLOR;
	const nameColor = DEFAULT_NAME_COLOR;

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
	data: JSONData,
	visibleGems: string[],
	hiddenGems: string[],
	enableHighlight: boolean,
): JSONData {
	if (typeof data !== 'object' || data === null)
		return data;

	// Handle both array format (actual JSON) and object format
	const entries = Array.isArray(data) ? data : Object.values(data);

	// Process each entry in the file
	for (const entry of entries) {
		if (typeof entry !== 'object' || entry === null || Array.isArray(entry))
			continue;

		const key = entry['Key'];
		if (typeof key !== 'string')
			continue;

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
