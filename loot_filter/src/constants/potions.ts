// Healing potion item codes
export const HealingPotionCodes = {
	MINOR:   'hp1',
	LIGHT:   'hp2',
	NORMAL:  'hp3',
	GREATER: 'hp4',
	SUPER:   'hp5',
} as const;

// Mana potion item codes
export const ManaPotionCodes = {
	MINOR:   'mp1',
	LIGHT:   'mp2',
	NORMAL:  'mp3',
	GREATER: 'mp4',
	SUPER:   'mp5',
} as const;

// Rejuvenation potion item codes
export const RejuvPotionCodes = {
	SMALL: 'rvs',
	FULL:  'rvl',
} as const;

// Buff potion item codes
export const BuffPotionCodes = {
	ANTIDOTE: 'yps',
	THAWING:  'wms',
	STAMINA:  'vps',
} as const;

// Throwing potion item codes
export const ThrowingPotionCodes = {
	STRANGLING_GAS: 'gpl',
	CHOKING_GAS:    'gpm',
	RANCID_GAS:     'gps',
	FULMINATING:    'opl',
	EXPLODING:      'opm',
	OIL:            'ops',
} as const;

// All potion codes combined
export const AllPotionCodes = {
	...HealingPotionCodes,
	...ManaPotionCodes,
	...RejuvPotionCodes,
	...BuffPotionCodes,
	...ThrowingPotionCodes,
} as const;
