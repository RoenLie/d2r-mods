/**
 * Player Layout Effects
 * Modifies player inventory layouts for mouse/keyboard controls
 */

import { EXPANSION_LAYOUT_HD, INVENTORY_GRID, ORIGINAL_LAYOUT_HD } from '../constants/layout';


/**
 * Apply original layout modifications (classic mode)
 */
export function applyPlayerInventoryOriginalLayout(): void {
	const layout = gameFiles.playerInventoryOriginalLayout.read();

	layout.children.forEach((child: any) => {
		if (child.name === 'grid') {
			child.fields.cellCount.x = INVENTORY_GRID.WIDTH;
			child.fields.cellCount.y = INVENTORY_GRID.HEIGHT;
		}
	});

	gameFiles.playerInventoryOriginalLayout.write(layout);
}


/**
 * Apply original layout HD modifications (classic mode, HD graphics)
 */
export function applyPlayerInventoryOriginalLayoutHd(): void {
	const layout = gameFiles.playerInventoryOriginalLayoutHd.read();

	layout.fields.rect = '$RightPanelRect_ExpandedInventory';

	layout.children = layout.children.filter(child => {
		if (child.name === 'background' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.filename = 'PANEL\\Inventory\\Classic_Background_Expanded';
		}

		if (child.name === 'click_catcher' && child.type === 'ClickCatcherWidget') {
			child.fields ??= {};
			child.fields.rect = ORIGINAL_LAYOUT_HD.CLICK_CATCHER;
		}

		if (child.name === 'RightHinge' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.rect = '$RightHingeRect_ExpandedInventory';
		}

		if (child.name === 'title' && child.type === 'TextBoxWidget') {
			child.fields ??= {};
			child.fields.rect = ORIGINAL_LAYOUT_HD.TITLE_OFFSET;
		}

		if (child.name === 'close' && child.type === 'ButtonWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string')
				child.fields.rect.x = child.fields.rect.x + ORIGINAL_LAYOUT_HD.CLOSE_BUTTON_OFFSET_X;
		}

		if (child.name === 'grid' && child.type === 'InventoryGridWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };
			child.fields.cellCount ??= { x: 0, y: 0 };

			child.fields.cellCount.x = INVENTORY_GRID.WIDTH;
			child.fields.cellCount.y = INVENTORY_GRID.HEIGHT;

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + ORIGINAL_LAYOUT_HD.GRID_OFFSET.x;
				child.fields.rect.y = child.fields.rect.y + ORIGINAL_LAYOUT_HD.GRID_OFFSET.y;
			}
		}

		// Apply slot offsets
		const slotOffsets = ORIGINAL_LAYOUT_HD.SLOT_OFFSETS;
		const slotMap: Record<string, keyof typeof ORIGINAL_LAYOUT_HD.SLOT_OFFSETS> = {
			'slot_right_arm':  'RIGHT_ARM',
			'slot_left_arm':   'LEFT_ARM',
			'slot_torso':      'TORSO',
			'slot_head':       'HEAD',
			'slot_gloves':     'GLOVES',
			'slot_feet':       'FEET',
			'slot_belt':       'BELT',
			'slot_neck':       'NECK',
			'slot_right_hand': 'RIGHT_HAND',
			'slot_left_hand':  'LEFT_HAND',
		};

		if (child.name in slotMap && child.type === 'InventorySlotWidget') {
			const offsetKey = slotMap[child.name];
			const offset = slotOffsets[offsetKey];

			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + offset.x;
				child.fields.rect.y = child.fields.rect.y + offset.y;
			}
		}

		if (
			(child.name === 'gold_amount' && child.type === 'TextBoxWidget')
			|| (child.name === 'gold_button' && child.type === 'ButtonWidget')
		) {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + ORIGINAL_LAYOUT_HD.GOLD_OFFSET.x;
				child.fields.rect.y = child.fields.rect.y + ORIGINAL_LAYOUT_HD.GOLD_OFFSET.y;
			}
		}

		return true;
	});

	gameFiles.playerInventoryOriginalLayoutHd.write(layout);
}


/**
 * Apply expansion layout HD modifications (LoD mode, HD graphics)
 */
export function applyPlayerInventoryExpansionLayoutHd(): void {
	const layout = gameFiles.playerInventoryExpansionLayoutHd.read();

	layout.children = layout.children.filter(child => {
		// Remove click catcher to match original layout behavior
		if (child.name === 'click_catcher')
			return false;

		if (child.name === 'background' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.filename = 'PANEL\\Inventory\\Background_Expanded';
		}

		// Right arm elements
		if (
			(child.name === 'background_right_arm'          && child.type === 'ImageWidget')
		|| (child.name === 'background_right_arm_selected' && child.type === 'ImageWidget')
		|| (child.name === 'weaponswap_right_arm'          && child.type === 'FocusableWidget')
		|| (child.name === 'text_i_left'                   && child.type === 'TextBoxWidget')
		|| (child.name === 'text_ii_left'                  && child.type === 'TextBoxWidget')
		) {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + EXPANSION_LAYOUT_HD.SLOT_OFFSETS.RIGHT_ARM.x;
				child.fields.rect.y = child.fields.rect.y + EXPANSION_LAYOUT_HD.SLOT_OFFSETS.RIGHT_ARM.y;
			}
		}

		// Left arm elements
		if (
			(child.name === 'background_left_arm'          && child.type === 'ImageWidget')
		|| (child.name === 'background_left_arm_selected' && child.type === 'ImageWidget')
		|| (child.name === 'weaponswap_left_arm'          && child.type === 'FocusableWidget')
		|| (child.name === 'text_i_right'                 && child.type === 'TextBoxWidget')
		|| (child.name === 'text_ii_right'                && child.type === 'TextBoxWidget')
		) {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + EXPANSION_LAYOUT_HD.SLOT_OFFSETS.LEFT_ARM.x;
				child.fields.rect.y = child.fields.rect.y + EXPANSION_LAYOUT_HD.SLOT_OFFSETS.LEFT_ARM.y;
			}
		}

		return true;
	});

	gameFiles.playerInventoryExpansionLayoutHd.write(layout);
}
