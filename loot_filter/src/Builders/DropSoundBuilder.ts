import { DropSoundConstants } from '../Constants/DropSoundConstants';
import { FileConstants } from '../Constants/FileConstants';
import { RuneConstants } from '../Constants/Items/RuneConstants';
import { EndgameItemId, EssenceId, PandemoniumKeyId, PandemoniumOrganId } from '../Enums/EndgameItemId';
import { QuestItemId, QuestWeaponId } from '../Enums/QuestItemId';
import { SoundEffectPair } from '../Models/SoundEffect';
import { DropSoundsSettings } from '../Settings/DropSoundsSettings';
import { IBuilder } from './IBuilder';

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

	protected modifyDropSoundForQuestItems(soundsFile: TSVData): void {
		const dropSound = DropSoundsSettings.questEndgame.questItems;
		if (dropSound === 'default')
			return;

		const itemCodesWeapons = [
			QuestWeaponId.WIRT_LEG,
			QuestWeaponId.HORADRIC_MALUS,
			QuestWeaponId.HORADRIC_STAFF,
			QuestWeaponId.STAFF_OF_KINGS,
			QuestWeaponId.GIDBINN,
			QuestWeaponId.KHALIM_FLAIL,
			QuestWeaponId.KHALIM_WILL,
			QuestWeaponId.HELL_FORGE_HAMMER,
		];

		const itemCodesMisc = [
			QuestItemId.SCROLL_INIFUSS,
			QuestItemId.SCROLL_INIFUSS_DECIPHERED,
			QuestItemId.HORADRIC_SCROLL,
			QuestItemId.BOOK_OF_SKILL,

			// QuestItemId.HORADRIC_CUBE // [CSTM_DSBOX]
			QuestItemId.AMULET_VIPER,
			QuestItemId.JADE_FIGURINE,
			QuestItemId.GOLDEN_BIRD,
			QuestItemId.POTION_OF_LIFE,
			QuestItemId.LAM_ESEN_TOME,
			QuestItemId.KHALIM_EYE,
			QuestItemId.KHALIM_HEART,
			QuestItemId.KHALIM_BRAIN,
			QuestItemId.MEPHISTO_SOULSTONE,
			QuestItemId.MALAH_POTION,
			QuestItemId.SCROLL_RESISTANCE,
		];

		// Create the sound ONCE, then apply to both item types
		const suffix = 'quest';
		const newSoundName = this.createNewDropSound(soundsFile, suffix, DropSoundConstants.SOUND_EFFECTS[dropSound as keyof typeof DropSoundConstants.SOUND_EFFECTS]);
		this.pushNewDropSoundToItems(FileConstants.FILE_MISC_PATH, itemCodesMisc, newSoundName);
		this.pushNewDropSoundToItems(FileConstants.FILE_WEAPONS_PATH, itemCodesWeapons, newSoundName);
	}

	protected modifyDropSoundForEssences(soundsFile: TSVData): void {
		this.modifyDropSoundForMiscItems(soundsFile, [
			EssenceId.TWISTED,
			EssenceId.CHARGED,
			EssenceId.BURNING,
			EssenceId.FESTERING,
		], 'essence', DropSoundsSettings.questEndgame.essences);
	}

	protected modifyDropSoundForTokens(soundsFile: TSVData): void {
		this.modifyDropSoundForMiscItems(
			soundsFile,
			[ EndgameItemId.TOKEN ],
			'token',
			DropSoundsSettings.questEndgame.tokens,
		);
	}

	protected modifyDropSoundForKeys(soundsFile: TSVData): void {
		this.modifyDropSoundForMiscItems(soundsFile, [
			PandemoniumKeyId.TERROR,
			PandemoniumKeyId.HATE,
			PandemoniumKeyId.DESTRUCTION,
		], 'key', DropSoundsSettings.questEndgame.keys);
	}

	protected modifyDropSoundForOrgans(soundsFile: TSVData): void {
		this.modifyDropSoundForMiscItems(soundsFile, [
			PandemoniumOrganId.HORN,
			PandemoniumOrganId.EYE,
			PandemoniumOrganId.BRAIN,
		], 'organ', DropSoundsSettings.questEndgame.organs);
	}

	protected modifyDropSoundForStandardOfHeroes(soundsFile: TSVData): void {
		this.modifyDropSoundForMiscItems(
			soundsFile,
			[ EndgameItemId.STANDARD ],
			'flag',
			DropSoundsSettings.questEndgame.standard,
		);
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
	protected modifyDropSoundForItems(itemsFilePath: string, soundsFile: TSVData, itemCodes: string[], newNameSuffix: string, dropSound: string) {
		if (dropSound === 'default')
			return;


		const newSoundName = this.createNewDropSound(soundsFile, newNameSuffix, DropSoundConstants.SOUND_EFFECTS[dropSound as keyof typeof DropSoundConstants.SOUND_EFFECTS]);
		this.pushNewDropSoundToItems(itemsFilePath, itemCodes, newSoundName);
	}

	// create SD and HD sound, redirect SD to HD
	protected createNewDropSound(soundsFile: TSVData, soundNameSuffix: string, sfxFileNames: SoundEffectPair) {
		const soundNameSd = `${ DropSoundConstants.SOUND_PREFIX }${ soundNameSuffix }`;
		const soundNameHd = `${ soundNameSd }_hd`;

		this.pushSound(soundsFile, soundNameSd, DropSoundConstants.SOUND_ITEM_RUNE, DropSoundConstants.CHANNEL_ITEMS_SD, sfxFileNames.sd, soundNameHd);
		this.pushSound(soundsFile, soundNameHd, DropSoundConstants.SOUND_ITEM_RUNE, DropSoundConstants.CHANNEL_ITEMS_HD, sfxFileNames.hd, DropSoundConstants.SOUND_NONE);

		return soundNameSd;
	}

	// create new entry in sounds.txt
	protected pushSound(soundsFile: TSVData, soundName: string, template: string, sfxChannel: string, sfxFileName: string, sfxRedirect: string) {
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
