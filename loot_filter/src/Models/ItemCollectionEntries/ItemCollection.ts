import { ItemEntry } from './ItemEntry';

export class ItemCollection {

	protected entries: ItemEntry[] = [];

	constructor(entries?: ItemEntry[]) {
		if (entries != null)
			this.entries = entries;
	}

	hasEntries(): boolean {
		return (Array.isArray(this.entries) && this.entries.length > 0);
	}

	getEntries(): ItemEntry[] {
		return this.entries;
	}

	getKeys(): string[] {
		return this.entries.map(entry => entry.key);
	}

	getDisplayNameForKey(key: string, translatedName: string): string {
		return this.entries.find(entry => entry.key === key)?.generateDisplayName(translatedName) ?? 'CELF_ERROR';
	}

	upsert(entry: ItemEntry): void {
		const i = this.findIndex(entry.key);
		if (i > -1)
			this.entries[i] = entry;
		else
			this.entries.push(entry);
	}

	upsertMultiple(array: ItemEntry[]): void {
		array.forEach(entry => this.upsert(entry));
	}

	upsertHidden(key: string): void {
		const i = this.findIndex(key);
		if (i > -1)
			this.entries[i].isVisible = false;
		else
			this.entries.push(ItemEntry.createHidden(key));
	}

	upsertMultipleHidden(keys: string[]): void {
		keys.forEach(key => this.upsertHidden(key));
	}

	upsertIfHasHighlightOrBigTooltip(entry: ItemEntry): void {
		if (entry.highlight === null && entry.bigTooltip === null)
			return;

		this.upsert(entry);
	}

	upsertMultipleIfHasHighlightOrBigTooltip(array: ItemEntry[]): void {
		array.forEach(entry => this.upsertIfHasHighlightOrBigTooltip(entry));
	}

	upsertCollection(collection: ItemCollection): void {
		this.upsertMultiple(collection.entries);
	}

	private findIndex(key: string): number {
		return this.entries.findIndex(entry => entry.key === key);
	}

}
