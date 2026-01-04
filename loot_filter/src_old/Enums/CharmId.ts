/**
 * Diablo 2 charm item identifiers.
 *
 * Small charms (1x1), Large charms (1x2), and Grand charms (1x3)
 * can have random affixes. Unique charms like Annihilus and Hellfire
 * Torch have fixed properties.
 *
 * @see https://diablo2.diablowiki.net/Charms
 */
export enum CharmId {
	/** Small Charm (1x1 inventory size) */
	SMALL = 'cm1',
	/** Large Charm (1x2 inventory size) */
	LARGE = 'cm2',
	/** Grand Charm (1x3 inventory size) */
	GRAND = 'cm3',
	/** Annihilus - Unique Small Charm */
	ANNIHILUS = 'Annihilus',
	/** Hellfire Torch - Unique Large Charm */
	TORCH = 'Hellfire Torch',
	/** Gheed's Fortune - Unique Grand Charm */
	GHEEDS = "Gheed's Fortune",
}

/**
 * Sunder Charm identifiers (D2R 2.5+).
 *
 * Sunder Charms break enemy immunities but apply penalties.
 * Each charm is associated with a specific damage type.
 *
 * @see https://diablo2.io/sunder-charms-t914636.html
 */
export enum SunderCharmId {
	/** Black Cleft - Magic Immunity Sunder */
	MAGIC = 'Black Cleft',
	/** Bone Break - Physical Immunity Sunder */
	PHYSICAL = 'Bone Break',
	/** Cold Rupture - Cold Immunity Sunder */
	COLD = 'Cold Rupture',
	/** Crack of the Heavens - Lightning Immunity Sunder */
	LIGHTNING = 'Crack of the Heavens',
	/** Flame Rift - Fire Immunity Sunder */
	FIRE = 'Flame Rift',
	/** Rotting Fissure - Poison Immunity Sunder */
	POISON = 'Rotting Fissure',
}
