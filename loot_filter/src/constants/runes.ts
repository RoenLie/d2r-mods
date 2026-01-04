/**
 * Shared rune constants and tier definitions
 * Used by both rune filters and light pillar effects
 */

// Rune IDs (El=1 to Zod=33)
export enum RuneId {
	EL = 1,  ELD = 2,   TIR = 3,   NEF = 4,  ETH = 5,    ITH = 6,  TAL = 7, RAL = 8,
	ORT = 9, THUL = 10, AMN = 11,  SOL = 12, SHAEL = 13, DOL = 14, HEL = 15,
	IO = 16, LUM = 17,  KO = 18,   FAL = 19, LEM = 20,   PUL = 21, UM = 22,
	MAL = 23, IST = 24, GUL = 25,  VEX = 26, OHM = 27,   LO = 28,  SUR = 29,
	BER = 30, JAH = 31, CHAM = 32, ZOD = 33,
}

export interface RuneData {
	id:   RuneId;
	name: string;
}

// Low tier: El(1) to Dol(14), except Ral(8)
export const LOW_RUNES: RuneData[] = [
	{ id: RuneId.EL,    name: 'El'    },
	{ id: RuneId.ELD,   name: 'Eld'   },
	{ id: RuneId.TIR,   name: 'Tir'   },
	{ id: RuneId.NEF,   name: 'Nef'   },
	{ id: RuneId.ETH,   name: 'Eth'   },
	{ id: RuneId.ITH,   name: 'Ith'   },
	{ id: RuneId.TAL,   name: 'Tal'   },
	{ id: RuneId.ORT,   name: 'Ort'   },
	{ id: RuneId.THUL,  name: 'Thul'  },
	{ id: RuneId.AMN,   name: 'Amn'   },
	{ id: RuneId.SOL,   name: 'Sol'   },
	{ id: RuneId.SHAEL, name: 'Shael' },
	{ id: RuneId.DOL,   name: 'Dol'   },
];

// Low-Mid tier: Ral(8), Hel(15) to Fal(19)
export const LOW_MID_RUNES: RuneData[] = [
	{ id: RuneId.RAL, name: 'Ral' },
	{ id: RuneId.HEL, name: 'Hel' },
	{ id: RuneId.IO,  name: 'Io'  },
	{ id: RuneId.LUM, name: 'Lum' },
	{ id: RuneId.KO,  name: 'Ko'  },
	{ id: RuneId.FAL, name: 'Fal' },
];

// Mid tier: Lem(20) to Gul(25)
export const MID_RUNES: RuneData[] = [
	{ id: RuneId.LEM, name: 'Lem' },
	{ id: RuneId.PUL, name: 'Pul' },
	{ id: RuneId.UM,  name: 'Um'  },
	{ id: RuneId.MAL, name: 'Mal' },
	{ id: RuneId.IST, name: 'Ist' },
	{ id: RuneId.GUL, name: 'Gul' },
];

// High tier: Vex(26) to Zod(33)
export const HIGH_RUNES: RuneData[] = [
	{ id: RuneId.VEX,  name: 'Vex'  },
	{ id: RuneId.OHM,  name: 'Ohm'  },
	{ id: RuneId.LO,   name: 'Lo'   },
	{ id: RuneId.SUR,  name: 'Sur'  },
	{ id: RuneId.BER,  name: 'Ber'  },
	{ id: RuneId.JAH,  name: 'Jah'  },
	{ id: RuneId.CHAM, name: 'Cham' },
	{ id: RuneId.ZOD,  name: 'Zod'  },
];


// Translated rune affixes that should be stripped when shouldHideAffix is enabled
// These are prefixes and suffixes that appear in various localizations
export const RUNE_AFFIXES = [
	// prefixes
	'Rune ',
	'Runa ',
	'Руна ',
	'符文：',
	// suffixes
	' Rune',
	'-Rune',
	' 룬',
	'・ルーン',
	'符文',
];
