/**
 * ProfileHD Effect
 *
 * Applies custom settings to _profilehd.json:
 * - Ethereal item color customization
 * - Gold tooltip color
 * - Tooltip opacity and size
 */

import type { ProfileHdConfig } from '../mod_config';


/**
 * Apply ProfileHD modifications based on configuration.
 *
 * This modifies the _profilehd.json file which controls:
 * - TooltipStyle.EtherealColor: Color of ethereal items
 * - TooltipStyle.GoldColor: Color of gold text in tooltips
 * - TooltipStyle.inGameBackgroundColor: Tooltip background color with opacity
 * - TooltipFontSize: Size of tooltip text
 */
export function applyProfileHd(config: ProfileHdConfig): void {
	// Early return if nothing needs to be changed
	if (!shouldApplyChanges(config))
		return;

	const profileHd = gameFiles.profileHd.read();

	// Apply each modification
	if (config.etherealColor.enabled)
		applyEtherealColor(profileHd, config.etherealColor.color);

	if (config.goldColor !== 'none' && config.goldColor !== 'wg')
		applyGoldColor(profileHd, config.goldColor);

	if (config.enabled) {
		applyTooltipOpacity(profileHd, config.tooltipOpacity);
		applyTooltipSize(profileHd, config.tooltipSize);
	}

	gameFiles.profileHd.write(profileHd);
}

/**
 * Determine if any ProfileHD changes should be applied.
 */
function shouldApplyChanges(config: ProfileHdConfig): boolean {
	return config.etherealColor.enabled
		|| (config.goldColor !== 'none' && config.goldColor !== 'wg')
		|| config.enabled;
}

/**
 * Apply custom ethereal item color.
 */
function applyEtherealColor(profileHd: FileTypes.ProfileHd.File, colorName: string): void {
	const colorCode = `$FontColor${ colorName }`;
	profileHd.TooltipStyle.EtherealColor = colorCode;
}

/**
 * Apply custom gold color to tooltips.
 *
 * Gold color options:
 * - 'wg' or 'none': Use default (no change)
 * - 'g' or 'gw': Use CurrencyGold color
 */
function applyGoldColor(profileHd: any, goldColor: string): void {
	if (goldColor === 'g' || goldColor === 'gw')
		profileHd.TooltipStyle.GoldColor = '$FontColorCurrencyGold';
}

/**
 * Apply custom tooltip background opacity.
 */
function applyTooltipOpacity(profileHd: any, opacity: number): void {
	// inGameBackgroundColor is [R, G, B, opacity]
	profileHd.TooltipStyle.inGameBackgroundColor = [ 0, 0, 0, opacity ];
}

/**
 * Apply custom tooltip font size.
 */
function applyTooltipSize(profileHd: any, size: number): void {
	profileHd.TooltipFontSize = size;
}
