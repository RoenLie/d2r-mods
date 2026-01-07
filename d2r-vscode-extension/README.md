# D2R File Links

VSCode extension that provides clickable file links in hover documentation for Diablo II Resurrected mod development.

## Features

When hovering over `gameFiles` properties in your TypeScript/JavaScript code, this extension shows:
- The relative file path
- A clickable link to open the actual game file

Example:
```typescript
const sounds = gameFiles.sounds.read();
//                      ^ hover here to see file link
```

## Configuration

Set your D2R data path in VSCode settings:

```json
{
  "d2r.basePath": "A:/Program Files/Diablo II Resurrected/mods/D2RMM/D2RMM.mpq/data"
}
```

You can configure this in:
- **User Settings**: Applies globally
- **Workspace Settings**: Applies to the current workspace only

## Usage

1. Install the extension
2. Configure your `d2r.basePath` in settings
3. Hover over any `gameFiles` property (like `gameFiles.sounds`, `gameFiles.weapons`, etc.)
4. Click the file link in the hover tooltip to open the file

## Supported gameFiles Properties

- `sounds`, `weapons`, `armor`, `misc`, `inventory` (TSV files)
- `itemNames`, `itemNameAffixes`, `itemRunes`, `itemModifiers`, `ui` (JSON files)
- `profileHd`, `profileLv`, `bankOriginalLayout`, `bankExpansionLayout` (Layout files)
- `controllerOverlayHd`, `controllerBankOriginalLayoutHd`, `controllerBankExpansionLayoutHd` (Controller layouts)

## Development

To run the extension in development mode:

1. Open this folder in VSCode
2. Run `npm install`
3. Press F5 to start debugging
4. A new VSCode window will open with the extension loaded

## Requirements

- VSCode 1.85.0 or higher
- TypeScript or JavaScript files using the `gameFiles` pattern
