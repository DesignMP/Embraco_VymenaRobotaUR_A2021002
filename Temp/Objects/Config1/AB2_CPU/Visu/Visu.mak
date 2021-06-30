######################################################
#                                                    #
# Automatic generated Makefile for Visual Components #
#                                                    #
#                  Do NOT edit!                      #
#                                                    #
######################################################

VCC:=@'$(AS_BIN_PATH)/br.vc.pc.exe'
LINK:=@'$(AS_BIN_PATH)/BR.VC.Link.exe'
MODGEN:=@'$(AS_BIN_PATH)/BR.VC.ModGen.exe'
VCPL:=@'$(AS_BIN_PATH)/BR.VC.PL.exe'
VCHWPP:=@'$(AS_BIN_PATH)/BR.VC.HWPP.exe'
VCDEP:=@'$(AS_BIN_PATH)/BR.VC.Depend.exe'
VCFLGEN:=@'$(AS_BIN_PATH)/BR.VC.lfgen.exe'
VCREFHANDLER:=@'$(AS_BIN_PATH)/BR.VC.CrossReferenceHandler.exe'
VCXREFEXTENDER:=@'$(AS_BIN_PATH)/BR.AS.CrossRefVCExtender.exe'
RM=CMD /C DEL
PALFILE_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Palette.vcr
VCCFLAGS_Visu=-server -proj Visu -vc '$(AS_PROJECT_PATH)/Logical/HMI/Visu/VCObject.vc' -prj_path '$(AS_PROJECT_PATH)' -temp_path '$(AS_TEMP_PATH)' -cfg $(AS_CONFIGURATION) -plc $(AS_PLC) -plctemp $(AS_TEMP_PLC) -cpu_path '$(AS_CPU_PATH)'
VCFIRMWARE=4.72.5
VCFIRMWAREPATH=$(AS_VC_PATH)/Firmware/V4.72.5/SG4
VCOBJECT_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/VCObject.vc
VCSTARTUP='vcstart.br'
VCLOD='vclod.br'
VCSTPOST='vcstpost.br'
TARGET_FILE_Visu=$(AS_CPU_PATH)/Visu.br
OBJ_SCOPE_Visu=HMI
PRJ_PATH_Visu=$(AS_PROJECT_PATH)
SRC_PATH_Visu=$(AS_PROJECT_PATH)/Logical/$(OBJ_SCOPE_Visu)/Visu
TEMP_PATH_Visu=$(AS_TEMP_PATH)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/Visu
TEMP_PATH_Shared=$(AS_TEMP_PATH)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/VCShared
TEMP_PATH_ROOT_Visu=$(AS_TEMP_PATH)
VC_LIBRARY_LIST_Visu=$(TEMP_PATH_Visu)/libraries.vci
VC_XREF_BUILDFILE_Visu=$(AS_TEMP_PATH)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/vcxref.build
VC_XREF_CLEANFILE=$(AS_TEMP_PATH)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/vcxref.clean
VC_LANGUAGES_Visu=$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr
CPUHWC='$(TEMP_PATH_Visu)/cpuhwc.vci'
VC_STATIC_OPTIONS_Visu='$(TEMP_PATH_Visu)/vcStaticOptions.xml'
VC_STATIC_OPTIONS_Shared='$(TEMP_PATH_Shared)/vcStaticOptions.xml'
# include Shared and Font Makefile (only once)
	include $(AS_TEMP_PATH)/objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/VCFntDat/Font_Visu.mak
ifneq ($(VCINC),1)
	VCINC=1
	include $(AS_TEMP_PATH)/objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/VCShared/VCShared.mak
endif

DEPENDENCIES_Visu=-d vcgclass -profile 'False'
DEFAULT_STYLE_SHEET_Visu='Source[local].StyleSheet[Default]'
SHARED_MODULE=$(TEMP_PATH_ROOT_Visu)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/vcshared.br
LFNTFLAGS_Visu=-P '$(AS_PROJECT_PATH)' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)'
BDRFLAGS_Visu=-P '$(AS_PROJECT_PATH)' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)'

# Local Libs
LIB_LOCAL_OBJ_Visu=$(TEMP_PATH_Visu)/localobj.vca

# Hardware sources
PANEL_HW_OBJECT_Visu=$(TEMP_PATH_ROOT_Visu)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/Visu/dis.Hardware.vco
PANEL_HW_VCI_Visu=$(TEMP_PATH_ROOT_Visu)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/Visu/dis.Hardware.vci
PANEL_HW_SOURCE_Visu=D:/Projekty\ BER/Embraco_VymenaRobotaUR_A2021002/Physical/Config1/Hardware.hw 
DIS_OBJECTS_Visu=$(PANEL_HW_OBJECT_Visu) $(KEYMAP_OBJECTS_Visu)

# KeyMapping flags
$(TEMP_PATH_Visu)/dis.PS2-Keyboard.vco: $(AS_PROJECT_PATH)/Physical/Config1/AB2_CPU/VC/PS2-Keyboard.dis $(PANEL_HW_SOURCE_Visu)
	$(VCHWPP) -f '$(PANEL_HW_SOURCE_Visu)' -o '$(subst .vco,.vci,$(TEMP_PATH_Visu)/dis.PS2-Keyboard.vco)' -n Visu -d Visu -pal '$(PALFILE_Visu)' -c '$(AS_CONFIGURATION)' -p '$(AS_PLC)' -ptemp '$(AS_TEMP_PLC)' -B 'D4.73' -L '' -hw '$(CPUHWC)' -warninglevel 2 -so $(VC_STATIC_OPTIONS_Visu) -sos $(VC_STATIC_OPTIONS_Shared) -keyboard '$(AS_PROJECT_PATH)/Physical/Config1/AB2_CPU/VC/PS2-Keyboard.dis' -fp '$(AS_VC_PATH)/Firmware/V4.72.5/SG4' -prj '$(AS_PROJECT_PATH)' -apj 'VymenaRobotaUR' -sfas -vcob '$(VCOBJECT_Visu)'
	$(VCC) -f '$(subst .vco,.vci,$@)' -o '$@' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -k '$(VCVK_SOURCES_Visu)' $(VCCFLAGS_Visu) -p Visu -sfas

