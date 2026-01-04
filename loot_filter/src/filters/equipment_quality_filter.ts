import { readArmor, readWeapons } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';


/**
 * Equipment Quality Filter
 *
 * Adds quality tags to equipment items based on their tier:
 * - Normal (N)
 * - Exceptional (X)
 * - Elite (E)
 *
 * This helps players quickly identify equipment tiers at a glance.
 * Tags can be placed as prefix or suffix with configurable brackets.
 */

export function applyEquipmentQualityFilter(config: FilterConfig): void {
	if (!config.enabled || !config.equipmentQuality.enabled)
		return;

	const armor = readArmor();
	const weapons = readWeapons();

	// Filter for items that have quality tiers (have ubercode and ultracode)
	// This excludes quest items and throwing potions
	const armorWithQuality = armor.rows.filter(row => row.ubercode && row.ultracode);
	const weaponsWithQuality = weapons.rows.filter(row => row.ubercode && row.ultracode);

	applyQualityTags(armorWithQuality, config.equipmentQuality);
	applyQualityTags(weaponsWithQuality, config.equipmentQuality);
}

/**
 * Apply quality tags to equipment rows
 */
function applyQualityTags(
	rows: FileTypes.Armor.File['rows'] | FileTypes.Weapons.File['rows'],
	qualityConfig: FilterConfig['equipmentQuality'],
): void {
	for (const row of rows) {
		const indicator = getQualityIndicator(row, qualityConfig);

		// Apply tag to the item's name column
		if (row.namestr) {
			row.namestr = formatQualityTag(
				indicator,
				qualityConfig.brackets,
				qualityConfig.placement,
				row.namestr,
			);
		}
	}
}

/**
 * Determine the quality indicator (N/X/E or n/x/e) for an item
 */
function getQualityIndicator(
	row: FileTypes.Armor.File['rows'][number] | FileTypes.Weapons.File['rows'][number],
	qualityConfig: FilterConfig['equipmentQuality'],
): string {
	// For custom style, return user-defined strings
	if (qualityConfig.style === 'custom') {
		if (row.code === row.ultracode)
			return qualityConfig.customElite;
		else if (row.code === row.ubercode)
			return qualityConfig.customExceptional;
		else
			return qualityConfig.customNormal;
	}

	// Determine base lowercase indicator
	let indicator: 'n' | 'x' | 'e';
	if (row.code === row.ultracode)
		indicator = 'e';
	else if (row.code === row.ubercode)
		indicator = 'x';
	else
		indicator = 'n';

	// Apply case style
	if (qualityConfig.style === 'uppercase')
		return indicator.toUpperCase();

	return indicator;
}

/**
 * Format the quality tag with brackets and placement
 */
function formatQualityTag(
	indicator: string,
	brackets: FilterConfig['equipmentQuality']['brackets'],
	placement: FilterConfig['equipmentQuality']['placement'],
	displayName: string,
): string {
	const bracketMap: Record<string, [string, string]> = {
		square: [ '[', ']' ],
		round:  [ '(', ')' ],
		curly:  [ '{', '}' ],
		angle:  [ '<', '>' ],
		none:   [ '', '' ],
	};

	const [ open, close ] = bracketMap[brackets] || [ '[', ']' ];
	const tag = `${ open }${ indicator }${ close }`;

	if (placement === 'prefix')
		return `${ tag } ${ displayName }`;
	else if (placement === 'both')
		return `${ tag } ${ displayName } ${ tag }`;
	else
		return `${ displayName } ${ tag }`;
}
