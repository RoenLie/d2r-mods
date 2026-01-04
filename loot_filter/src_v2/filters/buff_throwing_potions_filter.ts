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
	itemNames: JSONData,
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
			// Generate display name: ÿc2+ÿc0{name} (green + no-space reset name)
			const displayName = `ÿc2+ÿc0${ potion.name }`;
			updateAllLanguages(entry, displayName);
		}
		else if (mode === 'hide') {
			// Hide by setting to spaces
			updateAllLanguages(entry, '                    ');
		}
	});
}

function applyThrowingPotionsToData(
	itemNames: JSONData,
	mode: FilterConfig['throwingPotions'],
): void {
	if (mode === 'none')
		return;

	// Throwing potions with their highlight colors
	// Format: highlightColor + 'o' + space + resetColor + name
	const throwingPotions = [
		{ key: 'gpl', name: 'Gas 1', highlightColor: 'ÿcA' }, // Strangling Gas Potion (GREEN/ÿcA)
		{ key: 'gpm', name: 'Gas 2', highlightColor: 'ÿcA' }, // Choking Gas Potion (GREEN/ÿcA)
		{ key: 'gps', name: 'Gas 3', highlightColor: 'ÿcA' }, // Rancid Gas Potion (GREEN/ÿcA)
		{ key: 'opl', name: 'Oil 1', highlightColor: 'ÿc8' }, // Fulminating Potion (orange)
		{ key: 'opm', name: 'Oil 2', highlightColor: 'ÿc8' }, // Exploding Potion (orange)
		{ key: 'ops', name: 'Oil 3', highlightColor: 'ÿc8' }, // Oil Potion (orange)
	];

	const potionKeys = throwingPotions.map(p => p.key);

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry.Key as string;
		if (!potionKeys.includes(key))
			return;

		const potion = throwingPotions.find(p => p.key === key);
		if (!potion)
			return;

		if (mode === 'all') {
			// Generate display name: highlightColor + 'o' + space + resetColor + name
			const displayName = `${ potion.highlightColor }o ÿc0${ potion.name }`;
			updateAllLanguages(entry, displayName);
		}
		else if (mode === 'hide') {
			// Hide the item by setting name to spaces
			updateAllLanguages(entry, '                    ');
		}
	});
}
