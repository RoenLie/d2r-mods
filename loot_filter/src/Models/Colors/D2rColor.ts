import { ED2rColor } from './ED2rColor';


export class D2rColor {

	constructor(code: ED2rColor) {
		this.code = code;
	}

	readonly name: string = '';
	readonly code: ED2rColor = ED2rColor.WHITE;

	protected readonly prefix = '$FontColor';

	toString(): string { return `${ this.prefix }${ this.code }`; }

}
