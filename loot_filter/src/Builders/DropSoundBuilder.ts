import { DropSoundConstants } from '../Constants/DropSoundConstants';
import { FileConstants } from '../Constants/FileConstants';
import { RuneConstants } from '../Constants/Items/RuneConstants';
import { SoundEffectPair } from '../Models/SoundEffect';
import { DropSoundsSettings } from '../Settings/DropSoundsSettings';
import { IBuilder } from './Interfaces/IBuilder';


export class DropSoundBuilder implements IBuilder {

	build() {
		if (!DropSoundsSettings.isEnabled)
			return;

		const soundsFile = D2RMM.readTsv(FileConstants.FILE_SOUNDS_PATH);

		this.modifyDropSoundForRunes(soundsFile);
		this.modifyDropSoundForQuestItems(soundsFile);
		this.modifyDropSoundForEssences(soundsFile);
		this.modifyDropSoundForTokens(soundsFile);
		this.modifyDropSoundForKeys(soundsFile);
		this.modifyDropSoundForOrgans(soundsFile);
		this.modifyDropSoundForStandardOfHeroes(soundsFile);

		D2RMM.writeTsv(FileConstants.FILE_SOUNDS_PATH, soundsFile);
	}

	protected modifyDropSoundForRunes(soundsFile: TSVData) {
		RuneConstants.tiers.forEach(tier => {
			if (!tier.isVisible && DropSoundsSettings.shouldExcludeForHidden)
				return;

			const itemCodes = tier.runes.map(rune => rune.key);
			this.modifyDropSoundForMiscItems(soundsFile, itemCodes, `rune_tier_${ tier.number }`, tier.dropSound);
		});
	}

	protected modifyDropSoundForQuestItems(soundsFile: TSVData) {
		const itemCodesWeapons = [
			'leg', // Wirt's Leg
			'hdm', // Horadric Malus
			'hst', // Horadric Staff
			'msf', // Staff of Kings
			'g33', // The Gidbinn
			'qf1', // Khalim's Flail
			'qf2', // Khalim's Will
			'hfh', // Hell Forge Hammer
		];

		const itemCodesMisc = [
			'bks', // Scroll of Inifuss
			'bkd', // Scroll of Inifuss (deciphered)
			'tr1', // Horadric Scroll
			'ass', // Book of Skill

			// "box", // Horadric Cube // [CSTM_DSBOX]
			'vip', // Amulet of the Viper
			'j34', // A Jade Figurine
			'g34', // The Golden Bird
			'xyz', // Potion of Life
			'bbb', // Lam Esen's Tome
			'qey', // Khalim's Eye
			'qhr', // Khalim's Heart
			'qbr', // Khalim's Brain
			'mss', // Mephisto's Soulstone
			'ice', // Malah's Potion
			'tr2', // Scroll of Resistance
		];

		const suffix = 'quest';
		this.modifyDropSoundForMiscItems(soundsFile, itemCodesMisc, suffix, DropSoundsSettings.questEndgame.questItems);
		this.modifyDropSoundForWeapons(soundsFile, itemCodesWeapons, suffix, DropSoundsSettings.questEndgame.questItems);
	}

	protected modifyDropSoundForEssences(soundsFile: TSVData) {
		this.modifyDropSoundForMiscItems(soundsFile, [ 'tes', 'ceh', 'bet', 'fed' ], 'essence', DropSoundsSettings.questEndgame.essences);
	}

	protected modifyDropSoundForTokens(soundsFile: TSVData) {
		this.modifyDropSoundForMiscItems(soundsFile, [ 'toa' ], 'token', DropSoundsSettings.questEndgame.tokens);
	}

	protected modifyDropSoundForKeys(soundsFile: TSVData) {
		this.modifyDropSoundForMiscItems(soundsFile, [ 'pk1', 'pk2', 'pk3' ], 'key', DropSoundsSettings.questEndgame.keys);
	}

	protected modifyDropSoundForOrgans(soundsFile: TSVData) {
		this.modifyDropSoundForMiscItems(soundsFile, [ 'eyz', 'brz', 'hrn' ], 'organ', DropSoundsSettings.questEndgame.organs);
	}

