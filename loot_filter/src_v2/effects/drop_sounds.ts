/**
 * Drop Sounds Effect
 *
 * Applies custom drop sounds to items based on configuration.
 * This is a pure functional implementation - no classes, clear data flow.
 */

import { readMisc, readSounds, readWeapons, writeMisc, writeSounds, writeWeapons } from '../io/game_files';
import { DropSoundsConfig } from '../io/mod_config';
import { EndgameItemIds, QuestItemIds, SoundEffectPair } from '../models/types';

// ============================================================================
// Constants
// ============================================================================

const SOUND_PREFIX = 'celf_'; // caedendi's extended loot filter
const SOUND_ITEM_RUNE = 'item_rune';
const CHANNEL_ITEMS_SD = 'sfx/items_sd';
const CHANNEL_ITEMS_HD = 'sfx/items_hd';

// Sound effect definitions
const SOUND_EFFECTS: Record<string, SoundEffectPair> = {
	hostile: {
		sd: 'cursor\\hostile.flac',
		hd: 'cursor\\cursor_hostile_1_hd.flac',
	},
	hf_place: {
		sd: 'object\\hellforgeplace.flac',
		hd: 'object\\object_hellforgeplace_hd.flac',
	},
	hf_smash: {
		sd: 'object\\hellforgesmash.flac',
		hd: 'object\\object_hellforgesmash_hd.flac',
	},
	cairn_success: {
		sd: 'object\\cairnsuccess.flac',
		hd: 'object\\object_cairnsuccess_hd.flac',
	},
	portal_open: {
		sd: 'object\\portalopen.flac',
		hd: 'object\\object_portalopen_hd.flac',
	},
	quest_done: {
		sd: 'cursor\\questdone.flac',
		hd: 'cursor\\cursor_questdone_1_hd.flac',
	},
	none: {
		sd: 'none.flac',
		hd: 'none.flac',
	},
};

// Rune definitions by tier
const RUNE_TIERS = {
	low:    [ 'r01', 'r02', 'r03', 'r04', 'r05', 'r06', 'r07', 'r09', 'r10', 'r11', 'r12', 'r13', 'r14' ], // El-Dol except Ral
	lowMid: [ 'r08', 'r15', 'r16', 'r17', 'r18', 'r19' ], // Ral, Hel-Fal
	mid:    [ 'r20', 'r21', 'r22', 'r23', 'r24', 'r25' ], // Lem-Gul
	high:   [ 'r26', 'r27', 'r28', 'r29', 'r30', 'r31', 'r32', 'r33' ], // Vex-Zod
};

// ============================================================================
// Pure Functions - Sound Creation
// ============================================================================

/**
 * Create a new sound entry for the sounds.txt file
 */
function createSoundEntry(
	soundName: string,
	template: any,
	channel: string,
	fileName: string,
	redirect: string,
	index: number,
): any {
	return {
		...template,
		'Sound':      soundName,
		'*Index':     String(index),
		'Channel':    channel,
		'FileName':   fileName,
		'Redirect':   redirect,
		'Volume Min': '255',
		'Volume Max': '255',
		'Priority':   '255',
		'Stop Inst':  '0',
		'Defer Inst': '0',
		'Falloff':    '4',
	};
}

/**
 * Create SD and HD sound pair, redirect SD to HD
 * Returns the SD sound name to use in item files
 */
function createDropSoundPair(
	soundsData: TSVData,
	suffix: string,
	sfxPair: SoundEffectPair,
): string {
	const soundNameSd = `${ SOUND_PREFIX }${ suffix }`;
	const soundNameHd = `${ soundNameSd }_hd`;

	// Find template
	const template = soundsData.rows.find(sound => sound.Sound === SOUND_ITEM_RUNE);
	if (!template)
		throw new Error('Could not find template sound: ' + SOUND_ITEM_RUNE);


	// Create SD sound (redirects to HD)
	const sdSound = createSoundEntry(
		soundNameSd,
		template,
		CHANNEL_ITEMS_SD,
		sfxPair.sd,
		soundNameHd,
		soundsData.rows.length,
	);
	soundsData.rows.push(sdSound);

	// Create HD sound
	const hdSound = createSoundEntry(
		soundNameHd,
		template,
		CHANNEL_ITEMS_HD,
		sfxPair.hd,
		'',
		soundsData.rows.length,
	);
	soundsData.rows.push(hdSound);

	return soundNameSd;
}

