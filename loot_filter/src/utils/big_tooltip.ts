/**
 * Big Tooltip utility functions
 *
 * Big Tooltips add vertical spacing (newlines) and padding around item names.
 * They work in combination with highlights to create emphasized tooltips.
 *
 * Settings:
 * "0" = Disabled
 * "1" = Two Lines (single newline on one side)
 * "2" = Two Lines + Pick Up message
 * "3" = Three Lines (single newline on both sides) - DEFAULT
 * "4" = Four Lines + Pick Up message
 * "5" = Five Lines (double newlines on both sides)
 */

/**
 * Apply Big Tooltip formatting to a display name
 * @param displayName - The name with colors and highlights already applied
 * @param bigTooltipSetting - The Big Tooltip mode ("0"-"5")
 * @param highlightPattern - Optional highlight pattern for Pick Up message indentation
 * @returns The name wrapped with Big Tooltip newlines and padding
 */
export function applyBigTooltip(
	displayName: string,
	bigTooltipSetting: string,
	highlightPattern?: { prefix: string; suffix: string; },
): string {
	if (bigTooltipSetting === '0') // Disabled
		return displayName;

	const padding = '     '; // 5 spaces
	const pickUpMsg = 'ÿc;Pick Up'; // Purple "Pick Up" message

	// Calculate indent for Pick Up message based on highlight pattern
	let pickUpIndent = '';
	if (highlightPattern) {
		// Count characters in highlight prefix to align Pick Up message
		// This is a simplified version - OLD code has more complex logic
		const prefixLength = highlightPattern.prefix.length;
		if (prefixLength > 0)
			pickUpIndent = ' '.repeat(Math.min(prefixLength, 10));
	}

	// Newlines work "upside-down" in D2R: \n adds a line ABOVE, not below
	// So prefix goes at the end, suffix at the beginning
	switch (bigTooltipSetting) {
	case '1': // Two Lines (one newline)
		return `${ padding }${ displayName }${ padding }\n`;

	case '2': // Two Lines + Pick Up
		return `${ padding }${ displayName }${ padding }\n${ pickUpIndent }${ pickUpMsg }`;

	case '3': // Three Lines (default - one newline on each side)
		return `\n${ padding }${ displayName }${ padding }\n`;

	case '4': // Four Lines + Pick Up
		return `\n${ padding }${ displayName }${ padding }\n${ pickUpIndent }${ pickUpMsg }\n`;

	case '5': // Five Lines (two newlines on each side)
		return `\n\n${ padding }${ displayName }${ padding }\n\n`;

	default:
		return displayName;
	}
}
