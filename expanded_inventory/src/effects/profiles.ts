/**
 * Profile Effects
 * Modifies _profilehd.json and _profilelv.json for expanded inventory panel dimensions
 */

import { PROFILE_HD, PROFILE_LV } from '../constants/layout';

/**
 * Apply ProfileHD modifications for expanded inventory
 */
export function applyProfileHd(): void {
	const profileHD = gameFiles.profileHd.read();

	profileHD.RightPanelRect_ExpandedInventory = PROFILE_HD.RIGHT_PANEL;
	profileHD.PanelClickCatcherRect_ExpandedInventory = PROFILE_HD.PANEL_CLICK_CATCHER;

	// offset the right hinge so that it doesn't overlap with content of the right panel
	profileHD.RightHingeRect = { x: 1076 + 20, y: 630 };
	profileHD.RightHingeRect_ExpandedInventory = PROFILE_HD.RIGHT_HINGE;

	gameFiles.profileHd.write(profileHD);
}

/**
 * Apply ProfileLV modifications for expanded inventory
 */
export function applyProfileLv(): void {
	const profileLV = gameFiles.profileLv.read();

	profileLV.RightPanelRect_ExpandedInventory = PROFILE_LV.RIGHT_PANEL;

	gameFiles.profileLv.write(profileLV);
}
