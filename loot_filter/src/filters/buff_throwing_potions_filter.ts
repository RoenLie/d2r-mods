import { COLOR } from '../constants/colors';
import { readItemNames, writeItemNames } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';
import { updateAllLanguages } from '../utils/entry_utils';

/**
 * Buff/Throwing Potions Filter
 *
 * Buff Potions: Antidote, Thawing, Stamina
 * - disabled: no changes
 * - all: show with highlights
 * - hide: hide items
 *
 * Throwing Potions: Gas and Oil
 * - disabled: no changes
 * - all: show with highlights
 * - hide: hide items
 */

export function applyBuffThrowingPotionsFilter(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const itemNames = readItemNames();
	applyBuffPotionsToData(itemNames, config.buffPotions);
	applyThrowingPotionsToData(itemNames, config.throwingPotions);
	writeItemNames(itemNames);
}

function applyBuffPotionsToData(
	itemNames: FileTypes.ItemNames.File,
	mode: FilterConfig['buffPotions'],
): void {
	if (mode === 'none')
		return;

	const buffPotions = [
		{ key: 'yps', name: 'Antidote' }, // Antidote Potion
		{ key: 'wms', name: 'Thawing' },  // Thawing Potion
		{ key: 'vps', name: 'Stamina' },  // Stamina Potion
	];

	const potionKeys = buffPotions.map(p => p.key);

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry.Key as string;
		if (!potionKeys.includes(key))
			return;

		const potion = buffPotions.find(p => p.key === key);
		if (!potion)
			return;

		if (mode === 'all') {
			// Generate display name: {GREEN}+{WHITE}{name} (green + no-space reset name)
			const displayName = `${ COLOR.GREEN }+${ COLOR.WHITE }${ potion.name }`;
			updateAllLanguages(entry, displayName);
		}
		else if (mode === 'hide') {
			// Hide by setting to spaces
			updateAllLanguages(entry, ' '.repeat(20));
		}
	});
}

function applyThrowingPotionsToData(
	itemNames: FileTypes.ItemNames.File,
	mode: FilterConfig['throwingPotions'],
): void {
	if (mode === 'none')
		return;

	// Throwing potions with their highlight colors
	// Format: highlightColor + 'o' + space + resetColor + name
	const throwingPotions = [
		{ key: 'gpl', name: 'Gas 1', highlightColor: COLOR.LIGHT_GREEN }, // Strangling Gas Potion
		{ key: 'gpm', name: 'Gas 2', highlightColor: COLOR.LIGHT_GREEN }, // Choking Gas Potion
		{ key: 'gps', name: 'Gas 3', highlightColor: COLOR.LIGHT_GREEN }, // Rancid Gas Potion
		{ key: 'opl', name: 'Oil 1', highlightColor: COLOR.ORANGE },      // Fulminating Potion
		{ key: 'opm', name: 'Oil 2', highlightColor: COLOR.ORANGE },      // Exploding Potion
		{ key: 'ops', name: 'Oil 3', highlightColor: COLOR.ORANGE },      // Oil Potion
	];

	const potionKeys = throwingPotions.map(p => p.key);

	itemNames.forEach(entry => {
		const key = entry.Key;
		if (!potionKeys.includes(key))
			return;

		const potion = throwingPotions.find(p => p.key === key);
		if (!potion)
			return;

		if (mode === 'all') {
			// Generate display name: highlightColor + 'o' + space + resetColor + name
			const displayName = `${ potion.highlightColor }o ${ COLOR.WHITE }${ potion.name }`;
			updateAllLanguages(entry, displayName);
		}
		else if (mode === 'hide') {
			// Hide the item by setting name to spaces
			updateAllLanguages(entry, ' '.repeat(20));
		}
	});
}
