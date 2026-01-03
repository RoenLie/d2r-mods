# Loot Filter V2 Output Comparison - Bug Report

**Date:** January 3, 2026  
**Comparison:** `test_output/old/` vs `test_output/new/`

## Summary

The new loot filter output differs from the old output in **3 files** with **4 distinct issues**.

---

## 🔴 BUG #1: Missing `.flac` Extension in sounds.txt

**Severity:** High  
**File:** `global/excel/sounds.txt`

**Description:** Custom sound entries in the new output are missing the `.flac` file extension.

| Sound Name | OLD (correct) | NEW (bug) |
|------------|---------------|-----------|
| celf_rune_tier_3 | `object\hellforgeplace.flac` | `object\hellforgeplace` |
| celf_rune_tier_4 | `object\hellforgeplace.flac` | `object\hellforgeplace` |
| celf_quest | `object\hellforgeplace.flac` | `object\hellforgeplace` |
| celf_key | `object\hellforgeplace.flac` | `object\hellforgeplace` |
| celf_organ | `object\hellforgeplace.flac` | `object\hellforgeplace` |
| celf_flag | `items\sound\gemstone.flac` | `items\sound\gemstone` |

**Impact:** Sounds may not play correctly in-game without the proper file extension.

**Likely Source:** Check `src_v2/effects/drop_sounds.ts` or related sound builder files.

---

## 🔴 BUG #2: Duplicate celf_quest Entry Removed

**Severity:** Medium (Verify if Intentional)  
**File:** `global/excel/sounds.txt`

**Description:** 
- OLD file: 11,405 lines
- NEW file: 11,403 lines (2 fewer)

The old file contains duplicate `celf_quest` entries at indices 11393-11394 AND 11395-11396. The new output only has one `celf_quest` entry.

**OLD sounds.txt (lines 11393-11396):**
```
celf_quest	object\hellforgeplace.flac	...
celf_quest_hd	object\hellforgeplace.flac	...
celf_quest	object\hellforgeplace.flac	...  (DUPLICATE)
celf_quest_hd	object\hellforgeplace.flac	...  (DUPLICATE)
```

**Impact:** 
- If duplicates were unintentional in old code → this is a FIX, not a bug
- If duplicates were intentional → this is a regression

**Action:** Investigate why old code created duplicates and determine correct behavior.

---

## 🔴 BUG #3: Incorrect dropsound Values in misc.txt

**Severity:** High  
**File:** `global/excel/misc.txt`

**Description:** Several items have their `dropsound` column values incorrect/swapped:

| Item Name | OLD dropsound | NEW dropsound |
|-----------|---------------|---------------|
| Key to the Cairn Stones | `celf_quest` | `item_scroll` |
| Horadric Cube | `item_rare` | `celf_quest` |
| Horadric Scroll | `celf_quest` | `item_book` |
| Book of Skill | `celf_quest` | `item_book` |

**Impact:** Quest items will play incorrect sounds when dropped, affecting game feedback.

**Likely Source:** Check the drop sound assignment logic in `src_v2/effects/drop_sounds.ts` or item filtering logic.

---

## 🟡 BUG #4: "Low Quality" enUS Value Changed

**Severity:** Low (Possibly Intentional Feature)  
**File:** `local/lng/strings/item-nameaffixes.json`

**Description:** The `enUS` value for "Low Quality" key (id: 1723) changed:

```json
// OLD
{ "id": 1723, "Key": "Low Quality", "enUS": "Low Quality", ... }

// NEW  
{ "id": 1723, "Key": "Low Quality", "enUS": "-", ... }
```

**Impact:** 
- If intentional: This hides the "Low Quality" prefix from item names (filter feature)
- If unintentional: Low quality items will display "-" instead of "Low Quality"

**Action:** Verify if this change is a desired filter feature or a bug.

---

## ✅ Files Verified Identical

The following files are **identical** between old and new outputs:

### Excel Files
- `global/excel/armor.txt` ✓
- `global/excel/weapons.txt` ✓

### Localization JSON Files
- `local/lng/strings/item-names.json` ✓
- `local/lng/strings/item-runes.json` ✓
- `local/lng/strings/item-modifiers.json` ✓
- `local/lng/strings/ui.json` ✓

### HD Item JSON Files (all identical)
- `hd/items/amulet/*.json` ✓
- `hd/items/body_part/*.json` ✓
- `hd/items/charm/*.json` ✓
- `hd/items/gem/*.json` ✓
- `hd/items/key/*.json` ✓
- `hd/items/quest/*.json` ✓
- `hd/items/ring/*.json` ✓
- `hd/items/rune/*.json` ✓
- `hd/items/scroll/*.json` ✓
- `hd/items/weapon/*.json` ✓

---

## Fix Plan

### Bug #1 (Missing .flac)
1. Search for sound file path construction in `src_v2/`
2. Ensure `.flac` extension is appended to file paths
3. Compare with old implementation in `src/Builders/DropSoundBuilder.ts`

### Bug #2 (Duplicate celf_quest)
1. Determine if duplicates were intentional in old code
2. If bug in old code → no action needed (new code is correct)
3. If intentional → fix new code to match

### Bug #3 (Incorrect dropsound)
1. Review drop sound assignment logic for misc items
2. Check for mapping issues or iteration bugs
3. Compare item-to-sound mapping between old and new implementations

### Bug #4 (Low Quality text)
1. Check if this is documented as an intentional filter feature
2. If intentional → document it
3. If unintentional → fix in item name affixes composer

---

## Next Steps

- [ ] Investigate Bug #1 root cause
- [ ] Investigate Bug #2 - determine if fix or regression
- [ ] Investigate Bug #3 root cause
- [ ] Clarify Bug #4 - intentional feature or bug?
- [ ] Implement fixes
- [ ] Re-run comparison to verify fixes