KEYMAP_SOURCES_Visu=$(AS_PROJECT_PATH)/Physical/Config1/AB2_CPU/VC/PS2-Keyboard.dis 
KEYMAP_OBJECTS_Visu=$(TEMP_PATH_Visu)/dis.PS2-Keyboard.vco 

# All Source Objects
TXTGRP_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/InstantMessages.txtgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/HeaderBar.txtgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/PageNames.txtgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/Buttons_PageTexts.txtgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/Languages.txtgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/NumPad_Limits.txtgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/httpURL_SDM.txtgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/StavyZariadenia.txtgrp 

FNINFO_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Info.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Html_SDM.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Default.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Header.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Button.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Input.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Status.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Input_0.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Aerial14.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Aerial24_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial10.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial10_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial11.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial11_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial12.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial12_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial16.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial16_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial18.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial18_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial20.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial20_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial8.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial8_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial9.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Arial9_Bold.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/DateTime.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Digitalny_22.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/Digitalny_50.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpButton.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpDefault.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpHeader.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpHtml_SDM.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpInfo.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpInput.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpMenuButtons.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpPackMLStateNames.fninfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/MpPads.fninfo 

BMINFO_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPad_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPad.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_AcknowledgeReset.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Active.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_BypassOFF.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_BypassON.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Inactive.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Latched.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_NotQuit.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Quit.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Reset.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_ResetAcknowledge.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Triggered.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ProgressBorder.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/alarm.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_checked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_default.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_default_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_global_area.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_global_area_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/information.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_left.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_left_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_multi.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_multi_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_multi.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_multi_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_radio_selected.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_radio.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_right.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_right_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/warning.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_decrease_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_increase.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_increase_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_decrease.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/frame_header.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small_checked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_AlphaPad.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_AlphaPad_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_09x09.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_ArrowRightGray.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_ArrowUpGray.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_BallGray.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadVer.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadHor_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadHor.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadVer_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/gauge_200x200_round_nodiv.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/gauge_NeedleRed100x11_1.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small_gray.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_EditPad.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_EditPad_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/FrameInvisible.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_off.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_on.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_ready.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_error.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/BackTransparent.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/BackgroundWVGA_NoLogo.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPadLimits.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPadLimits_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_60x60.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CS_NG_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CS_OK_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SivaLED_30x30.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SivaLED_30x30_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloOFF.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloON.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaOdomknuta_32x32_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaZamknuta_32x32_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokLock_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokUnlock_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/alert.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/cervena_led.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/siva_led_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zelena_kontrolka_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zelena_led_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Blue_LED.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Green_LED.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpAlarm_BypassON.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_control.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_control_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_decrease.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_decrease_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_default.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_default_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_error.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_bottom.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_left.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_pres_bottom.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_press_left.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_increase.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_increase_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_off.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_on.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_radio_selected.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_radio_unselected.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_ready.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_multi.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_multi_press.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_multi.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_multi_press.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_multi.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_multi_pres.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_multi.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_multi_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small_checked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small_gray.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpFrameHeader.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpGroupControl.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderCenterless.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderInactiveCenterless.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderInactive.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorder.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_lowerPressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_lower.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric2Pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric2.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numericPressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_upperPressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_upper.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_lowerPressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_lower.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric2Pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric2.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numericPressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_upperPressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_upper.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadHor.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadHor_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadVer.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadVer_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_Numpad.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_Numpad_pressed.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorderDown.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorderLeft.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorder.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpOutputBorder.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpProgressBorder.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_add.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_add_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_delete.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_delete_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_edit.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_edit_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Exit.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Exit_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Export.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Export_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Import.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Import_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_add.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_add_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_clock_stop.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_delete.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_delete_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_edit.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_edit_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_lock.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_lock_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_pw_change.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_pw_change_locked.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Red_LED.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokLock.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokUnlock.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/siva_led.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_7.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_8.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_9.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/DMP_LogoNew300x105.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/DPS.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Disketa_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Down48x48.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/EditaciaUzivatelov32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/EmergencyButton32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Help_60x60.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Historia32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Kos_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/LogoOFirme.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PageDOWN2_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PageUP2_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ParametreZariadenia32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/RucnyRezim32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Sipka_spat.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SuradnicovySystem2_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloOFF_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Up48x48_1.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/User32x32color.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/YES_32x32_1.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaZamknuta_32x32_1.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZaskrtPolicka32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/information_0.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zvoncek_biely32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_6.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CasDatum32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Load_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Recepty32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Senzor_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SipkaVpred_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Automat48x48.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/AutomatickyRezim32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PozadieDesignMP_800x480.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PracoviskoVymenaRobota.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_32x32.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_40x40.bminfo \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/LogoDesign_800x480.bminfo 

BMGRP_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/AlarmAcknowledgeState.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/AlarmBypassState.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/AlarmEvent.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/AlarmState.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Borders.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/GlobalArea.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Pads.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Kontrolka_Siva_Cervena_Zelena.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Kontrolka_Siva_Zelena.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MalaKontrolka_Siva_Zelena.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/OsvetlenieBunky.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Stav_CS.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/SymbolAlarmu2.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/SymbolZamku.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/SymbolAlarmu.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/msgBox.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MpAuditCheckbox.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MpBorders.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MpPads.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MpUserIcons.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Semafor.bmgrp \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/StavBezpecnZamku.bmgrp 

PAGE_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/NastavenieCasuDatumu.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/ObrazovkaHistorieAlarmov.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/ObrazovkaInfo.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/UvodnaObrazovka.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/AutomatickyRezim.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/ObrazovkaAlarmov.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/RR_Bruska.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/RR_HlavnaObrazovka.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/ParametrePracoviska.page \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/StavyPracoviskZariadenia.page 

