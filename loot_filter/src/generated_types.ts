/* eslint-disable */
/**
 * AUTO-GENERATED from mod.json
 * DO NOT EDIT MANUALLY - Run `node generate_mod_json.ts` to regenerate
 */

export interface ModConfig {
	/** @default true */
	IsFilterEnabled: boolean;
	/** @default 'wg' */
	GoldTooltipColors: 'none' | 'wg' | 'gw' | 'g';
	/** @default 'g' */
	GoldSuffix: 'none' | 'g' | 'hide';
	/** @default 'all' */
	HealingPotions: 'none' | 'all' | 'hide3' | 'hide4' | 'hide3sr' | 'hide4sr' | 'sfr' | 'fr' | 'hide';
	/** @default 'all' */
	BuffPotions: 'none' | 'all' | 'hide';
	/** @default 'all' */
	ThrowingPotions: 'none' | 'all' | 'hide';
	/** @default 'all' */
	ScrollsTomes: 'none' | 'all' | 'hide';
	/** @default 'all' */
	ArrowsBolts: 'none' | 'all' | 'arw' | 'blt' | 'hide';
	/** @default 'none' */
	Keys: 'none' | 'hide';
	/** @default true */
	IsRunesSectionEnabled: boolean;
	/** @default true */
	ShouldHideRuneAffix: boolean;
	/** @default true */
	ShouldAddRuneNumbers: boolean;
	/** @default true */
	ShouldShowRunesLow: boolean;
	/** @default '0' */
	RunesLowHighlight: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default 'none' */
	RunesLowColorHighlight: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default '8' */
	RunesLowColorName: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default '8' */
	RunesLowColorNumber: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default '0' */
	RunesLowBigTooltip: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default true */
	ShouldShowRunesLowMid: boolean;
	/** @default '2' */
	RunesLowMidHighlight: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default 'none' */
	RunesLowMidColorHighlight: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default '8' */
	RunesLowMidColorName: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default '8' */
	RunesLowMidColorNumber: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default '1' */
	RunesLowMidBigTooltip: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default true */
	ShouldShowRunesMid: boolean;
	/** @default '3' */
	RunesMidHighlight: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default 'none' */
	RunesMidColorHighlight: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default ';' */
	RunesMidColorName: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default ';' */
	RunesMidColorNumber: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default '3' */
	RunesMidBigTooltip: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default true */
	ShouldShowRunesHigh: boolean;
	/** @default '5' */
	RunesHighHighlight: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default ';' */
	RunesHighColorHighlight: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default ';' */
	RunesHighColorName: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default ';' */
	RunesHighColorNumber: 'none' | '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default '3' */
	RunesHighBigTooltip: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default 'all' */
	JewelryGemsFilter: 'all' | 'flawless' | 'perfect' | 'hide';
	/** @default true */
	JewelryGemsHighlight: boolean;
	/** @default '0' */
	JewelryGemsBigTooltips: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default 'rainbow' */
	FacetsHighlights: 'none' | 'highlight' | 'rainbow';
	/** @default '0' */
	FacetsBigTooltips: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default true */
	JewelryCharmsMagicHighlight: boolean;
	/** @default 'hl-sa' */
	JewelryCharmsUniqueHighlight: 'none' | 'hl' | 'hl-sa';
	/** @default '0' */
	JewelryCharmsUniqueBigTooltips: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default true */
	IsEssencesVisible: boolean;
	/** @default true */
	IsStandardOfHeroesVisible: boolean;
	/** @default true */
	IsCubeHighlightExcluded: boolean;
	/** @default '5' */
	QuestEndgameHighlightsQuest: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default '0' */
	QuestEndgameHighlightsEssences: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default '3' */
	QuestEndgameHighlightsTokens: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default '5' */
	QuestEndgameHighlightsKeys: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default '5' */
	QuestEndgameHighlightsOrgans: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default '0' */
	QuestEndgameHighlightsStandard: '0' | '1' | '2' | '3' | '4' | '5';
	/** @default '3' */
	BigTooltipQuestItems: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default '0' */
	BigTooltipEssences: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default '3' */
	BigTooltipTokens: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default '3' */
	BigTooltipKeys: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default '3' */
	BigTooltipOrgans: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default '0' */
	BigTooltipStandard: '0' | '1' | '2' | '3' | '4' | '5' | '6';
	/** @default true */
	IsShowItemLevelEnabled: boolean;
	/** @default true */
	ShouldFixItemLevelIndentation: boolean;
	/** @default true */
	IsHideIlvlOnBttEnabled: boolean;
	/** @default true */
	IsShowItemQualityEnabled: boolean;
	/** @default 'suffix' */
	ItemQualityPlacement: 'prefix' | 'suffix' | 'both';
	/** @default 'lowercase' */
	ItemQualityStyleSingle: 'lowercase' | 'uppercase' | 'custom';
	/** @default '[N]' */
	ItemQualityCustomNormal: any;
	/** @default '[X]' */
	ItemQualityCustomExceptional: any;
	/** @default '[E]' */
	ItemQualityCustomElite: any;
	/** @default 'square' */
	ItemQualityBrackets: 'none' | 'square' | 'round' | 'curly' | 'angle';
	/** @default 'dashes' */
	ItemQualityStyleDouble: 'dots' | 'dashes' | 'custom';
	/** @default true */
	IsSupInferiorPrefixesEnabled: boolean;
	/** @default 'plusminus' */
	SupInfPrefixesStyle: 'plusminus' | 'supinf';
	/** @default 'none' */
	InferiorItemsColor: 'none' | '5' | '6';
	/** @default false */
	IsEthItemsColorEnabled: boolean;
	/** @default 'LightTeal' */
	EthItemsColor: 'Beige' | 'Black' | 'DarkGreen' | 'Green' | 'LightBlue' | 'LightGray' | 'LightPurple' | 'LightRed' | 'LightTeal' | 'Red' | 'VeryLightGray' | 'White';
	/** @default '*' */
	HighlightCharacter: ' ' | '*' | '=' | '+' | '-' | 'x' | 'X' | 'o' | 'O' | '0' | '~' | '!' | '@' | '#' | '$' | '%' | '&' | 'custom';
	/** @default '1' */
	DefaultHighlightColor: '0' | '=' | 'I' | '5' | '6' | 'U' | '1' | 'S' | '2' | 'C' | '<' | 'A' | 'N' | 'T' | 'P' | '3' | '9' | 'R' | '8' | 'O' | ';' | '4' | '7' | 'M';
	/** @default 0 */
	HiddenItemTooltipSize: number;
	/** @default true */
	IsCustomFilterListEnabled: boolean;
	/** @default true */
	IsLightPillarsEnabled: boolean;
	/** @default true */
	ShouldExcludeHiddenItemsForLp: boolean;
	/** @default true */
	ShouldAddLightPillarRunesLow: boolean;
	/** @default true */
	ShouldAddLightPillarRunesLowMid: boolean;
	/** @default true */
	ShouldAddLightPillarRunesMid: boolean;
	/** @default true */
	ShouldAddLightPillarRunesHigh: boolean;
	/** @default true */
	ShouldAddLightPillarRings: boolean;
	/** @default true */
	ShouldAddLightPillarAmulets: boolean;
	/** @default true */
	ShouldAddLightPillarGemsJewels: boolean;
	/** @default true */
	ShouldAddLightPillarCharms: boolean;
	/** @default true */
	ShouldAddLightPillarQuestItems: boolean;
	/** @default true */
	ShouldAddLightPillarQuestWeapons: boolean;
	/** @default true */
	ShouldAddLightPillarEssences: boolean;
	/** @default true */
	ShouldAddLightPillarTokens: boolean;
	/** @default true */
	ShouldAddLightPillarKeys: boolean;
	/** @default true */
	ShouldAddLightPillarOrgans: boolean;
	/** @default true */
	ShouldAddLightPillarStandard: boolean;
	/** @default true */
	IsDropSoundsEnabled: boolean;
	/** @default true */
	ShouldExcludeHiddenItemsForDs: boolean;
	/** @default 'default' */
	DropSoundRunesLow: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'default' */
	DropSoundRunesLowMid: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'hf_place' */
	DropSoundRunesMid: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'hf_place' */
	DropSoundRunesHigh: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'hf_smash' */
	DropSoundQuest: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'default' */
	DropSoundEssences: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'default' */
	DropSoundToken: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'hf_smash' */
	DropSoundKeys: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'hf_smash' */
	DropSoundOrgans: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default 'quest_done' */
	DropSoundStandard: 'default' | 'hostile' | 'hf_place' | 'hf_smash' | 'cairn_success' | 'portal_open' | 'quest_done' | 'custom';
	/** @default false */
	IsTooltipModsEnabled: boolean;
	/** @default 0.75 */
	TooltipOpacity: number;
	/** @default 33 */
	TooltipSize: number;
}