/**
 * Apply a drop sound to specific items in a TSV file
 */
function applyDropSoundToItems(
	itemData: TSVData,
	itemCodes: string[],
	dropSound: string,
): TSVData {
	itemData.rows.forEach(row => {
		if (itemCodes.includes(row.code))
			row.dropsound = dropSound;
	});

	return itemData;
}

// ============================================================================
// Feature Functions
// ============================================================================

/**
 * Apply drop sounds for runes based on tier configuration
 */
function applyRuneDropSounds(
	soundsData: TSVData,
	miscData: TSVData,
	config: DropSoundsConfig,
): void {
	const tierConfig = [
		{ codes: RUNE_TIERS.low, sound: config.runes.low, suffix: 'rune_tier_1' },
		{ codes: RUNE_TIERS.lowMid, sound: config.runes.lowMid, suffix: 'rune_tier_2' },
		{ codes: RUNE_TIERS.mid, sound: config.runes.mid, suffix: 'rune_tier_3' },
		{ codes: RUNE_TIERS.high, sound: config.runes.high, suffix: 'rune_tier_4' },
	];

	tierConfig.forEach(({ codes, sound, suffix }) => {
		if (sound === 'default')
			return;

		const sfx = SOUND_EFFECTS[sound];
		if (!sfx) {
			console.warn(`Unknown sound effect: ${ sound }`);

			return;
		}

		const soundName = createDropSoundPair(soundsData, suffix, sfx);
		applyDropSoundToItems(miscData, codes, soundName);
	});
}

/**
 * Apply drop sounds for quest items
 */
function applyQuestItemDropSounds(
	soundsData: TSVData,
	weaponsData: TSVData,
	miscData: TSVData,
	config: DropSoundsConfig,
): void {
	const sound = config.questEndgame.questItems;
	if (sound === 'default')
		return;

	const sfx = SOUND_EFFECTS[sound];
	if (!sfx) {
		console.warn(`Unknown sound effect: ${ sound }`);

		return;
	}

	const soundName = createDropSoundPair(soundsData, 'quest', sfx);

	// Quest weapons
	const questWeapons = [
		QuestItemIds.WIRT_LEG,
		QuestItemIds.HORADRIC_MALUS,
		QuestItemIds.STAFF_OF_KINGS,
		QuestItemIds.HORADRIC_STAFF,
		QuestItemIds.GIDBINN,
		QuestItemIds.KHALIM_FLAIL,
		QuestItemIds.KHALIM_WILL,
		QuestItemIds.HELL_FORGE_HAMMER,
	];
	applyDropSoundToItems(weaponsData, questWeapons, soundName);

	// Quest misc items
	const questMisc = [
		QuestItemIds.SCROLL_INIFUSS,
		QuestItemIds.SCROLL_INIFUSS_DECIPHERED,
		QuestItemIds.HORADRIC_SCROLL,
		QuestItemIds.BOOK_OF_SKILL,
		// QuestItemIds.HORADRIC_CUBE, // [CSTM_DSBOX] - Horadric Cube uses default sound
		QuestItemIds.AMULET_VIPER,
		QuestItemIds.JADE_FIGURINE,
		QuestItemIds.GOLDEN_BIRD,
		QuestItemIds.POTION_OF_LIFE,
		QuestItemIds.LAM_ESEN_TOME,
		QuestItemIds.KHALIM_EYE,
		QuestItemIds.KHALIM_HEART,
		QuestItemIds.KHALIM_BRAIN,
		QuestItemIds.MEPHISTO_SOULSTONE,
		QuestItemIds.MALAH_POTION,
		QuestItemIds.SCROLL_RESISTANCE,
	];
	applyDropSoundToItems(miscData, questMisc, soundName);
}

/**
 * Apply drop sounds for essences
 */
