# Constants Refactoring Roadmap

## Executive Summary

The current constants system uses abstract classes as static property holders, which was a reasonable start but has become inconsistent and incomplete. This document outlines a comprehensive refactoring plan to modernize the constants system using TypeScript enums, proper type safety, and better separation of concerns.

**Estimated Effort:** 6-8 hours  
**Impact:** High - Better type safety, cleaner code, easier maintenance  
**Risk:** Medium - Requires updating imports across codebase, but TypeScript will catch breaking changes  

---

## Current State Analysis

### What Works ✅

1. **Basic String Constants**
   - `CharConstants` - Characters and whitespace helpers
   - `SettingsConstants` - Common config values
   - `FileConstants` - File paths and extensions
   - These work fine as-is but could be optimized

2. **Enum System**
   - `ED2ColorCode` - Color code enums ✅
   - `ED2rColor` - D2R color enums ✅
   - `EItemQuality` - Item quality enum ✅
   - These are implemented correctly

3. **Model Classes**
   - `D2Color` / `D2rColor` - Wrapper classes with behavior
   - `Rune`, `Gem`, `RuneTier`, `SunderCharm` - Domain models
   - These are appropriate class usage

### What's Broken ❌

1. **Type Safety Issues**
   ```typescript
   // Current - no compile-time safety
   static charmSmallId = 'cm1';
   const myId = 'cm1'; // Could be typo 'cmm1', no error!
   
   // Should be
   enum CharmId {
     SMALL = 'cm1'
   }
   const myId: CharmId = CharmId.SMALL; // Type-safe!
   ```

2. **Abstract Class Misuse**
   - Classes like `CharmConstants`, `GemConstants` etc. are never inherited
   - Used purely as namespaces - should be enums or const objects
   - Abstract classes are for inheritance hierarchies, not static holders

3. **Mixed Concerns**
   ```typescript
   // RuneConstants.ts - Constants class calling Settings!
   static tiers = [
     new RuneTier(
       1,
       this.lowRunes,
       RunesSettings.low.isVisible, // ❌ Runtime dependency in "constants"
       // ...
     ),
   ];
   ```
   - Constants should be pure data
   - Initialization logic should be in factories or loaders

4. **Dead Code**
   - `RuneTierConstants` - Entirely commented out
   - `ColorConstants` - 50+ lines of research notes and TODOs
   - `GemConstants` - Multiple TODO comments for incomplete features

5. **Duplicate Data**
   ```typescript
   static anniId = 'Annihilus';
   static anniName = this.anniId; // Why both?
   ```

---

## Refactoring Strategy

### Core Principles

1. **Enums for Identity** - Use enums for game item IDs and fixed string sets
2. **Classes for Behavior** - Keep classes only when they have methods or state
3. **Const Objects for Config** - Use const objects for complex structured data
4. **Separate Data from Logic** - Move initialization logic to factory functions
5. **Type Safety First** - Leverage TypeScript's type system throughout

### Pattern Decisions

| Current Pattern | New Pattern | Reason |
|----------------|-------------|--------|
| `abstract class` with static IDs | `enum` | Type safety, autocomplete, validation |
| Complex object arrays in classes | Factory functions | Separate data from initialization |
| Runtime Settings in constants | Lazy initialization | Avoid circular dependencies |
| Commented code blocks | Delete or implement | Clean codebase |
| Duplicate ID/Name properties | Single enum | Reduce redundancy |

---

## Implementation Plan

### Phase 1: Quick Wins (1-2 hours)

**Goal:** Convert simple ID holders to enums, clean up dead code

#### 1.1 Create Item ID Enums

**Files to create:**
- `src/Enums/CharmId.ts`
- `src/Enums/GemId.ts`
- `src/Enums/JewelryId.ts`
- `src/Enums/EndgameItemId.ts`
- `src/Enums/QuestItemId.ts`

