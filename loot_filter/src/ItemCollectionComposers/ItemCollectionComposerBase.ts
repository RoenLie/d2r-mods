import { ItemCollection } from '../Models/ItemCollectionEntries/ItemCollection';
import { IItemCollectionComposer } from './Interfaces/IItemCollectionComposer';

export abstract class ItemCollectionComposerBase implements IItemCollectionComposer {

	protected collection: ItemCollection = new ItemCollection();

	getCollection(): ItemCollection {
		return this.collection;
	}

	abstract applyFilter(): void;

}