function applyEssenceDropSounds(
	soundsData: TSVData,
	miscData: TSVData,
	config: DropSoundsConfig,
): void {
	const sound = config.questEndgame.essences;
	if (sound === 'default')
		return;

	const sfx = SOUND_EFFECTS[sound];
	if (!sfx) {
		console.warn(`Unknown sound effect: ${ sound }`);

		return;
	}

	const soundName = createDropSoundPair(soundsData, 'essence', sfx);
	const essences = [
		EndgameItemIds.ESSENCE_TWISTED,
		EndgameItemIds.ESSENCE_CHARGED,
		EndgameItemIds.ESSENCE_BURNING,
		EndgameItemIds.ESSENCE_FESTERING,
	];
	applyDropSoundToItems(miscData, essences, soundName);
}

/**
 * Apply drop sounds for tokens
 */
function applyTokenDropSounds(
	soundsData: TSVData,
	miscData: TSVData,
	config: DropSoundsConfig,
): void {
	const sound = config.questEndgame.tokens;
	if (sound === 'default')
		return;

	const sfx = SOUND_EFFECTS[sound];
	if (!sfx) {
		console.warn(`Unknown sound effect: ${ sound }`);

		return;
	}

	const soundName = createDropSoundPair(soundsData, 'token', sfx);
	applyDropSoundToItems(miscData, [ EndgameItemIds.TOKEN ], soundName);
}

/**
 * Apply drop sounds for Pandemonium keys
 */
function applyKeyDropSounds(
	soundsData: TSVData,
	miscData: TSVData,
	config: DropSoundsConfig,
): void {
	const sound = config.questEndgame.keys;
	if (sound === 'default')
		return;

	const sfx = SOUND_EFFECTS[sound];
	if (!sfx) {
		console.warn(`Unknown sound effect: ${ sound }`);

		return;
	}

	const soundName = createDropSoundPair(soundsData, 'key', sfx);
	const keys = [
		EndgameItemIds.KEY_TERROR,
		EndgameItemIds.KEY_HATE,
		EndgameItemIds.KEY_DESTRUCTION,
	];
	applyDropSoundToItems(miscData, keys, soundName);
}

/**
 * Apply drop sounds for Uber organs
 */
function applyOrganDropSounds(
	soundsData: TSVData,
	miscData: TSVData,
	config: DropSoundsConfig,
): void {
	const sound = config.questEndgame.organs;
	if (sound === 'default')
		return;

	const sfx = SOUND_EFFECTS[sound];
	if (!sfx) {
		console.warn(`Unknown sound effect: ${ sound }`);

		return;
	}

	const soundName = createDropSoundPair(soundsData, 'organ', sfx);
	const organs = [
		EndgameItemIds.ORGAN_HORN,
		EndgameItemIds.ORGAN_EYE,
		EndgameItemIds.ORGAN_BRAIN,
	];
	applyDropSoundToItems(miscData, organs, soundName);
}

/**
 * Apply drop sounds for Standard of Heroes
 */
function applyStandardDropSounds(
	soundsData: TSVData,
	miscData: TSVData,
	config: DropSoundsConfig,
): void {
	const sound = config.questEndgame.standard;
	if (sound === 'default')
		return;

	const sfx = SOUND_EFFECTS[sound];
	if (!sfx) {
		console.warn(`Unknown sound effect: ${ sound }`);

		return;
	}

	const soundName = createDropSoundPair(soundsData, 'flag', sfx);
	applyDropSoundToItems(miscData, [ EndgameItemIds.STANDARD ], soundName);
}

// ============================================================================
// Main Entry Point
// ============================================================================

/**
 * Apply all drop sound modifications.
 *
 * This is the main function - clear, linear flow:
 * 1. Load data
 * 2. Apply modifications
 * 3. Save data
 */
export function applyDropSounds(config: DropSoundsConfig): void {
	if (!config.enabled)
		return;


	// Load all necessary data
	const soundsData = readSounds();
	const weaponsData = readWeapons();
	const miscData = readMisc();

	// Apply all modifications
	applyRuneDropSounds(soundsData, miscData, config);
	applyQuestItemDropSounds(soundsData, weaponsData, miscData, config);
	applyEssenceDropSounds(soundsData, miscData, config);
	applyTokenDropSounds(soundsData, miscData, config);
	applyKeyDropSounds(soundsData, miscData, config);
	applyOrganDropSounds(soundsData, miscData, config);
	applyStandardDropSounds(soundsData, miscData, config);

	// Write everything back
	writeSounds(soundsData);
	writeWeapons(weaponsData);
	writeMisc(miscData);
}
