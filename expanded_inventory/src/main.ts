import { verifyD2RMMVersion } from '../../d2r-types/src/verify_version';
import { applyPlayerInventoryExpansionControllerLayoutHd, applyPlayerInventoryOriginalControllerLayoutHd } from './effects/controller_layouts';
import { applyInventoryChanges } from './effects/inventory';
import { applyPlayerInventoryExpansionLayoutHd, applyPlayerInventoryOriginalLayout, applyPlayerInventoryOriginalLayoutHd } from './effects/player_layouts';
import { applyProfileHd, applyProfileLv } from './effects/profiles';
import { loadConfig } from './mod_config';


/**
 * Main execution function.
 */
export function main(): void {
	// Verify D2RMM version
	verifyD2RMMVersion([ 1, 6, 0 ]);

	// Load configuration (currently no config options)
	const _config = loadConfig();

	// Apply inventory grid size changes
	applyInventoryChanges();

	// Apply profile modifications
	applyProfileHd();
	applyProfileLv();

	// Apply player inventory layout modifications (mouse/keyboard)
	applyPlayerInventoryOriginalLayout();
	applyPlayerInventoryOriginalLayoutHd();
	applyPlayerInventoryExpansionLayoutHd();

	// Apply controller layout modifications
	applyPlayerInventoryOriginalControllerLayoutHd();
	applyPlayerInventoryExpansionControllerLayoutHd();

	// Copy HD assets
	gameFiles.copyFile('hd', 'hd', true);
}
