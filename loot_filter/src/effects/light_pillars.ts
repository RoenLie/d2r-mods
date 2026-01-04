/**
 * Light Pillars Effect
 *
 * Adds visual light pillar effects to items when they drop.
 * Works by modifying item JSON files to include particle effects.
 */

import { LightPillarsConfig } from '../io/mod_config';

// ============================================================================
// Constants
// ============================================================================

const BASE_PATH = 'hd\\items\\';
const PATHS = {
	misc:   `${ BASE_PATH }misc\\`,
	weapon: `${ BASE_PATH }weapon\\`,
	get bodyPart() { return `${ this.misc }body_part\\`; },
	get quest() { return `${ this.misc }quest\\`; },
	get scroll() { return `${ this.misc }scroll\\`; },
	get amulet() { return `${ this.misc }amulet\\`; },
	get ring() { return `${ this.misc }ring\\`; },
	get rune() { return `${ this.misc }rune\\`; },
	get gem() { return `${ this.misc }gem\\`; },
	get key() { return `${ this.misc }key\\`; },
	get hammer() { return `${ this.weapon }hammer\\`; },
	get club() { return `${ this.weapon }club\\`; },
	get mace() { return `${ this.weapon }mace\\`; },
	get knife() { return `${ this.weapon }knife\\`; },
	get staff() { return `${ this.weapon }staff\\`; },
};

// VFX paths
const VFX_PATHS = {
	HORADRIC_LIGHT:     'data/hd/vfx/particles/overlays/object/horadric_light/fx_horadric_light.particles',
	PALADIN_FANATICISM: 'data/hd/vfx/particles/overlays/paladin/aura_fanatic/aura_fanatic.particles',
	VALKYRIE_START:     'data/hd/vfx/particles/overlays/common/valkyriestart/valkriestart_overlay.particles',
};

// Light pillar component to inject into items (matches old code structure)
const LIGHT_PILLAR_COMPONENT = {
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

// Rune names (lowercase for file paths)
const RUNES = {
	low:    [ 'el', 'eld', 'tir', 'nef', 'eth', 'ith', 'tal', 'ort', 'thul', 'amn', 'sol', 'shael', 'dol' ],
	lowMid: [ 'ral', 'hel', 'io', 'lum', 'ko', 'fal' ],
	mid:    [ 'lem', 'pul', 'um', 'mal', 'ist', 'gul' ],
	high:   [ 'vex', 'ohm', 'lo', 'sur', 'ber', 'jah', 'cham', 'zod' ],
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

// ============================================================================
// Pure Functions
// ============================================================================

/**
 * Add light pillar component to an item's JSON data
 */
function addLightPillarToItem(itemData: JSONData): JSONData {
	if (typeof itemData !== 'object' || itemData === null || Array.isArray(itemData))
		return itemData;

	// Add entities
	if (Array.isArray(itemData.entities))
		itemData.entities = itemData.entities.concat(LIGHT_PILLAR_COMPONENT.entities as any);

	// Add particle dependency
	if (itemData.dependencies && typeof itemData.dependencies === 'object') {
		if ('particles' in itemData.dependencies && Array.isArray(itemData.dependencies.particles))
			itemData.dependencies.particles.push(LIGHT_PILLAR_COMPONENT.particle);
	}

	return itemData;
}

/**
 * Apply light pillar to a single item file
 */
function applyToFile(path: string, filename: string): void {
	const fullPath = `${ path }${ filename }.json`;
	const itemData = D2RMM.readJson(fullPath);
	const modified = addLightPillarToItem(itemData);
	D2RMM.writeJson(fullPath, modified);
}

/**
 * Apply light pillar to multiple items at a path
 */
function applyToFiles(path: string, filenames: string[]): void {
	filenames.forEach(filename => applyToFile(path, filename));
}

// ============================================================================
// Feature Functions
// ============================================================================

/**
 * Apply light pillars to runes based on tier configuration
 */
function applyToRunes(config: LightPillarsConfig): void {
	const tiers = [
		{ enabled: config.runes.low, runes: RUNES.low },
		{ enabled: config.runes.lowMid, runes: RUNES.lowMid },
		{ enabled: config.runes.mid, runes: RUNES.mid },
		{ enabled: config.runes.high, runes: RUNES.high },
	];

	tiers.forEach(({ enabled, runes }) => {
		if (!enabled)
			return;

		runes.forEach(runeName => {
			applyToFile(PATHS.rune, `${ runeName }_rune`);
		});
	});
}

/**
 * Apply light pillars to jewelry (rings and amulets)
 */
function applyToJewelry(config: LightPillarsConfig): void {
	if (config.jewelry.rings)
		applyToFile(PATHS.ring, 'ring');


	if (config.jewelry.amulets)
		applyToFile(PATHS.amulet, 'amulet');
}

/**
 * Apply light pillars to gems and jewels
 */
function applyToGemsAndJewels(config: LightPillarsConfig): void {
	if (!config.jewelry.gemsJewels)
		return;

	// Determine which gem qualities to apply based on configuration
	// For now, we'll apply to all qualities - in full implementation,
	// this would check filter settings to exclude hidden gems
	// TODO, fix
	const qualities = [
		GEM_QUALITIES.perfect,
		GEM_QUALITIES.flawless,
		GEM_QUALITIES.normal,
		GEM_QUALITIES.flawed,
		GEM_QUALITIES.chipped,
	];

	qualities.forEach(quality => {
		GEM_TYPES.forEach(type => {
			applyToFile(PATHS.gem, `${ quality }${ type }`);
		});
	});
}

/**
 * Apply light pillars to charms
 */
function applyToCharms(config: LightPillarsConfig): void {
	if (!config.jewelry.charms)
		return;

	const charmSizes = [ 'small', 'medium', 'large' ];
	charmSizes.forEach(size => {
		applyToFile(`${ PATHS.misc }charm\\`, `charm_${ size }`);
	});

	// Special case: Mephisto's Soul Stone (if quest items are disabled)
	if (!config.questEndgame.questItems)
		applyToFile(PATHS.quest, 'mephisto_soul_stone');
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
			[ PATHS.quest, 'bark_scroll' ],
			[ PATHS.scroll, 'deciphered_bark_scroll' ],
			// Act 2
			[ PATHS.quest, 'book_of_skill' ],
			[ PATHS.quest, 'scroll_of_horadric_quest_info' ],
			[ PATHS.quest, 'horadric_cube' ],
			[ PATHS.amulet, 'viper_amulet' ],
			// Act 3
			[ PATHS.quest, 'jade_figurine' ],
			[ PATHS.quest, 'gold_bird' ],
			[ PATHS.quest, 'scroll_of_self_resurrect' ],
			[ PATHS.quest, 'lam_esens_tome' ],
			[ PATHS.bodyPart, 'eye' ],
			[ PATHS.bodyPart, 'heart' ],
			[ PATHS.bodyPart, 'brain' ],
			[ PATHS.quest, 'mephisto_soul_stone' ],
		);
	}

	if (config.questEndgame.questWeapons) {
		questItems.push(
			// Act 1
			[ PATHS.club, 'wirts_leg' ],
			[ PATHS.hammer, 'horadric_malus' ],
			// Act 2
			[ PATHS.staff, 'staff_of_the_kings' ],
			[ PATHS.staff, 'horadric_staff' ],
			// Act 3
			[ PATHS.knife, 'gidbinn' ],
			[ PATHS.mace, 'khalim_flail' ],
			[ PATHS.mace, 'super_khalim_flail' ],
			// Act 4
			[ PATHS.hammer, 'hellforge_hammer' ],
		);
	}

	questItems.forEach(([ path, item ]) => {
		applyToFile(path, item);
	});
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

	applyToFiles(PATHS.quest, essences);
}

