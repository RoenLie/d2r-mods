/* eslint-disable @stylistic/max-len */
/**
 * Streamlined file operations with type safety.
 * Provides a single constant for all game file I/O with caching built-in.
 */

// ============================================================================
// File Paths
// ============================================================================

export const FILE_PATHS = {
	// Excel TSV files
	SOUNDS:    'global\\excel\\sounds.txt',
	WEAPONS:   'global\\excel\\weapons.txt',
	ARMOR:     'global\\excel\\armor.txt',
	MISC:      'global\\excel\\misc.txt',
	INVENTORY: 'global\\excel\\inventory.txt',

	// Localized JSON string files
	ITEM_NAMES:        'local\\lng\\strings\\item-names.json',
	ITEM_NAME_AFFIXES: 'local\\lng\\strings\\item-nameaffixes.json',
	ITEM_RUNES:        'local\\lng\\strings\\item-runes.json',
	ITEM_MODIFIERS:    'local\\lng\\strings\\item-modifiers.json',
	UI:                'local\\lng\\strings\\ui.json',

	// Layout files - Standard
	BANK_ORIGINAL_LAYOUT:             'global\\ui\\layouts\\bankoriginallayout.json',
	BANK_EXPANSION_LAYOUT:            'global\\ui\\layouts\\bankexpansionlayout.json',
	PLAYER_INVENTORY_ORIGINAL_LAYOUT: 'global\\ui\\layouts\\playerinventoryoriginallayout.json',

	// Layout files - HD
	PROFILE_HD:                           'global\\ui\\layouts\\_profilehd.json',
	PROFILE_LV:                           'global\\ui\\layouts\\_profilelv.json',
	BANK_ORIGINAL_LAYOUT_HD:              'global\\ui\\layouts\\bankoriginallayouthd.json',
	BANK_EXPANSION_LAYOUT_HD:             'global\\ui\\layouts\\bankexpansionlayouthd.json',
	PLAYER_INVENTORY_ORIGINAL_LAYOUT_HD:  'global\\ui\\layouts\\playerinventoryoriginallayouthd.json',
	PLAYER_INVENTORY_EXPANSION_LAYOUT_HD: 'global\\ui\\layouts\\playerinventoryexpansionlayouthd.json',

	// Layout files - Controller
	CONTROLLER_OVERLAY_HD:                           'global\\ui\\layouts\\controller\\controlleroverlayhd.json',
	CONTROLLER_BANK_ORIGINAL_LAYOUT_HD:              'global\\ui\\layouts\\controller\\bankoriginallayouthd.json',
	CONTROLLER_BANK_EXPANSION_LAYOUT_HD:             'global\\ui\\layouts\\controller\\bankexpansionlayouthd.json',
	CONTROLLER_PLAYER_INVENTORY_ORIGINAL_LAYOUT_HD:  'global\\ui\\layouts\\controller\\playerinventoryoriginallayouthd.json',
	CONTROLLER_PLAYER_INVENTORY_EXPANSION_LAYOUT_HD: 'global\\ui\\layouts\\controller\\playerinventoryexpansionlayouthd.json',
} as const;

// HD item paths (for models/effects)
export const HD_ITEM_PATHS = {
	MISC:      'hd\\items\\misc\\',
	WEAPON:    'hd\\items\\weapon\\',
	BODY_PART: 'hd\\items\\misc\\body_part\\',
	QUEST:     'hd\\items\\misc\\quest\\',
	SCROLL:    'hd\\items\\misc\\scroll\\',
	AMULET:    'hd\\items\\misc\\amulet\\',
	RING:      'hd\\items\\misc\\ring\\',
	RUNE:      'hd\\items\\misc\\rune\\',
	GEM:       'hd\\items\\misc\\gem\\',
	KEY:       'hd\\items\\misc\\key\\',
	HAMMER:    'hd\\items\\weapon\\hammer\\',
	CLUB:      'hd\\items\\weapon\\club\\',
	MACE:      'hd\\items\\weapon\\mace\\',
	KNIFE:     'hd\\items\\weapon\\knife\\',
	STAFF:     'hd\\items\\weapon\\staff\\',
	CHARM:     'hd\\items\\weapon\\charm\\',
} as const;

// VFX particle paths
export const VFX_PATHS = {
	HORADRIC_LIGHT:     'data/hd/vfx/particles/overlays/object/horadric_light/fx_horadric_light.particles',
	PALADIN_FANATICISM: 'data/hd/vfx/particles/overlays/paladin/aura_fanatic/aura_fanatic.particles',
	VALKYRIE_START:     'data/hd/vfx/particles/overlays/common/valkyriestart/valkriestart_overlay.particles',
} as const;


