import { readItemNameAffixes, writeItemNameAffixes } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';

/**
 * Applies gold filtering - customizes the "Gold" suffix text and tooltip colors
 * Modifies item-nameaffixes.json
 */
export function applyGoldFilter(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const itemAffixes = readItemNameAffixes();
	applyGoldFilterToData(itemAffixes, config.gold);
	writeItemNameAffixes(itemAffixes);
}

/**
 * Apply gold filtering to item name affixes data
 */
function applyGoldFilterToData(
	data: JSONData,
	goldConfig: FilterConfig['gold'],
): void {
	if (typeof data !== 'object' || Array.isArray(data))
		return;

	// Find the gold affix entry (key: 'gld')
	Object.keys(data).forEach(index => {
		const entry = data[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry['Key'];
		if (key !== 'gld')
			return;

		// Apply gold suffix customization
		const goldText = getGoldText(goldConfig);
		if (goldText !== null)
			entry['enUS'] = goldText;
	});
}

/**
 * Get the gold suffix text based on configuration
 */
function getGoldText(goldConfig: FilterConfig['gold']): string | null {
	const color = getGoldColor(goldConfig.tooltipColors);

	switch (goldConfig.suffix) {
	case 'disabled':
		// Default: "1234 Gold"
		if (color != null)
			return `${ color }Gold`;

		return null; // No change needed
	case 'g':
		// Shortened: "1234 G"
		return `${ color ?? '' }G`;
	case 'hide':
		// Hidden: "1234" (no suffix)
		return '';
	default:
		return null;
	}
}

/**
 * Get the gold color code based on tooltip color setting
 */
function getGoldColor(tooltipColors: string): string | null {
	switch (tooltipColors) {
	case 'wg':
		// White stacks, Gold piles
		return 'ÿc4'; // Gold color
	case 'gw':
		// Gold stacks, White piles
		return 'ÿc0'; // White color
	case 'disabled':
	default:
		return null; // No color change
	}
}