**Example - `CharmId.ts`:**
```typescript
export enum CharmId {
  SMALL = 'cm1',
  LARGE = 'cm2',
  GRAND = 'cm3',
  ANNIHILUS = 'Annihilus',
  TORCH = 'Hellfire Torch',
  GHEEDS = "Gheed's Fortune",
}

export enum SunderCharmId {
  MAGIC = 'Black Cleft',
  PHYSICAL = 'Bone Break',
  COLD = 'Cold Rupture',
  LIGHTNING = 'Crack of the Heavens',
  FIRE = 'Flame Rift',
  POISON = 'Rotting Fissure',
}
```

**Files to modify:**
- Update `CharmConstants.ts` to use new enums
- Update all imports throughout codebase

**Testing:**
- Search for all string literals like `'cm1'` and verify they use enums
- Run TypeScript compiler to catch any type errors

#### 1.2 Clean Up Dead Code

**Files to modify:**
- `RuneTierConstants.ts` - Delete file entirely (implementation is in RuneConstants)
- `ColorConstants.ts` - Remove commented research notes (preserve them in this doc below)
- `GemConstants.ts` - Remove TODO comments, create GitHub issues for incomplete work

#### 1.3 Remove Duplicate Properties

**Files to modify:**
- `CharmConstants.ts` - Remove `*Name` properties that duplicate `*Id`

---

### Phase 2: Restructure Complex Constants (2-3 hours)

**Goal:** Separate data definition from initialization logic

#### 2.1 Refactor RuneConstants

**Current Problem:**
```typescript
// Constants class creating instances with Settings dependencies
static tiers = [
  new RuneTier(1, this.lowRunes, RunesSettings.low.isVisible, /* ... */),
];
```

**Solution:**
Create a factory function in a separate file.

**New file - `src/Factories/RuneTierFactory.ts`:**
```typescript
import { Rune } from '../Models/Items/Rune';
import { RuneTier } from '../Models/Items/RuneTier';
import { RunesSettings } from '../Settings/Filter/RunesSettings';
import { LightPillarsSettings } from '../Settings/LightPillarsSettings';
import { DropSoundsSettings } from '../Settings/DropSoundsSettings';

export enum RuneId {
  EL = 1, ELD = 2, TIR = 3, NEF = 4, ETH = 5,
  ITH = 6, TAL = 7, RAL = 8, ORT = 9, THUL = 10,
  AMN = 11, SOL = 12, SHAEL = 13, DOL = 14, HEL = 15,
  IO = 16, LUM = 17, KO = 18, FAL = 19, LEM = 20,
  PUL = 21, UM = 22, MAL = 23, IST = 24, GUL = 25,
  VEX = 26, OHM = 27, LO = 28, SUR = 29, BER = 30,
  JAH = 31, CHAM = 32, ZOD = 33,
}

export const RUNE_DATA: Record<RuneId, { name: string; key: string }> = {
  [RuneId.EL]: { name: 'El', key: 'r01' },
  [RuneId.ELD]: { name: 'Eld', key: 'r02' },
  // ... etc
};

export class RuneTierFactory {
  static createTiers(): RuneTier[] {
    const lowRunes: Rune[] = [
      new Rune(RuneId.EL, 'El'),
      new Rune(RuneId.ELD, 'Eld'),
      // ... etc
    ];

    return [
      new RuneTier(
        1,
        lowRunes,
        RunesSettings.low.isVisible,
        RunesSettings.low.nameColor,
        // ... etc
      ),
      // ... other tiers
    ];
  }
}
```

**Modified - `RuneConstants.ts`:**
```typescript
export abstract class RuneConstants {
  static lowRunes: Rune[] = [ /* ... */ ];
  static lowMidRunes: Rune[] = [ /* ... */ ];
  static midRunes: Rune[] = [ /* ... */ ];
  static highRunes: Rune[] = [ /* ... */ ];
  
  // Lazy initialization to avoid circular dependencies
  private static _tiers?: RuneTier[];
  static get tiers(): RuneTier[] {
    if (!this._tiers) {
      this._tiers = RuneTierFactory.createTiers();
    }
    return this._tiers;
  }

  static translatedAffixes: string[] = [ /* ... */ ];
}
```

