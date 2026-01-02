import { isPotionCode } from './force_rejuv_only';


const MAX_POTION_DROPS = 5; // Maximum potions that can drop from potion-only treasure classes


export function clampPotionBundles(row: TSVDataRow) {
  let hasAny = false;
  let potCount = 0;
  let nonPotFound = false;

  for (let i = 1; i <= 10; i++) {
    const itemKey = `Item${i}`;
    const probKey = `Prob${i}`;
    const item = row[itemKey];
    const prob = Number(row[probKey] || 0);
    if (!item || !item.trim() || !prob) continue;

    hasAny = true;

    // If it looks like a TC ref, treat as non-potion to avoid overreaching
    const looksLikeTCRef = /^(act|armo|weap|junk|good|magic|rare|uni|set|rune|gem)/i.test(item);

    if (!looksLikeTCRef && isPotionCode(item)) {
      potCount++;
    } else {
      nonPotFound = true;
      break;
    }
  }

  if (hasAny && !nonPotFound && potCount > 0) {
    // Hard-cap potion drops
    row.picks = MAX_POTION_DROPS.toString();

    // Give ~50% chance of zero by setting NoDrop ≈ sum of item probs
    let totalProb = 0;
    for (let i = 1; i <= 10; i++) {
      totalProb += Number(row[`Prob${i}`] || 0);
    }
    const currentNoDrop = Number(row.NoDrop || 0);
    if (totalProb > 0 && currentNoDrop < totalProb) {
      row.NoDrop = totalProb.toString();
    }
  }
}


export function runClampPotionBundles(treasureRows: TSVDataRow[]) {
	treasureRows.forEach(clampPotionBundles);
}