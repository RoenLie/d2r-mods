/**
 * Layout constants for stash expansion
 */

/** Stash IDs that need grid modifications */
export const STASH_IDS = new Set([ 'Bank Page 1', 'Big Bank Page 1', 'Bank Page2', 'Big Bank Page2' ]);

/** Expanded grid dimensions */
export const EXPANDED_GRID = { x: 16, y: 13 } as const;

/** Number of stash tabs */
export const TAB_COUNT = 4 as const;

/** Default tab names */
export const DEFAULT_TAB_NAMES = [ '@personal', '@shared', '@shared', '@shared' ] as const;
