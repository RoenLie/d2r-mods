import { SUNDER_COLOR } from './colors';


// Charm item codes (unidentified)
export const CharmCodes = {
	SMALL: 'cm1',
	LARGE: 'cm2',
	GRAND: 'cm3',
} as const;

// Charm sizes for display
export const CharmSizes = {
	[CharmCodes.SMALL]: 'Small',
	[CharmCodes.LARGE]: 'Large',
	[CharmCodes.GRAND]: 'Grand',
} as const;

// LoD unique charms
export const LodUniqueCharms = [
	'Annihilus',
	'Hellfire Torch',
	"Gheed's Fortune",
];

// Sunder charms with their element colors
export const SunderCharms = [
	{ id: 'Black Cleft',          color: SUNDER_COLOR.MAGIC },     // Magic - gray
	{ id: 'Bone Break',           color: SUNDER_COLOR.PHYSICAL },  // Physical - white
	{ id: 'Cold Rupture',         color: SUNDER_COLOR.COLD },      // Cold - sky blue
	{ id: 'Crack of the Heavens', color: SUNDER_COLOR.LIGHTNING }, // Lightning - yellow
	{ id: 'Flame Rift',           color: SUNDER_COLOR.FIRE },      // Fire - red
	{ id: 'Rotting Fissure',      color: SUNDER_COLOR.POISON },    // Poison - green
];

// Jewel item codes
export const JewelCodes = {
	JEWEL:         'jew',
	RAINBOW_FACET: 'Rainbow Facet',
} as const;
