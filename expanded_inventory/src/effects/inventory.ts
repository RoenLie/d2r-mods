/**
 * Inventory Effects
 * Modifies inventory.txt to change character inventory grid sizes
 */

import { CHARACTER_CLASSES, INVENTORY_GRID } from '../constants/layout';


/**
 * Apply inventory grid size changes
 */
export function applyInventoryChanges(): void {
	const inventory = gameFiles.inventory.read();

	inventory.rows.forEach(row => {
		const id = row.class;

		// Check if this is a base class or expansion class (e.g., "Amazon2")
		const isBaseClass = CHARACTER_CLASSES.indexOf(id) !== -1;
		const isExpansionClass = CHARACTER_CLASSES
			.map(cls => `${ cls }2`)
			.indexOf(id) !== -1;

		if (isBaseClass || isExpansionClass) {
			row.gridX = INVENTORY_GRID.WIDTH.toString();
			row.gridY = INVENTORY_GRID.HEIGHT.toString();
		}
	});

	gameFiles.inventory.write(inventory);
}
