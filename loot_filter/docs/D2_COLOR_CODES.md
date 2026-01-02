# Diablo 2 Color Codes Reference

This document contains research and reference information about Diablo 2 color codes used in the game's text rendering system.

## Primary Sources

- [D2Mods Forum - Color Codes Discussion](https://d2mods.info/forum/viewtopic.php?t=67420&sid=47faa4e28760d543f321a67f36a125ab)
- [D2Mods Forum - Extended Color Codes](https://d2mods.info/forum/viewtopic.php?f=217&t=67420&p=503242#p503242)
- [D2Mods KB - Color Code Article](https://d2mods.info/forum/kb/viewarticle?a=404)
- [D2Mods Forum - General Color Discussion](https://d2mods.info/forum/viewtopic.php?t=1762)
- [D2Mods Forum - Color Codes Thread](https://d2mods.info/forum/viewtopic.php?f=6&t=66716&p=499720&hilit=color+codes#p499720)

## Legacy Color Code System

All color codes are prefixed with `ÿc` (y-umlaut + c).

### Basic Color Codes

```
ÿc0 — SPRITE_COLOR_NORMAL / FONTCOLOR_WHITE
ÿc1 — SPRITE_COLOR_RED (pale red)
  ÿcS — dark red
  ÿcU — rich red
ÿc2 — SPRITE_COLOR_GREEN
  ÿcQ — light green
  ÿc< — SPRITE_COLOR_NEWCHAR
  ÿc: — SPRITE_COLOR_DARKGREEN
ÿc3 — SPRITE_COLOR_BLUE
  ÿcT — sky-blue
  ÿcP — pale violet
  ÿcN — light blue
ÿc4 — SPRITE_COLOR_PANEL / FONTCOLOR_GOLD
  ÿc7 — SPRITE_COLOR_BNETGOLD (unused)
  ÿcM — light gold
ÿc5 — SPRITE_COLOR_GREY
ÿc6 — SPRITE_COLOR_BLACK
ÿc8 — SPRITE_COLOR_ORANGE
ÿc9 — SPRITE_COLOR_YELLOW
  ÿcR — yellow (alternate)
ÿc; — SPRITE_COLOR_PURPLE
  ÿcO — pink
```

### Named Color Variables

These color codes reference variables that can be customized in D2R profile files:

```
ÿc= — DefaultColor      (default: $FontColorWhite)
ÿcE — HealthPotionColor (default: $FontColorWhite)
ÿcF — ManaPotionColor   (default: $FontColorWhite)
ÿcG — RejuvPotionColor  (default: $FontColorWhite)
ÿcH — GoldColor         (default: $FontColorWhite)
ÿcC — SetColor          (default: $FontColorGreen)
ÿcA — TemperedColor     (default: $FontColorDarkGreen)
ÿcB — MagicColor        (default: $FontColorBlue)
ÿc> — QuestColor        (default: $FontColorGoldYellow)
ÿcD — UniqueColor       (default: $FontColorGoldYellow)
ÿc? — RareColor         (default: $FontColorYellow)
ÿcK — SocketedColor     (default: $FontColorGrey)
ÿcI — EtherealColor     (default: $FontColorGrey)
ÿcL — EventItemsColor   (default: $FontColorOrange)
ÿcJ — RuneColor         (default: $FontColorOrange)
ÿc@ — CraftedColor      (default: $FontColorOrange)
```

## Standard Color Names

These are the common color names referenced throughout D2:

- White
- Light Grey / Light Gray
- Dark Grey / Dark Gray
- Black
- Light Blue
- Dark Blue
- Crystal Blue
- Light Red
- Dark Red
- Crystal Red
- Light Green
- Dark Green
- Crystal Green
- Light Yellow
- Dark Yellow
- Light Gold
- Dark Gold
- Light Purple
- Dark Purple
- Orange
- Bright White

## Implementation Notes

### ED2ColorCode Enum

The `ED2ColorCode` enum in this codebase maps these legacy codes to descriptive names:

```typescript
export enum ED2ColorCode {
  NONE = 'none',
  DEFAULT = 'default',
  WHITE = '0',
  TOMATO = '1',      // SPRITE_COLOR_RED
  LIME = '2',        // SPRITE_COLOR_GREEN
  // ... etc
}
```

### D2Color Class

The `D2Color` class wraps color codes and provides:
- String conversion: `toString()` returns `ÿc{code}`
- Equality checking: `equals(color)`
- Factory method: `create(code, fallback?)` with null handling

### Font Color Variables (D2R)

D2 Resurrected uses a different system with font color variables defined in profile JSON files:

```typescript
export enum ED2rColor {
  WHITE = 'White',
  BEIGE = 'Beige',
  BLACK = 'Black',
  DARK_GREEN = 'DarkGreen',
  GREEN = 'Green',
  LIGHT_BLUE = 'LightBlue',
  // ... etc
}
```

These are prefixed with `$FontColor` when used: `$FontColorWhite`, `$FontColorGreen`, etc.

## Usage in Loot Filter

### Legacy Text (item-names.json, etc.)
Uses `ÿc` codes directly:
```json
{
  "Key": "Annihilus",
  "enUS": "ÿcDAnnihilus"
}
```

### D2R UI (profilehd.json, etc.)
Uses font color variables:
```json
{
  "textString": "$FontColorGoldYellowAnnihilus"
}
```

## Color Code Mapping Examples

| Visual Color | Legacy Code | Enum Name | D2R Variable |
|-------------|-------------|-----------|--------------|
| White | ÿc0 | WHITE | $FontColorWhite |
| Red | ÿc1 | TOMATO | $FontColorLightRed |
| Green | ÿc2 | LIME | $FontColorGreen |
| Blue | ÿc3 | CORN_FLOWER_BLUE | $FontColorLightBlue |
| Gold | ÿc4 | TAN | $FontColorCurrencyGold |
| Gray | ÿc5 | GRAY_DIMMER | $FontColorLightGray |
| Black | ÿc6 | BLACK | $FontColorBlack |
| Orange | ÿc8 | ORANGE | - |
| Yellow | ÿc9 | YELLOW | - |
| Purple | ÿc; | DARK_VIOLET | $FontColorLightPurple |

## Special Considerations

### Item Quality Colors

Different item qualities have associated colors that can be overridden:

- **Magic** (ÿcB): Blue
- **Rare** (ÿc?): Yellow
- **Set** (ÿcC): Green
- **Unique** (ÿcD): Gold
- **Crafted** (ÿc@): Orange
- **Rune** (ÿcJ): Orange

### State Colors

- **Socketed** (ÿcK): Gray
- **Ethereal** (ÿcI): Dark Gray

### Potion Colors

Can be customized but default to white:
- Health (ÿcE)
- Mana (ÿcF)
- Rejuvenation (ÿcG)

## Best Practices

1. **Use Enums**: Reference `ED2ColorCode` enum values instead of string literals
2. **Wrapper Class**: Use `D2Color` class for type safety and methods
3. **Fallbacks**: Provide fallback colors when using user settings
4. **Testing**: Always test colors in-game as they may render differently than expected
5. **Readability**: Use semantic names (ColorConstants.unique) rather than codes directly

## Future Work

- [ ] Auto-generate color documentation from code
- [ ] Add visual color swatches to documentation
- [ ] Map all legacy codes to D2R equivalents
- [ ] Create color preview tool for mod developers
- [ ] Document color rendering differences between D2 and D2R