LAYER_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/Upozornenia_2.layer \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/Background.layer \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/ListaBack.layer \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/PopUpResetZariadenia.layer \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/Upozornenia_1.layer \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/ZakladnaLista.layer \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/PopPrihlasenie.layer \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/globalAreaAll.layer \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/Pozadie_DMP.layer 

VCS_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/StyleSheets/Default.vcs 

BDR_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Decrease.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Decrease_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Global_Area.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Global_Area_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Increase.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Increase_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Multi_Scroll_Down.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Multi_Scroll_Down_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Multi_Scroll_Up.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Multi_Scroll_Up_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Radio.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Radio_selected.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scoll_Up.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scoll_Up_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Down.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Down_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Left.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Left_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Right.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Right_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/SunkenNG.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/CheckBox_checked.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Flat_black.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Flat_grey.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/FrameHeader.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/OverdriveBorder.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/ProgressBarBorder.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/RaisedInner.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Raised.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/SliderBorder09.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/SunkenOuter.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Sunken.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/SunkenNGgray.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/FrameGlobal.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/FrameInvisible.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_KeyRingOff.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_KeyRingOn.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Control.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Control_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_SunkenNG.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_TabActive.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/TabActive.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Backward.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Backward_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Forward.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Forward_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_AttentionOff.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_AttentionOn.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Device_Select_Left.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Device_Unselect_Left.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_KeyRingOff.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_KeyRingOn.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Multi_Scroll_Down.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Multi_Scroll_Dwn_press.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Multi_Scroll_Up.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Multi_Scroll_Up_press.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scoll_Up.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scoll_Up_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Down.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Down_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Left.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Left_Multi.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Left_Multi_pres.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Left_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Right.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Right_Multi.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Right_Multi_pr.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Right_pressed.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_CheckBox_checked.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Flat_grey.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_FrameInvisible.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_GroupControlAlarm.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_GroupControl.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_InputBorderInactive.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_InputBorder.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_LabelBorderDown.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_LabelBorder.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_MoveOff.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_MoveOn.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_OutputBorder.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_PackML_States.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_SliderBorder09.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_State_gray.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_State_green.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_State_red.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_SunkenNGgray.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_TeachInputBorderActive.bdr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_TeachInputBorderInactive.bdr 

TPR_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/NumPad.tpr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/AlphaPad.tpr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/NavigationPad_ver.tpr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/NavigationPad_hor.tpr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/EditPad.tpr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/NumPad_Limits.tpr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/MpNumPad.tpr \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/MpAlphaPad.tpr 

TDC_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/TrendData.tdc 

TRD_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/CPUTemperature.trd \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/ROOMTemperature.trd 

TRE_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/Trend_Temperature.tre 

CLM_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/SchemaBezpecnosti.clm \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/SchemaTlacitkaStart.clm \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/cervena_zelena.clm \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/StavyZariadenia.clm \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/StavyPracoviska.clm \
	$(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/TlacitkoAlarm.clm 

VCVK_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/VirtualKeys.vcvk 

VCR_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Palette.vcr 

# Runtime Object sources
VCR_OBJECT_Visu=$(TEMP_PATH_Visu)/vcrt.vco
VCR_SOURCE_Visu=$(SRC_PATH_Visu)/package.vcp
# All Source Objects END

#Panel Hardware
$(PANEL_HW_VCI_Visu): $(PANEL_HW_SOURCE_Visu) $(VC_LIBRARY_LIST_Visu) $(KEYMAP_SOURCES_Visu) $(PALFILE_Visu)
	$(VCHWPP) -f '$<' -o '$@' -n Visu -d Visu -pal '$(PALFILE_Visu)' -c '$(AS_CONFIGURATION)' -p '$(AS_PLC)' -ptemp '$(AS_TEMP_PLC)' -B 'D4.73' -L '' -verbose 'False' -profile 'False' -hw '$(CPUHWC)' -warninglevel 2 -so $(VC_STATIC_OPTIONS_Visu) -sos $(VC_STATIC_OPTIONS_Shared) -fp '$(AS_VC_PATH)/Firmware/V4.72.5/SG4' -sfas -prj '$(AS_PROJECT_PATH)' -apj 'VymenaRobotaUR' -vcob '$(VCOBJECT_Visu)'

$(PANEL_HW_OBJECT_Visu): $(PANEL_HW_VCI_Visu) $(VC_LIBRARY_LIST_Visu)
	$(VCC) -f '$(subst .vco,.vci,$@)' -o '$@' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -k '$(VCVK_SOURCES_Visu)' $(VCCFLAGS_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


# Pages
PAGE_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/page., $(notdir $(PAGE_SOURCES_Visu:.page=.vco)))

$(TEMP_PATH_Visu)/page.NastavenieCasuDatumu.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/NastavenieCasuDatumu.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.ObrazovkaHistorieAlarmov.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/ObrazovkaHistorieAlarmov.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.ObrazovkaInfo.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/ObrazovkaInfo.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.UvodnaObrazovka.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/UvodnaObrazovka.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.AutomatickyRezim.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/AutomatickyRezim.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.ObrazovkaAlarmov.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/ObrazovkaAlarmov.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.RR_Bruska.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/RR_Bruska.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.RR_HlavnaObrazovka.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/RR_HlavnaObrazovka.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.ParametrePracoviska.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/ParametrePracoviska.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/page.StavyPracoviskZariadenia.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/StavyPracoviskZariadenia.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Default.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Pages END




# Stylesheets
VCS_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/vcs., $(notdir $(VCS_SOURCES_Visu:.vcs=.vco)))

$(TEMP_PATH_Visu)/vcs.Default.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/StyleSheets/Default.vcs
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Stylesheets END




# Layers
LAYER_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/layer., $(notdir $(LAYER_SOURCES_Visu:.layer=.vco)))

$(TEMP_PATH_Visu)/layer.Upozornenia_2.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/Upozornenia_2.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/layer.Background.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/Background.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/layer.ListaBack.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/ListaBack.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/layer.PopUpResetZariadenia.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/PopUpResetZariadenia.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/layer.Upozornenia_1.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/Upozornenia_1.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/layer.ZakladnaLista.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/ZakladnaLista.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/layer.PopPrihlasenie.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/PopPrihlasenie.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/layer.globalAreaAll.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/globalAreaAll.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/layer.Pozadie_DMP.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Layers/Pozadie_DMP.layer $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Layers END




