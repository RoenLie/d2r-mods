import { D2Color } from '../Colors/D2Color';

export class SunderCharm {

	readonly id:    string;
	readonly name:  string;
	readonly color: D2Color;

	constructor(id: string, name: string, color: D2Color) {
		this.id = id;
		this.name = name;
		this.color = color;
	}

}
