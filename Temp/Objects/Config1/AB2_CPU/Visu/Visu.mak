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
VCFIRMWARE=4.72.2
VCFIRMWAREPATH=$(AS_VC_PATH)/Firmware/V4.72.2/SG4
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
DEFAULT_STYLE_SHEET_Visu='Source[local].StyleSheet[Color]'
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
	$(VCHWPP) -f '$(PANEL_HW_SOURCE_Visu)' -o '$(subst .vco,.vci,$(TEMP_PATH_Visu)/dis.PS2-Keyboard.vco)' -n Visu -d Visu -pal '$(PALFILE_Visu)' -c '$(AS_CONFIGURATION)' -p '$(AS_PLC)' -ptemp '$(AS_TEMP_PLC)' -B 'C4.73' -L '' -hw '$(CPUHWC)' -warninglevel 2 -so $(VC_STATIC_OPTIONS_Visu) -sos $(VC_STATIC_OPTIONS_Shared) -keyboard '$(AS_PROJECT_PATH)/Physical/Config1/AB2_CPU/VC/PS2-Keyboard.dis' -fp '$(AS_VC_PATH)/Firmware/V4.72.2/SG4' -prj '$(AS_PROJECT_PATH)' -apj 'VymenaRobotaUR' -sfas -vcob '$(VCOBJECT_Visu)'
	$(VCC) -f '$(subst .vco,.vci,$@)' -o '$@' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -k '$(VCVK_SOURCES_Visu)' $(VCCFLAGS_Visu) -p Visu -sfas

KEYMAP_SOURCES_Visu=$(AS_PROJECT_PATH)/Physical/Config1/AB2_CPU/VC/PS2-Keyboard.dis 
KEYMAP_OBJECTS_Visu=$(TEMP_PATH_Visu)/dis.PS2-Keyboard.vco 

# All Source Objects
FNINFO_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Fonts/DefaultFont.fninfo 

PAGE_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/PageEmpty.page 

VCS_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/StyleSheets/Color.vcs 

TDC_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/TrendData.tdc 

VCVK_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/VirtualKeys.vcvk 

VCR_SOURCES_Visu=$(AS_PROJECT_PATH)/Logical/HMI/Visu/Palette.vcr 

# Runtime Object sources
VCR_OBJECT_Visu=$(TEMP_PATH_Visu)/vcrt.vco
VCR_SOURCE_Visu=$(SRC_PATH_Visu)/package.vcp
# All Source Objects END

#Panel Hardware
$(PANEL_HW_VCI_Visu): $(PANEL_HW_SOURCE_Visu) $(VC_LIBRARY_LIST_Visu) $(KEYMAP_SOURCES_Visu) $(PALFILE_Visu)
	$(VCHWPP) -f '$<' -o '$@' -n Visu -d Visu -pal '$(PALFILE_Visu)' -c '$(AS_CONFIGURATION)' -p '$(AS_PLC)' -ptemp '$(AS_TEMP_PLC)' -B 'C4.73' -L '' -verbose 'False' -profile 'False' -hw '$(CPUHWC)' -warninglevel 2 -so $(VC_STATIC_OPTIONS_Visu) -sos $(VC_STATIC_OPTIONS_Shared) -fp '$(AS_VC_PATH)/Firmware/V4.72.2/SG4' -sfas -prj '$(AS_PROJECT_PATH)' -apj 'VymenaRobotaUR' -vcob '$(VCOBJECT_Visu)'

$(PANEL_HW_OBJECT_Visu): $(PANEL_HW_VCI_Visu) $(VC_LIBRARY_LIST_Visu)
	$(VCC) -f '$(subst .vco,.vci,$@)' -o '$@' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -k '$(VCVK_SOURCES_Visu)' $(VCCFLAGS_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4722 -sfas


# Pages
PAGE_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/page., $(notdir $(PAGE_SOURCES_Visu:.page=.vco)))

$(TEMP_PATH_Visu)/page.PageEmpty.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Pages/PageEmpty.page $(VC_LANGUAGES_Visu)
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds '$(SRC_PATH_Visu)/StyleSheets/Color.vcs' -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4722 -sfas


#Pages END




# Stylesheets
VCS_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/vcs., $(notdir $(VCS_SOURCES_Visu:.vcs=.vco)))

