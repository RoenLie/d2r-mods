/* eslint-disable @stylistic/array-bracket-newline */
/**
 * Custom Filter List
 *
 * Allows users to define custom item names that override the default names.
 * This is a power-user feature for complete customization.
 *
 * Users can uncomment and modify entries in this file to customize item names.
 * The custom names will be applied to the appropriate game files (item-names, item-runes, item-nameaffixes, item-modifiers, ui).
 */

import { readItemModifiers, readItemNameAffixes, readItemNames, readItemRunes, readUi, writeItemModifiers, writeItemNameAffixes, writeItemNames, writeItemRunes, writeUi } from '../io/game_files';
import type { FilterConfig } from '../io/mod_config';

/**
 * Apply custom item name overrides from user-defined lists.
 */
export function applyCustomFilterList(config: FilterConfig): void {
	if (!config.customFilterList.enabled)
		return;

	// Load all data files
	const itemNames = readItemNames();
	const itemRunes = readItemRunes();
	const itemNameAffixes = readItemNameAffixes();
	const itemModifiers = readItemModifiers();
	const uiStrings = readUi();

	// Apply custom names to each file
	applyCustomNames(itemNames, getItemNamesCustomList());
	applyCustomNames(itemRunes, getItemRunesCustomList());
	applyCustomNames(itemNameAffixes, getItemNameAffixesCustomList());
	applyCustomModifiers(itemModifiers, getItemModifiersCustomList());
	applyCustomUi(uiStrings, getUiCustomList());

	// Save all modified files
	writeItemNames(itemNames);
	writeItemRunes(itemRunes);
	writeItemNameAffixes(itemNameAffixes);
	writeItemModifiers(itemModifiers);
	writeUi(uiStrings);
}

/**
 * Apply custom names to item-names.json or item-runes.json
 */
function applyCustomNames(data: JSONData, customList: [string, string][]): void {
	for (const [ key, newName ] of customList) {
		const numericKey = Object.keys(data).find(
			k => (data as any)[k].Key === key,
		);
		if (numericKey)
			(data as any)[numericKey].enUS = newName;
	}
}

/**
 * Apply custom names to item-nameaffixes.json
 */
function applyCustomModifiers(data: JSONData, customList: [string, string][]): void {
	// Same as applyCustomNames - they use the same structure
	applyCustomNames(data, customList);
}

/**
 * Apply custom names to ui.json (localized strings file)
 */
function applyCustomUi(uiStrings: any, customList: [string, string][]): void {
	for (const [ key, newName ] of customList) {
		// UI strings use standard item-names structure with Key/enUS
		const numericKey = Object.keys(uiStrings).find(
			k => (uiStrings as any)[k].Key === key,
		);
		if (numericKey)
			(uiStrings as any)[numericKey].enUS = newName;
	}
}

//----------------------------------------------//
// CUSTOM ITEM NAMES - Edit entries below      //
//----------------------------------------------//
// Uncomment any line and modify the name to customize it.
// Format: [ "item-key", "New Name" ]

/**
 * Custom names for item-names.json
 * Covers most items: weapons, armor, potions, scrolls, gems, jewels, charms, quest items, etc.
 */
