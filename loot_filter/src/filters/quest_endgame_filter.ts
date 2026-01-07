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

import { COLOR } from '../constants/colors';
import { EndgameItemIds, QuestItemIds, QuestItemIdsAlt } from '../constants/item_ids';
import type { FilterConfig } from '../mod_config';
import { applyBigTooltip } from '../utils/big_tooltip';
import { transformAllLanguages, updateAllLanguages } from '../utils/entry_utils';


export function applyQuestEndgameFilter(config: FilterConfig): void {
	if (!config.enabled)
		return;

	const itemNames = gameFiles.itemNames.read();
	applyQuestItemsToData(itemNames, config.questEndgame);
	applyEndgameItemsToData(itemNames, config.questEndgame);
	gameFiles.itemNames.write(itemNames);

	// Handle Act 5 quest items that are in item-modifiers.json
	const itemModifiers = gameFiles.itemModifiers.read();
	applyQuestItemsToData(itemModifiers, config.questEndgame, QUEST_ITEMS_MODIFIERS);
	gameFiles.itemModifiers.write(itemModifiers);

	// Handle quest item exceptions that are in ui.json
	applyQuestItemExceptions(config.questEndgame);
}


// Quest items (non-weapons) - using imported constants from item_ids.ts
const QUEST_ITEMS: Set<string> = new Set([
	QuestItemIds.SCROLL_INIFUSS,
	QuestItemIds.SCROLL_INIFUSS_DECIPHERED,
	QuestItemIds.HORADRIC_SCROLL,
	QuestItemIds.AMULET_VIPER,
	QuestItemIds.JADE_FIGURINE,
	QuestItemIds.GOLDEN_BIRD,
	QuestItemIds.LAM_ESEN_TOME,
	QuestItemIdsAlt.LAM_ESEN_TOME,
	QuestItemIds.KHALIM_EYE,
	QuestItemIds.KHALIM_HEART,
	QuestItemIds.KHALIM_BRAIN,
	QuestItemIds.MEPHISTO_SOULSTONE,
]);

// Act 5 quest items that are in item-modifiers.json (special handling)
const QUEST_ITEMS_MODIFIERS: Set<string> = new Set([
	QuestItemIds.MALAH_POTION,
	QuestItemIds.SCROLL_RESISTANCE,
]);

// Quest weapons (these show item level and need trailing color code)
const QUEST_WEAPONS: Set<string> = new Set([
	QuestItemIds.WIRTS_LEG,
	QuestItemIds.HORADRIC_MALUS,
	QuestItemIdsAlt.AMULET_VIPER,
	QuestItemIds.STAFF_OF_KINGS,
	QuestItemIdsAlt.STAFF_OF_KINGS,
	QuestItemIds.HORADRIC_STAFF,
	QuestItemIdsAlt.HORADRIC_STAFF,
	QuestItemIds.GIDBINN,
	QuestItemIds.KHALIM_FLAIL,
	QuestItemIdsAlt.KHALIM_FLAIL,
	QuestItemIds.KHALIM_WILL,
	QuestItemIdsAlt.KHALIM_WILL,
	QuestItemIds.HELL_FORGE_HAMMER,
	QuestItemIdsAlt.HELL_FORGE_HAMMER,
]);


function applyQuestItemsToData(
	itemNames: FileTypes.ItemNames.File | FileTypes.ItemModifiers.File,
	questConfig: FilterConfig['questEndgame'],
	itemCodes?: Set<string>,
): void {
	const allQuestItems = itemCodes ?? new Set([
		...QUEST_ITEMS,
		...QUEST_WEAPONS,
	]);

	// Add Horadric Cube if enabled
	if (questConfig.cubeHighlight)
		allQuestItems.add(QuestItemIds.HORADRIC_CUBE);

	for (const entry of itemNames) {
		const key = entry.Key;
		if (!allQuestItems.has(key))
			continue;

		// Quest weapons need trailing color code for iLvl display alignment
		const isQuestWeapon = QUEST_WEAPONS.has(key);

		// Apply transformations to all languages
		transformAllLanguages(entry, originalName => {
			// Step 1: Apply name color (gold for quest items)
			let displayName = `${ COLOR.GOLD }${ originalName }`;

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
				displayName = `${ displayName }${ COLOR.GOLD }`;

			return displayName;
		});
	}
}

/**
 * Get highlight pattern for quest/endgame items
 * Returns prefix and suffix patterns based on highlight mode
 */
