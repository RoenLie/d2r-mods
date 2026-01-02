import { runChangeTooltipStyle } from '../change_tooltip_style';


export function runModifyUiLayoutsProfileHd() {
	const profileHDFilename = 'global\\ui\\layouts\\_profilehd.json';
	const profileHD = D2RMM.readJson(profileHDFilename) as any;

	runChangeTooltipStyle(profileHD);

	D2RMM.writeJson(profileHDFilename, profileHD);
}