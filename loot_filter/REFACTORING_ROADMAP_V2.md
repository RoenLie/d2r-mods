# 🗺️ Refactoring Roadmap: D2R Loot Filter Mod V2

## Current Architecture Issues

**The Problem**: The code uses an over-engineered OOP pattern with excessive abstraction layers:
- **Builder → Writer → Composer** hierarchy creates unnecessary indirection
- Abstract classes and interfaces everywhere make flow difficult to trace
- Static settings accessed globally
- Data flows through 4-5 layers before anything happens
- C#-style class-heavy architecture in a JavaScript runtime

### Data Flow (Current)
```
mod.ts → LootFilterMod → FilterBuilder → ItemNamesWriter → GemsComposer → ItemCollection → JSON files
         (orchestrator)   (builder)      (writer)          (composer)      (model)
```

---

## 📋 Refactoring Phases

### **Phase 1: Understand & Document** (Week 1)
**Goal**: Create visibility without breaking anything

1. **Map the data flow**
   - Document what each Builder does (FilterBuilder, DropSoundBuilder, etc.)
   - Trace one complete feature end-to-end (e.g., "How do gem filters work?")
   - Create a visual diagram of current architecture

2. **Add integration tests**
   - Create test cases that verify current behavior
   - Test each builder's output independently
   - These will be your safety net during refactoring

3. **Document side effects**
   - Identify all D2RMM.readJson/writeJson calls
   - Map which files each component modifies
   - Note any order dependencies

---

### **Phase 2: Flatten the Hierarchy** (Week 2-3)
**Goal**: Remove unnecessary abstraction layers

1. **Eliminate the Builder pattern** 
   ```typescript
   // Instead of: LootFilterMod → FilterBuilder → Writers
   // Do: LootFilterMod → filter functions
   
   // Before:
   class FilterBuilder { 
     protected itemWriters: IItemWriter[] = []
   }
   
   // After:
   function applyItemFilters(settings: FilterSettings) {
     applyItemNameFilters(settings)
     applyGemFilters(settings)
     // etc.
   }
   ```

2. **Collapse Writer/Composer layers**
   ```typescript
   // Before: ItemNamesWriter → GemsComposer → ItemCollection
   
   // After: Just functions
   function filterGems(config: GemFilterConfig): FilteredItems {
     const gems = loadGemData()
     return applyGemFilter(gems, config)
   }
   ```

3. **Replace abstract classes with simple functions**
   - `BaseItemWriter` → `writeItemNames(items, targetFile)`
   - `ItemCollectionComposerBase` → `composeItems(entries)`

---

### **Phase 3: Functional Core, Imperative Shell** (Week 3-4)
**Goal**: Separate pure logic from side effects

1. **Create pure filter functions**
   ```typescript
   // src/filters/gem-filter.ts
   type GemFilterMode = 'all' | 'flawless' | 'perfect' | 'hide'
   
   function filterGems(
     gems: Gem[], 
     mode: GemFilterMode,
     highlight: HighlightConfig
   ): FilteredGem[] {
     // Pure function - no side effects
     switch (mode) {
       case 'hide': return gems.map(g => ({ ...g, hidden: true }))
       case 'perfect': return gems.filter(g => g.quality === 'perfect')
       // etc.
     }
   }
   ```

2. **Separate I/O operations**
   ```typescript
   // src/io/game-files.ts
   function readItemNames(): ItemNameData {
     return D2RMM.readJson('global\\excel\\item-names.json')
   }
   
   function writeItemNames(data: ItemNameData): void {
     D2RMM.writeJson('global\\excel\\item-names.json', data)
   }
   ```

3. **Create a simple pipeline**
   ```typescript
   // src/pipeline/filter-pipeline.ts
   function runFilterPipeline(settings: UserSettings) {
     // 1. Load data (side effect)
     const itemNames = readItemNames()
     const itemMods = readItemModifiers()
     
     // 2. Apply filters (pure)
     const filteredGems = filterGems(itemNames.gems, settings.gems)
     const filteredRunes = filterRunes(itemNames.runes, settings.runes)
     
     // 3. Compose result (pure)
     const updated = mergeFilteredItems(itemNames, [filteredGems, filteredRunes])
     
     // 4. Write back (side effect)
     writeItemNames(updated)
   }
   ```

---

### **Phase 4: Simplify Models** (Week 4)
**Goal**: Remove unnecessary classes

1. **Replace classes with types**
   ```typescript
   // Before:
   export class Gem {
     constructor(
       public readonly key: string,
       public readonly quality: string,
       // ...
     ) {}
   }
   
   // After:
   type Gem = {
     readonly key: string
     readonly quality: GemQuality
     readonly name: string
   }
   
   const createGem = (key: string, quality: GemQuality): Gem => ({
     key, quality, name: getGemName(key)
   })
   ```

2. **Use plain objects for configuration**
   ```typescript
   // Instead of static classes:
   export class FilterSettings {
     static readonly isEnabled: boolean = ...
   }
   
   // Use simple objects:
   type FilterConfig = {
     enabled: boolean
     highlightColor: string
     hidden: string
   }
   
   const config = loadFilterConfig()
   ```

---

### **Phase 5: Reorganize by Feature** (Week 5)
**Goal**: Group code by what it does, not by pattern

