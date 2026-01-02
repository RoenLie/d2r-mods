import { DoubleHighlight } from '../../Models/Highlights/DoubleHighlight';
import { RawSettings } from '../RawSettings';
import { FilterSettings } from './FilterSettings';


const endgame = RawSettings.filter.questEndgame;
const endgameHighlights = RawSettings.filter.questEndgame.highlights;
const endgameTooltips = endgame.bigTooltips;
const endgameFilter = endgame.filter;

const highlightColor = FilterSettings.defaultHighlightColor;


export abstract class QuestEndgameSettings {

	static readonly filter = {
		shouldShowEssences: endgameFilter.shouldShowEssences,
		shouldShowStandard: endgameFilter.shouldShowStandard,
	};

	static readonly highlights = {
		isCubeEnabled: endgameHighlights.isCubeEnabled,
		quest:         DoubleHighlight.create(endgameHighlights.quest,    highlightColor, endgameTooltips.questItems),
		essences:      DoubleHighlight.create(endgameHighlights.essences, highlightColor, endgameTooltips.essences),
		token:         DoubleHighlight.create(endgameHighlights.tokens,   highlightColor, endgameTooltips.tokens),
		keys:          DoubleHighlight.create(endgameHighlights.keys,     highlightColor, endgameTooltips.keys),
		organs:        DoubleHighlight.create(endgameHighlights.organs,   highlightColor, endgameTooltips.organs),
		standard:      DoubleHighlight.create(endgameHighlights.standard, highlightColor, endgameTooltips.standard),
	};

	static readonly bigTooltips = {
		questItems: endgameTooltips.questItems,
		essences:   endgameTooltips.essences,
		tokens:     endgameTooltips.tokens,
		keys:       endgameTooltips.keys,
		organs:     endgameTooltips.organs,
		standard:   endgameTooltips.standard,
	};

}
