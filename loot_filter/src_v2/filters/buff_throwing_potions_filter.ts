import { readItemNames, writeItemNames } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';

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
	if (mode === 'disabled')
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

		const key = entry.code as string;
		if (!potionKeys.includes(key))
			return;

		const potion = buffPotions.find(p => p.key === key);
		if (!potion)
			return;

		if (mode === 'all') {
			// Show with highlight (green +)
			entry['*ID'] = potion.name;
			entry['*eol'] = 0;
			entry['ÿc2+'] = ''; // Green + highlight
		}
		else if (mode === 'hide') {
			// Hide the item
			entry['*eol'] = 1;
		}
	});
}

function applyThrowingPotionsToData(
	itemNames: JSONData,
	mode: FilterConfig['throwingPotions'],
): void {
	if (mode === 'disabled')
		return;

	const throwingPotions = [
		{ key: 'gpl', name: 'Gas 1', highlight: 'ÿc:o' }, // Strangling Gas Potion (dark green)
		{ key: 'gpm', name: 'Gas 2', highlight: 'ÿc:o' }, // Choking Gas Potion (dark green)
		{ key: 'gps', name: 'Gas 3', highlight: 'ÿc:o' }, // Rancid Gas Potion (dark green)
		{ key: 'opl', name: 'Oil 1', highlight: 'ÿc8o' }, // Fulminating Potion (orange)
		{ key: 'opm', name: 'Oil 2', highlight: 'ÿc8o' }, // Exploding Potion (orange)
		{ key: 'ops', name: 'Oil 3', highlight: 'ÿc8o' }, // Oil Potion (orange)
	];

	const potionKeys = throwingPotions.map(p => p.key);

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry.code as string;
		if (!potionKeys.includes(key))
			return;

		const potion = throwingPotions.find(p => p.key === key);
		if (!potion)
			return;

		if (mode === 'all') {
			// Show with highlight
			entry['*ID'] = potion.name;
			entry['*eol'] = 0;
			entry[` ${ potion.highlight }`] = ''; // Highlight column (padded)
		}
		else if (mode === 'hide') {
			// Hide the item
			entry['*eol'] = 1;
		}
	});
}
