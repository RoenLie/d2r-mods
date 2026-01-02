import { ED2rColor } from "./ED2rColor";


export class D2rColor {

	constructor(code: ED2rColor) {
		this._code = code;
	}

	private readonly _name: string = '';
	public get name(): string { return this._name; }

	private readonly _code: ED2rColor = ED2rColor.WHITE;
	public get code(): ED2rColor {  return this._code; }

	protected readonly prefix = "$FontColor";

	public toString(): string { return `${this.prefix}${this.code}`; }
}
