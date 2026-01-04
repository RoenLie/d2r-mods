export class D2rmmVersion {

	readonly major: number;
	readonly minor: number;
	readonly patch: number;

	constructor(major: number, minor: number, patch: number) {
		this.major = major;
		this.minor = minor;
		this.patch = patch;
	}

	static fromArray(version: [number, number, number]) {
		version.forEach(v => {
			if (v < 0 || v % 1 > 0) { // must be whole number, 0 or higher
				throw new Error(`Invalid D2RMM version numbers submitted: ${ version }`);
			}
		});

		return new D2rmmVersion(version[0], version[1], version[2]);
	}

	isOrExceeds(toMatch: D2rmmVersion): boolean {
		return this.major >= toMatch.major && this.minor >= toMatch.minor && this.patch >= toMatch.patch;
	}

	toString(): string {
		return `${ this.major }.${ this.minor }.${ this.patch }`;
	}

	toArray(): [ number, number, number ] {
		return [ this.major, this.minor, this.patch ];
	}

	getErrorMessage(): string {
		return `Requires D2RMM version ${ this.toString() } or higher.`;
	}

}
