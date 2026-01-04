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
	rows: TSVDataRow[],
	qualityConfig: FilterConfig['equipmentQuality'],
): void {
	for (const row of rows) {
		const indicator = getQualityIndicator(row, qualityConfig.style);
		const tag = formatQualityTag(indicator, qualityConfig.brackets, qualityConfig.placement);

		// Apply tag to the item's name column
		if (row.namestr) {
			row.namestr = qualityConfig.placement === 'prefix'
				? `${ tag } ${ row.namestr }`
				: `${ row.namestr } ${ tag }`;
		}
	}
}

/**
 * Determine the quality indicator (N/X/E or n/x/e) for an item
 */
function getQualityIndicator(
	row: TSVDataRow,
	style: 'lowercase' | 'uppercase' | 'custom',
): string {
	let indicator: string;

	// Determine quality tier
	if (row.code === row.ultracode) {
		// Elite tier
		indicator = style === 'custom' ? 'E' : 'e';
	}
	else if (row.code === row.ubercode) {
		// Exceptional tier
		indicator = style === 'custom' ? 'X' : 'x';
	}
	else {
		// Normal tier
		indicator = style === 'custom' ? 'N' : 'n';
	}

	// Apply case style
	if (style === 'uppercase')
		return indicator.toUpperCase();

	return indicator.toLowerCase();
}

/**
 * Format the quality tag with brackets and placement
 */
function formatQualityTag(
	indicator: string,
	brackets: 'square' | 'round' | 'curly' | 'angle' | 'none',
	placement: 'suffix' | 'prefix' | 'both',
): string {
	const bracketMap: Record<string, [string, string]> = {
		square: [ '[', ']' ],
		round:  [ '(', ')' ],
		curly:  [ '{', '}' ],
		angle:  [ '<', '>' ],
		none:   [ '', '' ],
	};

	const [ open, close ] = bracketMap[brackets] || [ '[', ']' ];

	return `${ open }${ indicator }${ close }`;
}
