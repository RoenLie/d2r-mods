import { runRejuvToVendor } from '../rejuv_to_vendor';


export function modifyExcelMisc(): void {
	const miscFilename = 'global\\excel\\misc.txt';
	const misc = D2RMM.readTsv(miscFilename);

	runRejuvToVendor(misc);

	D2RMM.writeTsv(miscFilename, misc);
}
