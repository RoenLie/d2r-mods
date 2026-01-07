/**
 * Controller Layouts Effects
 * Modifies controller-specific layout files for expanded stash
 */

import { EXPANDED_GRID, TAB_COUNT } from '../constants/layout';
import { getTabNames, type StashConfig } from '../mod_config';


/**
 * Apply changes to controller overlay HD layout (cursor bounds)
 */
export function applyControllerOverlayHd(): void {
	const layout = gameFiles.controllerOverlayHd.read();

	layout.children.forEach((child) => {
		if (child.name === 'Anchor' && child.type === 'Widget') {
			child.children.forEach(subchild => {
				if (subchild.name === 'ControllerCursorBounds' && subchild.type === 'ControllerCursorBoundsWidget') {
					subchild.fields ??= {};
					delete subchild.fields.fitToParent;

					subchild.fields.rect = {
						x:      -285,
						y:      0,
						width:  2880 + 285,
						height: 1763,
					};
				}
			});
		}
	});

	gameFiles.controllerOverlayHd.write(layout);
}

/**
 * Apply changes to controller bank original layout
 */
export function applyBankOriginalControllerLayoutHd(): void {
	const layout = gameFiles.controllerBankOriginalLayoutHd.read();

	layout.children.forEach(child => {
		if (child.name === 'background' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			child.fields.filename = 'Controller/Panel/Stash/V2/Classic_StashPanelBG_Expanded';

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 285 - 81 - 2 - 120;
				child.fields.rect.y = child.fields.rect.y + 17 - 293 + 100;
			}
		}
		if (
			(child.name === 'gold_amount' && child.type === 'TextBoxWidget')
			|| (child.name === 'gold_withdraw' && child.type === 'ButtonWidget')
		) {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 476 - 280;
				child.fields.rect.y = child.fields.rect.y - 1404 + 30;
			}
		}
		if (child.name === 'gold_max' && child.type === 'TextBoxWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 476 + 927;
				child.fields.rect.y = child.fields.rect.y - 1404 - 90 + 25;
			}
		}
		if (child.name === 'grid' && child.type === 'InventoryGridWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = -285 + 9;
				child.fields.rect.y = 119;
			}
		}
	});

	gameFiles.controllerBankOriginalLayoutHd.write(layout);
}

/**
 * Apply changes to controller bank expansion layout
 */
export function applyBankExpansionControllerLayoutHd(config: StashConfig): void {
	const layout = gameFiles.controllerBankExpansionLayoutHd.read();
	const tabNames = getTabNames(config);

	delete layout.fields.backgroundFile;
	layout.children = layout.children.filter(child => {
		if (
			child.name === 'PreviousSeasonToggleDisplay'
			|| child.name === 'PreviousLadderSeasonBankTabs'
		)
			return false;

		if (child.name === 'background' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			child.fields.filename = 'Controller/Panel/Stash/V2/StashPanelBG_Expanded';

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 285 - 81;
				child.fields.rect.y = child.fields.rect.y + 17 - 293;
			}
		}
		if (
			(child.name === 'gold_amount' && child.type === 'TextBoxWidget')
			|| (child.name === 'gold_withdraw' && child.type === 'ButtonWidget')
		) {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 476 - 280;
				child.fields.rect.y = child.fields.rect.y - 1404;
			}
		}
		if (child.name === 'gold_max' && child.type === 'TextBoxWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 476 + 927;
				child.fields.rect.y = child.fields.rect.y - 1404 - 90;
			}
		}
		if (child.name === 'grid' && child.type === 'InventoryGridWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			child.fields.cellCount = EXPANDED_GRID;

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = -285 + 9;
				child.fields.rect.y = 119;
			}
		}
		if (child.name === 'BankTabs' && child.type === 'TabBarWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			child.fields.filename = 'Controller/Panel/Stash/V2/StashTabs_Expanded';
			child.fields.focusIndicatorFilename = 'Controller/HoverImages/StashTab_Hover_Expanded';

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 300;
				child.fields.rect.y = child.fields.rect.y + 10;
			}

			child.fields.tabCount = TAB_COUNT;
			child.fields.tabSize = { x: 175, y: 120 };
			child.fields.tabPadding = { x: 0, y: 0 };
			child.fields.inactiveFrames = [ 1, 1, 1, 1, 1, 1, 1, 1 ];
			child.fields.activeFrames = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
			child.fields.disabledFrames = [ 1, 1, 1, 1, 1, 1, 1, 1 ];
			child.fields.textStrings = tabNames;
			child.fields.tabLeftIndicatorPosition = { x: -42, y: -2 };
			child.fields.tabRightIndicatorPosition = { x: 1135 + 300, y: -2 };
		}

		return true;
	});

	gameFiles.controllerBankExpansionLayoutHd.write(layout);
}
