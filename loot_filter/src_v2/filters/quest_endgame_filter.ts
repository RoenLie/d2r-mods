import { readItemModifiers, readItemNames, readUi, writeItemModifiers, writeItemNames, writeUi } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';
import { applyBigTooltip } from '../utils/big_tooltip';
import { transformAllLanguages, updateAllLanguages } from '../utils/entry_utils';

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

	// Handle Act 5 quest items that are in item-modifiers.json
	const itemModifiers = readItemModifiers();
	applyQuestItemsToData(itemModifiers, config.questEndgame, QUEST_ITEMS_MODIFIERS);
	writeItemModifiers(itemModifiers);

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
	'vip', // Top of the Horadric Staff (reassigned in D2R)
	// Act 3
	'j34', // Jade Figurine
	'g34', // Golden Bird
	'bbb', // Lam Esen's Tome
	'LamTome', // Lam Esen's Tome (alt)
	'qey', // Khalim's Eye
	'qhr', // Khalim's Heart
	'qbr', // Khalim's Brain
	'mss', // Mephisto's Soulstone
	// Act 5 (Book of Skill and Potion of Life are in ui.json, not here)
];

// Act 5 quest items that are in item-modifiers.json (special handling)
const QUEST_ITEMS_MODIFIERS = [
	'ice', // Malah's Potion
	'tr2', // Scroll of Resistance
];

// Quest weapons (these show item level and need trailing color code)
const QUEST_WEAPONS = [
	// Act 1
	'leg', // Wirt's Leg
	'hdm', // Horadric Malus
	// Act 2
	'Amulet of the Viper', // Amulet of the Viper
	'msf',                // Staff of Kings
	'Staff of Kings',     // Staff of Kings (alternate)
	'hst',                // Horadric Staff
	'Horadric Staff',     // Horadric Staff (alternate)
	// Act 3
	'g33',                // The Gidbinn
	'qf1',                // Khalim's Flail
	'KhalimFlail',        // Khalim's Flail (alternate)
	'qf2',                // Khalim's Will
	'SuperKhalimFlail',   // Khalim's Will (alternate)
	// Act 4
	'hfh',                // Hell Forge Hammer
	'Hell Forge Hammer',  // Hell Forge Hammer (alternate)
];

const HORADRIC_CUBE = 'box';

function applyQuestItemsToData(
	itemNames: JSONData,
	questConfig: FilterConfig['questEndgame'],
	itemCodes: string[] | null = null,
): void {
	const allQuestItems = itemCodes ?? [ ...QUEST_ITEMS, ...QUEST_WEAPONS ];

	// Add Horadric Cube if enabled
	if (questConfig.cubeHighlight)
		allQuestItems.push(HORADRIC_CUBE);

	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry.Key as string;
		if (!allQuestItems.includes(key))
			return;

		// Quest weapons need trailing color code for iLvl display alignment
		const isQuestWeapon = QUEST_WEAPONS.includes(key);

		// Apply transformations to all languages
		transformAllLanguages(entry, originalName => {
			// Step 1: Apply name color (gold for quest items)
			let displayName = `ÿc4${ originalName }`;

			// Step 2: Apply highlight pattern if enabled
			if (questConfig.questHighlight !== '0') {
				const highlightPattern = getHighlightPattern(questConfig.questHighlight);
				if (highlightPattern)
					displayName = `${ highlightPattern.prefix }${ displayName }${ highlightPattern.suffix }`;
			}

			// Step 3: Apply Big Tooltip if enabled
			displayName = applyBigTooltip(displayName, questConfig.bigTooltips.questItems);

			// Step 4: Quest weapons need trailing nameColor for iLvl alignment
			if (isQuestWeapon)
				displayName = `${ displayName }ÿc4`;

			return displayName;
		});
	});
}

/**
 * Get highlight pattern for quest/endgame items
 * Returns prefix and suffix patterns based on highlight mode
 */
