/**
 * Rune identifiers (El through Zod, 1-33).
 *
 * Runes are socketable items that provide powerful bonuses.
 * Higher runes (High Runes) are extremely valuable for endgame runewords.
 */
export enum RuneId {
	EL = 1,
	ELD = 2,
	TIR = 3,
	NEF = 4,
	ETH = 5,
	ITH = 6,
	TAL = 7,
	RAL = 8,
	ORT = 9,
	THUL = 10,
	AMN = 11,
	SOL = 12,
	SHAEL = 13,
	DOL = 14,
	HEL = 15,
	IO = 16,
	LUM = 17,
	KO = 18,
	FAL = 19,
	LEM = 20,
	PUL = 21,
	UM = 22,
	MAL = 23,
	IST = 24,
	GUL = 25,
	VEX = 26,
	OHM = 27,
	LO = 28,
	SUR = 29,
	BER = 30,
	JAH = 31,
	CHAM = 32,
	ZOD = 33,
}

/**
 * Rune tier categories based on usefulness and value.
 *
 * Note: Ral, Hel, and Lem are promoted from their numeric tier
 * due to their practical usefulness in crafting and repairs.
 */
export enum RuneTierId {
	/** Low tier: El(1) to Dol(14), except Ral(8) */
	LOW = 1,
	/** Low-Mid tier: Ral(8), Hel(15) to Fal(19) */
	LOW_MID = 2,
	/** Mid tier: Lem(20) to Gul(25) */
	MID = 3,
	/** High tier: Vex(26) to Zod(33) */
	HIGH = 4,
}