function getHighlightPattern(mode: string): { prefix: string; suffix: string; } | null {
	const red = COLOR.RED;
	const pad2 = ' '.repeat(2);
	const pad5 = ' '.repeat(5);

	const ast1  = '*';
	const ast2  = '*'.repeat(2);
	const ast5  = '*'.repeat(5);
	const ast10 = '*'.repeat(10);

	switch (mode) {
	case '0': // Disabled
		return null;
	case '1': // Small
		return {
			prefix: red + ast1 + pad2,
			suffix: pad2 + red + ast1,
		};
	case '2': // Medium
		return {
			prefix: red + ast2 + pad2,
			suffix: pad2 + red + ast2,
		};
	case '3': // Large
		return {
			prefix: red + ast5 + pad2,
			suffix: pad2 + red + ast5,
		};
	case '4': // Extra Large
		return {
			prefix: red + ast10 + pad2,
			suffix: pad2 + red + ast10,
		};
	case '5': // Extra Extra Large
		return {
			prefix: red + ast10 + pad2 + ast10 + pad5,
			suffix: pad5 + red + ast10 + pad2 + ast10,
		};
	default:
		return null;
	}
}


// Essences (for Token of Absolution)
const ESSENCES: Set<string> = new Set([
	EndgameItemIds.ESSENCE_TWISTED,
	EndgameItemIds.ESSENCE_CHARGED,
	EndgameItemIds.ESSENCE_BURNING,
	EndgameItemIds.ESSENCE_FESTERING,
]);

const PANDEMONIUM_KEYS: Set<string> = new Set([
	EndgameItemIds.KEY_TERROR,
	EndgameItemIds.KEY_HATE,
	EndgameItemIds.KEY_DESTRUCTION,
]);

const PANDEMONIUM_ORGANS: Set<string> = new Set([
	EndgameItemIds.ORGAN_HORN,
	EndgameItemIds.ORGAN_EYE,
	EndgameItemIds.ORGAN_BRAIN,
]);

function applyEndgameItemsToData(
	itemNames: FileTypes.ItemNames.File,
	endgameConfig: FilterConfig['questEndgame'],
): void {
	// Handle essences
	if (!endgameConfig.showEssences) {
		hideItems(itemNames, ESSENCES);
	}
	else {
		applyEndgameItemFormat(
			itemNames,
			ESSENCES,
			endgameConfig.essencesHighlight,
			endgameConfig.bigTooltips.essences,
		);
	}

	// Handle Standard of Heroes
	if (!endgameConfig.showStandard) {
		hideItems(itemNames, new Set([ EndgameItemIds.STANDARD ]));
	}
	else {
		applyEndgameItemFormat(
			itemNames,
			new Set([ EndgameItemIds.STANDARD ]),
			endgameConfig.standardHighlight,
			endgameConfig.bigTooltips.standard,
		);
	}

	// Handle Token of Absolution
	applyEndgameItemFormat(
		itemNames,
		new Set([ EndgameItemIds.TOKEN ]),
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
	itemNames: FileTypes.ItemNames.File,
	itemCodes: Set<string>,
	highlightMode: string,
	bigTooltipMode: string,
): void {
	itemNames.forEach(entry => {
		const key = entry.Key;
		if (!itemCodes.has(key))
			return;

		// Apply transformations to all languages
		transformAllLanguages(entry, originalName => {
			let displayName = originalName;

			// Apply highlight pattern if enabled (includes color)
			if (highlightMode !== '0') {
				// Add orange color for endgame items when highlighting
				displayName = `${ COLOR.ORANGE }${ displayName }`;

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
function hideItems(itemNames: FileTypes.ItemNames.File, itemCodes: Set<string> | string[]): void {
	const codesSet = itemCodes instanceof Set ? itemCodes : new Set(itemCodes);
	itemNames.forEach(entry => {
		const key = entry.Key;
		if (!codesSet.has(key))
			return;

		// Hide by setting all language entries to spaces
		updateAllLanguages(entry, ' '.repeat(20));
	});
}


// These quest items have their display names in ui.json instead of item-names.json
// They need special handling to apply highlights
// Note: These use item CODES as keys in ui.json, not text strings
const QUEST_ITEM_EXCEPTIONS: Set<string> = new Set([
	QuestItemIds.BOOK_OF_SKILL,
	QuestItemIds.POTION_OF_LIFE,
]);

/**
 * Apply quest highlights to items in ui.json
 * Some quest items (Book of Skill, Potion of Life) have their strings in ui.json
 */
function applyQuestItemExceptions(questConfig: FilterConfig['questEndgame']): void {
	const uiStrings = gameFiles.ui.read();

	for (const entry of uiStrings) {
		const key = entry.Key;
		if (!QUEST_ITEM_EXCEPTIONS.has(key))
			return;

		// Apply transformations to all languages
		transformAllLanguages(entry, originalName => {
			// Step 1: Apply gold color
			let displayName = COLOR.GOLD + originalName;

			// Step 2: Apply highlight pattern if enabled
			if (questConfig.questHighlight !== '0') {
				const highlight = getHighlightPattern(questConfig.questHighlight);
				if (highlight)
					displayName = highlight.prefix + displayName + highlight.suffix;
			}

			// Step 3: Apply Big Tooltip if enabled
			displayName = applyBigTooltip(displayName, questConfig.bigTooltips.questItems);

			return displayName;
		});
	}

	gameFiles.ui.write(uiStrings);
}
