# V2 Comparison Bugs - Round 2

**Date:** January 3, 2026  
**Comparison:** `test_output/old` vs `test_output/new`

## Summary

After the previous fixes, only **one file** has remaining differences:
- `local/lng/strings/item-nameaffixes.json`

All other files are now **identical**:
- ✅ `global/excel/sounds.txt` - IDENTICAL
- ✅ `global/excel/misc.txt` - IDENTICAL  
- ✅ `global/excel/armor.txt` - IDENTICAL
- ✅ `global/excel/weapons.txt` - IDENTICAL
- ✅ All HD JSON files - IDENTICAL
- ✅ `local/lng/strings/item-names.json` - IDENTICAL
- ✅ `local/lng/strings/item-runes.json` - IDENTICAL
- ✅ `local/lng/strings/item-modifiers.json` - IDENTICAL
- ✅ `local/lng/strings/ui.json` - IDENTICAL

---

## Bug #5: Superior/Inferior Prefixes - OLD Code Not Applying Transformation

**Status:** 🔴 BUG IN OLD CODE  
**Severity:** Medium  
**File:** `item-nameaffixes.json`

### Description

The OLD code is NOT applying the Superior/Inferior prefix transformation, while the NEW code correctly applies it.

### Actual Differences (by id)

| id | Key | OLD enUS | NEW enUS |
|----|-----|----------|----------|
| 1723 | Low Quality | `Low Quality` | `-` |
| 1724 | Damaged | `Damaged` | `-` |
| 1725 | Cracked | `Cracked` | `-` |
| 1727 | Hiquality | `Superior` | `+` |
| 20910 | Crude | `Crude` | `-` |

### Root Cause Analysis

The OLD code's `ShortSupInferiorPrefixesComposer.ts` is not being applied even though we added the `default: return;` fix earlier. Possible causes:

1. **Test output was generated BEFORE the fix** - The old test output may have been created before the fix to `ShortSupInferiorPrefixesComposer.ts` was applied
2. **Config mismatch** - The `IsSupInferiorPrefixesEnabled` or `SupInfPrefixesStyle` settings may differ
3. **Code path issue** - The composer may not be executing in the old code flow

### Resolution

Need to regenerate OLD test output with the fixed code and verify config settings match:
- `IsSupInferiorPrefixesEnabled` = `true`
- `SupInfPrefixesStyle` = `plusminus`

---

## ~~Bug #6: Duplicate Affix Entries with Case Variations~~

**Status:** ❌ FALSE POSITIVE - NOT A BUG

### What Happened

The initial PowerShell comparison script used case-insensitive `Key` matching (`Where-Object { $_.Key -eq $oldEntry.Key }`). This caused entries with different casing (`Jade` vs `jade`) to be incorrectly grouped together, making it appear like values were merged into arrays.

### Actual Reality

Both OLD and NEW outputs correctly maintain **separate entries** for case-variant keys:
- `Jade` (id: 1812) - separate entry
- `jade` (id: 2769) - separate entry  
- `Star` (id: 2345) - separate entry
- `star` (id: 2713) - separate entry
- etc.

### Verification

When comparing by `id` instead of `Key`, all these entries are identical between OLD and NEW.

---

## Action Items

1. **Bug #5:** Regenerate OLD test output after verifying the fix is in place
2. ~~Bug #6: N/A - was a false positive~~

## Summary

Only **5 entries** differ between OLD and NEW, all related to Superior/Inferior prefix transformation:
- `Low Quality`, `Damaged`, `Cracked`, `Crude` → should be `-`
- `Hiquality` → should be `+`

The NEW code is **correct**. The OLD code needs to be re-tested after the fix.