$(TEMP_PATH_Visu)/vcs.Color.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/StyleSheets/Color.vcs
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu) -P '$(AS_PROJECT_PATH)' -ds $(DEFAULT_STYLE_SHEET_Visu) -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4722 -sfas


#Stylesheets END




# Virtual Keys
VCVK_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/vcvk., $(notdir $(VCVK_SOURCES_Visu:.vcvk=.vco)))

$(TEMP_PATH_Visu)/vcvk.VirtualKeys.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/VirtualKeys.vcvk
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4722 -sfas

$(VCVK_OBJECTS_Visu): $(VC_LANGUAGES_Visu)

#Virtual Keys END




# Trend Data Configuration
TDC_OBJECTS_Visu = $(addprefix $(TEMP_PATH_Visu)/tdc., $(notdir $(TDC_SOURCES_Visu:.tdc=.vco)))

$(TEMP_PATH_Visu)/tdc.TrendData.vco: $(AS_PROJECT_PATH)/Logical/HMI/Visu/Trends/TrendData.tdc
	 $(VCC) -f '$<' -o '$@' -l '$(AS_PROJECT_PATH)/Logical/VCShared/Languages.vcr' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -pal '$(PALFILE_Visu)' $(VCCFLAGS_Visu)  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4722 -sfas


#Trend Data Configuration END


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
	$(VCC) -f '$<' -o '$@' -cv '$(AS_PROJECT_PATH)/Logical/VCShared/ControlVersion.cvinfo' -sl en $(VCCFLAGS_Visu) -rt  -p Visu -so $(VC_STATIC_OPTIONS_Visu) -vcr 4722 -sfas
# Local resources Library rules
LIB_LOCAL_RES_Visu=$(TEMP_PATH_Visu)/localres.vca
$(LIB_LOCAL_RES_Visu) : $(TEMP_PATH_Visu)/Visu02.ccf

BUILD_FILE_Visu=$(TEMP_PATH_Visu)/BuildFiles.arg
$(BUILD_FILE_Visu) : BUILD_FILE_CLEAN_Visu $(BUILD_SOURCES_Visu)
BUILD_FILE_CLEAN_Visu:
	$(RM) /F /Q '$(BUILD_FILE_Visu)' 2>nul
#All Modules depending to this project
PROJECT_MODULES_Visu=$(AS_CPU_PATH)/Visu01.br $(AS_CPU_PATH)/Visu02.br $(FONT_MODULES_Visu) $(SHARED_MODULE)

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
	@$(VCFLGEN) '$@.lfl' '$(SCR_OBJECTS_Visu:.vco=.vco|)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	$(LINK) '$@.lfl' -o '$@' -p Visu -lib '$(LIB_LOCAL_OBJ_Visu)' -P '$(AS_PROJECT_PATH)' -m 'local objects' -profile 'False' -warningLevel2 -vcr 4722 -sfas
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
	$(LINK) '$@.lfl' -o '$@' -p Visu -lib '$(LIB_LOCAL_RES_Visu)' -P '$(AS_PROJECT_PATH)' -m 'local resources' -profile 'False' -warningLevel2 -vcr 4722 -sfas
# 02 Module END

# 03 Module

DEL_TARGET03_LFL_Visu=$(TEMP_PATH_Visu)\Visu03.ccf.lfl
$(TEMP_PATH_Visu)/Visu03.ccf: $(LIB_SHARED) $(SHARED_CCF) $(BMGRP_OBJECTS_Visu) $(BMINFO_OBJECTS_Visu) $(PALFILE_Visu)
	-@CMD /Q /C if exist "$(DEL_TARGET03_LFL_Visu)" DEL /F /Q "$(DEL_TARGET03_LFL_Visu)" 2>nul
	@$(VCFLGEN) '$@.lfl' '$(LIB_SHARED)' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .bmgrp -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	@$(VCFLGEN) '$@.lfl' -mask .bminfo -vcp '$(AS_PROJECT_PATH)/Logical/HMI/Visu/Package.vcp' -temp '$(TEMP_PATH_Visu)' -prj '$(PRJ_PATH_Visu)' -sfas
	$(LINK) '$@.lfl' -o '$@' -p Visu -lib '$(LIB_BMP_RES_Visu)' -P '$(AS_PROJECT_PATH)' -m 'bitmap resources' -profile 'False' -warningLevel2 -vcr 4722 -sfas
# 03 Module END