# Virtual Keys
VCVK_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/vcvk., $(notdir $(VCVK_SOURCES_Visu:.vcvk=.vco)))

$(TEMP_PATH_Visu)/vcvk.VirtualKeys.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/VirtualKeys.vcvk
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas

$(VCVK_OBJECTS_Visu): $(VC_LANGUAGES_Visu)

#Virtual Keys END




# Touch Pads
TPR_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/tpr., $(notdir $(TPR_SOURCES_Visu:.tpr=.vco)))

$(TEMP_PATH_Visu)/tpr.NumPad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/NumPad.tpr
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -prj 'D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/HMI/Visu' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/tpr.AlphaPad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/AlphaPad.tpr
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -prj 'D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/HMI/Visu' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/tpr.NavigationPad_ver.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/NavigationPad_ver.tpr
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -prj 'D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/HMI/Visu' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/tpr.NavigationPad_hor.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/NavigationPad_hor.tpr
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -prj 'D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/HMI/Visu' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/tpr.EditPad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/EditPad.tpr
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -prj 'D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/HMI/Visu' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/tpr.NumPad_Limits.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/NumPad_Limits.tpr
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -prj 'D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/HMI/Visu' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/tpr.MpNumPad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/MpNumPad.tpr
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -prj 'D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/HMI/Visu' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/tpr.MpAlphaPad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TouchPads/MpAlphaPad.tpr
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -prj 'D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/HMI/Visu' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Touch Pads END




# Text Groups
TXTGRP_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/txtgrp., $(notdir $(TXTGRP_SOURCES_Visu:.txtgrp=.vco)))

$(TEMP_PATH_Visu)/txtgrp.InstantMessages.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/InstantMessages.txtgrp $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/txtgrp.HeaderBar.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/HeaderBar.txtgrp $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/txtgrp.PageNames.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/PageNames.txtgrp $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/txtgrp.Buttons_PageTexts.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/Buttons_PageTexts.txtgrp $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/txtgrp.Languages.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/Languages.txtgrp $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/txtgrp.NumPad_Limits.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/NumPad_Limits.txtgrp $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/txtgrp.httpURL_SDM.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/httpURL_SDM.txtgrp $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/txtgrp.StavyZariadenia.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/TextGroups/StavyZariadenia.txtgrp $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Text Groups END




# BitmapGroups
BMGRP_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/bmgrp., $(notdir $(BMGRP_SOURCES_Visu:.bmgrp=.vco)))

$(TEMP_PATH_Visu)/bmgrp.AlarmAcknowledgeState.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/AlarmAcknowledgeState.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.AlarmBypassState.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/AlarmBypassState.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.AlarmEvent.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/AlarmEvent.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.AlarmState.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/AlarmState.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.Borders.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Borders.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.GlobalArea.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/GlobalArea.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.Pads.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Pads.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.Kontrolka_Siva_Cervena_Zelena.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Kontrolka_Siva_Cervena_Zelena.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.Kontrolka_Siva_Zelena.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Kontrolka_Siva_Zelena.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.MalaKontrolka_Siva_Zelena.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MalaKontrolka_Siva_Zelena.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.OsvetlenieBunky.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/OsvetlenieBunky.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.Stav_CS.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Stav_CS.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.SymbolAlarmu2.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/SymbolAlarmu2.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.SymbolZamku.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/SymbolZamku.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.SymbolAlarmu.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/SymbolAlarmu.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.msgBox.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/msgBox.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.MpAuditCheckbox.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MpAuditCheckbox.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.MpBorders.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MpBorders.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.MpPads.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MpPads.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.MpUserIcons.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/MpUserIcons.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.Semafor.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/Semafor.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bmgrp.StavBezpecnZamku.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/BitmapGroups/StavBezpecnZamku.bmgrp
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#BitmapGroups END




# Bitmaps
BMINFO_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/bminfo., $(notdir $(BMINFO_SOURCES_Visu:.bminfo=.vco)))