```
src/
  filters/
    gem-filter.ts          # Everything about filtering gems
    rune-filter.ts         # Everything about filtering runes
    potion-filter.ts       # Everything about filtering potions
    equipment-filter.ts    # Everything about filtering equipment
  
  effects/
    drop-sounds.ts         # Drop sound logic
    light-pillars.ts       # Light pillar logic
    item-levels.ts         # iLevel display logic
  
  io/
    game-files.ts          # D2RMM file operations
    mod-config.ts          # Read mod.json config
  
  models/
    types.ts               # Simple type definitions
  
  utils/
    colors.ts              # Color utilities
    text.ts                # Text manipulation
  
  main.ts                  # Entry point - orchestrates everything
```

---

### **Phase 6: Better Configuration** (Week 5-6)
**Goal**: Make settings clear and type-safe

1. **Create a config schema**
   ```typescript
   // src/config/schema.ts
   const configSchema = {
     filter: {
       enabled: boolean(),
       gems: {
         mode: oneOf(['all', 'flawless', 'perfect', 'hide']),
         highlight: boolean(),
         color: color()
       },
       runes: {
         // ...
       }
     },
     sounds: {
       // ...
     }
   }
   ```

2. **Validate and provide defaults**
   ```typescript
   function loadConfig(): ValidatedConfig {
     const raw = D2RMM.config
     return validateConfig(raw, configSchema)
   }
   ```

---

## 🎯 Target Architecture (Simple & Clear)

```typescript
// main.ts - Everything at a glance
import { loadConfig } from './config'
import { applyFilters } from './filters'
import { applyEffects } from './effects'

function main() {
  const config = loadConfig()
  
  if (config.filter.enabled) {
    applyFilters(config.filter)
  }
  
  if (config.sounds.enabled) {
    applyEffects.dropSounds(config.sounds)
  }
  
  if (config.pillars.enabled) {
    applyEffects.lightPillars(config.pillars)
  }
}

main()
```

```typescript
// filters/index.ts
export function applyFilters(config: FilterConfig) {
  const itemData = loadItemData()
  
  const filtered = {
    gems: filterGems(itemData.gems, config.gems),
    runes: filterRunes(itemData.runes, config.runes),
    potions: filterPotions(itemData.potions, config.potions),
    // ...
  }
  
  saveFilteredItems(filtered)
}
```

---

## ⚠️ Migration Strategy

### **Parallel Implementation**
Don't rewrite everything at once:

1. Create new `src/v2/` folder
2. Implement one feature at a time in new structure
3. Add feature flag to switch between old/new
4. Test thoroughly
5. Once all features migrated, delete old code

### **Order of Migration**
Start with simplest, least coupled features:

1. ✅ **Drop sounds** (isolated, simple)
2. ✅ **Light pillars** (isolated, simple)
3. ✅ **Item levels** (isolated, simple)
4. ⚠️ **Gem filter** (moderate complexity, good test case)
5. ⚠️ **Rune filter** (similar to gems)
6. ⚠️ **Potion filter** (similar to gems)
7. 🔴 **Equipment filter** (complex, many edge cases)
8. 🔴 **Custom filter list** (integrates with everything)

---

## 📊 Success Metrics

After refactoring, you should be able to:

- ✅ Understand what the code does in **< 5 minutes**
- ✅ Add a new filter type in **< 30 minutes**
- ✅ Trace any feature from config → output in **< 10 files**
- ✅ Test any feature in **isolation**
- ✅ Reduce codebase size by **~30-40%**
- ✅ Have **zero abstract classes** for the sake of abstraction

---

## 🔑 Key Principles for New Code

1. **Prefer functions over classes** - unless you truly need state/inheritance
2. **Colocate related code** - group by feature, not by pattern
3. **Make data flow explicit** - input → transform → output
4. **Separate pure logic from I/O** - easier to test and reason about
5. **Use types, not classes** - TypeScript types are powerful
6. **Avoid premature abstraction** - solve the problem first, abstract later if needed

---

## 📝 Implementation Notes

### Why This Refactoring?

The current architecture suffers from what's known as "premature abstraction" - applying enterprise patterns to a relatively simple problem domain. While the Builder/Writer/Composer pattern works well in large-scale enterprise applications with hundreds of developers, it's overkill for a mod that:

- Has a clear, linear execution flow
- Doesn't need runtime polymorphism
- Has no concurrent modifications
- Doesn't benefit from the abstraction overhead

### Benefits of Functional Approach

1. **Easier to understand**: Function names describe what they do, not what pattern they implement
2. **Easier to test**: Pure functions are trivially testable
3. **Easier to debug**: Linear data flow is easier to trace
4. **Less code**: No boilerplate for interfaces, abstract classes, inheritance
5. **More flexible**: Easy to compose functions in different ways

### When to Use Classes

Use classes when you have:
- **Mutable state** that needs encapsulation
- **Lifecycle management** (setup/teardown)
- **True polymorphism** needs (not just interface satisfaction)

In this mod, most operations are:
- Read data → Transform → Write data
- No shared mutable state
- No lifecycle beyond function execution

Perfect candidates for functions!

---

## 🚀 Getting Started

Ready to begin? Start with:

1. **Read Phase 1** - Understanding the current system
2. **Pick a simple feature** (e.g., drop sounds)
3. **Implement it in v2 style** in `src/v2/effects/drop-sounds.ts`
4. **Test against old implementation**
5. **Iterate**

The journey of a thousand miles begins with a single step. Or in this case, a single function. 😊