#### 2.2 Refactor GemConstants

Similar pattern to runes - separate gem data from initialization.

**New file - `src/Enums/GemId.ts`:**
```typescript
export enum GemType {
  AMETHYST = 'Amethyst',
  DIAMOND = 'Diamond',
  EMERALD = 'Emerald',
  RUBY = 'Ruby',
  SAPPHIRE = 'Sapphire',
  TOPAZ = 'Topaz',
  SKULL = 'Skull',
}

export enum GemQuality {
  CHIPPED = 'Chipped',
  FLAWED = 'Flawed',
  NORMAL = 'Normal',
  FLAWLESS = 'Flawless',
  PERFECT = 'Perfect',
}

// Composite IDs
export const GemId = {
  CHIPPED_AMETHYST: 'gcv',
  CHIPPED_DIAMOND: 'gcw',
  // ... etc
} as const;

export type GemId = typeof GemId[keyof typeof GemId];
```

#### 2.3 Simplify HighlightConstants

**Current issue:** Computes patterns at module load time.

**Solution:** Make them lazy getters or move to a utility class.

---

### Phase 3: Type Safety Enhancement (1-2 hours)

**Goal:** Replace all string literals with typed enums

#### 3.1 Create Index Exports

**New file - `src/Enums/index.ts`:**
```typescript
export * from './CharmId';
export * from './GemId';
export * from './JewelryId';
export * from './EndgameItemId';
export * from './QuestItemId';
export * from './RuneId';
```

#### 3.2 Update Consumers

Search and replace string literals with enum references:

```typescript
// Before
if (itemId === 'cm1') { /* ... */ }

// After
import { CharmId } from '../Enums';
if (itemId === CharmId.SMALL) { /* ... */ }
```

**Files to audit:**
- All `ItemCollectionComposers/*`
- All `ItemWriters/*`
- All `Builders/*`

#### 3.3 Add Stricter Types

```typescript
// Before
function processCharm(id: string) { /* ... */ }

// After
function processCharm(id: CharmId) { /* ... */ }
```

---

### Phase 4: Documentation & Cleanup (1 hour)

**Goal:** Document the new system and remove cruft

#### 4.1 Add JSDoc Comments

```typescript
/**
 * Diablo 2 charm item identifiers.
 * 
 * Small charms (1x1), Large charms (1x2), and Grand charms (1x3)
 * can have random affixes. Unique charms like Annihilus and Hellfire
 * Torch have fixed properties.
 * 
 * @see https://diablo2.diablowiki.net/Charms
 */
export enum CharmId {
  /** Small Charm (1x1 inventory size) */
  SMALL = 'cm1',
  // ...
}
```

#### 4.2 Create Constants System README

**New file - `src/Constants/README.md`:**

Document:
- Overview of the constants system
- When to use enums vs classes vs const objects
- How to add new constants
- Migration guide from old patterns

#### 4.3 Archive Research

Move color code research from comments into documentation:

**New file - `docs/D2_COLOR_CODES.md`:**

Preserve all the research links and color code documentation from `ColorConstants.ts`.

---

## Testing Strategy

### Automated Testing

1. **TypeScript Compilation**
   ```bash
   pnpm tsc --noEmit
   ```
   Should pass with no errors after each phase.

2. **Linting**
   ```bash
   pnpm eslint --fix
   ```
   Should pass with no warnings.

3. **Search for String Literals**
   ```bash
   # Find any remaining hardcoded IDs
   grep -r "'cm1'" src/
   grep -r "'amu'" src/
   grep -r "'Annihilus'" src/
   ```

### Manual Testing

After full refactoring:

1. **Build the mod** - Verify it compiles
2. **Run in D2RMM** - Verify mod loads
3. **Test in game** - Verify filtered items appear correctly
4. **Check all features:**
   - Rune highlighting
   - Gem filtering
   - Charm tooltips
   - Quest item markers
   - Drop sounds
   - Light pillars

