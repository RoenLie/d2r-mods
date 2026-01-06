/**
 * Expanded Stash Mod
 * Main entry point for the mod that expands the stash to 16x13 grid with 4 tabs
 */

import {
	applyBankExpansionLayout,
	applyBankExpansionLayoutHd,
	applyBankOriginalLayout,
	applyBankOriginalLayoutHd,
} from './src/effects/bank_layouts';
import {
	applyBankExpansionControllerLayoutHd,
	applyBankOriginalControllerLayoutHd,
	applyControllerOverlayHd,
} from './src/effects/controller_layouts';
import { applyInventoryChanges } from './src/effects/inventory';
import { applyProfileHd, applyProfileLv } from './src/effects/profiles';
import { loadConfig } from './src/io/mod_config';
import { verifyD2RMMVersion } from './src/utils/verify_version';


/**
 * Main execution function.
 */
export function main(): void {
	// Verify D2RMM version
	verifyD2RMMVersion([ 1, 6, 0 ]);

	// Load configuration
	const config = loadConfig();

	// Apply inventory modifications
	applyInventoryChanges();

	// Apply profile modifications
	applyProfileHd();
	applyProfileLv();

	// Apply bank layout modifications
	applyBankOriginalLayout();
	applyBankExpansionLayout(config);
	applyBankOriginalLayoutHd();
	applyBankExpansionLayoutHd(config);

	// Apply controller layout modifications
	applyControllerOverlayHd();
	applyBankOriginalControllerLayoutHd();
	applyBankExpansionControllerLayoutHd(config);

	// Copy HD assets
	D2RMM.copyFile('hd', 'hd', true);
}

main();
