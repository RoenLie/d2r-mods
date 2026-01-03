/**
 * Configuration module - loads and validates settings from D2RMM.config
 * Simple object-based configuration, no static classes.
 */

import type { ModConfig as GeneratedModConfig } from '../generated_types';

// Drop sounds configuration
export interface DropSoundsConfig {
	enabled:          boolean;
	excludeForHidden: boolean;
	runes: {
		low:    string;
		lowMid: string;
		mid:    string;
		high:   string;
	};
	questEndgame: {
		questItems: string;
		essences:   string;
		tokens:     string;
		keys:       string;
		organs:     string;
		standard:   string;
	};
}

// Light pillars configuration
export interface LightPillarsConfig {
	enabled:          boolean;
	excludeForHidden: boolean;
	runes: {
		low:    boolean;
		lowMid: boolean;
		mid:    boolean;
		high:   boolean;
	};
	jewelry: {
		rings:      boolean;
		amulets:    boolean;
		gemsJewels: boolean;
		charms:     boolean;
	};
	questEndgame: {
		questItems:   boolean;
		questWeapons: boolean;
		essences:     boolean;
		tokens:       boolean;
		keys:         boolean;
		organs:       boolean;
		standard:     boolean;
	};
}

// Item level configuration
export interface ItemLevelConfig {
	enabled:           boolean;
	hideOnBigTooltips: boolean;
}

// Filter configuration
export interface FilterConfig {
	enabled: boolean;
	gems: {
		mode:             'all' | 'flawless' | 'perfect' | 'hide';
		enableHighlight:  boolean;
		enableBigTooltip: boolean;
	};
	potions: {
		mode: 'none' | 'all' | 'hide3' | 'hide4' | 'hide3sr' | 'hide4sr' | 'sfr' | 'fr' | 'hide';
	};
	runes: {
		isEnabled:       boolean;
		shouldHideAffix: boolean;
		shouldAddNumber: boolean;
		low: {
			isVisible:      boolean;
			highlight:      string;
			highlightColor: string;
			nameColor:      string;
			numberColor:    string;
		};
		lowMid: {
			isVisible:      boolean;
			highlight:      string;
			highlightColor: string;
			nameColor:      string;
			numberColor:    string;
		};
		mid: {
			isVisible:      boolean;
			highlight:      string;
			highlightColor: string;
			nameColor:      string;
			numberColor:    string;
		};
		high: {
			isVisible:      boolean;
			highlight:      string;
			highlightColor: string;
			nameColor:      string;
			numberColor:    string;
		};
	};
	scrollsKeys: {
		scrollsTomes: 'none' | 'all' | 'hide';
		arrowsBolts:  'none' | 'all' | 'arw' | 'blt' | 'hide';
		keys:         'none' | 'hide';
	};
	gold: {
		suffix:        'none' | 'g' | 'hide';
		tooltipColors: 'none' | 'wg' | 'gw' | 'g';
	};
	buffPotions:     'none' | 'all' | 'hide';
	throwingPotions: 'none' | 'all' | 'hide';
	jewels: {
		highlight: 'none' | 'rainbow' | 'highlight';
	};
	charms: {
		highlightMagic:  boolean;
		highlightUnique: 'none' | 'hl' | 'hl-sa';
	};
	questEndgame: {
		cubeHighlight:     boolean;
		questHighlight:    string;
		showEssences:      boolean;
		essencesHighlight: string;
		tokenHighlight:    string;
		keysHighlight:     string;
		organsHighlight:   string;
		showStandard:      boolean;
		standardHighlight: string;
	};
	equipmentQuality: {
		enabled:   boolean;
		style:     'lowercase' | 'uppercase' | 'custom';
		brackets:  'square' | 'round' | 'none';
		placement: 'prefix' | 'suffix' | 'both';
	};
	itemAffixes: {
		enabled:       boolean;
		style:         'plusminus' | 'supinf';
		inferiorColor: string;
	};
	customFilterList: {
		enabled: boolean;
	};
}

// Main configuration
export interface ModConfig {
	dropSounds:   DropSoundsConfig;
	lightPillars: LightPillarsConfig;
	itemLevel:    ItemLevelConfig;
	filter:       FilterConfig;
}

/**
 * Load configuration from D2RMM.config
 * This is where all the messy config access happens, isolated in one place.
 */
