# Color Constants

This directory contains centralized constant definitions for the loot filter.

## colors.ts

All D2R color codes are now centralized in this file to avoid magic strings throughout the codebase.

### Available Exports

- **`COLOR`** - All D2R color codes (WHITE, RED, GREEN, BLUE, GOLD, etc.)
- **`SEMANTIC_COLOR`** - Semantic aliases for common use cases (HEALTH, MANA, FIRE, COLD, etc.)
- **`COLOR_NAME_MAP`** - Map of color names to codes for config parsing
- **`GEM_COLOR`** - Gem-specific color constants
- **`SUNDER_COLOR`** - Sunder charm colors by element type

### Usage Examples

```typescript
import { COLOR, SEMANTIC_COLOR, GEM_COLOR } from '../constants/colors';

// Basic usage
const itemName = `${COLOR.GOLD}Unique Item`;
const healthPotion = `${SEMANTIC_COLOR.HEALTH}+${COLOR.WHITE}H`;

// Using gem colors
const rubyName = `${GEM_COLOR.RUBY}Ruby`;

// Using sunder charm colors
const coldSunder = `${SUNDER_COLOR.COLD}Cold Rupture`;
```

### Benefits

- **No Magic Strings**: All color codes are named constants
- **Type Safety**: TypeScript will catch typos and invalid usage
- **Discoverability**: IDE autocomplete shows all available colors
- **Maintainability**: Single source of truth for color definitions
- **Readability**: `COLOR.RED` is clearer than `'ÿc1'`
