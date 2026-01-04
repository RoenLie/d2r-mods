/**
 * All D2RMM file I/O operations.
 * Centralizes reads and writes to make side effects explicit.
 *
 * Includes caching: once data is written, subsequent reads return
 * the cached version instead of reading from disk again.
 * This ensures multiple filters modifying the same file don't overwrite each other.
 */

import { FilePaths } from '../models/types';

// Cache for file data - stores the last written data for each file path
const fileCache: Map<string, TSVData | JSONData> = new Map();

/**
 * Get cached data or read from disk.
 * If data was previously written, returns the cached version.
 */
function getCachedOrRead<T>(path: string, readFn: () => T): T {
	if (fileCache.has(path))
		return fileCache.get(path) as T;

	return readFn();
}

/**
 * Write data and cache it for future reads.
 */
function writeAndCache<T extends TSVData | JSONData>(path: string, data: T, writeFn: (data: T) => void): void {
	fileCache.set(path, data);
	writeFn(data);
}

// TSV file operations
export function readSounds(): TSVData {
	return getCachedOrRead(FilePaths.SOUNDS, () => D2RMM.readTsv(FilePaths.SOUNDS));
}

export function writeSounds(data: TSVData): void {
	writeAndCache(FilePaths.SOUNDS, data, d => D2RMM.writeTsv(FilePaths.SOUNDS, d));
}

export function readWeapons(): TSVData {
	return getCachedOrRead(FilePaths.WEAPONS, () => D2RMM.readTsv(FilePaths.WEAPONS));
}

export function writeWeapons(data: TSVData): void {
	writeAndCache(FilePaths.WEAPONS, data, d => D2RMM.writeTsv(FilePaths.WEAPONS, d));
}

export function readArmor(): TSVData {
	return getCachedOrRead(FilePaths.ARMOR, () => D2RMM.readTsv(FilePaths.ARMOR));
}

export function writeArmor(data: TSVData): void {
	writeAndCache(FilePaths.ARMOR, data, d => D2RMM.writeTsv(FilePaths.ARMOR, d));
}

export function readMisc(): TSVData {
	return getCachedOrRead(FilePaths.MISC, () => D2RMM.readTsv(FilePaths.MISC));
}

export function writeMisc(data: TSVData): void {
	writeAndCache(FilePaths.MISC, data, d => D2RMM.writeTsv(FilePaths.MISC, d));
}

// JSON file operations
export function readItemNames(): JSONData {
	return getCachedOrRead(FilePaths.ITEM_NAMES, () => D2RMM.readJson(FilePaths.ITEM_NAMES));
}

export function writeItemNames(data: JSONData): void {
	writeAndCache(FilePaths.ITEM_NAMES, data, d => D2RMM.writeJson(FilePaths.ITEM_NAMES, d));
}

export function readItemNameAffixes(): JSONData {
	return getCachedOrRead(FilePaths.ITEM_NAME_AFFIXES, () => D2RMM.readJson(FilePaths.ITEM_NAME_AFFIXES));
}

export function writeItemNameAffixes(data: JSONData): void {
	writeAndCache(FilePaths.ITEM_NAME_AFFIXES, data, d => D2RMM.writeJson(FilePaths.ITEM_NAME_AFFIXES, d));
}

export function readItemRunes(): JSONData {
	return getCachedOrRead(FilePaths.ITEM_RUNES, () => D2RMM.readJson(FilePaths.ITEM_RUNES));
}

export function writeItemRunes(data: JSONData): void {
	writeAndCache(FilePaths.ITEM_RUNES, data, d => D2RMM.writeJson(FilePaths.ITEM_RUNES, d));
}

export function readItemModifiers(): JSONData {
	return getCachedOrRead(FilePaths.ITEM_MODIFIERS, () => D2RMM.readJson(FilePaths.ITEM_MODIFIERS));
}

export function writeItemModifiers(data: JSONData): void {
	writeAndCache(FilePaths.ITEM_MODIFIERS, data, d => D2RMM.writeJson(FilePaths.ITEM_MODIFIERS, d));
}

export function readProfileHd(): JSONData {
	return getCachedOrRead(FilePaths.PROFILE_HD, () => D2RMM.readJson(FilePaths.PROFILE_HD));
}

export function writeProfileHd(data: JSONData): void {
	writeAndCache(FilePaths.PROFILE_HD, data, d => D2RMM.writeJson(FilePaths.PROFILE_HD, d));
}

// UI strings (local\lng\strings\ui.json)
export function readUi(): JSONData {
	return getCachedOrRead(FilePaths.UI, () => D2RMM.readJson(FilePaths.UI));
}

export function writeUi(data: JSONData): void {
	writeAndCache(FilePaths.UI, data, d => D2RMM.writeJson(FilePaths.UI, d));
}

// Utility for copying files
export function copyFile(src: string, dest: string): void {
	D2RMM.copyFile(src, dest, true);
}
