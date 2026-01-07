/**
 * Layout Constants
 * All magic numbers and dimensions for the expanded inventory
 */

/**
 * Inventory grid dimensions
 */
export const INVENTORY_GRID = {
	WIDTH:  13,
	HEIGHT: 8,
} as const;

/**
 * Character classes that have inventory
 */
export const CHARACTER_CLASSES = [
	'Amazon',
	'Assassin',
	'Barbarian',
	'Druid',
	'Necromancer',
	'Paladin',
	'Sorceress',
];

/**
 * Dimension difference between original and expanded inventory
 */
export const DIMENSION_DELTA = {
	WIDTH: 1382 - 1162,
} as const;

/**
 * Profile HD rectangles for expanded inventory
 */
export const PROFILE_HD = {
	RIGHT_PANEL: {
		x:      -1394 - DIMENSION_DELTA.WIDTH,
		y:      -651,
		width:  1382,
		height: 1507,
	},
	PANEL_CLICK_CATCHER: {
		x:      0,
		y:      0,
		width:  1162,
		height: 1507,
	},
	RIGHT_HINGE: {
		x: 1076 + DIMENSION_DELTA.WIDTH + 20,
		y: 630,
	},
} as const;

/**
 * Profile LV rectangles for expanded inventory
 */
export const PROFILE_LV = {
	RIGHT_PANEL: {
		x:      -1346 - DIMENSION_DELTA.WIDTH * 1.16,
		y:      -856,
		width:  1382,
		height: 1507,
		scale:  1.16,
	},
} as const;

/**
 * Original layout HD adjustments
 */
export const ORIGINAL_LAYOUT_HD = {
	CLICK_CATCHER: {
		x:      0,
		y:      45,
		width:  1093,
		height: 1495,
	},
	TITLE_OFFSET: {
		x:      91 + DIMENSION_DELTA.WIDTH / 2,
		y:      64,
		width:  972,
		height: 71,
	},
	CLOSE_BUTTON_OFFSET_X: DIMENSION_DELTA.WIDTH,
	GRID_OFFSET:           {
		x: -37,
		y: -229,
	},
	SLOT_OFFSETS: {
		RIGHT_ARM:  { x: -14,  y: 12 },
		LEFT_ARM:   { x: 227,  y: 12 },
		TORSO:      { x: 101,  y: -229 },
		HEAD:       { x: -144, y: 12 },
		GLOVES:     { x: 231,  y: -233 },
		FEET:       { x: -26,  y: -231 },
		BELT:       { x: 101,  y: -234 },
		NECK:       { x: 99,   y: -182 },
		RIGHT_HAND: { x: 474,  y: -466 },
		LEFT_HAND:  { x: 232,  y: -466 },
	},
	GOLD_OFFSET: {
		x: -291,
		y: -1267,
	},
} as const;

/**
 * Expansion layout HD slot offsets
 */
export const EXPANSION_LAYOUT_HD = {
	SLOT_OFFSETS: {
		RIGHT_ARM: { x: -14, y: 12 },
		LEFT_ARM:  { x: 227, y: 12 },
	},
} as const;

/**
 * Controller Original Layout HD adjustments
 */
export const CONTROLLER_ORIGINAL_LAYOUT_HD = {
	BACKGROUND_OFFSET: {
		x: -166,
		y: -160,
	},
	GRID_OFFSET: {
		x: -132,
		y: -344,
	},
	SLOT_OFFSETS: {
		RIGHT_ARM:  { x: -99,  y: -60  },
		LEFT_ARM:   { x: 123,  y: -62  },
		TORSO:      { x: 6,    y: -199 },
		HEAD:       { x: -239, y: 21   },
		GLOVES:     { x: 146,  y: -282 },
		FEET:       { x: -130, y: -281 },
		BELT:       { x: 7,    y: -185 },
		NECK:       { x: -3,   y: -167 },
		RIGHT_HAND: { x: 389,  y: -417 },
		LEFT_HAND:  { x: 126,  y: -417 },
	},
	BELT_PANEL_OFFSET: {
		x: 15,
		y: 595,
	},
	GOLD_OFFSET: {
		x: -464,
		y: 20,
	},
} as const;

/**
 * Controller Expansion Layout HD slot offsets
 */
export const CONTROLLER_EXPANSION_LAYOUT_HD = {
	SLOT_OFFSETS: {
		RIGHT_ARM: { x: -99, y: -60 },
		LEFT_ARM:  { x: 123, y: -62 },
	},
} as const;
