/**
 * File path constants for all game files modified by this mod
 */

export const FILE_PATHS = {
	// TSV data files
	INVENTORY: 'global\\excel\\inventory.txt',

	// Layout files - Standard
	BANK_ORIGINAL_LAYOUT:  'global\\ui\\layouts\\bankoriginallayout.json',
	BANK_EXPANSION_LAYOUT: 'global\\ui\\layouts\\bankexpansionlayout.json',

	// Layout files - HD
	PROFILE_HD:               'global\\ui\\layouts\\_profilehd.json',
	PROFILE_LV:               'global\\ui\\layouts\\_profilelv.json',
	BANK_ORIGINAL_LAYOUT_HD:  'global\\ui\\layouts\\bankoriginallayouthd.json',
	BANK_EXPANSION_LAYOUT_HD: 'global\\ui\\layouts\\bankexpansionlayouthd.json',

	// Layout files - Controller
	CONTROLLER_OVERLAY_HD:               'global\\ui\\layouts\\controller\\controlleroverlayhd.json',
	BANK_ORIGINAL_CONTROLLER_LAYOUT_HD:  'global\\ui\\layouts\\controller\\bankoriginallayouthd.json',
	BANK_EXPANSION_CONTROLLER_LAYOUT_HD: 'global\\ui\\layouts\\controller\\bankexpansionlayouthd.json',
} as const;