$(TEMP_PATH_Visu)/bminfo.Key_NumPad_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPad_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPad_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_NumPad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPad.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPad.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_AcknowledgeReset.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_AcknowledgeReset.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_AcknowledgeReset.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_Active.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Active.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Active.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_BypassOFF.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_BypassOFF.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_BypassOFF.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_BypassON.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_BypassON.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_BypassON.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_Inactive.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Inactive.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Inactive.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_Latched.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Latched.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Latched.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_NotQuit.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_NotQuit.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_NotQuit.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_Quit.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Quit.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Quit.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_Reset.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Reset.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Reset.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_ResetAcknowledge.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_ResetAcknowledge.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_ResetAcknowledge.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_Triggered.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Triggered.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_Triggered.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ProgressBorder.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ProgressBorder.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ProgressBorder.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.alarm.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/alarm.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/alarm.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.checkbox.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.checkbox_checked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_checked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_checked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_default.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_default.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_default.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_default_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_default_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_default_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_down.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_down_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_global_area.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_global_area.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_global_area.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_global_area_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_global_area_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_global_area_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.information.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/information.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/information.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_left.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_left.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_left.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_left_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_left_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_left_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_down_multi.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_multi.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_multi.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_down_multi_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_multi_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_down_multi_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_up_multi.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_multi.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_multi.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_up_multi_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_multi_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_multi_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_radio_selected.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_radio_selected.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_radio_selected.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_radio.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_radio.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_radio.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_right.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_right.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_right.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_right_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_right_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_right_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_up.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_scroll_up_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_scroll_up_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.warning.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/warning.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/warning.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_decrease_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_decrease_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_decrease_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_increase.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_increase.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_increase.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_increase_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_increase_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_increase_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_decrease.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_decrease.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_decrease.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.frame_header.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/frame_header.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/frame_header.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.checkbox_small.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.checkbox_small_checked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small_checked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small_checked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_AlphaPad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_AlphaPad.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_AlphaPad.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_AlphaPad_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_AlphaPad_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_AlphaPad_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Slider_09x09.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_09x09.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_09x09.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Slider_ArrowRightGray.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_ArrowRightGray.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_ArrowRightGray.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Slider_ArrowUpGray.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_ArrowUpGray.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_ArrowUpGray.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Slider_BallGray.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_BallGray.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Slider_BallGray.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_ListPadVer.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadVer.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadVer.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_ListPadHor_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadHor_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadHor_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_ListPadHor.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadHor.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadHor.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_ListPadVer_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadVer_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_ListPadVer_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.gauge_200x200_round_nodiv.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/gauge_200x200_round_nodiv.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/gauge_200x200_round_nodiv.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.gauge_NeedleRed100x11_1.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/gauge_NeedleRed100x11_1.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/gauge_NeedleRed100x11_1.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.checkbox_small_gray.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small_gray.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/checkbox_small_gray.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_EditPad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_EditPad.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_EditPad.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_EditPad_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_EditPad_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_EditPad_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.FrameInvisible.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/FrameInvisible.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/FrameInvisible.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_off.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_off.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_off.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_on.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_on.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_on.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_ready.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_ready.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_ready.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.button_error.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_error.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/button_error.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.BackTransparent.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/BackTransparent.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/BackTransparent.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.BackgroundWVGA_NoLogo.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/BackgroundWVGA_NoLogo.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/BackgroundWVGA_NoLogo.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_NumPadLimits.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPadLimits.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPadLimits.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Key_NumPadLimits_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPadLimits_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Key_NumPadLimits_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_60x60.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_60x60.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_60x60.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.CS_NG_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CS_NG_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CS_NG_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.CS_OK_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CS_OK_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CS_OK_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.SivaLED_30x30.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SivaLED_30x30.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SivaLED_30x30.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.SivaLED_30x30_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SivaLED_30x30_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SivaLED_30x30_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.SvetloOFF.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloOFF.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloOFF.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.SvetloON.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloON.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloON.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ZamkaOdomknuta_32x32_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaOdomknuta_32x32_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaOdomknuta_32x32_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ZamkaZamknuta_32x32_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaZamknuta_32x32_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaZamknuta_32x32_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ZamokLock_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokLock_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokLock_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ZamokUnlock_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokUnlock_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokUnlock_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.alert.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/alert.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/alert.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.cervena_led.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/cervena_led.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/cervena_led.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.siva_led_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/siva_led_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/siva_led_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.zelena_kontrolka_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zelena_kontrolka_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zelena_kontrolka_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.zelena_led_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zelena_led_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zelena_led_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Blue_LED.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Blue_LED.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Blue_LED.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Green_LED.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Green_LED.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Green_LED.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpAlarm_BypassON.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpAlarm_BypassON.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpAlarm_BypassON.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_control.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_control.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_control.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_control_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_control_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_control_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_decrease.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_decrease.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_decrease.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_decrease_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_decrease_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_decrease_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_default.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_default.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_default.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_default_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_default_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_default_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_error.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_error.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_error.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_global_area.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_global_area_bottom.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_bottom.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_bottom.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_global_area_left.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_left.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_left.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_global_area_pres_bottom.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_pres_bottom.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_pres_bottom.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_global_area_press_left.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_press_left.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_press_left.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_global_area_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_global_area_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_increase.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_increase.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_increase.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_increase_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_increase_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_increase_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_off.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_off.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_off.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_on.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_on.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_on.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_radio_selected.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_radio_selected.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_radio_selected.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_radio_unselected.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_radio_unselected.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_radio_unselected.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_ready.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_ready.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_ready.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_down.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_down_multi.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_multi.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_multi.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_down_multi_press.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_multi_press.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_multi_press.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_down_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_down_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_left.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_left_multi.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_multi.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_multi.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_left_multi_press.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_multi_press.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_multi_press.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_left_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_left_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_right.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_right_multi.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_multi.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_multi.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_right_multi_pres.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_multi_pres.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_multi_pres.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_right_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_right_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_up.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_up_multi.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_multi.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_multi.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_up_multi_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_multi_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_multi_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpButton_scroll_up_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpButton_scroll_up_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpCheckbox_small.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpCheckbox_small_checked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small_checked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small_checked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpCheckbox_small_gray.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small_gray.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpCheckbox_small_gray.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpFrameHeader.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpFrameHeader.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpFrameHeader.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpGroupControl.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpGroupControl.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpGroupControl.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpInputBorderCenterless.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderCenterless.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderCenterless.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpInputBorderInactiveCenterless.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderInactiveCenterless.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderInactiveCenterless.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpInputBorderInactive.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderInactive.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorderInactive.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpInputBorder.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorder.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpInputBorder.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_AlphaPad_lowerPressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_lowerPressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_lowerPressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_AlphaPad_lower.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_lower.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_lower.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_AlphaPad_numeric2Pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric2Pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric2Pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_AlphaPad_numeric2.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric2.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric2.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_AlphaPad_numericPressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numericPressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numericPressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_AlphaPad_numeric.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_numeric.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_AlphaPad_upperPressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_upperPressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_upperPressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_AlphaPad_upper.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_upper.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_AlphaPad_upper.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_EditPad_lowerPressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_lowerPressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_lowerPressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_EditPad_lower.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_lower.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_lower.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_EditPad_numeric2Pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric2Pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric2Pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_EditPad_numeric2.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric2.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric2.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_EditPad_numericPressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numericPressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numericPressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_EditPad_numeric.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_numeric.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_EditPad_upperPressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_upperPressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_upperPressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_EditPad_upper.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_upper.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_EditPad_upper.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_ListPadHor.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadHor.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadHor.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_ListPadHor_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadHor_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadHor_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_ListPadVer.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadVer.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadVer.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_ListPadVer_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadVer_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_ListPadVer_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_Numpad.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_Numpad.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_Numpad.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpKey_Numpad_pressed.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_Numpad_pressed.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpKey_Numpad_pressed.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpLabelBorderDown.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorderDown.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorderDown.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpLabelBorderLeft.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorderLeft.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorderLeft.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpLabelBorder.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorder.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpLabelBorder.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpOutputBorder.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpOutputBorder.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpOutputBorder.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpProgressBorder.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpProgressBorder.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpProgressBorder.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUserGroup_add.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_add.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_add.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUserGroup_add_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_add_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_add_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUserGroup_delete.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_delete.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_delete.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUserGroup_delete_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_delete_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_delete_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUserGroup_edit.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_edit.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_edit.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUserGroup_edit_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_edit_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUserGroup_edit_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_Exit.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Exit.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Exit.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_Exit_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Exit_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Exit_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_Export.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Export.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Export.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_Export_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Export_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Export_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_Import.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Import.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Import.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_Import_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Import_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_Import_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_add.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_add.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_add.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_add_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_add_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_add_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_clock_stop.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_clock_stop.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_clock_stop.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_delete.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_delete.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_delete.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_delete_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_delete_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_delete_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_edit.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_edit.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_edit.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_edit_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_edit_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_edit_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_lock.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_lock.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_lock.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_lock_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_lock_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_lock_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_pw_change.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_pw_change.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_pw_change.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.MpUser_pw_change_locked.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_pw_change_locked.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/MpUser_pw_change_locked.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Red_LED.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Red_LED.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Red_LED.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ZamokLock.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokLock.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokLock.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ZamokUnlock.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokUnlock.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamokUnlock.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.siva_led.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/siva_led.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/siva_led.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Bitmap_7.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_7.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_7.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Bitmap_8.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_8.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_8.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Bitmap_9.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_9.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_9.jpg
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.DMP_LogoNew300x105.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/DMP_LogoNew300x105.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/DMP_LogoNew300x105.jpg
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.DPS.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/DPS.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/DPS.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Disketa_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Disketa_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Disketa_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Down48x48.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Down48x48.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Down48x48.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.EditaciaUzivatelov32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/EditaciaUzivatelov32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/EditaciaUzivatelov32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.EmergencyButton32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/EmergencyButton32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/EmergencyButton32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Help_60x60.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Help_60x60.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Help_60x60.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Historia32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Historia32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Historia32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Kos_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Kos_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Kos_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.LogoOFirme.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/LogoOFirme.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/LogoOFirme.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.PageDOWN2_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PageDOWN2_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PageDOWN2_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.PageUP2_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PageUP2_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PageUP2_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ParametreZariadenia32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ParametreZariadenia32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ParametreZariadenia32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.RucnyRezim32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/RucnyRezim32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/RucnyRezim32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Sipka_spat.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Sipka_spat.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Sipka_spat.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.SuradnicovySystem2_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SuradnicovySystem2_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SuradnicovySystem2_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.SvetloOFF_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloOFF_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SvetloOFF_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Up48x48_1.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Up48x48_1.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Up48x48_1.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.User32x32color.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/User32x32color.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/User32x32color.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.YES_32x32_1.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/YES_32x32_1.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/YES_32x32_1.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ZamkaZamknuta_32x32_1.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaZamknuta_32x32_1.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZamkaZamknuta_32x32_1.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.ZaskrtPolicka32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZaskrtPolicka32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/ZaskrtPolicka32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.information_0.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/information_0.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/information_0.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.zvoncek_biely32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zvoncek_biely32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/zvoncek_biely32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Bitmap_6.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_6.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Bitmap_6.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.CasDatum32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CasDatum32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/CasDatum32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Load_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Load_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Load_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Recepty32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Recepty32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Recepty32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Senzor_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Senzor_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Senzor_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.SipkaVpred_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SipkaVpred_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/SipkaVpred_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Automat48x48.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Automat48x48.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Automat48x48.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.AutomatickyRezim32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/AutomatickyRezim32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/AutomatickyRezim32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.PozadieDesignMP_800x480.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PozadieDesignMP_800x480.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PozadieDesignMP_800x480.jpg
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.PracoviskoVymenaRobota.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PracoviskoVymenaRobota.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/PracoviskoVymenaRobota.jpg
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_32x32.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_32x32.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_32x32.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.Alarm_40x40.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_40x40.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/Alarm_40x40.png
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/bminfo.LogoDesign_800x480.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/LogoDesign_800x480.bminfo $(AS_PROJECT_PATH)/Logical/HMI/Visu/Bitmaps/LogoDesign_800x480.jpg
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Bitmaps END




