export class Rune {

	/**
   * key
   */
	get key(): string {
		return this.number < 10 ? `r0${ this.number }` : `r${ this.number }`;
	}

	readonly number: number;
	readonly name:   string;

	constructor(number: number, name: string) {
		this.number = number;
		this.name = name;
	}

}
