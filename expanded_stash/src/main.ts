import { verifyD2RMMVersion } from '../../d2r-types/src/verify_version';
import { applyBankExpansionLayout, applyBankExpansionLayoutHd, applyBankOriginalLayout, applyBankOriginalLayoutHd } from './effects/bank_layouts';
import { applyBankExpansionControllerLayoutHd, applyBankOriginalControllerLayoutHd, applyControllerOverlayHd } from './effects/controller_layouts';
import { applyInventoryChanges } from './effects/inventory';
import { applyProfileHd, applyProfileLv } from './effects/profiles';
import { loadConfig } from './mod_config';


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
