/**
 * Inventory Effect
 * Modifies inventory.txt to expand stash grid dimensions
 */

import { EXPANDED_GRID, STASH_IDS } from '../constants/layout';
import { readInventory, writeInventory } from '../io/game_files';


/**
 * Apply inventory changes to expand stash grid
 */
export function applyInventoryChanges(): void {
	const inventory = readInventory();

	inventory.rows.forEach(entry => {
		if (STASH_IDS.has(entry.class)) {
			entry.gridX = EXPANDED_GRID.x.toString();
			entry.gridY = EXPANDED_GRID.y.toString();
		}
	});

	writeInventory(inventory);
}
