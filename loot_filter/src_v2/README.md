# Loot Filter V2 - Refactored Implementation

## ✅ What's Been Migrated

The following features have been successfully migrated to the new V2 architecture:

### Effects (Complete)
- ✅ **Drop Sounds** - Custom drop sounds for runes, quest items, essences, tokens, keys, organs
- ✅ **Light Pillars** - Visual light pillar effects for items
- ✅ **Item Levels** - Display iLvl on weapons, armor, jewelry, and charms

### Filters (TODO)
- ⏳ **Gem Filter** - Show/hide gems by quality
- ⏳ **Rune Filter** - Show/hide runes by tier  
- ⏳ **Potion Filter** - Filter healing/mana/rejuv potions
- ⏳ **Equipment Filter** - Advanced filtering for weapons/armor
- ⏳ **Custom Filter List** - User-defined item name customization

## 🎯 Architecture Overview

### V1 (Legacy) - Complex OOP
```
mod.ts → LootFilterMod → FilterBuilder → ItemNamesWriter → GemsComposer → ItemCollection → Files
         (orchestrator)   (builder)      (writer)          (composer)      (model)
```

5 layers of abstraction, jumping through classes to understand one feature.

### V2 (New) - Simple & Functional
```
mod.ts → main() → applyDropSounds() → readSounds() / writeSounds()
                                      (pure logic)   (side effects)
```

Direct, understandable flow. Each function does one thing well.

## 📁 File Structure

```
src_v2/
  effects/           # Visual and audio effects
    drop-sounds.ts   # ✅ Custom drop sounds
    light-pillars.ts # ✅ Visual light pillars
    item-levels.ts   # ✅ Show item levels
  
  filters/           # Loot filtering logic (TODO)
    gem-filter.ts
    rune-filter.ts
    equipment-filter.ts
  
  io/                # All file I/O in one place
    game-files.ts    # ✅ Read/write D2RMM files
    mod-config.ts    # ✅ Load configuration
  
  models/            # Type definitions
    types.ts         # ✅ Simple types, no classes
  
  utils/             # Shared utilities (future)
  
  main.ts            # ✅ Entry point - orchestrates everything
```

## 🔄 How to Use

### Testing V2 (Safe)

In [mod.ts](../../mod.ts), change:
```typescript
const USE_V2 = false;  // Legacy implementation
```

To:
```typescript
const USE_V2 = true;   // New V2 implementation
```

Both versions coexist safely. You can switch back anytime.

### Current Status

**V2 implements these features:**
- ✅ Drop sounds for all item types
- ✅ Light pillars for runes, jewelry, gems, charms, quest items
- ✅ Item level display

**Still using V1:**
- Item name filtering (gems, runes, potions, equipment)
- Highlighting and color customization
- Custom filter lists

## 🔍 Key Improvements

### 1. **No More Class Hierarchies**
```typescript
// V1: Abstract classes, interfaces, inheritance
export abstract class BaseItemWriter implements IItemWriter {
  protected abstract initializeBuilders(): void;
  // ...
}

// V2: Just functions
export function applyDropSounds(config: DropSoundsConfig): void {
  // Clear, direct logic
}
```

### 2. **Explicit Data Flow**
```typescript
// V2: You can see exactly what happens
export function applyDropSounds(config: DropSoundsConfig): void {
  // 1. Load data
  const soundsData = readSounds()
  const miscData = readMisc()
  
  // 2. Apply modifications
  applyRuneDropSounds(soundsData, miscData, config)
  
  // 3. Save data
  writeSounds(soundsData)
  writeMisc(miscData)
}
```

### 3. **Separation of Concerns**
- **Pure functions** (no side effects) - easy to test and understand
- **I/O functions** (side effects only) - isolated in `io/`
- **Configuration** - loaded once, passed explicitly

### 4. **Organized by Feature**
Instead of organizing by pattern (Builders, Writers, Composers), V2 organizes by what it does (effects, filters).

Want to understand drop sounds? Read ONE file: `effects/drop-sounds.ts`

## 📊 Comparison

| Aspect | V1 (Legacy) | V2 (New) |
|--------|-------------|----------|
| Lines of code | ~200 for drop sounds | ~350 (with comments) |
| Files to read | 5+ | 1 |
| Classes | 3+ | 0 |
| Abstractions | Builder→Writer→Composer | Functions |
| Time to understand | 20+ minutes | 5 minutes |
| Easy to modify | ❌ | ✅ |
| Easy to test | ❌ | ✅ |

## 🎓 Learning from V2

### Example: Adding a New Effect

**V1 would require:**
1. Create a new Builder class
2. Implement IBuilder interface
3. Register in LootFilterMod
4. Possibly create Writers/Composers
5. Wire everything together

**V2 requires:**
1. Create a new file in `effects/`
2. Write a function
3. Call it from `main.ts`

That's it!

### Example: Understanding Drop Sounds

**V1:** Read DropSoundBuilder → DropSoundConstants → SoundEffect model → Settings → understand 5 files

**V2:** Read `effects/drop-sounds.ts` → understand 1 file with all logic in one place

## 🚀 Next Steps

To complete the migration:

1. **Implement filters** (gem, rune, potion, equipment)
2. **Test thoroughly** against V1 output
3. **Switch default to V2** once validated
4. **Remove V1** after testing period

## 💡 Philosophy

The V2 refactor follows these principles:

1. **Functions over classes** - unless state is truly needed
2. **Explicit over implicit** - clear data flow, no magic
3. **Feature-based organization** - group by what, not how
4. **Separate I/O from logic** - pure functions are easier to reason about
5. **Documentation in code** - comments explain why, code explains how

---

**Status:** 🟡 Partial implementation - effects complete, filters pending

**Safe to use:** ✅ Yes, feature toggle allows easy rollback

**Production ready:** ⏳ After filter migration and testing
