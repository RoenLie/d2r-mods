const skillsFilename = 'global\\excel\\skills.txt';
const skills = D2RMM.readTsv(skillsFilename);

skills.rows.forEach((row) => {
	if (row['skill'] === 'Warmth') {
		row['passivestat1'] = 'manarecoverybonus';
		row['passivecalc1'] = 'ln12';
		row['Param1'] = String(config.baseregen);
		row['Param2'] = String(config.lvlregen);
	}
});

D2RMM.writeTsv(skillsFilename, skills);


const skilldescFilename = 'global\\excel\\skilldesc.txt';
const skilldesc = D2RMM.readTsv(skilldescFilename);

skilldesc.rows.forEach((row) => {
	if (row['skilldesc'] === 'warmth') {
		row['descline1'] = 74;
		row['desctexta1'] = 'StrSkill88';
		row['desccalca1'] = 'ln12';
	}
});

D2RMM.writeTsv(skilldescFilename, skilldesc);
