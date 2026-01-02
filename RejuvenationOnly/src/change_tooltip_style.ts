export function runChangeTooltipStyle(profileHD: TSVDataRow & {
	TooltipStyle: {
		inGameBackgroundColor: number[];
		backgroundColor: number[];
		inGameShowItemsSelectedBackgroundColor: number[];
	};
	TooltipFontSize: number;
}) {
	profileHD.TooltipStyle.inGameBackgroundColor = [0,0,0,0.5];
	profileHD.TooltipStyle.backgroundColor = [0,0,0,0.5];
	profileHD.TooltipFontSize = 30;
	profileHD.TooltipStyle.inGameShowItemsSelectedBackgroundColor = [0.1,0.1,0.2,0.7];
}