# Trend Configuration
TRE_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/tre., $(notdir $(TRE_SOURCES_Visu:.tre=.vco)))

$(TEMP_PATH_Visu)/tre.Trend_Temperature.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/Trend_Temperature.tre
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Trend Configuration END




# Trend Data
TRD_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/trd., $(notdir $(TRD_SOURCES_Visu:.trd=.vco)))

$(TEMP_PATH_Visu)/trd.CPUTemperature.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/CPUTemperature.trd
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/trd.ROOMTemperature.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/ROOMTemperature.trd
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Trend Data END




# Trend Data Configuration
TDC_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/tdc., $(notdir $(TDC_SOURCES_Visu:.tdc=.vco)))

$(TEMP_PATH_Visu)/tdc.TrendData.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/TrendData.tdc
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#Trend Data Configuration END




# ColorMap Table
CLM_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/clm., $(notdir $(CLM_SOURCES_Visu:.clm=.vco)))

$(TEMP_PATH_Visu)/clm.SchemaBezpecnosti.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/SchemaBezpecnosti.clm
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/clm.SchemaTlacitkaStart.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/SchemaTlacitkaStart.clm
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/clm.cervena_zelena.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/cervena_zelena.clm
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/clm.StavyZariadenia.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/StavyZariadenia.clm
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/clm.StavyPracoviska.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/StavyPracoviska.clm
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


$(TEMP_PATH_Visu)/clm.TlacitkoAlarm.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/ColorMaps/TlacitkoAlarm.clm
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas


#ColorMap Table END


