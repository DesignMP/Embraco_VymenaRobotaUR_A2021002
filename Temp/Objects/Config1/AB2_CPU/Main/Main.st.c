#define _DEFAULT_INCLUDE
#include <bur\plctypes.h>
#include "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Main/Mainst.h"
#line 1 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.st"
void __BUR__ENTRY_INIT_FUNCT__(void){{

}}
#line 4 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.nodebug"
#line 6 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.st"
void _CYCLIC __BUR__ENTRY_CYCLIC_FUNCT__(void){{


__AS__Action__OvladanieSafety();











if((StavHardware.KartaAB1_ProfinetMaster_OK&StavHardware.KartaAB3_NapajanieCPU_OK&StavHardware.KartaAB4_SafetyMaster_OK&StavHardware.KartaAB5_16DI_OK&StavHardware.KartaAB6_16DI_OK&StavHardware.KartaAB7_16DO_OK)){
(Zariadenie.STAV.Hardware_OK=1);
}else{
(Zariadenie.STAV.Hardware_OK=0);
}





if(Zariadenie.STAV.Automat){
(Zariadenie.OUT.Majak_ZeleneSvetlo=1);
}else if(Zariadenie.STAV.Manual){
(Zariadenie.OUT.Majak_ZeleneSvetlo=Blikac500ms);
}else{
(Zariadenie.OUT.Majak_ZeleneSvetlo=0);
}


if((Zariadenie.STAV.Automat&(Zariadenie.STAV.PoINIT^1))){
(Zariadenie.OUT.Majak_ZlteSvetlo=Blikac500ms);
}else{
(Zariadenie.OUT.Majak_ZlteSvetlo=0);
}


if(NastalaPorucha){
(Zariadenie.OUT.Majak_CerveneSvetlo=1);
}else if((Safety.STAV.ZonaCS_AKTIVNA^1)){
(Zariadenie.OUT.Majak_CerveneSvetlo=1);
}else{
(Zariadenie.OUT.Majak_CerveneSvetlo=0);
}


if((NastalaPorucha&~Edge0000200000&1?((Edge0000200000=NastalaPorucha&1),1):((Edge0000200000=NastalaPorucha&1),0))){
(Zariadenie.Majak_HukackaON=1);
}

if(Zariadenie.Majak_HukackaON){
(Zariadenie.OUT.Majak_Hukacka=Blikac500ms);
}else{
(Zariadenie.OUT.Majak_Hukacka=0);
}





if(Zariadenie.KoniecCyklu){
if(Robot.Automat){
(Robot.KoniecCyklu=1);
}
if(Bruska.Automat){
(Bruska.KoniecCyklu=1);
}
(Zariadenie.KoniecCyklu=0);
}


if((PoruchaBrusky&(PoruchaRobota^1))){
if(Robot.Automat){
(Robot.KoniecCyklu=1);
}
}else if((PoruchaRobota&(PoruchaBrusky^1))){
if(Bruska.Automat){
(Bruska.KoniecCyklu=1);
}
}


if((Robot.KoniecCyklu|Bruska.KoniecCyklu)){
(Zariadenie.STAV.UkoncenieCyklu_BUSY=1);
}else{
(Zariadenie.STAV.UkoncenieCyklu_BUSY=0);
}




if(Zariadenie.Reset){
(Bruska.Reset=1);
(Robot.Reset=1);
(Zariadenie.Reset=0);
}



if(Vizu.TL_RezimAutomat){
if(Zariadenie.STAV.Manual){
(Zariadenie.Reset=1);
}
(Vizu.TL_RezimAutomat=0);
}



if(Zariadenie.Manual){
(Bruska.Manual=1);
(Robot.Manual=1);
(Zariadenie.Manual=0);
}



if((Bruska.Manual|Robot.Manual)){
(Zariadenie.STAV.Manual=1);
}else{
(Zariadenie.STAV.Manual=0);
}



if(Zariadenie.Automat){
(Bruska.Automat=1);
if((Safety.STAV.ZonaRobot_AKTIVNA&Robot.KOM_IN.Stav_RezimAUTOMAT)){
(Robot.Automat=1);
}
(Zariadenie.Automat=0);
}



if((Bruska.Automat|Robot.Automat)){
(Zariadenie.STAV.Automat=1);
}else{
(Zariadenie.STAV.Automat=0);
}


if((Bruska.STAV.PoINIT&(Robot.STAV.PoINIT|Robot.IN.NepouzivatRobota))){
(Zariadenie.STAV.PoINIT=1);
}else{
(Zariadenie.STAV.PoINIT=0);
}



if(((((unsigned long)(unsigned short)SC_Bruska.Step==(unsigned long)(unsigned short)1))&(((unsigned long)(unsigned short)SC_Robot.Step==(unsigned long)(unsigned short)1)))){
(Zariadenie.STAV.READY_TO_START=1);
}else{
(Zariadenie.STAV.READY_TO_START=0);
}










}imp2_end22_0:;}
#line 174 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.nodebug"
#line 176 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.st"
void _EXIT __BUR__ENTRY_EXIT_FUNCT__(void){{


}}
#line 179 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/OvladanieSafety.st"
static void __AS__Action__OvladanieSafety(void){
{

if((Safety.STAV.ZonaRobot_Odblokovana&(Safety.STAV.ZonaRobot_AKTIVNA^1)&Safety.SpatnaVazba_ZonaRobot)){
(Safety.RESET_ZonyRobot=1);
}else{
(Safety.RESET_ZonyRobot=0);
}


if((Safety.STAV.ZonaPracovisko_Odblokovana&(Safety.STAV.ZonaPracovisko_AKTIVNA^1)&Safety.SpatnaVazba_ZonaPracovisko)){
(Safety.RESET_ZonyPracovisko=1);
}else{
(Safety.RESET_ZonyPracovisko=0);
}




}imp16385_end1_0:;}
#line 181 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.nodebug"

