import { readItemNames, readUi, writeItemNames, writeUi } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';

/**
 * Quest and Endgame Items Filter
 *
 * Handles filtering and highlighting for:
 * - Quest items (scrolls, keys, body parts, etc.)
 * - Quest weapons (Wirt's Leg, Horadric Malus, Khalim's Flail, etc.)
 * - Horadric Cube
 * - Essences (for Token of Absolution)
 * - Token of Absolution (respec item)
 * - Pandemonium keys (Terror, Hate, Destruction)
 * - Pandemonium organs (Horn, Eye, Brain)
 * - Standard of Heroes
 *
 * Note: Some quest items (Book of Skill, Potion of Life) have their strings
 * in ui.json instead of item-names.json and require special handling.
 */

export function applyQuestEndgameFilter(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const itemNames = readItemNames();
	applyQuestItemsToData(itemNames, config.questEndgame);
	applyEndgameItemsToData(itemNames, config.questEndgame);
	writeItemNames(itemNames);

	// Handle quest item exceptions that are in ui.json
	applyQuestItemExceptions(config.questEndgame);
}

// ============================================================================
// Quest Items and Weapons
// ============================================================================

// Quest items (non-weapons)
const QUEST_ITEMS = [
	// Act 1
	'bks', // Scroll of Inifuss
	'bkd', // Scroll of Inifuss (deciphered)
	// Act 2
	'tr1', // Horadric Scroll
	'vip', // Amulet of the Viper
	// Act 3
	'j34', // Jade Figurine
	'g34', // Golden Bird
	'bbb', // Lam Esen's Tome
	'LamTome', // Lam Esen's Tome (alt)
	'qey', // Khalim's Eye
	'qhr', // Khalim's Heart
	'qbr', // Khalim's Brain
	'mss', // Mephisto's Soulstone
	// Act 5
	'ass', // Book of Skill
	'xyz', // Potion of Life
	'ice', // Malah's Potion
	'tr2', // Scroll of Resistance
];

// Quest weapons (these show item level)
const QUEST_WEAPONS = [
	'leg', // Wirt's Leg
	'hfh', // Horadric Malus
	'msf', // Staff of Kings
	'qf1', // Horadric Staff
	'qf2', // Horadric Staff (alt)
	'g33', // Gidbinn
	'qf1', // Khalim's Flail
	'qf2', // Khalim's Will
	'hfh', // Hell Forge Hammer
];

const HORADRIC_CUBE = 'box';

function applyQuestItemsToData(
	itemNames: JSONData,
	questConfig: FilterConfig['questEndgame'],
): void {
	if (questConfig.questHighlight === 'disabled')
		return;

	const allQuestItems = [ ...QUEST_ITEMS ];

	// Add Horadric Cube if enabled
	if (questConfig.cubeHighlight)
		allQuestItems.push(HORADRIC_CUBE);

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const code = entry.code as string;

		// Check if this is a quest item or weapon
		const isQuestItem = allQuestItems.includes(code);
		const isQuestWeapon = QUEST_WEAPONS.includes(code);

		if (!isQuestItem && !isQuestWeapon)
			return;

		// Apply quest highlight
		if (questConfig.questHighlight === 'small') {
			entry['ÿc1*'] = ''; // Small red highlight
		}
		else if (questConfig.questHighlight === 'large') {
			entry['ÿc1*'] = '';
			entry['  ÿc1*'] = ''; // Large red highlight
		}
		else if (questConfig.questHighlight === 'xl') {
			entry['ÿc1*'] = '';
			entry['  ÿc1*'] = '';
			entry['    ÿc1*'] = ''; // XL red highlight
		}
	});
}

// ============================================================================
// Endgame Items
// ============================================================================

// Essences (for Token of Absolution)
const ESSENCES = [
	'tes', // Twisted Essence of Suffering
	'ceh', // Charged Essence of Hatred
	'bet', // Burning Essence of Terror
	'fed', // Festering Essence of Destruction
];

// Pandemonium keys
const PANDEMONIUM_KEYS = [
	'pk1', // Key of Terror
	'pk2', // Key of Hate
	'pk3', // Key of Destruction
];

// Pandemonium organs
const PANDEMONIUM_ORGANS = [
	'dhn', // Diablo's Horn
	'bey', // Baal's Eye
	'mbr', // Mephisto's Brain
];

const TOKEN_OF_ABSOLUTION = 'toa';
const STANDARD_OF_HEROES = 'std';