	protected modifyDropSoundForStandardOfHeroes(soundsFile: TSVData) {
		this.modifyDropSoundForMiscItems(soundsFile, [ 'std' ], 'flag', DropSoundsSettings.questEndgame.standard);
	}

	protected modifyDropSoundForMiscItems(soundsFile: TSVData, itemCodes: string[], newNameSuffix: string, dropSound: string) {
		this.modifyDropSoundForItems(FileConstants.FILE_MISC_PATH, soundsFile, itemCodes, newNameSuffix, dropSound);
	}

	protected modifyDropSoundForWeapons(soundsFile: TSVData, itemCodes: string[], newNameSuffix: string, dropSound: string) {
		this.modifyDropSoundForItems(FileConstants.FILE_WEAPONS_PATH, soundsFile, itemCodes, newNameSuffix, dropSound);
	}

	// master dropsound function:
	// - check if set dropSound is not default
	// - create a new SD and HD dropsound pair in sounds.txt with the right settings
	// - link the newly created dropsound to the right items
	protected modifyDropSoundForItems(
		itemsFilePath: string,
		soundsFile: TSVData,
		itemCodes: string[],
		newNameSuffix: string,
		dropSound: string,
	): void {
		if (dropSound === 'default')
			return;

		const sound = DropSoundConstants.SOUND_EFFECTS[dropSound as keyof typeof DropSoundConstants.SOUND_EFFECTS];
		const newSoundName = this.createNewDropSound(soundsFile, newNameSuffix, sound);
		this.pushNewDropSoundToItems(itemsFilePath, itemCodes, newSoundName);
	}

	// create SD and HD sound, redirect SD to HD
	protected createNewDropSound(soundsFile: TSVData, soundNameSuffix: string, sfxFileNames: SoundEffectPair) {
		const soundNameSd = `${ DropSoundConstants.SOUND_PREFIX }${ soundNameSuffix }`;
		const soundNameHd = `${ soundNameSd }_hd`;

		this.pushSound(
			soundsFile,
			soundNameSd,
			DropSoundConstants.SOUND_ITEM_RUNE,
			DropSoundConstants.CHANNEL_ITEMS_SD,
			sfxFileNames.sd,
			soundNameHd,
		);
		this.pushSound(
			soundsFile,
			soundNameHd,
			DropSoundConstants.SOUND_ITEM_RUNE,
			DropSoundConstants.CHANNEL_ITEMS_HD,
			sfxFileNames.hd,
			DropSoundConstants.SOUND_NONE,
		);

		return soundNameSd;
	}

	// create new entry in sounds.txt
	protected pushSound(
		soundsFile: TSVData,
		soundName: string,
		template: string,
		sfxChannel: string,
		sfxFileName: string,
		sfxRedirect: string,
	): void {
		const newSound = { ...(soundsFile.rows.find((sound) => sound.Sound === template)) }; // create deep copy of template

		newSound['Sound'] = soundName;
		newSound['*Index'] = String(soundsFile.rows.length);
		newSound['Channel'] = sfxChannel;
		newSound['FileName'] = sfxFileName;
		newSound['Redirect'] = sfxRedirect;
		newSound['Volume Min'] = '255';
		newSound['Volume Max'] = '255';
		newSound['Priority'] = '255';
		newSound['Stop Inst'] = '0';
		newSound['Defer Inst'] = '0';
		newSound['Falloff'] = '4';

		soundsFile.rows.push(newSound);
	}

	/**
   * assign the newly created dropSound in sounds.txt to the items with the corresponding itemCodes in filePath
   */
	protected pushNewDropSoundToItems(itemsFilePath: string, itemCodes: string[], dropSound: string) {
		const file = D2RMM.readTsv(itemsFilePath);

		Object.entries(file.rows).forEach(([ index, _ ]) => {

		});

		file.rows.forEach(row => {
			if (itemCodes.indexOf(row.code) !== -1) {
				row.dropsound = dropSound;

				return;
			}
		});

		D2RMM.writeTsv(itemsFilePath, file);
	}

}
