/**
 * All D2RMM file I/O operations.
 * Centralizes reads and writes to make side effects explicit.
 *
 * Includes caching: once data is read, subsequent reads return
 * the cached version instead of reading from disk again.
 * This ensures multiple effects modifying the same file don't overwrite each other.
 * All read operations return typed data.
 */

import { FILE_PATHS } from '../constants/file_paths';


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


export function readInventory(): FileTypes.Inventory.File {
	return getCachedOrRead(FILE_PATHS.INVENTORY,
		() => D2RMM.readTsv(FILE_PATHS.INVENTORY) as any);
}

export function writeInventory(data: FileTypes.Inventory.File): void {
	writeAndCache(FILE_PATHS.INVENTORY, data,
		d => D2RMM.writeTsv(FILE_PATHS.INVENTORY, d as any));
}


export function readProfileHd(): FileTypes.ProfileHd.File {
	return getCachedOrRead(FILE_PATHS.PROFILE_HD,
		() => D2RMM.readJson(FILE_PATHS.PROFILE_HD) as any);
}

export function writeProfileHd(data: FileTypes.ProfileHd.File): void {
	writeAndCache(FILE_PATHS.PROFILE_HD, data,
		d => D2RMM.writeJson(FILE_PATHS.PROFILE_HD, d as any));
}

export function readProfileLv(): FileTypes.ProfileHd.File {
	return getCachedOrRead(FILE_PATHS.PROFILE_LV,
		() => D2RMM.readJson(FILE_PATHS.PROFILE_LV) as any);
}

export function writeProfileLv(data: FileTypes.ProfileHd.File): void {
	writeAndCache(FILE_PATHS.PROFILE_LV, data,
		d => D2RMM.writeJson(FILE_PATHS.PROFILE_LV, d as any));
}


export function readBankOriginalLayout(): FileTypes.Layout.BankOriginal.File {
	return getCachedOrRead(FILE_PATHS.BANK_ORIGINAL_LAYOUT,
		() => D2RMM.readJson(FILE_PATHS.BANK_ORIGINAL_LAYOUT) as any);
}

export function writeBankOriginalLayout(data: FileTypes.Layout.BankOriginal.File): void {
	writeAndCache(FILE_PATHS.BANK_ORIGINAL_LAYOUT, data,
		d => D2RMM.writeJson(FILE_PATHS.BANK_ORIGINAL_LAYOUT, d as any));
}

export function readBankExpansionLayout(): FileTypes.Layout.BankExpansion.File {
	return getCachedOrRead(FILE_PATHS.BANK_EXPANSION_LAYOUT,
		() => D2RMM.readJson(FILE_PATHS.BANK_EXPANSION_LAYOUT) as any);
}

export function writeBankExpansionLayout(data: FileTypes.Layout.BankExpansion.File): void {
	writeAndCache(FILE_PATHS.BANK_EXPANSION_LAYOUT, data,
		d => D2RMM.writeJson(FILE_PATHS.BANK_EXPANSION_LAYOUT, d as any));
}


export function readBankOriginalLayoutHd(): FileTypes.Layout.BankOriginalHD.File {
	return getCachedOrRead(FILE_PATHS.BANK_ORIGINAL_LAYOUT_HD,
		() => D2RMM.readJson(FILE_PATHS.BANK_ORIGINAL_LAYOUT_HD) as any);
}

export function writeBankOriginalLayoutHd(data: FileTypes.Layout.BankOriginalHD.File): void {
	writeAndCache(FILE_PATHS.BANK_ORIGINAL_LAYOUT_HD, data,
		d => D2RMM.writeJson(FILE_PATHS.BANK_ORIGINAL_LAYOUT_HD, d as any));
}

export function readBankExpansionLayoutHd(): FileTypes.Layout.BankExpansionHD.File {
	return getCachedOrRead(FILE_PATHS.BANK_EXPANSION_LAYOUT_HD,
		() => D2RMM.readJson(FILE_PATHS.BANK_EXPANSION_LAYOUT_HD) as any);
}

export function writeBankExpansionLayoutHd(data: FileTypes.Layout.BankExpansionHD.File): void {
	writeAndCache(FILE_PATHS.BANK_EXPANSION_LAYOUT_HD, data,
		d => D2RMM.writeJson(FILE_PATHS.BANK_EXPANSION_LAYOUT_HD, d as any));
}


export function readControllerOverlayHd(): FileTypes.Layout.ControllerOverlayHD.File {
	return getCachedOrRead(FILE_PATHS.CONTROLLER_OVERLAY_HD,
		() => D2RMM.readJson(FILE_PATHS.CONTROLLER_OVERLAY_HD) as any);
}

export function writeControllerOverlayHd(data: FileTypes.Layout.ControllerOverlayHD.File): void {
	writeAndCache(FILE_PATHS.CONTROLLER_OVERLAY_HD, data,
		d => D2RMM.writeJson(FILE_PATHS.CONTROLLER_OVERLAY_HD, d as any));
}

export function readBankOriginalControllerLayoutHd(): FileTypes.Layout.ControllerBankOriginalHD.File {
	return getCachedOrRead(FILE_PATHS.BANK_ORIGINAL_CONTROLLER_LAYOUT_HD,
		() => D2RMM.readJson(FILE_PATHS.BANK_ORIGINAL_CONTROLLER_LAYOUT_HD) as any);
}

export function writeBankOriginalControllerLayoutHd(data: FileTypes.Layout.ControllerBankOriginalHD.File): void {
	writeAndCache(FILE_PATHS.BANK_ORIGINAL_CONTROLLER_LAYOUT_HD, data,
		d => D2RMM.writeJson(FILE_PATHS.BANK_ORIGINAL_CONTROLLER_LAYOUT_HD, d as any));
}

export function readBankExpansionControllerLayoutHd(): FileTypes.Layout.ControllerBankExpansionHD.File {
	return getCachedOrRead(FILE_PATHS.BANK_EXPANSION_CONTROLLER_LAYOUT_HD,
		() => D2RMM.readJson(FILE_PATHS.BANK_EXPANSION_CONTROLLER_LAYOUT_HD) as any);
}

export function writeBankExpansionControllerLayoutHd(data: FileTypes.Layout.ControllerBankExpansionHD.File): void {
	writeAndCache(FILE_PATHS.BANK_EXPANSION_CONTROLLER_LAYOUT_HD, data,
		d => D2RMM.writeJson(FILE_PATHS.BANK_EXPANSION_CONTROLLER_LAYOUT_HD, d as any));
}
