import * as vscode from 'vscode';

/**
 * Mapping of gameFiles property names to their file paths
 */
const FILE_PATH_MAP: Record<string, string> = {
	// TSV Excel files
	sounds:    'global/excel/sounds.txt',
	weapons:   'global/excel/weapons.txt',
	armor:     'global/excel/armor.txt',
	misc:      'global/excel/misc.txt',
	inventory: 'global/excel/inventory.txt',

	// JSON string files
	itemNames:       'local/lng/strings/item-names.json',
	itemNameAffixes: 'local/lng/strings/item-nameaffixes.json',
	itemRunes:       'local/lng/strings/item-runes.json',
	itemModifiers:   'local/lng/strings/item-modifiers.json',
	ui:              'local/lng/strings/ui.json',

	// Layout files
	profileLv:             'global/ui/layouts/_profilelv.json',
	bankOriginalLayout:    'global/ui/layouts/bankoriginallayout.json',
	bankExpansionLayout:   'global/ui/layouts/bankexpansionlayout.json',
	profileHd:             'global/ui/layouts/_profilehd.json',
	bankOriginalLayoutHd:  'global/ui/layouts/bankoriginallayouthd.json',
	bankExpansionLayoutHd: 'global/ui/layouts/bankexpansionlayouthd.json',

	// Controller layouts
	controllerOverlayHd:             'global/ui/layouts/controller/controlleroverlayhd.json',
	controllerBankOriginalLayoutHd:  'global/ui/layouts/controller/bankoriginallayouthd.json',
	controllerBankExpansionLayoutHd: 'global/ui/layouts/controller/bankexpansionlayouthd.json',
};

export class D2RHoverProvider implements vscode.HoverProvider {

	provideHover(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken,
	): vscode.ProviderResult<vscode.Hover> {
		const range = document.getWordRangeAtPosition(position);
		if (!range)
			return null;

		// Get the full line to check for gameFiles pattern
		const line = document.lineAt(position.line).text;
		const wordAtPosition = document.getText(range);

		// Check if we're on a gameFiles property access
		// Matches patterns like: gameFiles.sounds, gameFiles.weapons, etc.
		const gameFilesPattern = /gameFiles\.(\w+)/;
		const match = line.match(gameFilesPattern);

		if (!match)
			return null;

		const propertyName = match[1];
		const filePath = FILE_PATH_MAP[propertyName];

		if (!filePath)
			return null;

		// Only provide hover if cursor is on the property name
		if (wordAtPosition !== propertyName)
			return null;

		// Get the configured base path
		const config = vscode.workspace.getConfiguration('d2r');
		const basePath = config.get<string>('basePath', 'A:/Program Files/Diablo II Resurrected/mods/D2RMM/D2RMM.mpq/data');

		// Normalize path separators
		const normalizedBasePath = basePath.replace(/\\/g, '/');
		const fullPath = `${ normalizedBasePath }/${ filePath }`;

		// Create file:// URI with proper encoding
		const fileUri = vscode.Uri.file(fullPath.replace(/\//g, '\\')).toString();

		// Create markdown with clickable link
		const markdown = new vscode.MarkdownString();
		markdown.supportHtml = true;
		markdown.isTrusted = true;

		markdown.appendMarkdown(`**gameFiles.${ propertyName }**\n\n`);
		markdown.appendMarkdown(`📁 [\`${ filePath }\`](${ fileUri })\n\n`);
		markdown.appendMarkdown(`*Click to open file*`);

		return new vscode.Hover(markdown, range);
	}

}
