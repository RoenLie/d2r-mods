/**
 * Configuration module - loads and validates settings from D2RMM.config
 */

import { DEFAULT_TAB_NAMES } from '../constants/layout';
import type { ModConfig as GeneratedModConfig } from '../generated_types';


// Stash configuration
export interface StashConfig {
	customTabs: {
		enabled:  boolean;
		personal: string;
		shared1:  string;
		shared2:  string;
		shared3:  string;
	};
}

/**
 * Load configuration from D2RMM.config
 * This is where all the messy config access happens, isolated in one place.
 */
export function loadConfig(): StashConfig {
	const typedConfig = config as unknown as GeneratedModConfig;

	return {
		customTabs: {
			enabled:  typedConfig.isCustomTabsEnabled,
			personal: typedConfig.tabNamePersonal,
			shared1:  typedConfig.tabNameShared1,
			shared2:  typedConfig.tabNameShared2,
			shared3:  typedConfig.tabNameShared3,
		},
	};
}

/**
 * Get processed tab names based on configuration
 */
export function getTabNames(config: StashConfig): string[] {
	if (!config.customTabs.enabled)
		return [ ...DEFAULT_TAB_NAMES ];

	return [
		config.customTabs.personal || DEFAULT_TAB_NAMES[0],
		config.customTabs.shared1  || DEFAULT_TAB_NAMES[1],
		config.customTabs.shared2  || DEFAULT_TAB_NAMES[2],
		config.customTabs.shared3  || DEFAULT_TAB_NAMES[3],
	];
}
