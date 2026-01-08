/**
 * Configuration module - loads and validates settings from D2RMM.config
 * Simple object-based configuration, no static classes.
 */

import type { ModConfig as GeneratedModConfig } from './generated_types';


// Drop sounds configuration
export interface DropSoundsConfig {
	enabled:          GeneratedModConfig['IsDropSoundsEnabled'];
	excludeForHidden: GeneratedModConfig['ShouldExcludeHiddenItemsForDs'];
	runes: {
		low:    GeneratedModConfig['DropSoundRunesLow'];
		lowMid: GeneratedModConfig['DropSoundRunesLowMid'];
		mid:    GeneratedModConfig['DropSoundRunesMid'];
		high:   GeneratedModConfig['DropSoundRunesHigh'];
	};
	questEndgame: {
		questItems: GeneratedModConfig['DropSoundQuest'];
		essences:   GeneratedModConfig['DropSoundEssences'];
		tokens:     GeneratedModConfig['DropSoundToken'];
		keys:       GeneratedModConfig['DropSoundKeys'];
		organs:     GeneratedModConfig['DropSoundOrgans'];
		standard:   GeneratedModConfig['DropSoundStandard'];
	};
}

// Light pillars configuration
export interface LightPillarsConfig {
	enabled:          GeneratedModConfig['IsLightPillarsEnabled'];
	excludeForHidden: GeneratedModConfig['ShouldExcludeHiddenItemsForLp'];
	runes: {
		low:    GeneratedModConfig['ShouldAddLightPillarRunesLow'];
		lowMid: GeneratedModConfig['ShouldAddLightPillarRunesLowMid'];
		mid:    GeneratedModConfig['ShouldAddLightPillarRunesMid'];
		high:   GeneratedModConfig['ShouldAddLightPillarRunesHigh'];
	};
	jewelry: {
		rings:      GeneratedModConfig['ShouldAddLightPillarRings'];
		amulets:    GeneratedModConfig['ShouldAddLightPillarAmulets'];
		gemsJewels: GeneratedModConfig['ShouldAddLightPillarGemsJewels'];
		charms:     GeneratedModConfig['ShouldAddLightPillarCharms'];
	};
	questEndgame: {
		questItems:   GeneratedModConfig['ShouldAddLightPillarQuestItems'];
		questWeapons: GeneratedModConfig['ShouldAddLightPillarQuestWeapons'];
		essences:     GeneratedModConfig['ShouldAddLightPillarEssences'];
		tokens:       GeneratedModConfig['ShouldAddLightPillarTokens'];
		keys:         GeneratedModConfig['ShouldAddLightPillarKeys'];
		organs:       GeneratedModConfig['ShouldAddLightPillarOrgans'];
		standard:     GeneratedModConfig['ShouldAddLightPillarStandard'];
	};
}

// Item level configuration
export interface ItemLevelConfig {
	enabled:           GeneratedModConfig['IsShowItemLevelEnabled'];
	hideOnBigTooltips: GeneratedModConfig['IsHideIlvlOnBttEnabled'];
}

// ProfileHD configuration (_profilehd.json)
export interface ProfileHdConfig {
	enabled:       GeneratedModConfig['IsTooltipModsEnabled'];
	etherealColor: {
		enabled: GeneratedModConfig['IsEthItemsColorEnabled'];
		color:   GeneratedModConfig['EthItemsColor'];
	};
	goldColor:      GeneratedModConfig['GoldTooltipColors'];
	tooltipOpacity: GeneratedModConfig['TooltipOpacity'];
	tooltipSize:    GeneratedModConfig['TooltipSize'];
}