void __AS__ImplInitMain_st(void){__BUR__ENTRY_INIT_FUNCT__();}

__asm__(".section \".plc\"");
__asm__(".ascii \"iecfile \\\"Logical/Global.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/DatumCasPLC/DatumCasGlobal.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/Runtime/runtime.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/astime/astime.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/standard/standard.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsBrStr/AsBrStr.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/FileIO/FileIO.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/sys_lib/sys_lib.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsSafety/AsSafety.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/DataObj/DataObj.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsXml/AsXml.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsZip/AsZip.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AxisLib/Types.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/SC/Types.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McBase/McBase.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McBase/McBaseCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAcpAx/McAcpAx.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAcpAx/McAcpAxCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxisCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAxCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpAxis/MpAxis.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpAxis/MpAxisError.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpBase/MpBase.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipe.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipeAlarm.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipeError.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/CoTrace/CoTrace.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/Runtime/runtime.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/Operator/operator.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsIecCon/AsIecCon.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/astime/astime.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/standard/standard.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsBrStr/AsBrStr.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/FileIO/FileIO.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/sys_lib/sys_lib.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsSafety/AsSafety.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/DataObj/DataObj.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsXml/AsXml.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsZip/AsZip.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AxisLib/AxisLib.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/SC/SC.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McBase/McBase.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAcpAx/McAcpAx.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpAxis/MpAxis.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpBase/MpBase.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipe.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/CoTrace/CoTrace.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Global.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/DatumCasPLC/DatumCasGlobal.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Temp/Includes/AS_TempDecl/Config1/GlobalComponents/McElements.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Temp/Includes/AS_TempDecl/Config1/GlobalComponents/MpComponents.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/Runtime/runtime.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/astime/astime.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/standard/standard.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsBrStr/AsBrStr.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/FileIO/FileIO.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/sys_lib/sys_lib.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsSafety/AsSafety.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/DataObj/DataObj.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsXml/AsXml.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsZip/AsZip.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AxisLib/Constants.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/SC/Constants.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McBase/McBase.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAcpAx/McAcpAx.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpBase/MpBase.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/CoTrace/CoTrace.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Program/Main/Types.typ\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Program/Main/Variables.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Main/Main.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"plcreplace \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Main/Main.st.c\\\" \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Main/Main.st\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Temp/Objects/Config1/AB2_CPU/Main/Main.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".previous");
