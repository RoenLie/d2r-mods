export {};

declare global {
	namespace FileTypes {
		interface TSVData<Header extends string> {
			headers: Header[];
			rows:    Record<Header | (string & Record<never, never>), string>[];
		}

		interface LanguageCodes {
			enUS: string;
			zhTW: string;
			deDE: string;
			esES: string;
			frFR: string;
			itIT: string;
			koKR: string;
			plPL: string;
			esMX: string;
			jaJP: string;
			ptBR: string;
			ruRU: string;
			zhCN: string;
		}

		interface ItemEntry<Key extends string = string> extends LanguageCodes, Record<string, keyof any> {
			id:  number;
			Key: Key | (string & Record<never, never>);
		}

		namespace ItemNames {
			type Entry = ItemEntry;
			type File = Entry[];
		}

		namespace ItemRunes {

			type Entry = ItemEntry<
				`r${ number }${ 'L' | '' }` | `Runeword${ number }`
			>;

			type File = Entry[];
		}

		namespace ItemNameAffixes {
			type Entry = ItemEntry;
			type File = Entry[];
		}

		namespace ItemModifiers {
			type Entry = ItemEntry;
			type File = Entry[];
		}

		namespace UI {
			type Entry = ItemEntry;
			type File = Entry[];
		}

		namespace ProfileHd {
			interface File extends Record<string, any> {
				basedOn:         string | undefined;
				INT_MAX:         number;
				LeftPanelAnchor: {
					x: number;
					y: number;
				};
				RightPanelAnchor: {
					x: number;
					y: number;
				};
				LeftPanelRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				RightPanelRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				PanelClickCatcherRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				InGamePanelTitleRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				ScrollSpeechWidth:                 number;
				ScrollSpeechBorderWidth:           number;
				ScrollSpeechOffset:                number;
				QuestLogScrollingSpeechParentRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				LobbyAnchor: {
					x: number;
				};
				LeftLobbyRect: {
					x: number;
					y: number;
				};
				LeftLobbyRectNarrow: {
					x: number;
				};
				RightLobbyRect: {
					x: number;
					y: number;
				};
				RightLobbySubPanelRect: {
					x: number;
					y: number;
				};
				RightLobbyRectNarrow: {
					x: number;
				};
				RightLobbySubPanelRectNarrow: {
					x: number;
					y: number;
				};
				ScrollSpeechSpeed: number;
				FontColorWhite: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorVeryLightGray: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorBlack: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorRed: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorGreen: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorBlue: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorLightGold: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorGoldYellow: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorCurrencyGold: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorGold:     string;
				FontColorDarkGold: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorBeige: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorGray: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorGrey:   string;
				FontColorOrange: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorDarkGreen: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorYellow: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorLightPurple: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorLightTeal: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorLightRed: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorLightYellow: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorLightBlue: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorLightGray: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorDarkGrayBlue: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorDarkGrayGold: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorTransparent: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorPartyOrange: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				FontColorPartyGreen: {
					r: number;
					g: number;
					b: number;
					a: number;
				};
				CarouselEnabledColor:      string;
				CarouselDisabledColor:     string;
				LightButtonTextColor:      string;
				PanelTitleColor:           string;
				ModalDescriptionTextColor: string;
				DarkButtonTextColor:       string;
				PanelNoteTextColor:        string;
				GoldCurrencyTextColor:     string;
				DescriptionTextColor:      string;
				DescriptionTitleColor:     string;
				TabsActiveTextColor:       string;
				TabsInactiveTextColor:     string;
				TabsActiveTextColorInGame: string;
				CharacterListDetailsColor: string;
				TooltipBorderColor:        [number, number, number, number];
				HugeFontSize:              number;
				XExtraLargeFontSize:       number;
				ExtraLargeFontSize:        number;
				XLargeFontSize:            number;
				LargeFontSize:             number;
				XMediumLargeFontSize:      number;
				MediumLargeFontSize:       number;
				XMediumFontSize:           number;
				MediumFontSize:            number;
				SmallFontSize:             number;
				TooltipFontSize:           number;
				CinematicsFontSize:        number;
				AddFriendModalFontSize:    number;
				GameNameFilterFontSize:    number;
				XMediumPanelFontSize:      string;
				MediumPanelFontSize:       string;
				SmallPanelFontSize:        string;
				DefaultSpacing: {
					kerning: number;
				};
				ReducedSpacing: {
					kerning: number;
				};
				MinimumSpacing: {
					kerning: number;
				};
				EmptyColorRange: {
					hue:        [number, number];
					saturation: [number, number];
					value:      [number, number];
				};
				StyleCharacterModeSelectTitle: {
					fontColor: string;
					pointSize: string;
					options: {
						lineWrap: number;
					};
					alignment: {
						h: string;
						v: string;
					};
					dropShadow: string;
				};
				StyleCharacterModeSelectDescription: {
					fontColor: string;
					pointSize: string;
					fontFace:  string;
					options: {
						lineWrap: number;
					};
					alignment: {
						h: string;
						v: string;
					};
					dropShadow: string;
				};
				StylePartyPanelSmallHeading: {
					fontColor: string;
					pointSize: string;
					alignment: {
						h: string;
						v: string;
					};
					options: {
						newlineHandling:       string;
						pipeCharacterBehavior: string;
					};
					spacing: {
						leading: number;
					};
					dropShadow: string;
				};
				StylePartyPanelGameInfo: {
					fontColor: string;
					pointSize: string;
					alignment: {
						h: string;
						v: string;
					};
					options: {
						newlineHandling:       string;
						pipeCharacterBehavior: string;
					};
					spacing: {
						leading: number;
					};
				};
				StyleButtonLegend: {
					fontColor: string;
					pointSize: string;
					spacing: {
						leading: number;
						kerning: number;
					};
				};
				StyleModalDialogTitle: {
					fontColor: string;
					alignment: {
						h: string;
					};
					options: {
						lineWrap:        number;
						newlineHandling: string;
					};
					pointSize: string;
					spacing:   string;
				};
				StyleModalDialogDescription: {
					fontColor: string;
					alignment: {
						h: string;
						v: string;
					};
					options: {
						lineWrap:        number;
						newlineHandling: string;
					};
					pointSize: string;
					spacing:   string;
				};
				StyleFEButtonText: {
					fontColor:  string;
					pointSize:  string;
					dropShadow: string;
					spacing:    string;
				};
				StyleCinematicsButtonText: {
					fontColor:  string;
					pointSize:  string;
					dropShadow: string;
					spacing: {
						kerning: number;
					};
				};
				StyleFEMultiLineButtonText: {
					fontColor:  string;
					pointSize:  string;
					dropShadow: string;
					spacing:    string;
					alignment: {
						h: string;
						v: string;
					};
					options: {
						lineWrap:        number;
						newlineHandling: string;
					};
				};
				StyleTitleBlock: {
					fontColor:  string;
					pointSize:  string;
					dropShadow: string;
					alignment: {
						h: string;
						v: string;
					};
					spacing: string;
				};
				StyleGoldAmount: {
					fontColor:  string;
					pointSize:  string;
					dropShadow: string;
					alignment: {
						h: string;
						v: string;
					};
				};
				StyleWeaponSwapTabs: {
					fontColor:  string;
					pointSize:  string;
					dropShadow: string;
					alignment: {
						h: string;
						v: string;
					};
				};
				StyleSkillTreeTabs: {
					options: {
						lineWrap: number;
					};
					pointSize: string;
					alignment: {
						h: string;
						v: string;
					};
					fontColor: string;
				};
				StyleSettingsTitle: {
					fontColor: string;
					pointSize: string;
					alignment: {
						h: string;
						v: string;
					};
				};
				StyleSettingsSubtitle: {
					fontColor: string;
					pointSize: string;
					alignment: {
						h: string;
						v: string;
					};
				};
				StyleSettingsText: {
					fontColor: string;
					pointSize: string;
					spacing:   string;
					alignment: {
						h: string;
						v: string;
					};
					options: {
						lineWrap: number;
					};
				};
				StyleSettingsCarousel: {
					pointSize: string;
					spacing:   string;
					alignment: {
						h: string;
						v: string;
					};
				};
				StyleSettingsNumeric: {
					fontFace:  string;
					pointSize: string;
					fontColor: string;
					alignment: {
						h: string;
						v: string;
					};
				};
				StyleScrollingSpeech: {
					fontFace:  string;
					fontColor: {
						r: number;
						g: number;
						b: number;
						a: number;
					};
					pointSize: string;
					alignment: {
						h: string;
					};
					options: {
						newlineHandling: string;
						lineWrap:        number;
					};
				};
				StyleNotification: {
					fontFace:  string;
					pointSize: string;
					fontColor: string;
					alignment: {
						h: string;
						v: string;
					};
					options: {
						newlineHandling: string;
						lineWrap:        number;
					};
				};
				StyleVictoryText: {
					fontColor: string;
					alignment: {
						h: string;
						v: string;
					};
					pointSize: number;
					options: {
						newlineHandling: string;
					};
					dropShadow: {
						shadowColor: {
							r: number;
							g: number;
							b: number;
							a: number;
						};
						offset: {
							x: number;
							y: number;
						};
					};
				};
				StyleNPCDialogueSize: string;
				DefaultDropShadow: {
					shadowColor: {
						r: number;
						g: number;
						b: number;
						a: number;
					};
					offset: {
						x: number;
						y: number;
					};
				};
				TooltipStyle: {
					fontStyle: {
						fontColor: string;
						pointSize: string;
						alignment: {
							h: string;
							v: string;
						};
						options: {
							pipeCharacterBehavior: string;
							newlineHandling:       string;
						};
					};
					padding:                                [number, number, number, number];
					inGameTargetPadding:                    [number, number, number, number];
					drawBorder:                             number;
					centeredOnAnchor:                       number;
					hp:                                     number;
					backgroundColor:                        [number, number, number, number];
					inGameBackgroundColor:                  [number, number, number, number];
					inGameShowItemsSelectedBackgroundColor: [number, number, number, number];
					substringColor:                         string;
					healthColor:                            [number, number, number, number];
					borderColor:                            string;
					DefaultColor:                           string;
					QuestColor:                             string;
					RareColor:                              string;
					CraftedColor:                           string;
					TemperedColor:                          string;
					MagicColor:                             string;
					SetColor:                               string;
					UniqueColor:                            string;
					SocketedColor:                          string;
					EtherealColor:                          string;
					HealthPotionColor:                      string;
					ManaPotionColor:                        string;
					RejuvPotionColor:                       string;
					GoldColor:                              string;
					RuneColor:                              string;
					EventItemsColor:                        string;
				};
				SkillIconFilenames:  string[];
				SecondSetIconOffset: {
					x: number;
				};
				LeftSideSprite:         string;
				LeftSideRect:           {};
				LeftSideRectImbuePanel: {
					x: -236;
					y: -205;
				};
				LeftSideRectHireMenu: {
					x: -236;
					y: -204;
				};
				LeftSideCatcherRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				LeftHingeRect: {
					x: number;
					y: number;
				};
				LeftHingeSprite: string;
				RightSideSprite: string;
				RightSideRect: {
					x: number;
				};
				RightSideCatcherRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				RightHingeRect: {
					x: number;
					y: number;
				};
				RightHingeSprite: string;
				ItemCellSize: {
					x: number;
					y: number;
				};
				OptionsPanelWidth:  number;
				OptionsPanelHeight: number;
				OptionsPanelRect: {
					x:      number;
					y:      number;
					width:  string;
					height: string;
				};
				OptionsScrollBarRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				OptionsScrollBarBackgroundRect: {
					x: number;
					y: number;
				};
				OptionsTableColumn1: {
					width:     number;
					alignment: {
						h: string;
						v: string;
					};
				};
				OptionsTableColumn2: {
					width:     number;
					alignment: {
						h: string;
						v: string;
					};
				};
				OptionsTableRowHeight: number;
				OptionsCarouselRect: {
					width:  number;
					height: number;
				};
				OptionsCarouselFocusIndicatorPadding: {
					left:  number;
					right: number;
				};
				OptionsDropDownRect: {
					width:  number;
					height: number;
				};
				OptionsDropDownBackgroundRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				OptionsDropDownLeftCapOffset: {
					x: number;
					y: number;
				};
				OptionsDropDownRightCapOffset: {
					x: number;
					y: number;
				};
				OptionsNumericContainerRect: {
					x: number;
					y: number;
				};
				OptionsNumericRect: {
					x:      number;
					width:  number;
					height: number;
				};
				OptionsSliderRect: {
					width:  number;
					height: number;
				};
				CalibrationTableColumn1: {
					width:     number;
					alignment: {
						h: string;
						v: string;
					};
				};
				OptionsSliderValueRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				OptionsSliderFocusIndicatorFilename:   string;
				OptionsDropDownFocusIndicatorFilename: string;
				OptionsToggleFocusIndicatorFilename:   string;
				OptionsNumInputFocusIndicatorFilename: string;
				OptionsCarouselFocusIndicatorFilename: string;
				OptionsNumInputFocusIndicatorOffset: {
					x: number;
					y: number;
				};
				OptionsSliderFocusIndicatorPadding: {
					left:  number;
					right: number;
				};
				OptionsDividerRect: {
					x: number;
					y: number;
				};
				OptionsToggleRect: {
					width:  number;
					height: number;
				};
				OptionsToggleFocusIndicatorPadding: {
					left:  number;
					right: number;
				};
				SettingsSliderBackground: {
					rect: {
						x: number;
						y: number;
					};
					anchor: {
						x: number;
						y: number;
					};
					filename: string;
				};
				SettingsSliderLeftButtonFields: {
					rect: {
						x: number;
						y: number;
					};
					filename:     string;
					hoveredFrame: number;
				};
				SettingsSliderRightButtonFields: {
					rect: {
						x: number;
						y: number;
					};
					filename:     string;
					hoveredFrame: number;
				};
				SettingsSliderValueFields: {
					rect:  string;
					style: {
						alignment: {
							h: string;
						};
					};
				};
				SettingsSliderTooltipRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				SettingsNumericBackgroundRect: {
					x: number;
					y: number;
				};
				SettingsNumericBackgroundImage: string;
				SettingsNumericUpButtonFields: {
					rect: {
						x: number;
						y: number;
					};
					repeatDelayMS:  number;
					filename:       string;
					onClickMessage: string;
					hoveredFrame:   number;
					disabledFrame:  number;
					disabledTint: {
						a: number;
					};
				};
				SettingsNumericDownButtonFields: {
					rect: {
						x: number;
						y: number;
					};
					repeatDelayMS:  number;
					filename:       string;
					onClickMessage: string;
					hoveredFrame:   number;
					disabledFrame:  number;
					disabledTint: {
						a: number;
					};
				};
				SkillHotkeyTextStyle: {
					fontColor:  string;
					dropShadow: {
						shadowColor: {
							r: number;
							g: number;
							b: number;
							a: number;
						};
						offset: {
							x: number;
							y: number;
						};
					};
					pointSize: string;
					alignment: {
						h: string;
					};
				};
				SkillHotkeyTextAltStyle: {
					fontColor:  string;
					dropShadow: {
						shadowColor: {
							r: number;
							g: number;
							b: number;
							a: number;
						};
						offset: {
							x: number;
							y: number;
						};
					};
					pointSize: string;
					alignment: {
						h: string;
					};
					options: {
						lineWrap: number;
					};
					spacing: string;
				};
				SkillHotkeyTextRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				SkillQuantityTextStyle: {
					fontColor:  string;
					dropShadow: {
						shadowColor: {
							r: number;
							g: number;
							b: number;
							a: number;
						};
						offset: {
							x: number;
							y: number;
						};
					};
					pointSize: string;
					alignment: {
						h: string;
					};
				};
				SkillQuantityTextRect: {
					x: number;
					y: number;
				};
				SkillQuantityTextRectController: {
					x: number;
					y: number;
				};
				SubtitleConfiguration: {
					anchor: {
						x: number;
						y: number;
					};
					style: {
						pointSize: string;
						options: {
							newlineHandling: string;
						};
						alignment: {
							h: string;
							v: string;
						};
						highlight: {
							endIndex:        string;
							backgroundColor: {
								r: number;
								g: number;
								b: number;
								a: number;
							};
						};
					};
				};
				HoldToSkipTextConfiguration: {
					anchor: {
						x: number;
						y: number;
					};
					style: {
						pointSize: string;
						alignment: {
							h: string;
							v: string;
						};
					};
					text: string;
				};
				HoldToSkipDurationMilliseconds:    number;
				HoldToSkipTextTimeoutMilliseconds: number;
				AccountLinkingTileRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				AccountLinkingActiveUserRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				AccountLinkingDescriptionRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				AccountLinkingUserCodeRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				AccountLinkingUrlRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				AccountLinkingOkButtonRect: {
					x: number;
					y: number;
				};
				SettingsPanelAnchorRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				SettingsPanelBackgroundRect: {
					x:      number;
					y:      number;
					width:  string;
					height: string;
				};
				SettingsPanelTabsRect: {
					x:      number;
					y:      number;
					width:  string;
					height: number;
				};
				TutorialTooltipIntroRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipLocalRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipTabsRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipCreateNewRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipDeleteRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipConvertRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipChatRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipChatArrowRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipCreateGameRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipGameName: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipJoinGame: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipLadder: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipConsoleIntroRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipConsoleTabsRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipConsoleOnlineRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipConsoleOfflineRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipConsoleSoloRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipConsoleGameCreatorRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TutorialTooltipConsoleGameListRect: {
					x:      number;
					y:      number;
					width:  number;
					height: number;
				};
				TooltipConfirmSmall: {
					x: number;
					y: number;
				};
				TooltipDismissSmall: {
					x: number;
					y: number;
				};
				TooltipConfirmMed: {
					x: number;
					y: number;
				};
				TooltipDismissMed: {
					x: number;
					y: number;
				};
				TooltipConfirmLarge: {
					x: number;
					y: number;
				};
				TooltipDismissLarge: {
					x: number;
					y: number;
				};
				TooltipConfirmXL: {
					x: number;
					y: number;
				};
				TooltipDismissXL: {
					x: number;
					y: number;
				};
				ChatRect: {
					x: number;
					y: number;
				};
				ChatNarrowRect: {
					x: number;
					y: number;
				};
				ChatArrowRect: {
					x: number;
					y: number;
				};
				ChatArrowNarrowRect: {
					x: number;
					y: number;
				};
				CreateGameRect: {
					x: number;
					y: number;
				};
				CreateGameNarrowRect: {
					x: number;
					y: number;
				};
				GameNameRect: {
					x: number;
					y: number;
				};
				GameNameNarrowRect: {
					x: number;
					y: number;
				};
				JoinGameRect: {
					x: number;
					y: number;
				};
				JoinGameNarrowRect: {
					x: number;
					y: number;
				};
				LadderRect: {
					x: number;
					y: number;
				};
				LadderNarrowRect: {
					x: number;
					y: number;
				};
				JoinGamePlayerEntryHeight: number;
				JoinGamePlayerNameHeight:  number;
			}
		}

		namespace Weapons {
			type Keys = [
				'name',
				'type',
				'type2',
				'code',
				'alternategfx',
				'namestr',
				'version',
				'compactsave',
				'rarity',
				'spawnable',
				'Transmogrify',
				'TMogType',
				'TMogMin',
				'TMogMax',
				'mindam',
				'maxdam',
				'1or2handed',
				'2handed',
				'2handmindam',
				'2handmaxdam',
				'minmisdam',
				'maxmisdam',
				'rangeadder',
				'speed',
				'StrBonus',
				'DexBonus',
				'reqstr',
				'reqdex',
				'durability',
				'nodurability',
				'level',
				'ShowLevel',
				'levelreq',
				'cost',
				'gamble cost',
				'magic lvl',
				'auto prefix',
				'normcode',
				'ubercode',
				'ultracode',
				'wclass',
				'2handedwclass',
				'component',
				'hit class',
				'invwidth',
				'invheight',
				'stackable',
				'minstack',
				'maxstack',
				'spawnstack',
				'flippyfile',
				'invfile',
				'uniqueinvfile',
				'setinvfile',
				'hasinv',
				'gemsockets',
				'gemapplytype',
				'*comment',
				'useable',
				'dropsound',
				'dropsfxframe',
				'usesound',
				'unique',
				'transparent',
				'transtbl',
				'*quivered',
				'lightradius',
				'belt',
				'quest',
				'questdiffcheck',
				'missiletype',
				'durwarning',
				'qntwarning',
				'gemoffset',
				'bitfield1',
				'CharsiMin',
				'CharsiMax',
				'CharsiMagicMin',
				'CharsiMagicMax',
				'CharsiMagicLvl',
				'GheedMin',
				'GheedMax',
				'GheedMagicMin',
				'GheedMagicMax',
				'GheedMagicLvl',
				'AkaraMin',
				'AkaraMax',
				'AkaraMagicMin',
				'AkaraMagicMax',
				'AkaraMagicLvl',
				'FaraMin',
				'FaraMax',
				'FaraMagicMin',
				'FaraMagicMax',
				'FaraMagicLvl',
				'LysanderMin',
				'LysanderMax',
				'LysanderMagicMin',
				'LysanderMagicMax',
				'LysanderMagicLvl',
				'DrognanMin',
				'DrognanMax',
				'DrognanMagicMin',
				'DrognanMagicMax',
				'DrognanMagicLvl',
				'HratliMin',
				'HratliMax',
				'HratliMagicMin',
				'HratliMagicMax',
				'HratliMagicLvl',
				'AlkorMin',
				'AlkorMax',
				'AlkorMagicMin',
				'AlkorMagicMax',
				'AlkorMagicLvl',
				'OrmusMin',
				'OrmusMax',
				'OrmusMagicMin',
				'OrmusMagicMax',
				'OrmusMagicLvl',
				'ElzixMin',
				'ElzixMax',
				'ElzixMagicMin',
				'ElzixMagicMax',
				'ElzixMagicLvl',
				'AshearaMin',
				'AshearaMax',
				'AshearaMagicMin',
				'AshearaMagicMax',
				'AshearaMagicLvl',
				'CainMin',
				'CainMax',
				'CainMagicMin',
				'CainMagicMax',
				'CainMagicLvl',
				'HalbuMin',
				'HalbuMax',
				'HalbuMagicMin',
				'HalbuMagicMax',
				'HalbuMagicLvl',
				'JamellaMin',
				'JamellaMax',
				'JamellaMagicMin',
				'JamellaMagicMax',
				'JamellaMagicLvl',
				'LarzukMin',
				'LarzukMax',
				'LarzukMagicMin',
				'LarzukMagicMax',
				'LarzukMagicLvl',
				'AnyaMin',
				'AnyaMax',
				'AnyaMagicMin',
				'AnyaMagicMax',
				'AnyaMagicLvl',
				'MalahMin',
				'MalahMax',
				'MalahMagicMin',
				'MalahMagicMax',
				'MalahMagicLvl',
				'Transform',
				'InvTrans',
				'SkipName',
				'NightmareUpgrade',
				'HellUpgrade',
				'Nameable',
				'PermStoreItem',
				'diablocloneweight',
			][number];

			type File = TSVData<Keys>;
		}

		namespace Armor {
			type Keys = [
				'name',
				'version',
				'compactsave',
				'rarity',
				'spawnable',
				'minac',
				'maxac',
				'speed',
				'reqstr',
				'reqdex',
				'block',
				'durability',
				'nodurability',
				'level',
				'ShowLevel',
				'levelreq',
				'cost',
				'gamble cost',
				'code',
				'namestr',
				'magic lvl',
				'auto prefix',
				'alternategfx',
				'normcode',
				'ubercode',
				'ultracode',
				'component',
				'invwidth',
				'invheight',
				'hasinv',
				'gemsockets',
				'gemapplytype',
				'flippyfile',
				'invfile',
				'uniqueinvfile',
				'setinvfile',
				'rArm',
				'lArm',
				'Torso',
				'Legs',
				'rSPad',
				'lSPad',
				'useable',
				'stackable',
				'minstack',
				'maxstack',
				'spawnstack',
				'Transmogrify',
				'TMogType',
				'TMogMin',
				'TMogMax',
				'type',
				'type2',
				'dropsound',
				'dropsfxframe',
				'usesound',
				'unique',
				'transparent',
				'transtbl',
				'*quivered',
				'lightradius',
				'belt',
				'quest',
				'questdiffcheck',
				'missiletype',
				'durwarning',
				'qntwarning',
				'mindam',
				'maxdam',
				'StrBonus',
				'DexBonus',
				'gemoffset',
				'bitfield1',
				'CharsiMin',
				'CharsiMax',
				'CharsiMagicMin',
				'CharsiMagicMax',
				'CharsiMagicLvl',
				'GheedMin',
				'GheedMax',
				'GheedMagicMin',
				'GheedMagicMax',
				'GheedMagicLvl',
				'AkaraMin',
				'AkaraMax',
				'AkaraMagicMin',
				'AkaraMagicMax',
				'AkaraMagicLvl',
				'FaraMin',
				'FaraMax',
				'FaraMagicMin',
				'FaraMagicMax',
				'FaraMagicLvl',
				'LysanderMin',
				'LysanderMax',
				'LysanderMagicMin',
				'LysanderMagicMax',
				'LysanderMagicLvl',
				'DrognanMin',
				'DrognanMax',
				'DrognanMagicMin',
				'DrognanMagicMax',
				'DrognanMagicLvl',
				'HratliMin',
				'HratliMax',
				'HratliMagicMin',
				'HratliMagicMax',
				'HratliMagicLvl',
				'AlkorMin',
				'AlkorMax',
				'AlkorMagicMin',
				'AlkorMagicMax',
				'AlkorMagicLvl',
				'OrmusMin',
				'OrmusMax',
				'OrmusMagicMin',
				'OrmusMagicMax',
				'OrmusMagicLvl',
				'ElzixMin',
				'ElzixMax',
				'ElzixMagicMin',
				'ElzixMagicMax',
				'ElzixMagicLvl',
				'AshearaMin',
				'AshearaMax',
				'AshearaMagicMin',
				'AshearaMagicMax',
				'AshearaMagicLvl',
				'CainMin',
				'CainMax',
				'CainMagicMin',
				'CainMagicMax',
				'CainMagicLvl',
				'HalbuMin',
				'HalbuMax',
				'HalbuMagicMin',
				'HalbuMagicMax',
				'HalbuMagicLvl',
				'JamellaMin',
				'JamellaMax',
				'JamellaMagicMin',
				'JamellaMagicMax',
				'JamellaMagicLvl',
				'LarzukMin',
				'LarzukMax',
				'LarzukMagicMin',
				'LarzukMagicMax',
				'LarzukMagicLvl',
				'MalahMin',
				'MalahMax',
				'MalahMagicMin',
				'MalahMagicMax',
				'MalahMagicLvl',
				'AnyaMin',
				'AnyaMax',
				'AnyaMagicMin',
				'AnyaMagicMax',
				'AnyaMagicLvl',
				'Transform',
				'InvTrans',
				'SkipName',
				'NightmareUpgrade',
				'HellUpgrade',
				'Nameable',
				'PermStoreItem',
				'diablocloneweight',
			][number];
			type File = TSVData<Keys>;
		}

		namespace Sounds {
			type Keys = [
				'Sound',
				'*Index',
				'Redirect',
				'Channel',
				'FileName',
				'IsLocal',
				'IsMusic',
				'IsAmbientScene',
				'IsAmbientEvent',
				'IsUI',
				'Volume Min',
				'Volume Max',
				'Pitch Min',
				'Pitch Max',
				'Group Size',
				'Group Weight',
				'Loop',
				'Fade In',
				'Fade Out',
				'Defer Inst',
				'Stop Inst',
				'Duration',
				'Compound',
				'Falloff',
				'LFEMix',
				'3dSpread',
				'Priority',
				'Stream',
				'Is2D',
				'Tracking',
				'Solo',
				'Music Vol',
				'Block 1',
				'Block 2',
				'Block 3',
				'HDOptOut',
				'Delay',
				'4737',
			][number];

			type File = TSVData<Keys>;
		}

		namespace Misc {
			type Keys = [
				'name',
				'compactsave',
				'version',
				'level',
				'ShowLevel',
				'levelreq',
				'reqstr',
				'reqdex',
				'rarity',
				'spawnable',
				'speed',
				'nodurability',
				'cost',
				'gamble cost',
				'code',
				'alternategfx',
				'namestr',
				'component',
				'invwidth',
				'invheight',
				'hasinv',
				'gemsockets',
				'gemapplytype',
				'flippyfile',
				'invfile',
				'uniqueinvfile',
				'Transmogrify',
				'TMogType',
				'TMogMin',
				'TMogMax',
				'useable',
				'type',
				'type2',
				'dropsound',
				'dropsfxframe',
				'usesound',
				'unique',
				'transparent',
				'transtbl',
				'lightradius',
				'belt',
				'autobelt',
				'stackable',
				'minstack',
				'maxstack',
				'spawnstack',
				'quest',
				'questdiffcheck',
				'missiletype',
				'spellicon',
				'pSpell',
				'state',
				'cstate1',
				'cstate2',
				'len',
				'stat1',
				'calc1',
				'stat2',
				'calc2',
				'stat3',
				'calc3',
				'spelldesc',
				'spelldescstr',
				'spelldescstr2',
				'spelldesccalc',
				'spelldesccolor',
				'durwarning',
				'qntwarning',
				'gemoffset',
				'BetterGem',
				'bitfield1',
				'CharsiMin',
				'CharsiMax',
				'CharsiMagicMin',
				'CharsiMagicMax',
				'CharsiMagicLvl',
				'GheedMin',
				'GheedMax',
				'GheedMagicMin',
				'GheedMagicMax',
				'GheedMagicLvl',
				'AkaraMin',
				'AkaraMax',
				'AkaraMagicMin',
				'AkaraMagicMax',
				'AkaraMagicLvl',
				'FaraMin',
				'FaraMax',
				'FaraMagicMin',
				'FaraMagicMax',
				'FaraMagicLvl',
				'LysanderMin',
				'LysanderMax',
				'LysanderMagicMin',
				'LysanderMagicMax',
				'LysanderMagicLvl',
				'DrognanMin',
				'DrognanMax',
				'DrognanMagicMin',
				'DrognanMagicMax',
				'DrognanMagicLvl',
				'HratliMin',
				'HratliMax',
				'HratliMagicMin',
				'HratliMagicMax',
				'HratliMagicLvl',
				'AlkorMin',
				'AlkorMax',
				'AlkorMagicMin',
				'AlkorMagicMax',
				'AlkorMagicLvl',
				'OrmusMin',
				'OrmusMax',
				'OrmusMagicMin',
				'OrmusMagicMax',
				'OrmusMagicLvl',
				'ElzixMin',
				'ElzixMax',
				'ElzixMagicMin',
				'ElzixMagicMax',
				'ElzixMagicLvl',
				'AshearaMin',
				'AshearaMax',
				'AshearaMagicMin',
				'AshearaMagicMax',
				'AshearaMagicLvl',
				'CainMin',
				'CainMax',
				'CainMagicMin',
				'CainMagicMax',
				'CainMagicLvl',
				'HalbuMin',
				'HalbuMax',
				'HalbuMagicMin',
				'HalbuMagicMax',
				'HalbuMagicLvl',
				'MalahMin',
				'MalahMax',
				'MalahMagicMin',
				'MalahMagicMax',
				'MalahMagicLvl',
				'LarzukMin',
				'LarzukMax',
				'LarzukMagicMin',
				'LarzukMagicMax',
				'LarzukMagicLvl',
				'AnyaMin',
				'AnyaMax',
				'AnyaMagicMin',
				'AnyaMagicMax',
				'AnyaMagicLvl',
				'JamellaMin',
				'JamellaMax',
				'JamellaMagicMin',
				'JamellaMagicMax',
				'JamellaMagicLvl',
				'Transform',
				'InvTrans',
				'SkipName',
				'NightmareUpgrade',
				'HellUpgrade',
				'mindam',
				'maxdam',
				'PermStoreItem',
				'multibuy',
				'Nameable',
				'diablocloneweight',
			][number];

			type File = TSVData<Keys>;
		}

		namespace HDItem {
			interface Dependency {
				path: string;
			}

			interface Dependencies {
				particles:     Dependency[];
				models:        Dependency[];
				skeletons:     Dependency[];
				animations:    Dependency[];
				textures:      Dependency[];
				physics:       Dependency[];
				json:          Dependency[];
				variantdata:   Dependency[];
				objecteffects: Dependency[];
				other:         Dependency[];
			}

			interface Entity {
				type:       string;
				name:       string;
				id:         number;
				components: any[];
			}

			interface File {
				dependencies: Dependencies;
				type:         string;
				name:         string;
				entities:     Entity[];
			}
		}

		namespace Layout {
			namespace Common {
				interface Point {
					x: number;
					y: number;
				}

				interface Rect {
					x:       number;
					y:       number;
					width?:  number;
					height?: number;
				}

				interface Color {
					r: number;
					g: number;
					b: number;
					a: number;
				}

				interface Style {
					fontColor?: Color;
				}

				interface TextStyle {
					pointSize?:  string;
					spacing?:    string;
					dropShadow?: string;
				}

				interface TextConfig {
					style?: string;
				}

				interface NotificationIconTemplate {
					rect?:     Rect;
					anchor?:   Point;
					filename?: string;
				}

				type AnyWidget
					= ClickCatcherWidget
					| DamageIndicatorWidget
					| Widget
					| ControllerCursorBoundsWidget
					| ImageWidget
					| TabBarWidget
					| ButtonLegendWidget
					| TextBoxWidget
					| ButtonWidget
					| InventoryGridWidget
					| GridImageWidget;

				interface ClickCatcherWidget {
					type:      'ClickCatcherWidget';
					name:      string;
					fields?:   ClickCatcherWidgetFields;
					children?: AnyWidget[];
				}

				interface ClickCatcherWidgetFields {
					rect?:        string | Rect;
					fitToParent?: number;
				}

				interface DamageIndicatorWidget {
					type:      'DamageIndicatorWidget';
					name:      string;
					fields?:   DamageIndicatorWidgetFields;
					children?: AnyWidget[];
				}

				interface DamageIndicatorWidgetFields {
					fitToScreen?:            number;
					baseColor?:              [number, number, number, number];
					damageColor?:            [number, number, number, number];
					animationLengthSeconds?: number;
				}

				interface Widget {
					type:     'Widget';
					name:     string;
					fields?:  WidgetFields;
					children: AnyWidget[];
				}

				interface WidgetFields {
					anchor?:      Point;
					rect?:        string | Rect;
					fitToParent?: number;
				}

				interface ControllerCursorBoundsWidget {
					type:      'ControllerCursorBoundsWidget';
					name:      string;
					fields?:   ControllerCursorBoundsWidgetFields;
					children?: AnyWidget[];
				}

				interface ControllerCursorBoundsWidgetFields {
					rect?:        Rect;
					fitToParent?: boolean;
				}

				interface ImageWidget {
					type:      'ImageWidget';
					name:      string;
					fields?:   ImageWidgetFields;
					children?: AnyWidget[];
				}

				interface ImageWidgetFields {
					filename?: string;
					rect?:     string | Rect;
					anchor?:   Point;
				}

				interface TabBarWidget {
					type:      'TabBarWidget';
					name:      string;
					fields?:   TabBarWidgetFields;
					children?: AnyWidget[];
				}

				interface TabBarWidgetFields {
					rect?:                         string | Rect;
					tabCount?:                     number;
					filename?:                     string | string[];
					inactiveFrames?:               number[];
					activeFrames?:                 number[];
					disabledFrames?:               number[];
					textStrings?:                  string[];
					textStyle?:                    TextStyle;
					activeTextColor?:              string;
					inactiveTextColor?:            string;
					tabSize?:                      Point;
					tabPadding?:                   Point;
					tabTextOffset?:                Point;
					onSwitchTabMessage?:           string;
					unavailableTabsLeaveGaps?:     number;
					tabSizingMethod?:              string;
					enableControllerTabSwitching?: number;
					focusIndicatorFilename?:       string | string[];
					focusIndicatorOffset?:         Point;
					focusOnMouseOver?:             number;
					notificationIconTemplate?:     NotificationIconTemplate;
					anchor?:                       Point;
					tabLeftIndicatorPosition?:     Point;
					tabRightIndicatorPosition?:    Point;
				}

				interface ButtonLegendWidget {
					type:      'ButtonLegendWidget';
					name:      string;
					fields?:   ButtonLegendWidgetFields;
					children?: AnyWidget[];
				}

				interface ButtonLegendWidgetFields {
					rect?: Rect;
					text?: TextConfig;
				}

				interface TextBoxWidget {
					type:      'TextBoxWidget';
					name:      string;
					fields?:   TextBoxWidgetFields;
					children?: AnyWidget[];
				}

				interface TextBoxWidgetFields {
					rect?:  string | Rect;
					style?: string | Style;
					text?:  string;
				}

				interface ButtonWidget {
					type:      'ButtonWidget';
					name:      string;
					fields?:   ButtonWidgetFields;
					children?: AnyWidget[];
				}

				interface ButtonWidgetFields {
					rect?:           string | Rect;
					filename?:       string;
					normalFrame?:    number;
					pressedFrame?:   number;
					hoveredFrame?:   number;
					tooltipString?:  string;
					tooltipOffset?:  Point;
					onClickMessage?: string;
					sound?:          string;
				}

				interface InventoryGridWidget {
					type:     'InventoryGridWidget';
					name:     string;
					fields:   InventoryGridWidgetFields;
					children: AnyWidget[];
				}

				interface InventoryGridWidgetFields {
					rect?:              string | Rect;
					cellCount?:         Point;
					cellSize?:          string | Point;
					gemSocketFilename?: string;
				}

				interface GridImageWidget {
					type:   'GridImageWidget';
					name:   string;
					fields: GridImageWidgetFields;
				}

				interface GridImageWidgetFields {
					filename: string;
					frames:   number;
					rows:     number;
				}
			}

			namespace ControllerOverlayHD {
				interface File {
					type:   'ControllerOverlayPanel';
					name:   string;
					fields:    {
						priority:                   number;
						panels:                     string[];
						tabNames:                   string[];
						singlePanelBackgroundFrame: number;
						dualPanelBackgroundFrame:   number;
						fitToParent:                number;
					};
					children: Common.AnyWidget[];
				}
			}

			namespace ControllerBankOriginalHD {
				interface File extends BankOriginalHD.File {}
			}

			namespace ControllerBankExpansionHD {
				interface File extends Omit<ControllerBankOriginalHD.File, 'fields'> {
					fields: Partial<ControllerBankOriginalHD.File['fields']> & {
						backgroundFile?: string[];
					};
				}
			}

			namespace BankOriginalHD {
				interface File {
					type:   'BankPanel';
					name:   string;
					fields:    {
						priority: number;
						rect:     string | Common.Rect;
						anchor:   string | Common.Point;
					};
					children: Common.AnyWidget[];
				}
			}

			namespace BankOriginal {
				interface File {
					type:   'BankPanel';
					name:   string;
					fields:   {
						priority: number;
						rect:     string | Common.Rect;
						anchor:   string | Common.Point;
					};
					children: Common.AnyWidget[];
				}
			}

			namespace BankExpansionHD {
				interface File extends Omit<BankOriginalHD.File, 'fields' | 'children'> {
					basedOn?: string;
					type:     'BankPanel';
					name:     string;
					fields:   Partial<BankOriginalHD.File['fields']> & {
						backgroundFile?: string[];
					};
					children: Common.AnyWidget[];
				}
			}

			namespace BankExpansion {
				interface File extends Omit<BankOriginal.File, 'fields' | 'children'> {
					basedOn: string;
					name:    string;
					fields:   Partial<BankOriginal.File['fields']> & {
						backgroundFile: string[];
					};
					children: (boolean | Common.AnyWidget)[];
				}
			}
		}

		namespace Inventory {
			type Keys = [
				'class',
				'invLeft',
				'invRight',
				'invTop',
				'invBottom',
				'gridX',
				'gridY',
				'gridLeft',
				'gridRight',
				'gridTop',
				'gridBottom',
				'gridBoxWidth',
				'gridBoxHeight',
				'rArmLeft',
				'rArmRight',
				'rArmTop',
				'rArmBottom',
				'rArmWidth',
				'rArmHeight',
				'torsoLeft',
				'torsoRight',
				'torsoTop',
				'torsoBottom',
				'torsoWidth',
				'torsoHeight',
				'lArmLeft',
				'lArmRight',
				'lArmTop',
				'lArmBottom',
				'lArmWidth',
				'lArmHeight',
				'headLeft',
				'headRight',
				'headTop',
				'headBottom',
				'headWidth',
				'headHeight',
				'neckLeft',
				'neckRight',
				'neckTop',
				'neckBottom',
				'neckWidth',
				'neckHeight',
				'rHandLeft',
				'rHandRight',
				'rHandTop',
				'rHandBottom',
				'rHandWidth',
				'rHandHeight',
				'lHandLeft',
				'lHandRight',
				'lHandTop',
				'lHandBottom',
				'lHandWidth',
				'lHandHeight',
				'beltLeft',
				'beltRight',
				'beltTop',
				'beltBottom',
				'beltWidth',
				'beltHeight',
				'feetLeft',
				'feetRight',
				'feetTop',
				'feetBottom',
				'feetWidth',
				'feetHeight',
				'glovesLeft',
				'glovesRight',
				'glovesTop',
				'glovesBottom',
				'glovesWidth	glovesHeight',
			][number];

			type File = TSVData<Keys>;
		}

		namespace PlayerInventory {
			namespace Common {
				interface InventorySlotWidget {
					type:      'InventorySlotWidget';
					name:      string;
					fields?:   InventorySlotWidgetFields;
					children?: Layout.Common.AnyWidget[];
				}

				interface InventorySlotWidgetFields {
					rect?:                   string | Layout.Common.Rect;
					width?:                  number;
					height?:                 number;
					cellSize?:               string | Layout.Common.Point;
					location?:               string;
					gemSocketFilename?:      string;
					backgroundFilename?:     string;
					backgroundFrame?:        number;
					backgroundOffset?:       Layout.Common.Point;
					itemOffset?:             Layout.Common.Point;
					swappedOffset?:          Layout.Common.Point;
					navigation?:             NavigationConfig;
					focusIndicatorFilename?: string;
					focusIndicatorOffset?:   Layout.Common.Point;
				}

				interface NavigationConfig {
					left?:  NavigationTarget;
					right?: NavigationTarget;
					up?:    NavigationTarget;
					down?:  NavigationTarget;
				}

				interface NavigationTarget {
					name?:          string;
					panelBoundary?: number;
				}

				interface BeltWidget {
					type:      'BeltWidget';
					name:      string;
					fields?:   BeltWidgetFields;
					children?: Layout.Common.AnyWidget[];
				}

				interface BeltWidgetFields {
					rect?:                              string | Layout.Common.Rect;
					poppedRowFilename?:                 string;
					poppedCapFilename?:                 string;
					cellOffsetInRow?:                   Layout.Common.Point;
					itemOffsetInCell?:                  Layout.Common.Point;
					cellPadding?:                       Layout.Common.Point;
					cellSize?:                          string | Layout.Common.Point;
					controllerDefaultItemTransparency?: number;
				}

				interface FocusableWidget {
					type:      'FocusableWidget';
					name:      string;
					fields?:   FocusableWidgetFields;
					children?: Layout.Common.AnyWidget[];
				}

				interface FocusableWidgetFields {
					rect?:          string | Layout.Common.Rect;
					fitToParent?:   number;
					tooltipStyle?:  string;
					tooltipString?: string;
				}

				interface ButtonLegendPreset {
					action: string;
				}

				interface ButtonLegendWidgetFields extends Layout.Common.ButtonLegendWidgetFields {
					presets?: ButtonLegendPreset[];
				}

				type PlayerInventoryWidget
					= Layout.Common.ClickCatcherWidget
					| Layout.Common.ImageWidget
					| Layout.Common.TextBoxWidget
					| Layout.Common.ButtonWidget
					| Layout.Common.InventoryGridWidget
					| Layout.Common.GridImageWidget
					| InventorySlotWidget
					| BeltWidget
					| FocusableWidget
					| (Layout.Common.ButtonLegendWidget & { fields?: ButtonLegendWidgetFields; });
			}

			namespace PlayerInventoryOriginalLayout {
				interface File {
					type:   'PlayerInventoryPanel';
					name:   string;
					fields:    {
						rect:   string | Layout.Common.Rect;
						anchor: string | Layout.Common.Point;
					};
					children: Common.PlayerInventoryWidget[];
				}
			}

			namespace PlayerInventoryOriginalLayoutHD {
				interface File {
					type:   'PlayerInventoryPanel';
					name:   string;
					fields:    {
						rect:   string | Layout.Common.Rect;
						anchor: string | Layout.Common.Point;
					};
					children: Common.PlayerInventoryWidget[];
				}
			}

			namespace PlayerInventoryExpansionLayoutHD {
				interface File {
					basedOn: string;
					type:    'PlayerInventoryPanel';
					name:    string;
					fields:    {
						activeWeaponSwapFontColor?:   string;
						inactiveWeaponSwapFontColor?: string;
					};
					children: Common.PlayerInventoryWidget[];
				}
			}

			namespace ControllerPlayerInventoryOriginalLayoutHD {
				interface File {
					basedOn: string;
					type:    'PlayerInventoryPanel';
					name:    string;
					fields:    {
						rect:           string | Layout.Common.Rect;
						defaultWidget?: string;
					};
					children: Common.PlayerInventoryWidget[];
				}
			}

			namespace ControllerPlayerInventoryExpansionLayoutHD {
				interface File {
					basedOn: string;
					type:    'PlayerInventoryPanel';
					name:    string;
					fields:    {
						activeWeaponSwapFontColor?:   string;
						inactiveWeaponSwapFontColor?: string;
					};
					children: Common.PlayerInventoryWidget[];
				}
			}
		}
	}
}
