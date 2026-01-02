import { CharConstants } from '../../Constants/CharConstants';
import { SettingsConstants } from '../../Constants/SettingsConstants';
import { EItemQuality } from '../Enums/EItemQuality';
import { RawSettings } from '../RawSettings';

export abstract class ItemQualitySettings {

	static readonly isEnabled:             boolean = RawSettings.filter.statsAndModifiers.itemQuality.isEnabled;
	static readonly placement:             string = RawSettings.filter.statsAndModifiers.itemQuality.placement;
	protected static readonly brackets:    string = RawSettings.filter.statsAndModifiers.itemQuality.brackets;
	protected static readonly styleSingle: string = RawSettings.filter.statsAndModifiers.itemQuality.styleSingle;
	protected static readonly styleDouble: string = RawSettings.filter.statsAndModifiers.itemQuality.styleDouble;

	static singleNormalQualityIndicator:      string = this.createSingleQualityIndicator(EItemQuality.Normal);
	static singleExceptionalQualityIndicator: string = this.createSingleQualityIndicator(EItemQuality.Exceptional);
	static singleEliteQualityIndicator:       string = this.createSingleQualityIndicator(EItemQuality.Elite);

	static doubleNormalQualityIndicator:      string = this.createDoubleQualityIndicator(EItemQuality.Normal);
	static doubleExceptionalQualityIndicator: string = this.createDoubleQualityIndicator(EItemQuality.Exceptional);
	static doubleEliteQualityIndicator:       string = this.createDoubleQualityIndicator(EItemQuality.Elite);

	static openChar:  string = this.getSingleQualityIndicatorOpenChar();
	static closeChar: string = this.getSingleQualityIndicatorCloseChar();

	protected static customSingleNormalQualityIndicator:      string = '[custom n]'; // replace "custom n" to your preference. [CSTM-QTYS]
	protected static customSingleExceptionalQualityIndicator: string = '[custom x]'; // replace "custom x" to your preference. [CSTM-QTYS]
	protected static customSingleEliteQualityIndicator:       string = '[custom e]'; // replace "custom e" to your preference. [CSTM-QTYS]

	protected static customDoubleNormalQualityIndicator:      string = '[custom n]'; // replace "custom n" to your preference. [CSTM-QTYD]
	protected static customDoubleExceptionalQualityIndicator: string = '[custom x]'; // replace "custom x" to your preference. [CSTM-QTYD]
	protected static customDoubleEliteQualityIndicator:       string = '[custom e]'; // replace "custom e" to your preference. [CSTM-QTYD]

	private static createSingleQualityIndicator(itemQuality: EItemQuality): string {
		if (this.styleSingle === SettingsConstants.custom) {
			return [
				{ quality: EItemQuality.Normal,      indicator: this.customSingleNormalQualityIndicator },
				{ quality: EItemQuality.Exceptional, indicator: this.customSingleExceptionalQualityIndicator },
				{ quality: EItemQuality.Elite,       indicator: this.customSingleEliteQualityIndicator },
			].find(q => q.quality == itemQuality)!.indicator;
		}

		const indicator = [
			{ quality: EItemQuality.Normal,      indicator: 'n' },
			{ quality: EItemQuality.Exceptional, indicator: 'x' },
			{ quality: EItemQuality.Elite,       indicator: 'e' },
		].find(q => q.quality == itemQuality)!.indicator;

		if (this.styleSingle === 'uppercase')
			return indicator.toUpperCase();

		return indicator;
	}

	private static getSingleQualityIndicatorOpenChar(): string {
		return [
			{ setting: SettingsConstants.disabled, char: CharConstants.empty },
			{ setting: 'square', char: '[' },
			{ setting: 'round',  char: '(' },
		].find(o => o.setting === this.brackets)!.char;
	}

	private static getSingleQualityIndicatorCloseChar(): string {
		return [
			{ setting: SettingsConstants.disabled, char: CharConstants.empty },
			{ setting: 'square', char: ']' },
			{ setting: 'round',  char: ')' },
		].find(o => o.setting === this.brackets)!.char;
	}

	private static createDoubleQualityIndicator(itemQuality: EItemQuality): string {
		if (this.styleDouble === SettingsConstants.custom) {
			return [
				{ quality: EItemQuality.Normal,      indicator: this.customDoubleNormalQualityIndicator },
				{ quality: EItemQuality.Exceptional, indicator: this.customDoubleExceptionalQualityIndicator },
				{ quality: EItemQuality.Elite,       indicator: this.customDoubleEliteQualityIndicator },
			].find(q => q.quality == itemQuality)!.indicator;
		}

		return CharConstants.empty;

		// TODO: implement
		return this.getDoubleQualityIndicator(itemQuality);
	}

	private static getDoubleQualityIndicator(itemQuality: EItemQuality): string {
		throw new Error('not implemented');

		/**
     *  -name-
     *  =name=
     * -=name=-
     */

		/**
     *  ·name·
     *  :name:
     * ·:name:·
     */

		const indicator = CharConstants.empty;

		switch (this.styleDouble) {
		case 'dashes':
		}

		const dashesAll = [
			{ quality: EItemQuality.Normal, indicator: '-' },
			{ quality: EItemQuality.Normal, indicator: '=' },
			{ quality: EItemQuality.Normal, indicator: '≡' }, // test
		];
		const dashesXE = [
			{ quality: EItemQuality.Normal, indicator: CharConstants.empty },
			{ quality: EItemQuality.Normal, indicator: '-' },
			{ quality: EItemQuality.Normal, indicator: '=' }, // test
		];

		const dots = [
			{ quality: EItemQuality.Normal, indicator: '' },
			{ quality: EItemQuality.Normal, indicator: '·' }, // TODO: middle dot test, also as new highlight character
			{ quality: EItemQuality.Normal, indicator: ':' }, // test
		];

		return [
			{ quality: EItemQuality.Normal,      indicator: 'n' },
			{ quality: EItemQuality.Exceptional, indicator: 'x' },
			{ quality: EItemQuality.Elite,       indicator: 'e' },
		].find(q => q.quality == itemQuality)!.indicator;
	}

}
