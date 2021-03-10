export AS_SYSTEM_PATH := C:/BrAutomation/AS/System
export AS_BIN_PATH := C:/BrAutomation/AS47/bin-en
export AS_INSTALL_PATH := C:/BrAutomation/AS47
export AS_PATH := C:/BrAutomation/AS47
export AS_VC_PATH := C:/BrAutomation/AS47/AS/VC
export AS_GNU_INST_PATH := C:/BrAutomation/AS47/AS/GnuInst/V6.3.0
export AS_STATIC_ARCHIVES_PATH := D:/Projekty\ BER/Embraco_VymenaRobotaUR_A2021002/Temp/Archives/Config1/AB2_CPU
export AS_CPU_PATH := D:/Projekty\ BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU
export AS_CPU_PATH_2 := D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU
export AS_TEMP_PATH := D:/Projekty\ BER/Embraco_VymenaRobotaUR_A2021002/Temp
export AS_BINARIES_PATH := D:/Projekty\ BER/Embraco_VymenaRobotaUR_A2021002/Binaries
export AS_PROJECT_CPU_PATH := D:/Projekty\ BER/Embraco_VymenaRobotaUR_A2021002/Physical/Config1/AB2_CPU
export AS_PROJECT_CONFIG_PATH := D:/Projekty\ BER/Embraco_VymenaRobotaUR_A2021002/Physical/Config1
export AS_PROJECT_PATH := D:/Projekty\ BER/Embraco_VymenaRobotaUR_A2021002
export AS_PROJECT_NAME := VymenaRobotaUR
export AS_PLC := AB2_CPU
export AS_TEMP_PLC := AB2_CPU
export AS_USER_NAME := Martin\ Dvorscak
export AS_CONFIGURATION := Config1
export AS_COMPANY_NAME := \ 
export AS_VERSION := 4.7.5.60\ SP


default: \
	$(AS_CPU_PATH)/Visu.br \



include $(AS_CPU_PATH)/Visu/Visu.mak
