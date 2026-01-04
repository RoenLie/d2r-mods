/**
 * Entry Utilities
 *
 * Helper functions for working with JSON data entries.
 */

/**
 * Update all language properties in an entry to the SAME value.
 * Use this ONLY when you want identical text across all languages (e.g., hiding items).
 * Skips metadata properties (id, Key, code, *eol) and only updates string values.
 *
 * @param entry - The data entry to update
 * @param value - The new value to set for all language properties
 */
export function updateAllLanguages(entry: Record<string, unknown>, value: string): void {
	Object.keys(entry).forEach(key => {
		if (key === 'id' || key === 'Key' || key === 'code' || key === '*eol')
			return;
		if (typeof entry[key] === 'string')
			entry[key] = value;
	});
}

/**
 * Transform all language properties in an entry by applying a function to each.
 * This preserves language-specific text (e.g., Chinese remains Chinese, German remains German).
 * Use this when adding color codes, highlights, or other formatting that wraps existing text.
 * Skips metadata properties (id, Key, code, *eol) and only processes string values.
 *
 * @param entry - The data entry to transform
 * @param transformFn - Function that takes the original language text and returns the transformed text
 */
export function transformAllLanguages(entry: Record<string, unknown>, transformFn: (text: string) => string): void {
	Object.keys(entry).forEach(key => {
		if (key === 'id' || key === 'Key' || key === 'code' || key === '*eol')
			return;
		if (typeof entry[key] === 'string' && entry[key].trim() !== '')
			entry[key] = transformFn(entry[key] as string);
	});
}
