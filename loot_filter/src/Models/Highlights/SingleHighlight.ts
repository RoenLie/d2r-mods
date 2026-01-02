import { CharConstants } from '../../Constants/CharConstants';
import { D2Color } from '../Colors/D2Color';
import { HighlightBase } from './HighlightBase';

export class SingleHighlight extends HighlightBase {

	constructor(pattern: string, color: D2Color, padding?: string) {
		super(pattern ??= CharConstants.empty, padding, color);
	}

	apply(displayName: string): string {
		return `${ this.getPrefix() }${ displayName }`;
	}

	// TODO: remove?
	getIndent(): string {
		const highlightLength = `${ this.pattern }${ this.padding }`.length;

		return CharConstants.getSpaces(highlightLength);
	}

	protected getPrefix(): string {
		return `${ this.color }${ this.pattern }${ this.padding ?? CharConstants.empty }`;
	}

}
