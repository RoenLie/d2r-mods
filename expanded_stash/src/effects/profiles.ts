/**
 * Profile Effects
 * Modifies _profilehd.json and _profilelv.json for expanded stash panel dimensions
 */

import { readProfileHd, readProfileLv, writeProfileHd, writeProfileLv } from '../io/game_files';

/**
 * Apply ProfileHD modifications for expanded stash
 */
export function applyProfileHd(): void {
	const profile = readProfileHd();

	// Add a property which will be referenced in bank_layouts.ts
	profile['LeftPanelRect_ExpandedStash'] = {
		x:      236,
		y:      -651,
		width:  1687,
		height: 1507,
	};

	// Add a property which will be referenced in bank_layouts.ts
	profile['PanelClickCatcherRect_ExpandedStash'] = {
		x:      0,
		y:      0,
		width:  1687,
		height: 1507,
	};

	// offset the left hinge so that it doesn't overlap with content of the left panel
	profile['LeftHingeRect'] = { x: -236 - 25, y: 630 };

	writeProfileHd(profile);
}

/**
 * Apply ProfileLV modifications for expanded stash
 */
export function applyProfileLv(): void {
	const profile = readProfileLv();

	// Add a property which will be referenced in bank_layouts.ts
	profile['LeftPanelRect_ExpandedStash'] = {
		x:      0,
		y:      -856,
		width:  1687,
		height: 1507,
		scale:  1.16,
	};

	writeProfileLv(profile);
}
