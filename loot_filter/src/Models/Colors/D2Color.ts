import { ED2ColorCode } from './ED2ColorCode';


export class D2Color {

	/**
   * color code
   */
	private readonly _code: ED2ColorCode;
	get code(): ED2ColorCode {
		return this._code;
	}

	static readonly prefix = 'ÿc';

	constructor(code: ED2ColorCode) {
		if (code === ED2ColorCode.NONE || code === ED2ColorCode.DEFAULT)
			throw new Error("EColorCode can't be NONE or DEFAULT.");

		this._code = code;
	}

	static create(code: ED2ColorCode, fallback?: ED2ColorCode): D2Color | null {
		if (code === ED2ColorCode.NONE)
			return null;

		if (code === ED2ColorCode.DEFAULT) {
			if (fallback === ED2ColorCode.DEFAULT)
				throw new Error("EColorCode can't be DEFAULT.");
			if (fallback === ED2ColorCode.NONE)
				return null;

			return new D2Color(fallback ??= ED2ColorCode.WHITE);
		}

		return new D2Color(code);
	}

	equals(color: D2Color): boolean {
		return this.code === color.code;
	}

	toString(): string {
		return `${ D2Color.prefix }${ this.code }`;
	}

}
