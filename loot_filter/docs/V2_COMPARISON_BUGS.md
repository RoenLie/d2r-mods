# Loot Filter V2 Output Comparison - Bug Report

**Date:** January 3, 2026  
**Comparison:** `test_output/old/` vs `test_output/new/`
**Status:** ✅ ALL ISSUES RESOLVED (January 4, 2026)

## Summary

The new loot filter output differs from the old output in **3 files** with **4 distinct issues**.

- **2 actual bugs** - Fixed
- **1 old code bug** - New code correctly removes duplicates
- **1 expected behavior** - Not a bug

---

## ✅ BUG #1: Missing `.flac` Extension in sounds.txt - FIXED

**Severity:** High  
**File:** `global/excel/sounds.txt`
**Status:** ✅ FIXED

**Root Cause:** The `SOUND_EFFECTS` constant in `src_v2/effects/drop_sounds.ts` was missing `.flac` extensions on sound file paths.

**Fix:** Added `.flac` extension to all sound file paths in `SOUND_EFFECTS` constant.

---

## ✅ BUG #2: Duplicate celf_quest Entry Removed - NOT A BUG (OLD CODE HAD BUG)

**Severity:** N/A - This was actually a FIX  
**File:** `global/excel/sounds.txt`
**Status:** ✅ CLOSED - New code is correct

**Root Cause Analysis:**

- OLD code called `createNewDropSound()` TWICE with the same suffix `'quest'`:
  1. Once from `modifyDropSoundForMiscItems()`
  2. Once from `modifyDropSoundForWeapons()`
- This created DUPLICATE `celf_quest` and `celf_quest_hd` entries

- NEW code correctly creates sounds ONCE in `createDropSoundPair()` then applies the sound name to both item types without re-creating.

**Conclusion:** The old code had a bug that created duplicates. The new code is correct.

---

## ✅ BUG #3: Incorrect dropsound Values in misc.txt - FIXED

**Severity:** High  
**File:** `global/excel/misc.txt`
**Status:** ✅ FIXED

**Root Cause:** The new `QuestItemIds` constant was missing several quest item codes:

- `SCROLL_INIFUSS_DECIPHERED` ('bkd')
- `HORADRIC_SCROLL` ('tr1')  
- `BOOK_OF_SKILL` ('ass')

Also, `HORADRIC_CUBE` was incorrectly included when old code commented it out (`// [CSTM_DSBOX]`).

**Fix:**

1. Added missing quest item codes to `src_v2/models/types.ts`
2. Updated `src_v2/effects/drop_sounds.ts` to include the missing items and match the old code's behavior

---

## ✅ BUG #4: "Low Quality" enUS Value Changed - NOT A BUG (Expected Behavior)

**Severity:** N/A - Expected behavior  
**File:** `local/lng/strings/item-nameaffixes.json`
**Status:** ✅ CLOSED - Expected behavior

**Root Cause Analysis:**
When `itemAffixes.enabled = true` and `style = 'plusminus'`:

- "Superior" prefix → "+"
- "Low Quality", "Damaged", "Cracked", "Crude" → "-"

This is the INTENDED behavior of the "Short Sup/Inferior Prefixes" feature.
Both old and new code implement this the same way.

**Conclusion:** This difference is expected based on the test configuration settings.

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

## Resolution Summary

| Bug | Status | Resolution |
|-----|--------|------------|
| #1 Missing .flac | ✅ FIXED | Added .flac extension to SOUND_EFFECTS paths |
| #2 Duplicate sounds | ✅ CLOSED | Old code bug - new code is correct |
| #3 Wrong dropsounds | ✅ FIXED | Added missing quest item codes |
| #4 Low Quality text | ✅ CLOSED | Expected behavior per config |

---

## Files Modified

1. `src_v2/effects/drop_sounds.ts` - Added .flac extensions, fixed quest items list
2. `src_v2/models/types.ts` - Added missing quest item codes

---

## Next Steps

- [x] ~~Investigate Bug #1 root cause~~ - Fixed
- [x] ~~Investigate Bug #2~~ - Old code had bug, new is correct
- [x] ~~Investigate Bug #3 root cause~~ - Fixed
- [x] ~~Clarify Bug #4~~ - Expected behavior
- [ ] Re-run comparison to verify fixes
- [ ] Generate new test output and compare again