function getHighlightPattern(mode: string): { prefix: string; suffix: string; } | null {
	const red = 'ÿc1';
	const stars = '**********';

	// Mode values: "1" = Small, "2" = Medium, "3" = Large, "4" = Extra Large, "5" = Extra Extra Large
	switch (mode) {
	case '0': // Disabled
		return null;
	case '1': // Small
		return { prefix: `${ red }*  `, suffix: `  ${ red }*` };
	case '2': // Medium
		return { prefix: `${ red }**  `, suffix: `  ${ red }**` };
	case '3': // Large
		return { prefix: `${ red }*****  `, suffix: `  ${ red }*****` };
	case '4': // Extra Large
		return { prefix: `${ red }${ stars }  `, suffix: `  ${ red }${ stars }` };
	case '5': // Extra Extra Large
		return { prefix: `${ red }${ stars }  ${ stars }     `, suffix: `     ${ red }${ stars }  ${ stars }` };
	default:
		return null;
	}
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

// Standard of Heroes
const STANDARD_OF_HEROES = 'std';

// Token of Absolution (crafted from 4 essences)
const TOKEN_OF_ABSOLUTION = 'toa';

// Pandemonium Keys
const PANDEMONIUM_KEYS = [
	'pk1', // Key of Terror
	'pk2', // Key of Hate
	'pk3', // Key of Destruction
];

// Pandemonium Organs
const PANDEMONIUM_ORGANS = [
	'dhn', // Diablo's Horn
	'bey', // Baal's Eye
	'mbr', // Mephisto's Brain
];

function applyEndgameItemsToData(
	itemNames: JSONData,
	endgameConfig: FilterConfig['questEndgame'],
): void {
	// Handle essences
	if (!endgameConfig.showEssences) { hideItems(itemNames, ESSENCES); }
	else {
		applyEndgameItemFormat(
			itemNames,
			ESSENCES,
			endgameConfig.essencesHighlight,
			endgameConfig.bigTooltips.essences,
		);
	}

	// Handle Standard of Heroes
	if (!endgameConfig.showStandard) { hideItems(itemNames, [ STANDARD_OF_HEROES ]); }
	else {
		applyEndgameItemFormat(
			itemNames,
			[ STANDARD_OF_HEROES ],
			endgameConfig.standardHighlight,
			endgameConfig.bigTooltips.standard,
		);
	}

	// Handle Token of Absolution
	applyEndgameItemFormat(
		itemNames,
		[ TOKEN_OF_ABSOLUTION ],
		endgameConfig.tokenHighlight,
		endgameConfig.bigTooltips.tokens,
	);

	// Handle Pandemonium keys
	applyEndgameItemFormat(
		itemNames,
		PANDEMONIUM_KEYS,
		endgameConfig.keysHighlight,
		endgameConfig.bigTooltips.keys,
	);

	// Handle Pandemonium organs
	applyEndgameItemFormat(
		itemNames,
		PANDEMONIUM_ORGANS,
		endgameConfig.organsHighlight,
		endgameConfig.bigTooltips.organs,
	);
}

/**
 * Apply formatting (highlight + Big Tooltip) to endgame items
 */
function applyEndgameItemFormat(
	itemNames: JSONData,
	itemCodes: string[],
	highlightMode: string,
	bigTooltipMode: string,
): void {
	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry.Key as string;
		if (!itemCodes.includes(key))
			return;

		// Apply transformations to all languages
		transformAllLanguages(entry, originalName => {
			let displayName = originalName;

			// Apply highlight pattern if enabled (includes color)
			if (highlightMode !== '0') {
				// Add orange color for endgame items when highlighting
				displayName = `ÿc8${ displayName }`;

				const highlightPattern = getHighlightPattern(highlightMode);
				if (highlightPattern)
					displayName = `${ highlightPattern.prefix }${ displayName }${ highlightPattern.suffix }`;
			}

			// Apply Big Tooltip if enabled
			displayName = applyBigTooltip(displayName, bigTooltipMode);

			return displayName;
		});
	});
}

/**
 * Hide items by setting their name to empty spaces
 */
function hideItems(itemNames: JSONData, itemCodes: string[]): void {
	Object.keys(itemNames).forEach(index => {
		const entry = (itemNames as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry.Key as string;
		if (!itemCodes.includes(key))
			return;

		// Hide by setting all language entries to spaces
		updateAllLanguages(entry, '                    '); // 20 spaces
	});
}

// ============================================================================
// Quest Item Exceptions (items with strings in ui.json)
// ============================================================================

// These quest items have their display names in ui.json instead of item-names.json
// They need special handling to apply highlights
// Note: These use item CODES as keys in ui.json, not text strings
const QUEST_ITEM_EXCEPTIONS = [
	'ass',  // Book of Skill (Act 2)
	'xyz',  // Potion of Life (Act 3)
];

/**
 * Apply quest highlights to items in ui.json
 * Some quest items (Book of Skill, Potion of Life) have their strings in ui.json
 */
function applyQuestItemExceptions(
	questConfig: FilterConfig['questEndgame'],
): void {
	const uiStrings = readUi();

	Object.keys(uiStrings).forEach(index => {
		const entry = (uiStrings as any)[index];
		if (typeof entry !== 'object' || Array.isArray(entry))
			return;

		const key = entry.Key as string;
		if (!QUEST_ITEM_EXCEPTIONS.includes(key))
			return;

		// Apply transformations to all languages
		transformAllLanguages(entry, originalName => {
			// Step 1: Apply gold color
			let displayName = `ÿc4${ originalName }`;

			// Step 2: Apply highlight pattern if enabled
			if (questConfig.questHighlight !== '0') {
				const highlightPattern = getHighlightPattern(questConfig.questHighlight);
				if (highlightPattern)
					displayName = `${ highlightPattern.prefix }${ displayName }${ highlightPattern.suffix }`;
			}

			// Step 3: Apply Big Tooltip if enabled
			displayName = applyBigTooltip(displayName, questConfig.bigTooltips.questItems);

			return displayName;
		});
	});

	writeUi(uiStrings);
}
