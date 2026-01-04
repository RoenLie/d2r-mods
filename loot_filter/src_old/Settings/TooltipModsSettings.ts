import { RawSettings } from './RawSettings';

export class TooltipModsSettings {

	static readonly isEnabled: boolean = RawSettings.tooltips.isTooltipModsEnabled;
	static readonly opacity:   number  = RawSettings.tooltips.tooltipOpacity;
	static readonly size:      number  = RawSettings.tooltips.tooltipSize;

}
