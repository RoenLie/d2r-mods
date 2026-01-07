/**
 * Configuration module - loads and validates settings from D2RMM.config
 */

import type { ModConfig as GeneratedModConfig } from './generated_types';


// Inventory configuration
export interface InventoryConfig {
	// Currently no configuration options
}

/**
 * Load configuration from D2RMM.config
 * This is where all the messy config access happens, isolated in one place.
 */
export function loadConfig(): InventoryConfig {
	const _typedConfig = config as unknown as GeneratedModConfig;

	return {
		// No config options yet
	};
}
