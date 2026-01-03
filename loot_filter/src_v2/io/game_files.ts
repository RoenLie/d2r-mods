/**
 * All D2RMM file I/O operations.
 * Centralizes reads and writes to make side effects explicit.
 */

import { FilePaths } from '../models/types';

// TSV file operations
export function readSounds(): TSVData {
	return D2RMM.readTsv(FilePaths.SOUNDS);
}

export function writeSounds(data: TSVData): void {
	D2RMM.writeTsv(FilePaths.SOUNDS, data);
}

export function readWeapons(): TSVData {
	return D2RMM.readTsv(FilePaths.WEAPONS);
}

export function writeWeapons(data: TSVData): void {
	D2RMM.writeTsv(FilePaths.WEAPONS, data);
}

export function readArmor(): TSVData {
	return D2RMM.readTsv(FilePaths.ARMOR);
}

export function writeArmor(data: TSVData): void {
	D2RMM.writeTsv(FilePaths.ARMOR, data);
}

export function readMisc(): TSVData {
	return D2RMM.readTsv(FilePaths.MISC);
}

export function writeMisc(data: TSVData): void {
	D2RMM.writeTsv(FilePaths.MISC, data);
}

// JSON file operations
export function readItemNames(): JSONData {
	return D2RMM.readJson(FilePaths.ITEM_NAMES);
}

export function writeItemNames(data: JSONData): void {
	D2RMM.writeJson(FilePaths.ITEM_NAMES, data);
}

export function readItemNameAffixes(): JSONData {
	return D2RMM.readJson(FilePaths.ITEM_NAME_AFFIXES);
}

export function writeItemNameAffixes(data: JSONData): void {
	D2RMM.writeJson(FilePaths.ITEM_NAME_AFFIXES, data);
}

export function readItemRunes(): JSONData {
	return D2RMM.readJson(FilePaths.ITEM_RUNES);
}

export function writeItemRunes(data: JSONData): void {
	D2RMM.writeJson(FilePaths.ITEM_RUNES, data);
}

export function readItemModifiers(): JSONData {
	return D2RMM.readJson(FilePaths.ITEM_MODIFIERS);
}

export function writeItemModifiers(data: JSONData): void {
	D2RMM.writeJson(FilePaths.ITEM_MODIFIERS, data);
}

export function readProfileHd(): JSONData {
	return D2RMM.readJson(FilePaths.PROFILE_HD);
}

export function writeProfileHd(data: JSONData): void {
	D2RMM.writeJson(FilePaths.PROFILE_HD, data);
}

// Utility for copying files
export function copyFile(src: string, dest: string): void {
	D2RMM.copyFile(src, dest, true);
}
