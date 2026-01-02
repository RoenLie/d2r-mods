import { ED2rColor } from './ED2rColor';


export class D2rColor {

	readonly name: string = '';
	readonly code: ED2rColor;

	constructor(code: ED2rColor) {
		this.code = code;
	}

	protected readonly prefix = '$FontColor';

	toString(): string { return `${ this.prefix }${ this.code }`; }

}
