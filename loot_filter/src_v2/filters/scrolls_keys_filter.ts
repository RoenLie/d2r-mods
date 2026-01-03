import { readItemNames, writeItemNames } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';

/**
 * Applies scrolls, tomes, keys, and arrows/bolts filtering
 * Simple show/hide logic for common junk items
 */
export function applyScrollsKeysFilter(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const itemNames = readItemNames();
	applyScrollsKeysFilterToData(itemNames, config.scrollsKeys);
	writeItemNames(itemNames);
}

/**
 * Apply scrolls/keys/arrows filtering to item names data
 */
function applyScrollsKeysFilterToData(
	data: JSONData,
	scrollsKeysConfig: FilterConfig['scrollsKeys'],
): void {
	if (typeof data !== 'object' || Array.isArray(data))
		return;

	// Process each entry in the file
	Object.keys(data).forEach(index => {
		const entry = data[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry['Key'];
		if (typeof key !== 'string')
			return;

		// Scrolls and Tomes
		if (key === 'isc' || key === 'tsc' || key === 'ibk' || key === 'tbk')
			applyScrollsTomesFilter(entry, scrollsKeysConfig.scrollsTomes);

		// Arrows and Bolts (quivers)
		if (key === 'aqv' || key === 'cqv')
			applyArrowsBoltsFilter(entry, key, scrollsKeysConfig.arrowsBolts);

		// Keys
		if (key === 'key')
			applyKeysFilter(entry, scrollsKeysConfig.keys);
	});
}

/**
 * Apply scrolls/tomes filter
 * Modes: disabled, all (show with highlight), hide
 */
function applyScrollsTomesFilter(
	entry: Record<string, any>,
	mode: string,
): void {
	switch (mode) {
	case 'disabled':
		// No change
		break;
	case 'all':
		// Show with green highlight
		if (typeof entry['enUS'] === 'string' && entry['enUS'].trim() !== '') {
			const currentName = entry['enUS'];
			// Add green circle highlight
			entry['enUS'] = `ÿc2oÿc0  ${ currentName }`;
		}

		break;
	case 'hide':
		// Hide by clearing name
		entry['enUS'] = '';

		break;
	}
}

/**
 * Apply arrows/bolts filter
 * Modes: disabled, all (show both), arw (arrows only), blt (bolts only), hide
 */
function applyArrowsBoltsFilter(
	entry: Record<string, any>,
	key: string,
	mode: string,
): void {
	const isArrow = key === 'aqv';
	const isBolt = key === 'cqv';

	switch (mode) {
	case 'disabled':
		// No change
		break;
	case 'all':
		// Show with gray highlight
		if (typeof entry['enUS'] === 'string' && entry['enUS'].trim() !== '') {
			const currentName = entry['enUS'];
			entry['enUS'] = `ÿc5oÿc0  ${ currentName }`;
		}

		break;
	case 'arw':
		if (isArrow) {
			// Show arrows with highlight
			if (typeof entry['enUS'] === 'string' && entry['enUS'].trim() !== '') {
				const currentName = entry['enUS'];
				entry['enUS'] = `ÿc5oÿc0  ${ currentName }`;
			}
		}
		else if (isBolt) {
			// Hide bolts
			entry['enUS'] = '';
		}

		break;
	case 'blt':
		if (isBolt) {
			// Show bolts with highlight
			if (typeof entry['enUS'] === 'string' && entry['enUS'].trim() !== '') {
				const currentName = entry['enUS'];
				entry['enUS'] = `ÿc5oÿc0  ${ currentName }`;
			}
		}
		else if (isArrow) {
			// Hide arrows
			entry['enUS'] = '';
		}

		break;
	case 'hide':
		// Hide both
		entry['enUS'] = '';

		break;
	}
}

/**
 * Apply keys filter
 * Modes: disabled, hide
 */
function applyKeysFilter(
	entry: Record<string, any>,
	mode: string,
): void {
	if (mode === 'hide')
		entry['enUS'] = '';
}