function applyEndgameItemsToData(
	itemNames: JSONData,
	endgameConfig: FilterConfig['questEndgame'],
): void {
	// Handle essences
	if (!endgameConfig.showEssences)
		hideItems(itemNames, ESSENCES);
	else if (endgameConfig.essencesHighlight !== 'disabled')
		applyHighlightToItems(itemNames, ESSENCES, endgameConfig.essencesHighlight);

	// Handle Standard of Heroes
	if (!endgameConfig.showStandard)
		hideItems(itemNames, [ STANDARD_OF_HEROES ]);
	else if (endgameConfig.standardHighlight !== 'disabled')
		applyHighlightToItems(itemNames, [ STANDARD_OF_HEROES ], endgameConfig.standardHighlight);

	// Handle Token of Absolution
	if (endgameConfig.tokenHighlight !== 'disabled')
		applyHighlightToItems(itemNames, [ TOKEN_OF_ABSOLUTION ], endgameConfig.tokenHighlight);

	// Handle Pandemonium keys
	if (endgameConfig.keysHighlight !== 'disabled')
		applyHighlightToItems(itemNames, PANDEMONIUM_KEYS, endgameConfig.keysHighlight);

	// Handle Pandemonium organs
	if (endgameConfig.organsHighlight !== 'disabled')
		applyHighlightToItems(itemNames, PANDEMONIUM_ORGANS, endgameConfig.organsHighlight);
}

/**
 * Hide items by setting their name to empty spaces
 */
function hideItems(itemNames: JSONData, itemCodes: string[]): void {
	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const code = entry.code as string;
		if (!itemCodes.includes(code))
			return;

		// Hide by setting all language entries to spaces
		Object.keys(entry).forEach(key => {
			if (key === 'id' || key === 'Key' || key === 'code' || key === '*eol')
				return;
			if (typeof entry[key] === 'string')
				entry[key] = '                    '; // 20 spaces
		});
	});
}

/**
 * Apply highlight to items based on mode
 */
function applyHighlightToItems(
	itemNames: JSONData,
	itemCodes: string[],
	mode: 'disabled' | 'small' | 'large' | 'xl',
): void {
	if (mode === 'disabled')
		return;

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const code = entry.code as string;
		if (!itemCodes.includes(code))
			return;

		// Apply orange color to name
		entry['*ID'] = `ÿc8${ entry['*ID'] || '' }`;

		// Apply highlight based on mode
		if (mode === 'small') {
			entry['ÿc1*'] = ''; // Small red highlight
		}
		else if (mode === 'large') {
			entry['ÿc1*'] = '';
			entry['  ÿc1*'] = ''; // Large red highlight
		}
		else if (mode === 'xl') {
			entry['ÿc1*'] = '';
			entry['  ÿc1*'] = '';
			entry['    ÿc1*'] = ''; // XL red highlight
		}
	});
}

// ============================================================================
// Quest Item Exceptions (items with strings in ui.json)
// ============================================================================

// These quest items have their display names in ui.json instead of item-names.json
// They need special handling to apply highlights
const QUEST_ITEM_EXCEPTIONS = [
	'BookofSkill',   // Book of Skill (Act 2) - key is the UI string key, not item code
	'PotionofLife',  // Potion of Life (Act 3)
];

/**
 * Apply quest highlights to items in ui.json
 * Some quest items (Book of Skill, Potion of Life) have their strings in ui.json
 */
function applyQuestItemExceptions(
	questConfig: FilterConfig['questEndgame'],
): void {
	if (questConfig.questHighlight === 'disabled')
		return;

	const uiStrings = readUi();

	Object.keys(uiStrings).forEach(index => {
		const entry = (uiStrings as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry.Key as string;
		if (!QUEST_ITEM_EXCEPTIONS.includes(key))
			return;

		// Get the original name
		const originalName = entry.enUS || '';
		if (!originalName)
			return;

		// Apply orange color and highlight based on mode
		// Using ÿc8 (orange) for quest item names
		let highlightedName = `ÿc8${ originalName }`;

		// Add highlight pattern
		if (questConfig.questHighlight === 'small')
			highlightedName = `ÿc1*  ${ highlightedName }`;
		else if (questConfig.questHighlight === 'large')
			highlightedName = `ÿc1*  ${ highlightedName }  ÿc1*`;
		else if (questConfig.questHighlight === 'xl')
			highlightedName = `ÿc1* ÿc1*  ${ highlightedName }  ÿc1* ÿc1*`;


		entry.enUS = highlightedName;
	});

	writeUi(uiStrings);
}
