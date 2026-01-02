export abstract class CharConstants {

	static empty = '';
	static space = ' ';
	static newLine = '\n';
	static newLine2 = '\n\n';
	static o     = 'o';
	static plus  = '+';
	static minus = '-';

	static getSpaces(amount: number): string {
		return this.space.repeat(amount);
	}

}
