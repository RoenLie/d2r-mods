/**
 * Light Pillars Effect
 *
 * Adds visual light pillar effects to items when they drop.
 * Works by modifying item JSON files to include particle effects.
 */

import { HIGH_RUNES, LOW_MID_RUNES, LOW_RUNES, MID_RUNES } from '../constants/runes';
import { HD_ITEM_PATHS, readHdItem, VFX_PATHS, writeHdItem } from '../io/game_files';
import type { FilterConfig, LightPillarsConfig } from '../io/mod_config';


// Light pillar component to inject into items (matches old code structure)
const LIGHT_PILLAR_COMPONENT: {
	particle: FileTypes.HDItem.Dependency;
	entities: FileTypes.HDItem.Entity[];
} = {
	particle: {
		path: VFX_PATHS.HORADRIC_LIGHT,
	},
	entities: [
		{
			type:       'Entity',
			name:       'droplight',
			id:         9999996974,
			components: [
				{
					type:                'TransformDefinitionComponent',
					name:                'component_transform1',
					position:            { x: 0, y: 0, z: 0 },
					orientation:         { x: 0, y: 0, z: 0, w: 1 },
					scale:               { x: 1, y: 1, z: 1 },
					inheritOnlyPosition: false,
				},
				{
					type:              'VfxDefinitionComponent',
					name:              'entity_vfx_filthyStolenMod',
					filename:          VFX_PATHS.HORADRIC_LIGHT,
					hardKillOnDestroy: false,
				},
			],
		},
		{
			type:       'Entity',
			name:       'entity_root',
			id:         1079187010,
			components: [
				{
					type:              'VfxDefinitionComponent',
					name:              'entity_root_VfxDefinition',
					filename:          VFX_PATHS.PALADIN_FANATICISM,
					hardKillOnDestroy: false,
				},
			],
		},
		{
			type:       'Entity',
			name:       'droplight',
			id:         9999996974,
			components: [
				{
					type:                'TransformDefinitionComponent',
					name:                'component_transform1',
					position:            { x: 0, y: 0, z: 0 },
					orientation:         { x: 0, y: 0, z: 0, w: 1 },
					scale:               { x: 1, y: 1, z: 1 },
					inheritOnlyPosition: false,
				},
				{
					type:              'VfxDefinitionComponent',
					name:              'entity_vfx_filthyStolenMod',
					filename:          VFX_PATHS.VALKYRIE_START,
					hardKillOnDestroy: false,
				},
			],
		},
	],
};

// Gem types (note: sapphire is intentionally misspelled "saphire" in D2R assets)
const GEM_TYPES = [ 'amethyst', 'diamond', 'emerald', 'ruby', 'saphire', 'topaz', 'skull' ];
const GEM_QUALITIES = {
	chipped:  'chipped_',
	flawed:   'flawed_',
	normal:   '',
	flawless: 'flawless_',
	perfect:  'perfect_',
};


/**
 * Apply all light pillar modifications.
 *
 * Clear, linear flow showing exactly what gets modified:
 * 1. Check if enabled
 * 2. Apply to each category based on configuration
 */
export function applyLightPillars(config: LightPillarsConfig, filterConfig: FilterConfig): void {
	if (!config.enabled)
		return;

	applyToRunes(config);
	applyToJewelry(config);
	applyToGemsAndJewels(config, filterConfig);
	applyToCharms(config);
	applyToQuestItems(config);
	applyToEssences(config);
	applyToToken(config);
	applyToKeys(config);
	applyToOrgans(config);
	applyToStandard(config);
}


/**
 * Add light pillar component to an item's JSON data
 */
function addLightPillarToItem(itemData: FileTypes.HDItem.File): FileTypes.HDItem.File {
	itemData.entities ??= [];
	itemData.entities.push(...LIGHT_PILLAR_COMPONENT.entities);

	itemData.dependencies ??= {} as FileTypes.HDItem.Dependencies;
	itemData.dependencies.particles ??= [];
	itemData.dependencies.particles.push(LIGHT_PILLAR_COMPONENT.particle);

	return itemData;
}

/**
 * Apply light pillar to a single item file
 */