---

## Migration Checklist

Use this checklist to track progress:

### Phase 1: Quick Wins
- [ ] Create `src/Enums/` folder
- [ ] Create `CharmId.ts` enum
- [ ] Create `GemId.ts` enum  
- [ ] Create `JewelryId.ts` enum
- [ ] Create `EndgameItemId.ts` enum
- [ ] Create `QuestItemId.ts` enum
- [ ] Update `CharmConstants.ts` to use enums
- [ ] Delete `RuneTierConstants.ts`
- [ ] Clean up `ColorConstants.ts` comments
- [ ] Remove TODOs from `GemConstants.ts`
- [ ] Remove duplicate properties from `CharmConstants.ts`
- [ ] Run tests

### Phase 2: Restructure
- [ ] Create `src/Factories/` folder
- [ ] Create `RuneTierFactory.ts`
- [ ] Refactor `RuneConstants.ts` to use factory
- [ ] Create `GemFactory.ts`
- [ ] Refactor `GemConstants.ts` to use factory
- [ ] Refactor `HighlightConstants.ts` patterns
- [ ] Update all factory consumers
- [ ] Run tests

### Phase 3: Type Safety
- [ ] Create `src/Enums/index.ts`
- [ ] Update all `ItemCollectionComposers` to use enums
- [ ] Update all `ItemWriters` to use enums
- [ ] Update all `Builders` to use enums
- [ ] Add type annotations to function signatures
- [ ] Run TypeScript strict mode
- [ ] Run tests

### Phase 4: Documentation
- [ ] Add JSDoc to all enums
- [ ] Create `src/Constants/README.md`
- [ ] Create `docs/D2_COLOR_CODES.md`
- [ ] Update main project README
- [ ] Create GitHub issues for deferred TODOs
- [ ] Final test pass

---

## Risks & Mitigation

### Risk 1: Breaking Changes
**Probability:** High  
**Impact:** Medium  
**Mitigation:**
- TypeScript will catch most breaks at compile time
- Test after each phase, not just at end
- Keep git commits small and atomic
- Use search/replace to update all usages at once

### Risk 2: Circular Dependencies
**Probability:** Medium  
**Impact:** Medium  
**Mitigation:**
- Use lazy initialization for complex objects
- Move Settings dependencies to factories
- Use dependency injection where needed

### Risk 3: Runtime Behavior Changes
**Probability:** Low  
**Impact:** High  
**Mitigation:**
- Test in actual D2R game, not just compilation
- Keep backups of working mod configuration
- Document any behavior changes

---

## Future Enhancements

After completing the refactoring, consider:

1. **Const Enums**
   - Use `const enum` for zero runtime cost where appropriate
   - Trade-off: Less debuggable but smaller bundle

2. **Validation Utilities**
   ```typescript
   function isValidCharmId(id: string): id is CharmId {
     return Object.values(CharmId).includes(id as CharmId);
   }
   ```

3. **Auto-generate from Game Data**
   - Parse D2R data files to generate enums automatically
   - Keep constants in sync with game updates

4. **Type Guards**
   ```typescript
   function processItem(id: string) {
     if (isCharmId(id)) {
       // TypeScript knows id is CharmId here
     }
   }
   ```

---

## Appendix A: Color Code Research

(Preserved from ColorConstants.ts comments)

### D2 Color Code References

- https://d2mods.info/forum/viewtopic.php?t=67420&sid=47faa4e28760d543f321a67f36a125ab
- https://d2mods.info/forum/viewtopic.php?f=217&t=67420&p=503242#p503242
- https://d2mods.info/forum/kb/viewarticle?a=404
- https://d2mods.info/forum/viewtopic.php?t=1762
- https://d2mods.info/forum/viewtopic.php?f=6&t=66716&p=499720&hilit=color+codes#p499720

### Legacy Color Code Mapping

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
  ÿc7 — SPRITE_COLOR_BNETGOLD - unused
  ÿcM — light gold