#
# Borders
#
BDR_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Decrease.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Decrease_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Global_Area.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Global_Area_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Increase.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Increase_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Multi_Scroll_Down.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Multi_Scroll_Down_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Multi_Scroll_Up.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Multi_Scroll_Up_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Radio.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Radio_selected.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scoll_Up.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scoll_Up_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Down.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Down_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Left.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Left_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Right.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Scroll_Right_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/SunkenNG.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/CheckBox_checked.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Flat_black.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Flat_grey.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/FrameHeader.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/OverdriveBorder.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/ProgressBarBorder.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/RaisedInner.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Raised.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/SliderBorder09.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/SunkenOuter.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Sunken.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/SunkenNGgray.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/FrameGlobal.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/FrameInvisible.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_KeyRingOff.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_KeyRingOn.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Control.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Control_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_SunkenNG.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_TabActive.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/TabActive.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Backward.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Backward_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Forward.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Button_Forward_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_AttentionOff.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_AttentionOn.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Device_Select_Left.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Device_Unselect_Left.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_KeyRingOff.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_KeyRingOn.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Multi_Scroll_Down.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Multi_Scroll_Dwn_press.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Multi_Scroll_Up.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Multi_Scroll_Up_press.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scoll_Up.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scoll_Up_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Down.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Down_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Left.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Left_Multi.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Left_Multi_pres.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Left_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Right.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Right_Multi.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Right_Multi_pr.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Button_Scroll_Right_pressed.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_CheckBox_checked.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_Flat_grey.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_FrameInvisible.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_GroupControlAlarm.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_GroupControl.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_InputBorderInactive.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_InputBorder.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_LabelBorderDown.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_LabelBorder.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_MoveOff.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_MoveOn.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_OutputBorder.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_PackML_States.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_SliderBorder09.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_State_gray.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_State_green.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_State_red.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_SunkenNGgray.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_TeachInputBorderActive.bdr $(AS_PROJECT_PATH)/Logical/HMI/Visu/Borders/Mp_TeachInputBorderInactive.bdr 
BDR_OBJECTS_Visu=$(TEMP_PATH_Visu)/bdr.Bordermanager.vco
$(TEMP_PATH_Visu)/bdr.Bordermanager.vco: $(BDR_SOURCES_Visu)
	$(VCC) -f '$<' -o '$@' -pkg '$(SRC_PATH_Visu)' $(BDRFLAGS_Visu) $(VCCFLAGS_Visu) -p Visu$(SRC_PATH_Visu)
#
# Logical fonts
#
$(TEMP_PATH_Visu)/lfnt.en.vco: $(TEMP_PATH_Visu)/en.lfnt $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' $(LFNTFLAGS_Visu) $(VCCFLAGS_Visu) -p Visu -sfas
$(TEMP_PATH_Visu)/lfnt.de.vco: $(TEMP_PATH_Visu)/de.lfnt $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' $(LFNTFLAGS_Visu) $(VCCFLAGS_Visu) -p Visu -sfas
LFNT_OBJECTS_Visu=$(TEMP_PATH_Visu)/lfnt.en.vco $(TEMP_PATH_Visu)/lfnt.de.vco 

#Runtime Object
$(VCR_OBJECT_Visu) : $(VCR_SOURCE_Visu)
	$(VCC) -f '$<' -o '$@' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -sl en $(VCCFLAGS_Visu) -rt  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4725 -sfas
# Local resources Library rules
LIB_LOCAL_RES_Visu=$(TEMP_PATH_Visu)/localres.vca
$(LIB_LOCAL_RES_Visu) : $(TEMP_PATH_Visu)/Visu02.ccf

# Bitmap Library rules
LIB_BMP_RES_Visu=$(TEMP_PATH_Visu)/bmpres.vca
$(LIB_BMP_RES_Visu) : $(TEMP_PATH_Visu)/Visu03.ccf
$(BMGRP_OBJECTS_Visu) : $(PALFILE_Visu) $(VC_LANGUAGES_Visu)
$(BMINFO_OBJECTS_Visu) : $(PALFILE_Visu)

BUILD_FILE_Visu=$(TEMP_PATH_Visu)/BuildFiles.arg
$(BUILD_FILE_Visu) : BUILD_FILE_CLEAN_Visu $(BUILD_SOURCES_Visu)
BUILD_FILE_CLEAN_Visu:
	$(RM) /F /Q '$(BUILD_FILE_Visu)' 2>nul
#All Modules depending to this project
PROJECT_MODULES_Visu=$(AS_CPU_PATH)/Visu01.br $(AS_CPU_PATH)/Visu02.br $(AS_CPU_PATH)/Visu03.br $(FONT_MODULES_Visu) $(SHARED_MODULE)

# General Build rules

$(TARGET_FILE_Visu): $(PROJECT_MODULES_Visu) $(TEMP_PATH_Visu)/Visu.prj
	$(MODGEN) -so $(VC_STATIC_OPTIONS_Visu) -fw '$(VCFIRMWAREPATH)' -m $(VCSTPOST) -v V1.00.0 -f '$(TEMP_PATH_Visu)/Visu.prj' -o '$@' -vc '$(VCOBJECT_Visu)' $(DEPENDENCIES_Visu) $(addprefix -d ,$(notdir $(PROJECT_MODULES_Visu:.br=)))

$(AS_CPU_PATH)/Visu01.br: $(TEMP_PATH_Visu)/Visu01.ccf
	$(MODGEN) -so $(VC_STATIC_OPTIONS_Visu) -fw '$(VCFIRMWAREPATH)' -m $(VCLOD) -v V1.00.0 -b -vc '$(VCOBJECT_Visu)' -f '$<' -o '$@' $(DEPENDENCIES_Visu)

$(AS_CPU_PATH)/Visu02.br: $(TEMP_PATH_Visu)/Visu02.ccf
	$(MODGEN) -so $(VC_STATIC_OPTIONS_Visu) -fw '$(VCFIRMWAREPATH)' -m $(VCLOD) -v V1.00.0 -b -vc '$(VCOBJECT_Visu)' -f '$<' -o '$@' $(DEPENDENCIES_Visu)

