import { RuneId, RuneTierId } from '../Enums/RuneId';
import { Rune } from '../Models/Items/Rune';
import { RuneTier } from '../Models/Items/RuneTier';
import { DropSoundsSettings } from '../Settings/DropSoundsSettings';
import { RunesSettings } from '../Settings/Filter/RunesSettings';
import { LightPillarsSettings } from '../Settings/LightPillarsSettings';

/**
 * Factory for creating rune collections and tiers.
 *
 * Separates data definition (which runes exist) from initialization logic
 * (how they're configured with settings). This avoids circular dependencies
 * and allows lazy initialization.
 */
export class RuneTierFactory {

	/**
	 * Creates all rune tier instances with current settings.
	 * Should be called lazily to avoid loading settings at module init time.
	 */
	static createTiers(): RuneTier[] {
		return [
			new RuneTier(
				RuneTierId.LOW,
				this.createLowRunes(),
				RunesSettings.low.isVisible,
				RunesSettings.low.nameColor,
				RunesSettings.low.numberColor,
				RunesSettings.low.highlight,
				RunesSettings.low.bigTooltip,
				LightPillarsSettings.runes.isLowEnabled,
				DropSoundsSettings.runes.low,
			),
			new RuneTier(
				RuneTierId.LOW_MID,
				this.createLowMidRunes(),
				RunesSettings.lowMid.isVisible,
				RunesSettings.lowMid.nameColor,
				RunesSettings.lowMid.numberColor,
				RunesSettings.lowMid.highlight,
				RunesSettings.lowMid.bigTooltip,
				LightPillarsSettings.runes.isLowMidEnabled,
				DropSoundsSettings.runes.lowMid,
			),
			new RuneTier(
				RuneTierId.MID,
				this.createMidRunes(),
				RunesSettings.mid.isVisible,
				RunesSettings.mid.nameColor,
				RunesSettings.mid.numberColor,
				RunesSettings.mid.highlight,
				RunesSettings.mid.bigTooltip,
				LightPillarsSettings.runes.isMidEnabled,
				DropSoundsSettings.runes.mid,
			),
			new RuneTier(
				RuneTierId.HIGH,
				this.createHighRunes(),
				RunesSettings.high.isVisible,
				RunesSettings.high.nameColor,
				RunesSettings.high.numberColor,
				RunesSettings.high.highlight,
				RunesSettings.high.bigTooltip,
				LightPillarsSettings.runes.isHighEnabled,
				DropSoundsSettings.runes.high,
			),
		];
	}

	/** Low tier runes: El(1) to Dol(14), except Ral(8) */
	static createLowRunes(): Rune[] {
		return [
			new Rune(RuneId.EL, 'El'),
			new Rune(RuneId.ELD, 'Eld'),
			new Rune(RuneId.TIR, 'Tir'),
			new Rune(RuneId.NEF, 'Nef'),
			new Rune(RuneId.ETH, 'Eth'),
			new Rune(RuneId.ITH, 'Ith'),
			new Rune(RuneId.TAL, 'Tal'),
			new Rune(RuneId.ORT, 'Ort'),
			new Rune(RuneId.THUL, 'Thul'),
			new Rune(RuneId.AMN, 'Amn'),
			new Rune(RuneId.SOL, 'Sol'),
			new Rune(RuneId.SHAEL, 'Shael'),
			new Rune(RuneId.DOL, 'Dol'),
		];
	}

	/** Low-Mid tier runes: Ral(8), Hel(15) to Fal(19) */
	static createLowMidRunes(): Rune[] {
		return [
			new Rune(RuneId.RAL, 'Ral'),
			new Rune(RuneId.HEL, 'Hel'),
			new Rune(RuneId.IO, 'Io'),
			new Rune(RuneId.LUM, 'Lum'),
			new Rune(RuneId.KO, 'Ko'),
			new Rune(RuneId.FAL, 'Fal'),
		];
	}

	/** Mid tier runes: Lem(20) to Gul(25) */
	static createMidRunes(): Rune[] {
		return [
			new Rune(RuneId.LEM, 'Lem'),
			new Rune(RuneId.PUL, 'Pul'),
			new Rune(RuneId.UM, 'Um'),
			new Rune(RuneId.MAL, 'Mal'),
			new Rune(RuneId.IST, 'Ist'),
			new Rune(RuneId.GUL, 'Gul'),
		];
	}

	/** High tier runes: Vex(26) to Zod(33) */
	static createHighRunes(): Rune[] {
		return [
			new Rune(RuneId.VEX, 'Vex'),
			new Rune(RuneId.OHM, 'Ohm'),
			new Rune(RuneId.LO, 'Lo'),
			new Rune(RuneId.SUR, 'Sur'),
			new Rune(RuneId.BER, 'Ber'),
			new Rune(RuneId.JAH, 'Jah'),
			new Rune(RuneId.CHAM, 'Cham'),
			new Rune(RuneId.ZOD, 'Zod'),
		];
	}

}