/**
 * Apply light pillar to Token of Absolution
 */
function applyToToken(config: LightPillarsConfig): void {
	if (!config.questEndgame.tokens)
		return;

	applyToFile(PATHS.quest, 'token_of_absolution');
}

/**
 * Apply light pillars to Pandemonium Keys
 */
function applyToKeys(config: LightPillarsConfig): void {
	if (!config.questEndgame.keys)
		return;

	// Keys use a shared model, so we read once and write to all 3 variants
	const basePath = `${ PATHS.key }mephisto_key`;
	const itemData = D2RMM.readJson(`${ basePath }.json`);
	const modified = addLightPillarToItem(itemData);

	// Write to all 3 key types (mephisto_key, mephisto_key2, mephisto_key3)
	D2RMM.writeJson(`${ basePath }.json`, modified);
	D2RMM.writeJson(`${ basePath }2.json`, modified);
	D2RMM.writeJson(`${ basePath }3.json`, modified);
}

/**
 * Apply light pillars to Uber organs
 */
function applyToOrgans(config: LightPillarsConfig): void {
	if (!config.questEndgame.organs)
		return;

	applyToFile(PATHS.bodyPart, 'horn');

	// Don't duplicate eye/brain if quest items are already enabled
	if (!config.questEndgame.questItems) {
		applyToFile(PATHS.bodyPart, 'eye');
		applyToFile(PATHS.bodyPart, 'brain');
	}
}

/**
 * Apply light pillar to Standard of Heroes
 */
function applyToStandard(config: LightPillarsConfig): void {
	if (!config.questEndgame.standard)
		return;

	applyToFile(PATHS.bodyPart, 'flag');
}

// ============================================================================
// Main Entry Point
// ============================================================================

/**
 * Apply all light pillar modifications.
 *
 * Clear, linear flow showing exactly what gets modified:
 * 1. Check if enabled
 * 2. Apply to each category based on configuration
 */
export function applyLightPillars(config: LightPillarsConfig): void {
	if (!config.enabled)
		return;


	applyToRunes(config);
	applyToJewelry(config);
	applyToGemsAndJewels(config);
	applyToCharms(config);
	applyToQuestItems(config);
	applyToEssences(config);
	applyToToken(config);
	applyToKeys(config);
	applyToOrgans(config);
	applyToStandard(config);
}