$(AS_CPU_PATH)/Visu03.br: $(TEMP_PATH_Visu)/Visu03.ccf
	$(MODGEN) -so $(VC_STATIC_OPTIONS_Visu) -fw '$(VCFIRMWAREPATH)' -m $(VCLOD) -v V1.00.0 -b -vc '$(VCOBJECT_Visu)' -f '$<' -o '$@' $(DEPENDENCIES_Visu)

# General Build rules END
$(LIB_LOCAL_OBJ_Visu) : $(TEMP_PATH_Visu)/Visu01.ccf

# Main Module
$(TEMP_PATH_ROOT_Visu)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/VCShared/Visu.vcm:
$(TEMP_PATH_Visu)/Visu.prj: $(TEMP_PATH_ROOT_Visu)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/VCShared/Visu.vcm
	$(VCDEP) -m '$(TEMP_PATH_ROOT_Visu)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/VCShared/Visu.vcm' -s '$(AS_CPU_PATH)/VCShared/Shared.vcm' -p '$(AS_PATH)/AS/VC/Firmware' -c '$(AS_CPU_PATH)' -fw '$(VCFIRMWAREPATH)' -hw '$(CPUHWC)' -so $(VC_STATIC_OPTIONS_Visu) -o Visu -proj Visu
	$(VCPL) $(notdir $(PROJECT_MODULES_Visu:.br=,4)) Visu,2 -o '$@' -p Visu -vc 'Visu' -verbose 'False' -fl '$(TEMP_PATH_ROOT_Visu)/Objects/$(AS_CONFIGURATION)/$(AS_TEMP_PLC)/VCShared/Visu.vcm' -vcr '$(VCR_SOURCE_Visu)' -prj '$(AS_PROJECT_PATH)' -warningLevel2 -sfas

# 01 Module

DEL_TARGET01_LFL_Visu=$(TEMP_PATH_Visu)\Visu01.ccf.lfl
$(TEMP_PATH_Visu)/Visu01.ccf: $(LIB_SHARED) $(SHARED_CCF) $(LIB_BMP_RES_Visu) $(TEMP_PATH_Visu)/Visu03.ccf $(LIB_LOCAL_RES_Visu) $(TEMP_PATH_Visu)/Visu02.ccf $(DIS_OBJECTS_Visu) $(PAGE_OBJECTS_Visu) $(VCS_OBJECTS_Visu) $(VCVK_OBJECTS_Visu) $(VCRT_OBJECTS_Visu) $(TPR_OBJECTS_Visu) $(TXTGRP_OBJECTS_Visu) $(LAYER_OBJECTS_Visu) $(VCR_OBJECT_Visu) $(TDC_OBJECTS_Visu) $(TRD_OBJECTS_Visu) $(TRE_OBJECTS_Visu) $(PRC_OBJECTS_Visu) $(SCR_OBJECTS_Visu)
	-@CMD /Q /C if exist "$(DEL_TARGET01_LFL_Visu)" DEL /F /Q "$(DEL_TARGET01_LFL_Visu)" 2>nul
	@$(VCFLGEN) '$@.lfl' '$(LIB_SHARED)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(LIB_BMP_RES_Visu)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(LIB_LOCAL_RES_Visu)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(DIS_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .page -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(VCS_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .vcvk -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(VCRT_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(TPR_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .txtgrp -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .layer -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(VCR_OBJECT_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .tdc -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .trd -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(TEMP_PATH_Visu)/tre.Trend_Temperature.vco' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(SCR_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	$(LINK) '$@.lfl' -o '$@' -p Visu -lib '$(LIB_LOCAL_OBJ_Visu)' -P '$(AS_PROJECT_PATH)' -m 'local objects' -profile 'False' -warningLevel2 -vcr 4725 -sfas
# 01 Module END

# 02 Module

DEL_TARGET02_LFL_Visu=$(TEMP_PATH_Visu)\Visu02.ccf.lfl
$(TEMP_PATH_Visu)/Visu02.ccf: $(LIB_SHARED) $(SHARED_CCF) $(LIB_BMP_RES_Visu) $(TEMP_PATH_Visu)/Visu03.ccf $(BDR_OBJECTS_Visu) $(LFNT_OBJECTS_Visu) $(CLM_OBJECTS_Visu)
	-@CMD /Q /C if exist "$(DEL_TARGET02_LFL_Visu)" DEL /F /Q "$(DEL_TARGET02_LFL_Visu)" 2>nul
	@$(VCFLGEN) '$@.lfl' '$(LIB_SHARED)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(LIB_BMP_RES_Visu)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(BDR_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(LFNT_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' '$(CLM_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	$(LINK) '$@.lfl' -o '$@' -p Visu -lib '$(LIB_LOCAL_RES_Visu)' -P '$(AS_PROJECT_PATH)' -m 'local resources' -profile 'False' -warningLevel2 -vcr 4725 -sfas
# 02 Module END

# 03 Module

DEL_TARGET03_LFL_Visu=$(TEMP_PATH_Visu)\Visu03.ccf.lfl
$(TEMP_PATH_Visu)/Visu03.ccf: $(LIB_SHARED) $(SHARED_CCF) $(BMGRP_OBJECTS_Visu) $(BMINFO_OBJECTS_Visu) $(PALFILE_Visu)
	-@CMD /Q /C if exist "$(DEL_TARGET03_LFL_Visu)" DEL /F /Q "$(DEL_TARGET03_LFL_Visu)" 2>nul
	@$(VCFLGEN) '$@.lfl' '$(LIB_SHARED)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .bmgrp -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .bminfo -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	$(LINK) '$@.lfl' -o '$@' -p Visu -lib '$(LIB_BMP_RES_Visu)' -P '$(AS_PROJECT_PATH)' -m 'bitmap resources' -profile 'False' -warningLevel2 -vcr 4725 -sfas
# 03 Module END

# Post Build Steps

.PHONY : vcPostBuild_Visu

vcPostBuild_Visu :
	$(VCC) -pb -vcm '$(TEMP_PATH_Visu)/MODULEFILES.vcm' -fw '$(VCFIRMWAREPATH)' $(VCCFLAGS_Visu) -p Visu -vcr 4725 -sfas

# Post Build Steps END