export function loadConfig(): ModConfig {
	const typedConfig = config as unknown as GeneratedModConfig;

	return {
		dropSounds: {
			enabled:          typedConfig.IsDropSoundsEnabled,
			excludeForHidden: typedConfig.ShouldExcludeHiddenItemsForDs,
			runes:            {
				low:    typedConfig.DropSoundRunesLow,
				lowMid: typedConfig.DropSoundRunesLowMid,
				mid:    typedConfig.DropSoundRunesMid,
				high:   typedConfig.DropSoundRunesHigh,
			},
			questEndgame: {
				questItems: typedConfig.DropSoundQuest,
				essences:   typedConfig.DropSoundEssences,
				tokens:     typedConfig.DropSoundToken,
				keys:       typedConfig.DropSoundKeys,
				organs:     typedConfig.DropSoundOrgans,
				standard:   typedConfig.DropSoundStandard,
			},
		},
		lightPillars: {
			enabled:          typedConfig.IsLightPillarsEnabled,
			excludeForHidden: typedConfig.ShouldExcludeHiddenItemsForLp,
			runes:            {
				low:    typedConfig.ShouldAddLightPillarRunesLow,
				lowMid: typedConfig.ShouldAddLightPillarRunesLowMid,
				mid:    typedConfig.ShouldAddLightPillarRunesMid,
				high:   typedConfig.ShouldAddLightPillarRunesHigh,
			},
			jewelry: {
				rings:      typedConfig.ShouldAddLightPillarRings,
				amulets:    typedConfig.ShouldAddLightPillarAmulets,
				gemsJewels: typedConfig.ShouldAddLightPillarGemsJewels,
				charms:     typedConfig.ShouldAddLightPillarCharms,
			},
			questEndgame: {
				questItems:   typedConfig.ShouldAddLightPillarQuestItems,
				questWeapons: typedConfig.ShouldAddLightPillarQuestWeapons,
				essences:     typedConfig.ShouldAddLightPillarEssences,
				tokens:       typedConfig.ShouldAddLightPillarTokens,
				keys:         typedConfig.ShouldAddLightPillarKeys,
				organs:       typedConfig.ShouldAddLightPillarOrgans,
				standard:     typedConfig.ShouldAddLightPillarStandard,
			},
		},
		itemLevel: {
			enabled:           typedConfig.IsShowItemLevelEnabled,
			hideOnBigTooltips: typedConfig.IsHideIlvlOnBttEnabled,
		},
		filter: {
			enabled: typedConfig.IsFilterEnabled,
			gems:    {
				mode:             typedConfig.JewelryGemsFilter,
				enableHighlight:  typedConfig.JewelryGemsHighlight,
				enableBigTooltip: typedConfig.JewelryGemsBigTooltips !== '0',
			},
			potions: {
				mode: typedConfig.HealingPotions,
			},
			runes: {
				isEnabled:       typedConfig.IsRunesSectionEnabled,
				shouldHideAffix: typedConfig.ShouldHideRuneAffix,
				shouldAddNumber: typedConfig.ShouldAddRuneNumbers,
				low:             {
					isVisible:      typedConfig.ShouldShowRunesLow,
					highlight:      typedConfig.RunesLowHighlight,
					highlightColor: typedConfig.RunesLowColorHighlight,
					nameColor:      typedConfig.RunesLowColorName,
					numberColor:    typedConfig.RunesLowColorNumber,
				},
				lowMid: {
					isVisible:      typedConfig.ShouldShowRunesLowMid,
					highlight:      typedConfig.RunesLowMidHighlight,
					highlightColor: typedConfig.RunesLowMidColorHighlight,
					nameColor:      typedConfig.RunesLowMidColorName,
					numberColor:    typedConfig.RunesLowMidColorNumber,
				},
				mid: {
					isVisible:      typedConfig.ShouldShowRunesMid,
					highlight:      typedConfig.RunesMidHighlight,
					highlightColor: typedConfig.RunesMidColorHighlight,
					nameColor:      typedConfig.RunesMidColorName,
					numberColor:    typedConfig.RunesMidColorNumber,
				},
				high: {
					isVisible:      typedConfig.ShouldShowRunesHigh,
					highlight:      typedConfig.RunesHighHighlight,
					highlightColor: typedConfig.RunesHighColorHighlight,
					nameColor:      typedConfig.RunesHighColorName,
					numberColor:    typedConfig.RunesHighColorNumber,
				},
			},
			scrollsKeys: {
				scrollsTomes: typedConfig.ScrollsTomes,
				arrowsBolts:  typedConfig.ArrowsBolts,
				keys:         typedConfig.Keys,
			},
			gold: {
				suffix:        typedConfig.GoldSuffix,
				tooltipColors: typedConfig.GoldTooltipColors,
			},
			buffPotions:     typedConfig.BuffPotions,
			throwingPotions: typedConfig.ThrowingPotions,
			jewels:          {
				highlight: typedConfig.FacetsHighlights,
			},
			charms: {
				highlightMagic:  typedConfig.JewelryCharmsMagicHighlight,
				highlightUnique: typedConfig.JewelryCharmsUniqueHighlight,
			},
			questEndgame: {
				cubeHighlight:     typedConfig.IsCubeHighlightExcluded,
				questHighlight:    typedConfig.QuestEndgameHighlightsQuest,
				showEssences:      typedConfig.IsEssencesVisible,
				essencesHighlight: typedConfig.QuestEndgameHighlightsEssences,
				tokenHighlight:    typedConfig.QuestEndgameHighlightsTokens,
				keysHighlight:     typedConfig.QuestEndgameHighlightsKeys,
				organsHighlight:   typedConfig.QuestEndgameHighlightsOrgans,
				showStandard:      typedConfig.IsStandardOfHeroesVisible,
				standardHighlight: typedConfig.QuestEndgameHighlightsStandard,
			},
			equipmentQuality: {
				enabled:   typedConfig.IsShowItemQualityEnabled,
				style:     typedConfig.ItemQualityStyleSingle,
				brackets:  typedConfig.ItemQualityBrackets,
				placement: typedConfig.ItemQualityPlacement,
			},
			itemAffixes: {
				enabled:       typedConfig.IsSupInferiorPrefixesEnabled,
				style:         typedConfig.SupInfPrefixesStyle,
				inferiorColor: typedConfig.InferiorItemsColor,
			},
			customFilterList: {
				enabled: typedConfig.IsCustomFilterListEnabled,
			},
		},
	};
}
