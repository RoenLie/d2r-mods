import { D2Color } from '../Colors/D2Color';

export class Gem {

	/**
   * key
   */
	private readonly _key: string;
	get key(): string {
		return this._key;
	}

	/**
   * color
   */
	private readonly _color: D2Color;
	get color(): D2Color {
		return this._color;
	}

	/**
   * name
   */
	private readonly _name: string;
	get name(): string {
		return this._name;
	}

	constructor(key: string, color: D2Color, name: string) {
		this._key = key;
		this._color = color;
		this._name = name;
	}

}
