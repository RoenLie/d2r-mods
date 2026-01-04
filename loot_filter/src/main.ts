/**
 * Main Entry Point for Loot Filter V2
 *
 * This is where everything comes together. Crystal clear execution flow:
 * 1. Load configuration
 * 2. Apply effects (drop sounds, light pillars, item levels)
 * 3. Apply filters (when implemented)
 *
 * No builders, no composers, no writers - just functions doing what they say.
 */

import { applyDropSounds } from './effects/drop_sounds';
import { applyItemLevels } from './effects/item_levels';
import { applyLightPillars } from './effects/light_pillars';
import { applyProfileHd } from './effects/profile_hd';
import { applyBuffThrowingPotionsFilter } from './filters/buff_throwing_potions_filter';
import { applyCustomFilterList } from './filters/custom_filter_list';
import { applyEquipmentQualityFilter } from './filters/equipment_quality_filter';
import { applyGemFilter } from './filters/gem_filter';
import { applyItemAffixesFilter } from './filters/item_affixes_filter';
import { applyJewelsCharmsFilter } from './filters/jewels_charms_filter';
import { applyPotionFilter } from './filters/potion_filter';
import { applyQuestEndgameFilter } from './filters/quest_endgame_filter';
import { applyRuneFilter } from './filters/rune_filter';
import { applyScrollsKeysFilter } from './filters/scrolls_keys_filter';
import { loadConfig } from './io/mod_config';
import { verifyD2RMMVersion } from './utils/verify_version.ts';

/**
 * Main execution function.
 *
 * You can read this and understand exactly what the mod does:
 * - Load settings
 * - Apply visual/audio effects
 * - Apply loot filters
 */
export function main(): void {
	//// Verify D2RMM version
	verifyD2RMMVersion([ 1, 7, 0 ]);

	//// Load configuration from D2RMM
	const config = loadConfig();

	//// Apply effects
	applyDropSounds(config.dropSounds);
	applyLightPillars(config.lightPillars);
	applyItemLevels(config.itemLevel);
	applyProfileHd(config.profileHd);

	//// Apply filters
	applyGemFilter(config.filter);
	applyPotionFilter(config.filter);
	applyRuneFilter(config.filter);
	applyScrollsKeysFilter(config.filter);
	applyBuffThrowingPotionsFilter(config.filter);
	applyJewelsCharmsFilter(config.filter);
	applyQuestEndgameFilter(config.filter);
	applyEquipmentQualityFilter(config.filter);
	applyItemAffixesFilter(config.filter);

	// Apply custom overrides last (power-user feature)
	applyCustomFilterList(config.filter);
}
