/**
 * Controller Layout Effects
 * Modifies player inventory layouts for controller/gamepad controls
 */

import { CONTROLLER_EXPANSION_LAYOUT_HD, CONTROLLER_ORIGINAL_LAYOUT_HD } from '../constants/layout';


/**
 * Apply original controller layout HD modifications (classic mode, HD graphics, controller)
 */
export function applyPlayerInventoryOriginalControllerLayoutHd(): void {
	const layout = gameFiles.controllerPlayerInventoryOriginalLayoutHd.read();

	layout.children.forEach(child => {
		if (child.name === 'background' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			child.fields.filename = 'Controller/Panel/InventoryPanel/V2/InventoryBG_Classic_Expanded';

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + CONTROLLER_ORIGINAL_LAYOUT_HD.BACKGROUND_OFFSET.x;
				child.fields.rect.y = child.fields.rect.y + CONTROLLER_ORIGINAL_LAYOUT_HD.BACKGROUND_OFFSET.y;
			}
		}

		if (child.name === 'grid' && child.type === 'InventoryGridWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + CONTROLLER_ORIGINAL_LAYOUT_HD.GRID_OFFSET.x;
				child.fields.rect.y = child.fields.rect.y + CONTROLLER_ORIGINAL_LAYOUT_HD.GRID_OFFSET.y;
			}
		}

		// Apply slot offsets
		const slotOffsets = CONTROLLER_ORIGINAL_LAYOUT_HD.SLOT_OFFSETS;
		const slotMap: Record<string, keyof typeof CONTROLLER_ORIGINAL_LAYOUT_HD.SLOT_OFFSETS> = {
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

		if (child.name === 'Belt' && child.type === 'BeltWidget') {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + CONTROLLER_ORIGINAL_LAYOUT_HD.BELT_PANEL_OFFSET.x;
				child.fields.rect.y = child.fields.rect.y + CONTROLLER_ORIGINAL_LAYOUT_HD.BELT_PANEL_OFFSET.y;
			}
		}

		if (
			(child.name === 'gold_amount' && child.type === 'TextBoxWidget')
			|| (child.name === 'gold_button' && child.type === 'ButtonWidget')
		) {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + CONTROLLER_ORIGINAL_LAYOUT_HD.GOLD_OFFSET.x;
				child.fields.rect.y = child.fields.rect.y + CONTROLLER_ORIGINAL_LAYOUT_HD.GOLD_OFFSET.y;
			}
		}
	});

	gameFiles.controllerPlayerInventoryOriginalLayoutHd.write(layout);
}


/**
 * Apply expansion controller layout HD modifications (LoD mode, HD graphics, controller)
 */
export function applyPlayerInventoryExpansionControllerLayoutHd(): void {
	const layout = gameFiles.controllerPlayerInventoryExpansionLayoutHd.read();

	layout.children.forEach(child => {
		if (child.name === 'background' && child.type === 'ImageWidget') {
			child.fields ??= {};
			child.fields.filename = 'Controller/Panel/InventoryPanel/V2/InventoryBG_Expanded';
		}

		// Right arm elements
		if (
			(child.name === 'background_right_arm'          && child.type === 'ImageWidget')
		|| (child.name === 'background_right_arm_selected' && child.type === 'ImageWidget')
		|| (child.name === 'WeaponSwapRightLegend'         && child.type === 'ButtonLegendWidget')
		|| (child.name === 'text_i_left'                   && child.type === 'TextBoxWidget')
		|| (child.name === 'text_ii_left'                  && child.type === 'TextBoxWidget')
		) {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + CONTROLLER_EXPANSION_LAYOUT_HD.SLOT_OFFSETS.RIGHT_ARM.x;
				child.fields.rect.y = child.fields.rect.y + CONTROLLER_EXPANSION_LAYOUT_HD.SLOT_OFFSETS.RIGHT_ARM.y;
			}
		}

		// Left arm elements
		if (
			(child.name === 'background_left_arm'          && child.type === 'ImageWidget')
		|| (child.name === 'background_left_arm_selected' && child.type === 'ImageWidget')
		|| (child.name === 'WeaponSwapLeftLegend'         && child.type === 'ButtonLegendWidget')
		|| (child.name === 'text_i_right'                 && child.type === 'TextBoxWidget')
		|| (child.name === 'text_ii_right'                && child.type === 'TextBoxWidget')
		) {
			child.fields ??= {};
			child.fields.rect ??= { x: 0, y: 0 };

			if (typeof child.fields.rect !== 'string') {
				child.fields.rect.x = child.fields.rect.x + CONTROLLER_EXPANSION_LAYOUT_HD.SLOT_OFFSETS.LEFT_ARM.x;
				child.fields.rect.y = child.fields.rect.y + CONTROLLER_EXPANSION_LAYOUT_HD.SLOT_OFFSETS.LEFT_ARM.y;
			}
		}
	});

	gameFiles.controllerPlayerInventoryExpansionLayoutHd.write(layout);
}
