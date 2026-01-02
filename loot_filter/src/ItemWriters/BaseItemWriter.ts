import { CharConstants } from '../Constants/CharConstants';
import { FileConstants } from '../Constants/FileConstants';
import { IItemCollectionComposer } from '../ItemCollectionComposers/IItemCollectionComposer';
import { IItemEntry } from '../Models/ItemCollectionEntries/Interfaces/IItemEntry';
import { ItemCollection } from '../Models/ItemCollectionEntries/ItemCollection';
import { FilterSettings } from '../Settings/Filter/FilterSettings';
import { IItemWriter } from './Interfaces/IItemWriter';

/**
 * An abstract containing implementations for IWriter.
 * @class
 * @property {string} target The path to the target .json file.
 * @property {IBaseBuilder[]} builders A collection of builders.
 */
export abstract class BaseItemWriter implements IItemWriter {

	protected target:    string = CharConstants.empty;
	protected composers: IItemCollectionComposer[] = [];

	constructor(target: string) {
		this.target = target;
		this.initializeBuilders();
	}

	/**
   * Initializes the list of builders for the target file.
   */
	protected abstract initializeBuilders(): void;

	/**
   *
   */
	applyFilters(): void {
		if (!FilterSettings.isEnabled)
			return;

		this.composers.forEach(composer => {
			composer.applyFilter();
		});
	}

	/**
   * Update all entries in this.target matching the IDs in this.collections to their new values.
   */
	writeCustomNames(): void {
		const mergedCollection = this.createMergedCollection();
		if (!mergedCollection.hasEntries())
			return;

		const file = D2RMM.readJson(this.target);

		mergedCollection.getEntries().forEach(filterEntry => {
			Object.entries(file).forEach(([ index, _ ]) => {
				if (typeof file !== 'object' || Array.isArray(file))
					return;

				const fileEntry = file[index];
				if (typeof fileEntry !== 'object' || Array.isArray(fileEntry))
					return;

				if (fileEntry[FileConstants.key] === filterEntry.key)
					this.writeCustomNamesForEntry(fileEntry, filterEntry);
			});
		});

		D2RMM.writeJson(this.target, file);
	}

	protected writeCustomNamesForEntry(fileEntry: JSONData, filterEntry: IItemEntry): void {
		if (typeof fileEntry !== 'object' || Array.isArray(fileEntry))
			return;

		for (const key in fileEntry) { // for each property in this entry ...
			if (key === FileConstants.id || key === FileConstants.key) // ... that is a translation (not the id or Key property) ...
				continue;

			const name = fileEntry[key];
			if (typeof name !== 'string' || name.trim() === CharConstants.empty)
				continue;

			fileEntry[key] = filterEntry.generateDisplayName(name); // ... set to the corresponding name found in mergedCollection
		}
	}

	/**
   *
   * @returns A single {@link ItemCollection} containing all entries in {@property builders} asd
   */
	protected createMergedCollection(): ItemCollection {
		const mergedCollection = new ItemCollection();
		this.composers.forEach(composer => {
			mergedCollection.upsertCollection(composer.getCollection());
		});

		return mergedCollection;
	}

}