// Filter configuration
export interface FilterConfig {
	enabled: GeneratedModConfig['IsFilterEnabled'];
	gems: {
		mode:             GeneratedModConfig['JewelryGemsFilter'];
		enableHighlight:  GeneratedModConfig['JewelryGemsHighlight'];
		enableBigTooltip: boolean;
	};
	potions: {
		mode: GeneratedModConfig['HealingPotions'];
	};
	runes: {
		isEnabled:       GeneratedModConfig['IsRunesSectionEnabled'];
		shouldHideAffix: GeneratedModConfig['ShouldHideRuneAffix'];
		shouldAddNumber: GeneratedModConfig['ShouldAddRuneNumbers'];
		low: {
			isVisible:      GeneratedModConfig['ShouldShowRunesLow'];
			highlight:      GeneratedModConfig['RunesLowHighlight'];
			highlightColor: GeneratedModConfig['RunesLowColorHighlight'];
			nameColor:      GeneratedModConfig['RunesLowColorName'];
			numberColor:    GeneratedModConfig['RunesLowColorNumber'];
			bigTooltip:     GeneratedModConfig['RunesLowBigTooltip'];
		};
		lowMid: {
			isVisible:      GeneratedModConfig['ShouldShowRunesLowMid'];
			highlight:      GeneratedModConfig['RunesLowMidHighlight'];
			highlightColor: GeneratedModConfig['RunesLowMidColorHighlight'];
			nameColor:      GeneratedModConfig['RunesLowMidColorName'];
			numberColor:    GeneratedModConfig['RunesLowMidColorNumber'];
			bigTooltip:     GeneratedModConfig['RunesLowMidBigTooltip'];
		};
		mid: {
			isVisible:      GeneratedModConfig['ShouldShowRunesMid'];
			highlight:      GeneratedModConfig['RunesMidHighlight'];
			highlightColor: GeneratedModConfig['RunesMidColorHighlight'];
			nameColor:      GeneratedModConfig['RunesMidColorName'];
			numberColor:    GeneratedModConfig['RunesMidColorNumber'];
			bigTooltip:     GeneratedModConfig['RunesMidBigTooltip'];
		};
		high: {
			isVisible:      GeneratedModConfig['ShouldShowRunesHigh'];
			highlight:      GeneratedModConfig['RunesHighHighlight'];
			highlightColor: GeneratedModConfig['RunesHighColorHighlight'];
			nameColor:      GeneratedModConfig['RunesHighColorName'];
			numberColor:    GeneratedModConfig['RunesHighColorNumber'];
			bigTooltip:     GeneratedModConfig['RunesHighBigTooltip'];
		};
	};
	scrollsKeys: {
		scrollsTomes: GeneratedModConfig['ScrollsTomes'];
		arrowsBolts:  GeneratedModConfig['ArrowsBolts'];
		keys:         GeneratedModConfig['Keys'];
	};
	gold: {
		suffix:        GeneratedModConfig['GoldSuffix'];
		tooltipColors: GeneratedModConfig['GoldTooltipColors'];
	};
	buffPotions:     GeneratedModConfig['BuffPotions'];
	throwingPotions: GeneratedModConfig['ThrowingPotions'];
	jewels: {
		highlight: GeneratedModConfig['FacetsHighlights'];
	};
	charms: {
		highlightMagic:  GeneratedModConfig['JewelryCharmsMagicHighlight'];
		highlightUnique: GeneratedModConfig['JewelryCharmsUniqueHighlight'];
	};
	questEndgame: {
		cubeHighlight:     GeneratedModConfig['IsCubeHighlightExcluded'];
		questHighlight:    GeneratedModConfig['QuestEndgameHighlightsQuest'];
		showEssences:      GeneratedModConfig['IsEssencesVisible'];
		essencesHighlight: GeneratedModConfig['QuestEndgameHighlightsEssences'];
		tokenHighlight:    GeneratedModConfig['QuestEndgameHighlightsTokens'];
		keysHighlight:     GeneratedModConfig['QuestEndgameHighlightsKeys'];
		organsHighlight:   GeneratedModConfig['QuestEndgameHighlightsOrgans'];
		showStandard:      GeneratedModConfig['IsStandardOfHeroesVisible'];
		standardHighlight: GeneratedModConfig['QuestEndgameHighlightsStandard'];
		bigTooltips: {
			questItems: GeneratedModConfig['BigTooltipQuestItems'];
			essences:   GeneratedModConfig['BigTooltipEssences'];
			tokens:     GeneratedModConfig['BigTooltipTokens'];
			keys:       GeneratedModConfig['BigTooltipKeys'];
			organs:     GeneratedModConfig['BigTooltipOrgans'];
			standard:   GeneratedModConfig['BigTooltipStandard'];
		};
	};
	equipmentQuality: {
		enabled:           GeneratedModConfig['IsShowItemQualityEnabled'];
		style:             GeneratedModConfig['ItemQualityStyleSingle'];
		brackets:          GeneratedModConfig['ItemQualityBrackets'];
		placement:         GeneratedModConfig['ItemQualityPlacement'];
		customNormal:      GeneratedModConfig['ItemQualityCustomNormal'];
		customExceptional: GeneratedModConfig['ItemQualityCustomExceptional'];
		customElite:       GeneratedModConfig['ItemQualityCustomElite'];
	};
	itemAffixes: {
		enabled:       GeneratedModConfig['IsSupInferiorPrefixesEnabled'];
		style:         GeneratedModConfig['SupInfPrefixesStyle'];
		inferiorColor: GeneratedModConfig['InferiorItemsColor'];
	};
	customFilterList: {
		enabled: GeneratedModConfig['IsCustomFilterListEnabled'];
	};
	removeClutter: {
		all:               GeneratedModConfig['RemoveClutterAllEnabled'];
		arrowsBolts:       GeneratedModConfig['RemoveClutterArrowsBolts'];
		scrolls:           GeneratedModConfig['RemoveClutterScrolls'];
		keys:              GeneratedModConfig['RemoveClutterKeys'];
		buffPotions:       GeneratedModConfig['RemoveClutterBuffPotions'];
		lowHealingPotions: GeneratedModConfig['RemoveClutterLowHealingPotions'];
		lowManaPotions:    GeneratedModConfig['RemoveClutterLowManaPotions'];
	};
	forceRejuvenation: {
		enabled:        GeneratedModConfig['ForceRejuvenationEnabled'];
		type:           GeneratedModConfig['ForceRejuvenationType'];
		dropMultiplier: GeneratedModConfig['ForceRejuvenationDropMultiplier'];
	};
	vendorRejuvenation: {
		enabled: GeneratedModConfig['VendorRejuvenationEnabled'];
	};
}

