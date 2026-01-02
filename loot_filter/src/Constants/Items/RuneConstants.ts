import { RuneTierFactory } from '../../Factories/RuneTierFactory';
import { Rune } from '../../Models/Items/Rune';
import { RuneTier } from '../../Models/Items/RuneTier';

/**
 * Rune-related constants and collections.
 *
 * Provides static rune arrays organized by tier and translated affixes.
 * Uses lazy initialization for tiers to avoid circular dependencies.
 */
export abstract class RuneConstants {

	/** Low tier runes: El(1) to Dol(14), except Ral(8) */
	static get lowRunes(): Rune[] {
		return RuneTierFactory.createLowRunes();
	}

	/** Low-Mid tier runes: Ral(8), Hel(15) to Fal(19) */
	static get lowMidRunes(): Rune[] {
		return RuneTierFactory.createLowMidRunes();
	}

	/** Mid tier runes: Lem(20) to Gul(25) */
	static get midRunes(): Rune[] {
		return RuneTierFactory.createMidRunes();
	}

	/** High tier runes: Vex(26) to Zod(33) */
	static get highRunes(): Rune[] {
		return RuneTierFactory.createHighRunes();
	}

	/**
	 * Rune tiers with settings applied.
	 *
	 * Lazily initialized to avoid loading settings at module init time.
	 * Tier categorization:
	 * - Low:     El(1) to Dol(14), except Ral(8)
	 * - Low-Mid: Ral(8), Hel(15) to Fal(19)
	 * - Mid:     Lem(20) to Gul(25)
	 * - High:    Vex(26) to Zod(33)
	 *
	 * Note: Ral, Hel, and Lem are promoted a tier for usefulness.
	 */
	private static _tiers?: RuneTier[];
	static get tiers(): RuneTier[] {
		if (!this._tiers)
			this._tiers = RuneTierFactory.createTiers();

		return this._tiers;
	}

	static translatedAffixes: string[] = [
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

}
