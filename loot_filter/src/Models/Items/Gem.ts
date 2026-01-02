import { D2Color } from '../Colors/D2Color';

export class Gem {

	readonly key:   string;
	readonly color: D2Color;
	readonly name:  string;

	constructor(key: string, color: D2Color, name: string) {
		this.key = key;
		this.color = color;
		this.name = name;
	}

}
