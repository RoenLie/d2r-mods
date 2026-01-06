/**
 * Gem Filter
 *
 * Filters gems by quality and applies highlighting/colors.
 * Handles both item-names.json (most gems) and item-nameaffixes.json (some regular gems).
 */

import { COLOR } from '../constants/colors';
import { GemCodes, GemCodeToColor, GemExceptions } from '../constants/gems';
import { readItemNameAffixes, readItemNames, writeItemNameAffixes, writeItemNames } from '../io/game_files';
import { FilterConfig } from '../io/mod_config';
import { transformAllLanguages, updateAllLanguages } from '../utils/entry_utils';


// Highlight character
const HIGHLIGHT_CHAR = 'o';
const HIGHLIGHT_PADDING = ' ';

// Hidden item name (spaces to maintain tooltip width)
const HIDDEN_NAME = ' '.repeat(20);


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
		GemExceptions.filter(code => visibleGems.includes(code)),
		GemExceptions.filter(code => hiddenGems.includes(code)),
		config.gems.enableHighlight,
	);

	writeItemNameAffixes(modifiedAffixes);
}


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
	const highlightColor = GemCodeToColor[gemCode] || COLOR.WHITE;
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
			...GemCodes.chipped,
			...GemCodes.flawed,
			...GemCodes.normal,
			...GemCodes.flawless,
			...GemCodes.perfect,
		];
	case 'flawless':
		return [
			...GemCodes.flawless,
			...GemCodes.perfect,
		];
	case 'perfect':
		return [ ...GemCodes.perfect ];
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
			...GemCodes.chipped,
			...GemCodes.flawed,
			...GemCodes.normal,
		];
	case 'perfect':
		return [
			...GemCodes.chipped,
			...GemCodes.flawed,
			...GemCodes.normal,
			...GemCodes.flawless,
		];
	case 'hide':
		return [
			...GemCodes.chipped,
			...GemCodes.flawed,
			...GemCodes.normal,
			...GemCodes.flawless,
			...GemCodes.perfect,
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
		// Check if this is a gem we should modify
		if (hiddenGems.includes(entry.Key)) {
			// Hide this gem
			updateAllLanguages(entry, hideGem());
		}
		else if (visibleGems.includes(entry.Key) && enableHighlight) {
			// Apply highlight to this gem
			transformAllLanguages(entry, name => applyHighlight(name, entry.Key));
		}
	}

	return data;
}