function applyToFile(path: string, filename: string): void {
	const fullPath = `${ path }${ filename }.json`;
	const itemData = readHdItem(fullPath);
	const modified = addLightPillarToItem(itemData);
	writeHdItem(fullPath, modified);
}

/**
 * Apply light pillar to multiple items at a path
 */
function applyToFiles(path: string, filenames: string[]): void {
	filenames.forEach(filename => applyToFile(path, filename));
}


/**
 * Apply light pillars to runes based on tier configuration
 */
function applyToRunes(config: LightPillarsConfig): void {
	const tiers = [
		{ enabled: config.runes.low,    runes: LOW_RUNES },
		{ enabled: config.runes.lowMid, runes: LOW_MID_RUNES },
		{ enabled: config.runes.mid,    runes: MID_RUNES },
		{ enabled: config.runes.high,   runes: HIGH_RUNES },
	];

	for (const { enabled, runes } of tiers) {
		if (!enabled)
			continue;

		for (const { name } of runes)
			applyToFile(HD_ITEM_PATHS.RUNE, `${ name.toLowerCase() }_rune`);
	}
}

/**
 * Apply light pillars to jewelry (rings and amulets)
 */
function applyToJewelry(config: LightPillarsConfig): void {
	if (config.jewelry.rings)
		applyToFile(HD_ITEM_PATHS.RING, 'ring');

	if (config.jewelry.amulets)
		applyToFile(HD_ITEM_PATHS.AMULET, 'amulet');
}

/**
 * Apply light pillars to gems and jewels
 */
function applyToGemsAndJewels(config: LightPillarsConfig, filterConfig: FilterConfig): void {
	if (!config.jewelry.gemsJewels)
		return;

	// Don't apply light pillars if gems are completely hidden
	const shouldExcludeForHidden
		=  config.excludeForHidden
		&& filterConfig.gems.mode === 'hide';

	if (shouldExcludeForHidden)
		return;

	// Determine which gem qualities to apply based on filter settings
	const qualities = getGemQualitiesForLightPillars(
		filterConfig.gems.mode,
		config.excludeForHidden,
	);

	for (const quality of qualities) {
		for (const type of GEM_TYPES)
			applyToFile(HD_ITEM_PATHS.GEM, `${ quality }${ type }`);
	}
}

/**
 * Get gem quality prefixes based on filter mode
 */
function getGemQualitiesForLightPillars(
	gemMode: FilterConfig['gems']['mode'],
	excludeForHidden: boolean,
): string[] {
	const qualities = [ GEM_QUALITIES.perfect ];

	// If filtering to perfect only, return just perfect
	if (gemMode === 'perfect' && excludeForHidden)
		return qualities;

	// Add flawless
	qualities.push(GEM_QUALITIES.flawless);

	// If filtering to flawless+, return perfect and flawless
	if (gemMode === 'flawless' && excludeForHidden)
		return qualities;

	// Otherwise include all qualities
	qualities.push(
		GEM_QUALITIES.normal,
		GEM_QUALITIES.flawed,
		GEM_QUALITIES.chipped,
	);

	return qualities;
}

/**
 * Apply light pillars to charms
 */
function applyToCharms(config: LightPillarsConfig): void {
	if (!config.jewelry.charms)
		return;

	const charmSizes = [ 'small', 'medium', 'large' ];
	for (const size of charmSizes)
		applyToFile(HD_ITEM_PATHS.CHARM, `charm_${ size }`);

	// Special case: Mephisto's Soul Stone (if quest items are disabled)
	if (!config.questEndgame.questItems)
		applyToFile(HD_ITEM_PATHS.QUEST, 'mephisto_soul_stone');
}

/**
 * Apply light pillars to quest items
 */