function getItemNamesCustomList(): [string, string][] {
	return [
		// Healing Potions
		// [ "hp1", "HP1" ], // Minor Healing Potion
		// [ "hp2", "HP2" ], // Light Healing Potion
		// [ "hp3", "HP3" ], // Healing Potion
		// [ "hp4", "HP4" ], // Greater Healing Potion
		// [ "hp5", "HP5" ], // Super Healing Potion

		// Mana Potions
		// [ "mp1", "MP1" ], // Minor Mana Potion
		// [ "mp2", "MP2" ], // Light Mana Potion
		// [ "mp3", "MP3" ], // Mana Potion
		// [ "mp4", "MP4" ], // Greater Mana Potion
		// [ "mp5", "MP5" ], // Super Mana Potion

		// Rejuvenation Potions
		// [ "rvs", "RPS" ], // Rejuvenation Potion
		// [ "rvl", "RPF" ], // Full Rejuvenation Potion

		// Buff Potions
		// [ "yps", "Antidote Potion" ],
		// [ "wms", "Thawing Potion" ],
		// [ "vps", "Stamina Potion" ],

		// Throwing Potions
		// [ "gpl", "Strangling Gas Potion" ],
		// [ "gpm", "Choking Gas Potion" ],
		// [ "gps", "Rancid Gas Potion" ],
		// [ "opl", "Fulminating Potion" ],
		// [ "opm", "Exploding Potion" ],
		// [ "ops", "Oil Potion" ],

		// Scrolls & Tomes
		// [ "tsc", "Scroll of Town Portal" ],
		// [ "isc", "Scroll of Identify" ],
		// [ "tbk", "Tome of Town Portal" ],
		// [ "ibk", "Tome of Identify" ],

		// Arrows, Bolts, Keys
		// [ "aqv", "Arrows" ],
		// [ "cqv", "Bolts" ],
		// [ "key", "Key" ],

		// Gems - Chipped
		// [ "gcv", "Chipped Amethyst" ],
		// [ "gcw", "Chipped Diamond" ],
		// [ "gcg", "Chipped Emerald" ],
		// [ "gcr", "Chipped Ruby" ],
		// [ "gcb", "Chipped Sapphire" ],
		// [ "gcy", "Chipped Topaz" ],
		// [ "skc", "Chipped Skull" ],

		// Gems - Flawed
		// [ "gfv", "Flawed Amethyst" ],
		// [ "gfw", "Flawed Diamond" ],
		// [ "gfg", "Flawed Emerald" ],
		// [ "gfr", "Flawed Ruby" ],
		// [ "gfb", "Flawed Sapphire" ],
		// [ "gfy", "Flawed Topaz" ],
		// [ "skf", "Flawed Skull" ],

		// Gems - Regular
		// [ "gsv", "Amethyst" ],
		// [ "gsy", "Topaz" ],
		// [ "sku", "Skull" ],
		// Note: Ruby, Sapphire, Emerald, Diamond are in item-nameaffixes.json

		// Gems - Flawless
		// [ "gzv", "Flawless Amethyst" ],
		// [ "glw", "Flawless Diamond" ],
		// [ "glg", "Flawless Emerald" ],
		// [ "glr", "Flawless Ruby" ],
		// [ "glb", "Flawless Sapphire" ],
		// [ "gly", "Flawless Topaz" ],
		// [ "skl", "Flawless Skull" ],

		// Gems - Perfect
		// [ "gpv", "Perfect Amethyst" ],
		// [ "gpw", "Perfect Diamond" ],
		// [ "gpg", "Perfect Emerald" ],
		// [ "gpr", "Perfect Ruby" ],
		// [ "gpb", "Perfect Sapphire" ],
		// [ "gpy", "Perfect Topaz" ],
		// [ "skz", "Perfect Skull" ],

		// Jewels
		// [ "jew", "Jewel" ],
		// [ "Rainbow Facet", "Rainbow Facet" ],

		// Charms
		// [ "cm1", "Small Charm" ],
		// [ "cm2", "Large Charm" ],
		// [ "cm3", "Grand Charm" ],
		// [ "Annihilus", "Annihilus" ],
		// [ "Hellfire Torch", "Hellfire Torch" ],
		// [ "Gheed's Fortune", "Gheed's Fortune" ],

		// Sunder Charms
		// [ "Black Cleft", "Black Cleft" ],           // Magic Sunder
		// [ "Bone Break", "Bone Break" ],             // Physical Sunder
		// [ "Cold Rupture", "Cold Rupture" ],         // Cold Sunder
		// [ "Crack of the Heavens", "Crack of the Heavens" ], // Lightning Sunder
		// [ "Flame Rift", "Flame Rift" ],             // Fire Sunder
		// [ "Rotting Fissure", "Rotting Fissure" ],   // Poison Sunder

		// Quest Items - Act 1
		// [ "leg", "Wirt's Leg" ],
		// [ "hdm", "Horadric Malus" ],
		// [ "bks", "Scroll of Inifuss" ],
		// [ "bkd", "Scroll of Inifuss (deciphered)" ],

		// Quest Items - Act 2
		// [ "tr1", "Horadric Scroll" ],
		// [ "box", "Horadric Cube" ],
		// [ "msf", "Staff of Kings" ],
		// [ "vip", "Amulet of the Viper" ],
		// [ "hst", "Horadric Staff" ],

		// Quest Items - Act 3
		// [ "j34", "A Jade Figurine" ],
		// [ "g34", "The Golden Bird" ],
		// [ "bbb", "Lam Esen's Tome" ],
		// [ "g33", "The Gidbinn" ],
		// [ "qf1", "Khalim's Flail" ],
		// [ "qf2", "Khalim's Will" ],
		// [ "qey", "Khalim's Eye" ],
		// [ "qhr", "Khalim's Heart" ],
		// [ "qbr", "Khalim's Brain" ],
		// [ "mss", "Mephisto's Soulstone" ],

		// Quest Items - Act 4
		// [ "hfh", "Hell Forge Hammer" ],

		// Endgame Items
		// [ "tes", "Twisted Essence of Suffering" ],
		// [ "ceh", "Charged Essense of Hatred" ],
		// [ "bet", "Burning Essence of Terror" ],
		// [ "fed", "Festering Essence of Destruction" ],
		// [ "toa", "Token of Absolution" ],
		// [ "pk1", "Key of Terror" ],
		// [ "pk2", "Key of Hate" ],
		// [ "pk3", "Key of Destruction" ],
		// [ "dhn", "Diablo's Horn" ],
		// [ "bey", "Baal's Eye" ],
		// [ "mbr", "Mephisto's Brain" ],
		// [ "std", "Standard of Heroes" ],
	];
}

