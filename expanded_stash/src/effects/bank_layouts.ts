/**
 * Bank Layouts Effects
 * Modifies bank layout files for both original and expansion, HD and standard
 */

import { EXPANDED_GRID, TAB_COUNT } from '../constants/layout';
import {
	readBankExpansionLayout,
	readBankExpansionLayoutHd,
	readBankOriginalLayout,
	readBankOriginalLayoutHd,
	writeBankExpansionLayout,
	writeBankExpansionLayoutHd,
	writeBankOriginalLayout,
	writeBankOriginalLayoutHd,
} from '../io/game_files';
import { getTabNames, type StashConfig } from '../io/mod_config';


/**
 * Apply changes to standard (non-HD) bank original layout
 */
export function applyBankOriginalLayout(): void {
	const layout = readBankOriginalLayout();

	layout.children.forEach(child => {
		if (child.type === 'InventoryGridWidget')
			child.fields.cellCount = EXPANDED_GRID;
	});

	writeBankOriginalLayout(layout);
}

/**
 * Apply changes to standard (non-HD) bank expansion layout
 */
export function applyBankExpansionLayout(config: StashConfig): void {
	const layout = readBankExpansionLayout();
	const tabNames = getTabNames(config);

	layout.children = layout.children.map((child) => {
		if (typeof child !== 'object' || child === null)
			return child;

		if (
			child.name === 'PreviousSeasonToggleDisplay' ||
    		child.name === 'PreviousLadderSeasonBankTabs'
		)
			return false;

		if (child.name === 'grid' && child.type === 'InventoryGridWidget')
			child!.fields!.cellCount = EXPANDED_GRID;

		if (child.name === 'BankTabs' && child.type === 'TabBarWidget') {
			child.fields!.tabCount = TAB_COUNT;
			child.fields!.textStrings = tabNames;
		}

		return true;
	});

	writeBankExpansionLayout(layout);
}

/**
 * Apply changes to HD bank original layout
 */
export function applyBankOriginalLayoutHd(): void {
	const layout = readBankOriginalLayoutHd();

	layout.fields.rect = '$LeftPanelRect_ExpandedStash';
	layout.children.forEach(child => {
		if (child.name === 'grid' && child.type === 'InventoryGridWidget') {
			child.fields ??= {};
			child.fields.cellCount ??= { x: 0, y: 0 };
			child.fields.cellCount.x = 16;
			child.fields.cellCount.y = 13;

			if (typeof child.fields.rect !== 'string') {
				child.fields ??= {};
				child.fields.rect ??= { x: 0, y: 0 };

				if (typeof child.fields.rect !== 'string') {
					child.fields.rect.x = child.fields.rect.x - 229;
					child.fields.rect.y = child.fields.rect.y - 572;
				}
			}
		}
		if (child.name === 'click_catcher' && child.type === 'ClickCatcherWidget') {
			child.fields ??= {};
			child.fields.rect = '$PanelClickCatcherRect_ExpandedStash';
		}
		if (child.name === 'background' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.filename = 'PANEL\\Stash\\StashPanel_BG_Expanded';
			child.fields.rect = { x: 0, y: 0 };
		}
		if (child.name === 'gold_amount' && child.type === 'TextBoxWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = 60 + 60 + 16;
				child.fields.rect.y = 61 + 16;
			}
		}
		if (child.name === 'gold_withdraw' && child.type === 'ButtonWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = 60 + 16;
				child.fields.rect.y = 58 + 16;
			}
		}
		if (child.name === 'title' && child.type === 'TextBoxWidget') {
			child.fields ??= {};
			child.fields.rect = {
				x:      91 + (1687 - 1162) / 2,
				y:      64,
				width:  972,
				height: 71,
			};
		}
		if (child.name === 'close' && child.type === 'ButtonWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string')
				child.fields.rect.x = child.fields.rect.x + (1687 - 1162);
		}
	});

	writeBankOriginalLayoutHd(layout);
}

/**
 * Apply changes to HD bank expansion layout
 */
export function applyBankExpansionLayoutHd(config: StashConfig): void {
	const layout = readBankExpansionLayoutHd();
	const tabNames = getTabNames(config);

	delete layout.fields.backgroundFile;
	layout.children = layout.children.filter(child => {
		if (
			child.name === 'PreviousSeasonToggleDisplay'
			|| child.name === 'PreviousLadderSeasonBankTabs'
		)
			return false;

		if (child.name === 'grid' && child.type === 'InventoryGridWidget') {
			child.fields ??= {};
			child.fields.cellCount = EXPANDED_GRID;

			child.fields.rect ??= { x: 0, y: 0 };
			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 37 + 6;
				child.fields.rect.y = child.fields.rect.y - 58 + 16;
			}
		}
		if (child.name === 'background' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.filename = 'PANEL\\Stash\\StashPanel_BG_Expanded';
		}
		if (child.name === 'BankTabs' && child.type === 'TabBarWidget') {
			child.fields ??= {};
			child.fields.filename = 'PANEL\\stash\\Stash_Tabs_Expanded';

			child.fields.rect ??= { x: 0, y: 0 };
			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x - 30 - 2;
				child.fields.rect.y = child.fields.rect.y - 56 + 18;
			}

			child.fields.tabCount = TAB_COUNT;

			// 249 x 80 -> 197 x 80 (bottom 5 pixels are overlay)
			child.fields.tabSize = { x: 197, y: 75 };
			child.fields.tabPadding = { x: 0, y: 0 };
			child.fields.inactiveFrames = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
			child.fields.activeFrames = [ 1, 1, 1, 1, 1, 1, 1, 1 ];
			child.fields.disabledFrames = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
			child.fields.textStrings = tabNames;
		}
		if (child.name === 'gold_amount' && child.type === 'TextBoxWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = 60 + 60;
				child.fields.rect.y = 61;
			}
		}
		if (child.name === 'gold_withdraw' && child.type === 'ButtonWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = 60;
				child.fields.rect.y = 58;
			}
		}
		if (child.name === 'title') {
			// hide title
			return false;
		}

		return true;
	});

	writeBankExpansionLayoutHd(layout);
}