ÿc5 — SPRITE_COLOR_GREY
ÿc6 — SPRITE_COLOR_BLACK
ÿc8 — SPRITE_COLOR_ORANGE
ÿc9 — SPRITE_COLOR_YELLOW
  ÿcR — yellow
ÿc; — SPRITE_COLOR_PURPLE
  ÿcO pink
```

### Special Color Codes

```
ÿc= = DefaultColor      by default $FontColorWhite
ÿcE = HealthPotionColor by default $FontColorWhite
ÿcF = ManaPotionColor   by default $FontColorWhite
ÿcG = RejuvPotionColor  by default $FontColorWhite
ÿcH = GoldColor         by default $FontColorWhite
ÿcC = SetColor          by default $FontColorGreen
ÿcA = TemperedColor     by default $FontColorDarkGreen
ÿcB = MagicColor        by default $FontColorBlue
ÿc> = QuestColor        by default $FontColorGoldYellow
ÿcD = UniqueColor       by default $FontColorGoldYellow
ÿcK = SocketedColor     by default $FontColorGrey
ÿcI = EtherealColor     by default $FontColorGrey
ÿcL = EventItemsColor   by default $FontColorOrange
ÿcJ = RuneColor         by default $FontColorOrange
ÿc@ = CraftedColor      by default $FontColorOrange
ÿc? = RareColor         by default $FontColorYellow
```

---

## Appendix B: File Structure After Refactoring

```
src/
├── Enums/
│   ├── index.ts
│   ├── CharmId.ts
│   ├── GemId.ts
│   ├── GemType.ts
│   ├── GemQuality.ts
│   ├── JewelryId.ts
│   ├── EndgameItemId.ts
│   ├── QuestItemId.ts
│   └── RuneId.ts
├── Factories/
│   ├── RuneTierFactory.ts
│   └── GemFactory.ts
├── Constants/
│   ├── README.md
│   ├── CharConstants.ts (keep as-is)
│   ├── FileConstants.ts (keep as-is)
│   ├── SettingsConstants.ts (keep as-is)
│   ├── DropSoundConstants.ts (refactored)
│   ├── LightPillarConstants.ts (refactored)
│   ├── Colors/
│   │   ├── ColorConstants.ts (cleaned up)
│   │   └── FontColorConstants.ts (keep as-is)
│   └── Items/
│       ├── CharmConstants.ts (refactored, uses enums)
│       ├── GemConstants.ts (refactored, uses factory)
│       ├── RuneConstants.ts (refactored, uses factory)
│       ├── JewelryConstants.ts (refactored, uses enums)
│       ├── EndgameConstants.ts (refactored, uses enums)
│       ├── QuestConstants.ts (refactored, uses enums)
│       └── HighlightConstants.ts (refactored)
├── Models/
│   └── (unchanged)
└── (other folders unchanged)

docs/
├── CONSTANTS_REFACTORING_ROADMAP.md (this file)
└── D2_COLOR_CODES.md (color research)
```

---

## Questions & Decisions Log

### Q: Should we use `enum` or `const enum`?
**Decision:** Start with regular `enum`. Convert to `const enum` later if bundle size is an issue.  
**Rationale:** Regular enums are easier to debug and have better IDE support.

### Q: Keep abstract classes or convert to namespaces?
**Decision:** Keep simple abstract classes for utility functions (CharConstants), use enums for IDs.  
**Rationale:** Abstract classes work fine for the few that have methods (like `getSpaces()`).

### Q: Where should factories live?
**Decision:** New `src/Factories/` folder.  
**Rationale:** Clear separation of concerns, easy to find initialization logic.

### Q: What to do with translated strings?
**Decision:** Keep in constants for now, consider i18n system later.  
**Rationale:** Out of scope for this refactor, but document as future work.

---

**Document Version:** 1.0  
**Last Updated:** January 2, 2026  
**Author:** Refactoring Initiative  
**Status:** READY FOR IMPLEMENTATION