function applyToQuestItems(config: LightPillarsConfig): void {
	if (!config.questEndgame.questItems && !config.questEndgame.questWeapons)
		return;

	const questItems: [string, string][] = [];

	if (config.questEndgame.questItems) {
		questItems.push(
			// Act 1
			[ HD_ITEM_PATHS.QUEST, 'bark_scroll' ],
			[ HD_ITEM_PATHS.SCROLL, 'deciphered_bark_scroll' ],
			// Act 2
			[ HD_ITEM_PATHS.QUEST, 'book_of_skill' ],
			[ HD_ITEM_PATHS.QUEST, 'scroll_of_horadric_quest_info' ],
			[ HD_ITEM_PATHS.QUEST, 'horadric_cube' ],
			[ HD_ITEM_PATHS.AMULET, 'viper_amulet' ],
			// Act 3
			[ HD_ITEM_PATHS.QUEST, 'jade_figurine' ],
			[ HD_ITEM_PATHS.QUEST, 'gold_bird' ],
			[ HD_ITEM_PATHS.QUEST, 'scroll_of_self_resurrect' ],
			[ HD_ITEM_PATHS.QUEST, 'lam_esens_tome' ],
			[ HD_ITEM_PATHS.BODY_PART, 'eye' ],
			[ HD_ITEM_PATHS.BODY_PART, 'heart' ],
			[ HD_ITEM_PATHS.BODY_PART, 'brain' ],
			[ HD_ITEM_PATHS.QUEST, 'mephisto_soul_stone' ],
		);
	}

	if (config.questEndgame.questWeapons) {
		questItems.push(
			// Act 1
			[ HD_ITEM_PATHS.CLUB, 'wirts_leg' ],
			[ HD_ITEM_PATHS.HAMMER, 'horadric_malus' ],
			// Act 2
			[ HD_ITEM_PATHS.STAFF, 'staff_of_the_kings' ],
			[ HD_ITEM_PATHS.STAFF, 'horadric_staff' ],
			// Act 3
			[ HD_ITEM_PATHS.KNIFE, 'gidbinn' ],
			[ HD_ITEM_PATHS.MACE, 'khalim_flail' ],
			[ HD_ITEM_PATHS.MACE, 'super_khalim_flail' ],
			// Act 4
			[ HD_ITEM_PATHS.HAMMER, 'hellforge_hammer' ],
		);
	}

	for (const [ path, item ] of questItems)
		applyToFile(path, item);
}

/**
 * Apply light pillars to essences
 */
function applyToEssences(config: LightPillarsConfig): void {
	if (!config.questEndgame.essences)
		return;

	const essences = [
		'burning_essence_of_terror',
		'charged_essense_of_hatred', // note: typo in game files
		'festering_essence_of_destruction',
		'twisted_essence_of_suffering',
	];

	applyToFiles(HD_ITEM_PATHS.QUEST, essences);
}

/**
 * Apply light pillar to Token of Absolution
 */
function applyToToken(config: LightPillarsConfig): void {
	if (!config.questEndgame.tokens)
		return;

	applyToFile(HD_ITEM_PATHS.QUEST, 'token_of_absolution');
}

/**
 * Apply light pillars to Pandemonium Keys
 */
function applyToKeys(config: LightPillarsConfig): void {
	if (!config.questEndgame.keys)
		return;

	// Keys use a shared model, so we read once and write to all 3 variants
	const basePath = `${ HD_ITEM_PATHS.KEY }mephisto_key`;
	const itemData = readHdItem(`${ basePath }.json`);
	const modified = addLightPillarToItem(itemData);

	// Write to all 3 key types (mephisto_key, mephisto_key2, mephisto_key3)
	writeHdItem(`${ basePath }.json`, modified);
	writeHdItem(`${ basePath }2.json`, modified);
	writeHdItem(`${ basePath }3.json`, modified);
}

/**
 * Apply light pillars to Uber organs
 */
function applyToOrgans(config: LightPillarsConfig): void {
	if (!config.questEndgame.organs)
		return;

	applyToFile(HD_ITEM_PATHS.BODY_PART, 'horn');

	// Don't duplicate eye/brain if quest items are already enabled
	if (!config.questEndgame.questItems) {
		applyToFile(HD_ITEM_PATHS.BODY_PART, 'eye');
		applyToFile(HD_ITEM_PATHS.BODY_PART, 'brain');
	}
}

/**
 * Apply light pillar to Standard of Heroes
 */
function applyToStandard(config: LightPillarsConfig): void {
	if (!config.questEndgame.standard)
		return;

	applyToFile(HD_ITEM_PATHS.BODY_PART, 'flag');
}