/**
 * Custom names for item-runes.json
 * Covers all runes (r01-r33)
 */
function getItemRunesCustomList(): [string, string][] {
	return [
		// Low Tier Runes (#1-#11)
		// [ "r01", "El (1)" ],
		// [ "r02", "Eld (2)" ],
		// [ "r03", "Tir (3)" ],
		// [ "r04", "Nef (4)" ],
		// [ "r05", "Eth (5)" ],
		// [ "r06", "Ith (6)" ],
		// [ "r07", "Tal (7)" ],
		// [ "r08", "Ral (8)" ],
		// [ "r09", "Ort (9)" ],
		// [ "r10", "Thul (10)" ],
		// [ "r11", "Amn (11)" ],

		// Low-Mid Tier Runes (#12-#17)
		// [ "r12", "Sol (12)" ],
		// [ "r13", "Shael (13)" ],
		// [ "r14", "Dol (14)" ],
		// [ "r15", "Hel (15)" ],
		// [ "r16", "Io (16)" ],
		// [ "r17", "Lum (17)" ],

		// Mid Tier Runes (#18-#25)
		// [ "r18", "Ko (18)" ],
		// [ "r19", "Fal (19)" ],
		// [ "r20", "Lem (20)" ],
		// [ "r21", "Pul (21)" ],
		// [ "r22", "Um (22)" ],
		// [ "r23", "Mal (23)" ],
		// [ "r24", "Ist (24)" ],
		// [ "r25", "Gul (25)" ],

		// High Tier Runes (#26-#33)
		// [ "r26", "Vex (26)" ],
		// [ "r27", "Ohm (27)" ],
		// [ "r28", "Lo (28)" ],
		// [ "r29", "Sur (29)" ],
		// [ "r30", "Ber (30)" ],
		// [ "r31", "Jah (31)" ],
		// [ "r32", "Cham (32)" ],
		// [ "r33", "Zod (33)" ],
	];
}

/**
 * Custom names for item-nameaffixes.json
 * Covers gem names that appear as affixes, gold, and superior/inferior prefixes
 */
function getItemNameAffixesCustomList(): [string, string][] {
	return [
		// Gold
		// [ "gld", "Gold" ],

		// Superior/Inferior Quality Prefixes
		// [ "Hiquality", "+" ],    // Superior prefix
		// [ "Damaged", "-" ],      // Inferior prefix
		// [ "Cracked", "-" ],      // Inferior prefix
		// [ "Low Quality", "-" ],  // Inferior prefix
		// [ "Crude", "-" ],        // Inferior prefix

		// Regular Gems (these are in nameaffixes for some reason)
		// [ "gsw", "Diamond" ],
		// [ "gsg", "Emerald" ],
		// [ "gsr", "Ruby" ],
		// [ "gsb", "Sapphire" ],
	];
}

/**
 * Custom names for item-modifiers.json
 * Covers special quest items
 */
function getItemModifiersCustomList(): [string, string][] {
	return [
		// Quest Items (Act 5 exceptions)
		// [ "ice", "Malah's Potion" ],       // Malah's Potion
		// [ "tr2", "Scroll of Resistance" ], // Scroll of Resistance
	];
}

/**
 * Custom names for ui.json (profilehd)
 * Covers special quest rewards
 */
function getUiCustomList(): [string, string][] {
	return [
		// Quest Rewards
		// [ "ass", "Book of Skill" ],  // Book of Skill (Akara's reward)
		// [ "xyz", "Potion of Life" ], // Potion of Life (Anya's reward)
	];
}
