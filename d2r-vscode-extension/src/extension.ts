import * as vscode from 'vscode';

import { D2RHoverProvider } from './hoverProvider';


export function activate(context: vscode.ExtensionContext): void {
	console.log('D2R File Links extension is now active');

	// Register hover provider for TypeScript and JavaScript
	const hoverProvider = new D2RHoverProvider();

	context.subscriptions.push(
		vscode.languages.registerHoverProvider(
			{ scheme: 'file', language: 'typescript' },
			hoverProvider,
		),
	);

	context.subscriptions.push(
		vscode.languages.registerHoverProvider(
			{ scheme: 'file', language: 'javascript' },
			hoverProvider,
		),
	);
}

export function deactivate(): void {
	// Cleanup if needed
}
