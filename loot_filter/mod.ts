import { LootFilterMod } from './src/LootFilterMod';
import { main as mainV2 } from './src_v2/main';

// Feature toggle: set to true to use the new V2 implementation
// Set to false to use the legacy V1 implementation
const USE_V2 = true;

if (USE_V2)
	mainV2();
else
	new LootFilterMod().build();