// ============================================================================
// Cache System
// ============================================================================

const fileCache: Map<string, object | object[]> = new Map();

function getCachedOrRead<T>(path: string, readFn: () => T): T {
	if (fileCache.has(path))
		return fileCache.get(path) as T;

	const data = readFn();
	fileCache.set(path, data as any);

	return data;
}

function writeAndCache<T extends object | object[]>(
	path: string,
	data: T,
	writeFn: (data: T) => void,
): void {
	fileCache.set(path, data);
	writeFn(data);
}


// ============================================================================
// File Operation Builder
// ============================================================================

interface FileOperations<T> {
	read:  () => T;
	write: (data: T) => void;
}

function createTsvOperations<T>(path: string): FileOperations<T> {
	return {
		read:  () => getCachedOrRead(path, () => D2RMM.readTsv(path) as T),
		write: (data) => writeAndCache(path, data as any, (d) => D2RMM.writeTsv(path, d as any)),
	};
}

function createJsonOperations<T>(path: string): FileOperations<T> {
	return {
		read:  () => getCachedOrRead(path, () => D2RMM.readJson(path) as T),
		write: (data) => writeAndCache(path, data as any, (d) => D2RMM.writeJson(path, d as any)),
	};
}


// ============================================================================
// Global File Operations Constant
// ============================================================================