// Main configuration
export interface ModConfig {
	dropSounds:   DropSoundsConfig;
	lightPillars: LightPillarsConfig;
	itemLevel:    ItemLevelConfig;
	profileHd:    ProfileHdConfig;
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
		profileHd: {
			enabled:       typedConfig.IsTooltipModsEnabled,
			etherealColor: {
				enabled: typedConfig.IsEthItemsColorEnabled,
				color:   typedConfig.EthItemsColor,
			},
			goldColor:      typedConfig.GoldTooltipColors,
			tooltipOpacity: typedConfig.TooltipOpacity,
			tooltipSize:    typedConfig.TooltipSize,
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
					bigTooltip:     typedConfig.RunesLowBigTooltip,
				},
				lowMid: {
					isVisible:      typedConfig.ShouldShowRunesLowMid,
					highlight:      typedConfig.RunesLowMidHighlight,
					highlightColor: typedConfig.RunesLowMidColorHighlight,
					nameColor:      typedConfig.RunesLowMidColorName,
					numberColor:    typedConfig.RunesLowMidColorNumber,
					bigTooltip:     typedConfig.RunesLowMidBigTooltip,
				},
				mid: {
					isVisible:      typedConfig.ShouldShowRunesMid,
					highlight:      typedConfig.RunesMidHighlight,
					highlightColor: typedConfig.RunesMidColorHighlight,
					nameColor:      typedConfig.RunesMidColorName,
					numberColor:    typedConfig.RunesMidColorNumber,
					bigTooltip:     typedConfig.RunesMidBigTooltip,
				},
				high: {
					isVisible:      typedConfig.ShouldShowRunesHigh,
					highlight:      typedConfig.RunesHighHighlight,
					highlightColor: typedConfig.RunesHighColorHighlight,
					nameColor:      typedConfig.RunesHighColorName,
					numberColor:    typedConfig.RunesHighColorNumber,
					bigTooltip:     typedConfig.RunesHighBigTooltip,
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
				bigTooltips:       {
					questItems: typedConfig.BigTooltipQuestItems,
					essences:   typedConfig.BigTooltipEssences,
					tokens:     typedConfig.BigTooltipTokens,
					keys:       typedConfig.BigTooltipKeys,
					organs:     typedConfig.BigTooltipOrgans,
					standard:   typedConfig.BigTooltipStandard,
				},
			},
			equipmentQuality: {
				enabled:           typedConfig.IsShowItemQualityEnabled,
				style:             typedConfig.ItemQualityStyleSingle,
				brackets:          typedConfig.ItemQualityBrackets,
				placement:         typedConfig.ItemQualityPlacement,
				customNormal:      typedConfig.ItemQualityCustomNormal,
				customExceptional: typedConfig.ItemQualityCustomExceptional,
				customElite:       typedConfig.ItemQualityCustomElite,
			},
			itemAffixes: {
				enabled:       typedConfig.IsSupInferiorPrefixesEnabled,
				style:         typedConfig.SupInfPrefixesStyle,
				inferiorColor: typedConfig.InferiorItemsColor,
			},
			customFilterList: {
				enabled: typedConfig.IsCustomFilterListEnabled,
			},
			removeClutter: {
				all:               typedConfig.RemoveClutterAllEnabled,
				arrowsBolts:       typedConfig.RemoveClutterArrowsBolts,
				scrolls:           typedConfig.RemoveClutterScrolls,
				keys:              typedConfig.RemoveClutterKeys,
				buffPotions:       typedConfig.RemoveClutterBuffPotions,
				lowHealingPotions: typedConfig.RemoveClutterLowHealingPotions,
				lowManaPotions:    typedConfig.RemoveClutterLowManaPotions,
			},
			forceRejuvenation: {
				enabled:        typedConfig.ForceRejuvenationEnabled,
				type:           typedConfig.ForceRejuvenationType,
				dropMultiplier: typedConfig.ForceRejuvenationDropMultiplier,
			},
			vendorRejuvenation: {
				enabled: typedConfig.VendorRejuvenationEnabled,
			},
		},
	};
}
