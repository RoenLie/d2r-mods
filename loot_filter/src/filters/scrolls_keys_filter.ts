import { COLOR } from '../constants/colors';
import { readItemNames, writeItemNames } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';
import { transformAllLanguages, updateAllLanguages } from '../utils/entry_utils';


/**
 * Applies scrolls, tomes, keys, arrows/bolts, and buff/throwing potions filtering
 * Simple show/hide logic for common junk items
 */
export function applyScrollsKeysFilter(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const itemNames = readItemNames();
	applyScrollsKeysFilterToData(itemNames, config);
	writeItemNames(itemNames);
}

/**
 * Apply scrolls/keys/arrows/potions filtering to item names data
 */
function applyScrollsKeysFilterToData(
	data: FileTypes.ItemNames.File,
	config: FilterConfig,
): void {
	for (const entry of data) {
		const key = entry['Key'];
		if (typeof key !== 'string')
			continue;

		// Scrolls and Tomes
		if (key === 'isc' || key === 'tsc' || key === 'ibk' || key === 'tbk')
			applyScrollsTomesFilter(entry, config.scrollsKeys.scrollsTomes);

		// Note: Buff Potions and Throwing Potions are handled by buff_throwing_potions_filter.ts

		// Arrows and Bolts (quivers)
		if (key === 'aqv' || key === 'cqv')
			applyArrowsBoltsFilter(entry, key, config.scrollsKeys.arrowsBolts);

		// Keys
		if (key === 'key')
			applyKeysFilter(entry, config.scrollsKeys.keys);
	}
}

/**
 * Apply scrolls/tomes filter
 * Modes: none (no change), all (show with shortened names and colors), hide
 */
function applyScrollsTomesFilter(
	entry: FileTypes.ItemNames.Entry,
	mode: string,
): void {
	const key = entry['Key'];

	switch (mode) {
	case 'none':
		// No change
		break;
	case 'all': {
		// Shorten names and add color highlights
		let newName = '';
		let color = '';

		if (key === 'tsc') {
			// Scroll of Town Portal
			newName = 'TP';
			color = COLOR.GREEN;
		}
		else if (key === 'tbk') {
			// Tome of Town Portal
			newName = 'TP Tome';
			color = COLOR.LIGHT_GREEN;
		}
		else if (key === 'isc') {
			// Scroll of Identify
			newName = 'ID';
			color = COLOR.GREEN;
		}
		else if (key === 'ibk') {
			// Tome of Identify
			newName = 'ID Tome';
			color = COLOR.LIGHT_GREEN;
		}

		if (newName && color) {
			// Set to the same value for all languages (these are shortened codes)
			const displayName = `${ color }+${ COLOR.WHITE }${ newName }`;
			updateAllLanguages(entry, displayName);
		}

		break;
	}
	case 'hide':
		// Hide by clearing name
		updateAllLanguages(entry, '');

		break;
	}
}

/**
 * Apply arrows/bolts filter
 * Modes: disabled, all (show both), arw (arrows only), blt (bolts only), hide
 */
function applyArrowsBoltsFilter(
	entry: FileTypes.ItemNames.Entry,
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
		// Show with gray highlight - pattern: {color}o {resetColor}{name}
		transformAllLanguages(entry, currentName => `${ COLOR.GRAY }o ${ COLOR.WHITE }${ currentName }`);
		break;
	case 'arw':
		if (isArrow) {
			// Show arrows with highlight
			transformAllLanguages(entry, currentName => `${ COLOR.GRAY }o ${ COLOR.WHITE }${ currentName }`);
		}
		else if (isBolt) {
			// Hide bolts
			updateAllLanguages(entry, '');
		}

		break;
	case 'blt':
		if (isBolt) {
			// Show bolts with highlight
			transformAllLanguages(entry, currentName => `${ COLOR.GRAY }o ${ COLOR.WHITE }${ currentName }`);
		}
		else if (isArrow) {
			// Hide arrows
			updateAllLanguages(entry, '');
		}

		break;
	case 'hide':
		// Hide both
		updateAllLanguages(entry, '');

		break;
	}
}

/**
 * Apply keys filter
 * Modes: disabled, hide
 */
function applyKeysFilter(
	entry: FileTypes.ItemNames.Entry,
	mode: string,
): void {
	if (mode === 'hide')
		updateAllLanguages(entry, '');
}