export const gameFiles = {
	// TSV Excel files
	/** [`global\excel\sounds.txt`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/excel/sounds.txt) */
	sounds:    createTsvOperations<FileTypes.Sounds.File>(FILE_PATHS.SOUNDS),
	/** [`global\excel\weapons.txt`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/excel/weapons.txt) */
	weapons:   createTsvOperations<FileTypes.Weapons.File>(FILE_PATHS.WEAPONS),
	/** [`global\excel\armor.txt`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/excel/armor.txt) */
	armor:     createTsvOperations<FileTypes.Armor.File>(FILE_PATHS.ARMOR),
	/** [`global\excel\misc.txt`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/excel/misc.txt) */
	misc:      createTsvOperations<FileTypes.Misc.File>(FILE_PATHS.MISC),
	/** [`global\excel\inventory.txt`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/excel/inventory.txt) */
	inventory: createTsvOperations<FileTypes.Inventory.File>(FILE_PATHS.INVENTORY),

	// JSON string files
	/** [`local\lng\strings\item-names.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/local/lng/strings/item-names.json) */
	itemNames:       createJsonOperations<FileTypes.ItemNames.File>(FILE_PATHS.ITEM_NAMES),
	/** [`local\lng\strings\item-nameaffixes.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/local/lng/strings/item-nameaffixes.json) */
	itemNameAffixes: createJsonOperations<FileTypes.ItemNameAffixes.File>(FILE_PATHS.ITEM_NAME_AFFIXES),
	/** [`local\lng\strings\item-runes.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/local/lng/strings/item-runes.json) */
	itemRunes:       createJsonOperations<FileTypes.ItemRunes.File>(FILE_PATHS.ITEM_RUNES),
	/** [`local\lng\strings\item-modifiers.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/local/lng/strings/item-modifiers.json) */
	itemModifiers:   createJsonOperations<FileTypes.ItemModifiers.File>(FILE_PATHS.ITEM_MODIFIERS),
	/** [`local\lng\strings\ui.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/local/lng/strings/ui.json) */
	ui:              createJsonOperations<FileTypes.UI.File>(FILE_PATHS.UI),

	// Layout files - Standard
	/** [`global\ui\layouts\_profilelv.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/_profilelv.json) */
	profileLv:                     createJsonOperations<FileTypes.ProfileHd.File>(FILE_PATHS.PROFILE_LV),
	/** [`global\ui\layouts\bankoriginallayout.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/bankoriginallayout.json) */
	bankOriginalLayout:            createJsonOperations<FileTypes.Layout.BankOriginal.File>(FILE_PATHS.BANK_ORIGINAL_LAYOUT),
	/** [`global\ui\layouts\bankexpansionlayout.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/bankexpansionlayout.json) */
	bankExpansionLayout:           createJsonOperations<FileTypes.Layout.BankExpansion.File>(FILE_PATHS.BANK_EXPANSION_LAYOUT),
	/** [`global\ui\layouts\playerinventoryoriginallayout.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/playerinventoryoriginallayout.json) */
	playerInventoryOriginalLayout: createJsonOperations<FileTypes.PlayerInventory.PlayerInventoryOriginalLayout.File>(FILE_PATHS.PLAYER_INVENTORY_ORIGINAL_LAYOUT),

	// Layout files - HD
	/** [`global\ui\layouts\_profilehd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/_profilehd.json) */
	profileHd:                        createJsonOperations<FileTypes.ProfileHd.File>(FILE_PATHS.PROFILE_HD),
	/** [`global\ui\layouts\bankoriginallayouthd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/bankoriginallayouthd.json) */
	bankOriginalLayoutHd:             createJsonOperations<FileTypes.Layout.BankOriginalHD.File>(FILE_PATHS.BANK_ORIGINAL_LAYOUT_HD),
	/** [`global\ui\layouts\bankexpansionlayouthd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/bankexpansionlayouthd.json) */
	bankExpansionLayoutHd:            createJsonOperations<FileTypes.Layout.BankExpansionHD.File>(FILE_PATHS.BANK_EXPANSION_LAYOUT_HD),
	/** [`global\ui\layouts\playerinventoryoriginallayouthd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/playerinventoryoriginallayouthd.json) */
	playerInventoryOriginalLayoutHd:  createJsonOperations<FileTypes.PlayerInventory.PlayerInventoryOriginalLayoutHD.File>(FILE_PATHS.PLAYER_INVENTORY_ORIGINAL_LAYOUT_HD),
	/** [`global\ui\layouts\playerinventoryexpansionlayouthd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/playerinventoryexpansionlayouthd.json) */
	playerInventoryExpansionLayoutHd: createJsonOperations<FileTypes.PlayerInventory.PlayerInventoryExpansionLayoutHD.File>(FILE_PATHS.PLAYER_INVENTORY_EXPANSION_LAYOUT_HD),

	// Layout files - Controller
	/** [`global\ui\layouts\controller\controlleroverlayhd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/controller/controlleroverlayhd.json) */
	controllerOverlayHd:                        createJsonOperations<FileTypes.Layout.ControllerOverlayHD.File>(FILE_PATHS.CONTROLLER_OVERLAY_HD),
	/** [`global\ui\layouts\controller\bankoriginallayouthd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/controller/bankoriginallayouthd.json) */
	controllerBankOriginalLayoutHd:             createJsonOperations<FileTypes.Layout.ControllerBankOriginalHD.File>(FILE_PATHS.CONTROLLER_BANK_ORIGINAL_LAYOUT_HD),
	/** [`global\ui\layouts\controller\bankexpansionlayouthd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/controller/bankexpansionlayouthd.json) */
	controllerBankExpansionLayoutHd:            createJsonOperations<FileTypes.Layout.ControllerBankExpansionHD.File>(FILE_PATHS.CONTROLLER_BANK_EXPANSION_LAYOUT_HD),
	/** [`global\ui\layouts\controller\playerinventoryoriginallayouthd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/controller/playerinventoryoriginallayouthd.json) */
	controllerPlayerInventoryOriginalLayoutHd:  createJsonOperations<FileTypes.PlayerInventory.ControllerPlayerInventoryOriginalLayoutHD.File>(FILE_PATHS.CONTROLLER_PLAYER_INVENTORY_ORIGINAL_LAYOUT_HD),
	/** [`global\ui\layouts\controller\playerinventoryexpansionlayouthd.json`](file:///A:/Program%20Files/Diablo%20II%20Resurrected/mods/D2RMM/D2RMM.mpq/data/global/ui/layouts/controller/playerinventoryexpansionlayouthd.json) */
	controllerPlayerInventoryExpansionLayoutHd: createJsonOperations<FileTypes.PlayerInventory.ControllerPlayerInventoryExpansionLayoutHD.File>(FILE_PATHS.CONTROLLER_PLAYER_INVENTORY_EXPANSION_LAYOUT_HD),

	/** Dynamic HD item operations for custom paths */
	hdItem: {
		read:  (path: string) => getCachedOrRead(path, () => D2RMM.readJson(path) as any as FileTypes.HDItem.File),
		write: (path: string, data: FileTypes.HDItem.File) => writeAndCache(path, data as any, (d) => D2RMM.writeJson(path, d as any)),
	},

	/** Copy a file from source to destination */
	copyFile: (src: string, dest: string, overwrite = true) => D2RMM.copyFile(src, dest, overwrite),
} as const;


// ============================================================================
// Global Scope Injection
// ============================================================================

/**
 * Install gameFiles into the global scope.
 * Call this at the start of your mod's entry point.
 *
 * @example
 * ```ts
 * import { installGameFiles } from 'd2r-types/io/file_operations';
 * installGameFiles();
 *
 * // Now you can use gameFiles globally
 * const sounds = gameFiles.sounds.read();
 * ```
 */
export function installGameFiles(): void {
	(globalThis as any).gameFiles = gameFiles;
}


// ============================================================================
// Global Type Augmentation
// ============================================================================

declare global {
	const gameFiles: typeof import('./file_operations').gameFiles;
}
