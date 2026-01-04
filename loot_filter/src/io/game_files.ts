/**
 * All D2RMM file I/O operations.
 * Centralizes reads and writes to make side effects explicit.
 *
 * Includes caching: once data is read, subsequent reads return
 * the cached version instead of reading from disk again.
 * This ensures multiple filters modifying the same file don't overwrite each other.
 * All read operations should return typed data.
 */


const filePaths = {
	// Excel TSV files
	SOUNDS:            'global\\excel\\sounds.txt',
	WEAPONS:           'global\\excel\\weapons.txt',
	ARMOR:             'global\\excel\\armor.txt',
	MISC:              'global\\excel\\misc.txt',
	// Localized JSON string files
	ITEM_NAMES:        'local\\lng\\strings\\item-names.json',
	ITEM_NAME_AFFIXES: 'local\\lng\\strings\\item-nameaffixes.json',
	ITEM_RUNES:        'local\\lng\\strings\\item-runes.json',
	ITEM_MODIFIERS:    'local\\lng\\strings\\item-modifiers.json',
	UI:                'local\\lng\\strings\\ui.json',
	// UI layouts
	PROFILE_HD:        'global\\ui\\layouts\\_profilehd.json',
} as const;


// Cache for file data - stores the last written data for each file path
const fileCache: Map<string, object | object[]> = new Map();


/**
 * Get cached data or read from disk.
 * Reading caches the data for future reads.
 * If data was previously written, returns the cached version.
 */
function getCachedOrRead<T>(path: string, readFn: () => T): T {
	if (fileCache.has(path))
		return fileCache.get(path) as T;

	const data = readFn();
	fileCache.set(path, data as any);

	return data;
}

/**
 * Write data and cache it for future reads.
 */
function writeAndCache<T extends object | object[]>(
	path: string, data: T, writeFn: (data: T) => void,
): void {
	fileCache.set(path, data);
	writeFn(data);
}


// TSV file operations
export function readSounds(): FileTypes.Sounds.File {
	return getCachedOrRead(filePaths.SOUNDS,
		() => D2RMM.readTsv(filePaths.SOUNDS) as any);
}

export function writeSounds(data: FileTypes.Sounds.File): void {
	writeAndCache(filePaths.SOUNDS, data,
		d => D2RMM.writeTsv(filePaths.SOUNDS, d as any));
}


export function readWeapons(): FileTypes.Weapons.File {
	return getCachedOrRead(filePaths.WEAPONS,
		() => D2RMM.readTsv(filePaths.WEAPONS) as any);
}

export function writeWeapons(data: FileTypes.Weapons.File): void {
	writeAndCache(filePaths.WEAPONS, data,
		d => D2RMM.writeTsv(filePaths.WEAPONS, d as any));
}


export function readArmor(): FileTypes.Armor.File {
	return getCachedOrRead(filePaths.ARMOR,
		() => D2RMM.readTsv(filePaths.ARMOR) as any);
}

export function writeArmor(data: FileTypes.Armor.File): void {
	writeAndCache(filePaths.ARMOR, data,
		d => D2RMM.writeTsv(filePaths.ARMOR, d as any));
}


export function readMisc(): FileTypes.Misc.File {
	return getCachedOrRead(filePaths.MISC,
		() => D2RMM.readTsv(filePaths.MISC) as any);
}

export function writeMisc(data: FileTypes.Misc.File): void {
	writeAndCache(filePaths.MISC, data,
		d => D2RMM.writeTsv(filePaths.MISC, d as any));
}


// JSON file operations
export function readItemNames(): FileTypes.ItemNames.File {
	return getCachedOrRead(filePaths.ITEM_NAMES,
		() => D2RMM.readJson(filePaths.ITEM_NAMES) as any);
}

export function writeItemNames(data: FileTypes.ItemNames.File): void {
	writeAndCache(filePaths.ITEM_NAMES, data,
		d => D2RMM.writeJson(filePaths.ITEM_NAMES, d as any));
}


export function readItemNameAffixes(): FileTypes.ItemNameAffixes.File {
	return getCachedOrRead(filePaths.ITEM_NAME_AFFIXES,
		() => D2RMM.readJson(filePaths.ITEM_NAME_AFFIXES) as any);
}

export function writeItemNameAffixes(data: FileTypes.ItemNameAffixes.File): void {
	writeAndCache(filePaths.ITEM_NAME_AFFIXES, data,
		d => D2RMM.writeJson(filePaths.ITEM_NAME_AFFIXES, d as any));
}


export function readItemRunes(): FileTypes.ItemRunes.File {
	return getCachedOrRead(filePaths.ITEM_RUNES,
		() => D2RMM.readJson(filePaths.ITEM_RUNES) as any);
}

export function writeItemRunes(data: FileTypes.ItemRunes.File): void {
	writeAndCache(filePaths.ITEM_RUNES, data,
		d => D2RMM.writeJson(filePaths.ITEM_RUNES, d as any));
}


export function readItemModifiers(): FileTypes.ItemModifiers.File {
	return getCachedOrRead(filePaths.ITEM_MODIFIERS,
		() => D2RMM.readJson(filePaths.ITEM_MODIFIERS) as any);
}

export function writeItemModifiers(data: FileTypes.ItemModifiers.File): void {
	writeAndCache(filePaths.ITEM_MODIFIERS, data,
		d => D2RMM.writeJson(filePaths.ITEM_MODIFIERS, d as any));
}


export function readProfileHd(): FileTypes.ProfileHd.File {
	return getCachedOrRead(filePaths.PROFILE_HD,
		() => D2RMM.readJson(filePaths.PROFILE_HD) as any);
}

export function writeProfileHd(data: FileTypes.ProfileHd.File): void {
	writeAndCache(filePaths.PROFILE_HD, data,
		d => D2RMM.writeJson(filePaths.PROFILE_HD, d as any));
}


// UI strings (local\lng\strings\ui.json)
export function readUi(): FileTypes.UI.File {
	return getCachedOrRead(filePaths.UI,
		() => D2RMM.readJson(filePaths.UI) as any);
}

export function writeUi(data: FileTypes.UI.File): void {
	writeAndCache(filePaths.UI, data,
		d => D2RMM.writeJson(filePaths.UI, d as any));
}


// Utility for copying files
export function copyFile(src: string, dest: string): void {
	D2RMM.copyFile(src, dest, true);
}
