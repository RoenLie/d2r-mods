import { COLOR } from '../constants/colors';
import { BuffPotionCodes, ThrowingPotionCodes } from '../constants/potions';
import type { FilterConfig } from '../mod_config';
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

	const itemNames = gameFiles.itemNames.read();
	applyBuffPotionsToData(itemNames, config.buffPotions);
	applyThrowingPotionsToData(itemNames, config.throwingPotions);
	gameFiles.itemNames.write(itemNames);
}

function applyBuffPotionsToData(
	itemNames: FileTypes.ItemNames.File,
	mode: FilterConfig['buffPotions'],
): void {
	if (mode === 'none')
		return;

	const buffPotions = [
		{ key: BuffPotionCodes.ANTIDOTE, name: 'Antidote' },
		{ key: BuffPotionCodes.THAWING,  name: 'Thawing' },
		{ key: BuffPotionCodes.STAMINA,  name: 'Stamina' },
	];

	for (const entry of itemNames) {
		const potion = buffPotions.find(p => p.key ===  entry.Key);
		if (!potion)
			continue;

		if (mode === 'all') {
			// Generate display name: {GREEN}+{WHITE}{name} (green + no-space reset name)
			const displayName = `${ COLOR.GREEN }+${ COLOR.WHITE }${ potion.name }`;
			updateAllLanguages(entry, displayName);
		}
		else if (mode === 'hide') {
			// Hide by setting to spaces
			updateAllLanguages(entry, ' '.repeat(20));
		}
	}
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
		{ key: ThrowingPotionCodes.STRANGLING_GAS, name: 'Gas 1', highlightColor: COLOR.LIGHT_GREEN },
		{ key: ThrowingPotionCodes.CHOKING_GAS,    name: 'Gas 2', highlightColor: COLOR.LIGHT_GREEN },
		{ key: ThrowingPotionCodes.RANCID_GAS,     name: 'Gas 3', highlightColor: COLOR.LIGHT_GREEN },
		{ key: ThrowingPotionCodes.FULMINATING,    name: 'Oil 1', highlightColor: COLOR.ORANGE },
		{ key: ThrowingPotionCodes.EXPLODING,      name: 'Oil 2', highlightColor: COLOR.ORANGE },
		{ key: ThrowingPotionCodes.OIL,            name: 'Oil 3', highlightColor: COLOR.ORANGE },
	];

	for (const entry of itemNames) {
		const potion = throwingPotions.find(p => p.key === entry.Key);
		if (!potion)
			continue;

		if (mode === 'all') {
			// Generate display name: highlightColor + 'o' + space + resetColor + name
			const displayName = `${ potion.highlightColor }o ${ COLOR.WHITE }${ potion.name }`;
			updateAllLanguages(entry, displayName);
		}
		else if (mode === 'hide') {
			// Hide the item by setting name to spaces
			updateAllLanguages(entry, ' '.repeat(20));
		}
	}
}
