#define _DEFAULT_INCLUDE
#include <bur\plctypes.h>
#include "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Alarmy/Mainst.h"
#line 1 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Alarmy/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Alarmy/Main.st"
void __BUR__ENTRY_INIT_FUNCT__(void){{


}}
#line 5 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Alarmy/Main.nodebug"
#line 7 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Alarmy/Main.st"
void _CYCLIC __BUR__ENTRY_CYCLIC_FUNCT__(void){{





















for((a=0);a<=100;a+=1){
*((char volatile*)&(Alarmy)) = *((char*)&(Alarmy));
if((((unsigned long)(unsigned char)Alarmy[a]==(unsigned long)(unsigned char)1))){
(NastalaPorucha=1);
}
}imp1_endfor0_0:;



if(NastalaPorucha){
(Vizu.ZobrazSymbolAlarmu=Blikac500ms);
}else{
(Vizu.ZobrazSymbolAlarmu=0);
}




if(PotvrdenieAlarmov){
brsmemset(((unsigned long)(&Alarmy)),0,101);
(NastalaPorucha=0);
(PoruchaBrusky=0);
(PoruchaRobota=0);
(Zariadenie.Majak_HukackaON=0);
if((Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR&Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ReadyToPower_ON)){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET=1);
}
(PotvrdenieAlarmov=0);
}



if((Safety.STAV.ZonaCS_AKTIVNA&~Edge0000100000&1?((Edge0000100000=Safety.STAV.ZonaCS_AKTIVNA&1),1):((Edge0000100000=Safety.STAV.ZonaCS_AKTIVNA&1),0))){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET=1);
}



if((Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR^1)){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET=0);
}else if(CasResetovaniaServa.Q){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET=0);
}



(CasResetovaniaServa.PT=2000);
(CasResetovaniaServa.IN=Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET);
TON(&CasResetovaniaServa);


if((Safety.STAV.SafetyPLC_Nabehlo&(Zariadenie.IN.PrepatovaOchrana_OK^1))){
(Alarmy[0]=1);
}



if((CasKontroly_Robota.Q&(StavHardware.Komunikacia_Robot_OK^1))){
(Alarmy[1]=1);
(PoruchaRobota=1);
}


(CasKontroly_Robota.PT=2000);
TON(&CasKontroly_Robota);


if(CasKontroly_KarietPLC.Q){
if((StavHardware.KartaAB1_ProfinetMaster_OK^1)){
(Alarmy[2]=1);
(PoruchaBrusky=1);
(PoruchaRobota=1);
}
if((StavHardware.KartaAB3_NapajanieCPU_OK^1)){
(Alarmy[3]=1);
(PoruchaBrusky=1);
(PoruchaRobota=1);
}
if((StavHardware.KartaAB4_SafetyMaster_OK^1)){
(Alarmy[4]=1);
(PoruchaBrusky=1);
(PoruchaRobota=1);
}
if((StavHardware.KartaAB5_16DI_OK^1)){
(Alarmy[5]=1);
(PoruchaBrusky=1);
(PoruchaRobota=1);
}
if((StavHardware.KartaAB6_16DI_OK^1)){
(Alarmy[6]=1);
(PoruchaBrusky=1);
(PoruchaRobota=1);
}
if((StavHardware.KartaAB7_16DO_OK^1)){
(Alarmy[7]=1);
(PoruchaBrusky=1);
(PoruchaRobota=1);
}
}


if((Safety.STAV.ZonaCS_AKTIVNA&(Zariadenie.STAV.Hardware_OK^1))){
(CasKontroly_KarietPLC.IN=1);
}else{
(CasKontroly_KarietPLC.IN=0);
}

(CasKontroly_KarietPLC.PT=2000);
TON(&CasKontroly_KarietPLC);



if(CasPoruchyServa.Q){
(Alarmy[8]=1);
(PoruchaBrusky=1);
}

(Bruska.OUT.Stav_PoruchaMotoraUpinacejHlavy=(CasPoruchyServa.Q^1));

if((Safety.STAV.ZonaCS_AKTIVNA&Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR)){
(CasPoruchyServa.IN=1);
}else{
(CasPoruchyServa.IN=0);
}


(CasPoruchyServa.PT=2000);
TON(&CasPoruchyServa);



if((~(((unsigned long)(unsigned char)Safety.STAV.CS_Robot_Odblokovany==(unsigned long)(unsigned char)1))&Edge0000100001&1?((Edge0000100001=(((unsigned long)(unsigned char)Safety.STAV.CS_Robot_Odblokovany==(unsigned long)(unsigned char)1))&1),1):((Edge0000100001=(((unsigned long)(unsigned char)Safety.STAV.CS_Robot_Odblokovany==(unsigned long)(unsigned char)1))&1),0))){
(Alarmy[13]=1);
*((char volatile*)&(PoruchaBrusky)) = *((char*)&(PoruchaBrusky));
*((char volatile*)&(PoruchaRobota)) = *((char*)&(PoruchaRobota));
}



if((~(((unsigned long)(unsigned char)Safety.STAV.CS_Pracovisko_Odblokovany==(unsigned long)(unsigned char)1))&Edge0000100002&1?((Edge0000100002=(((unsigned long)(unsigned char)Safety.STAV.CS_Pracovisko_Odblokovany==(unsigned long)(unsigned char)1))&1),1):((Edge0000100002=(((unsigned long)(unsigned char)Safety.STAV.CS_Pracovisko_Odblokovany==(unsigned long)(unsigned char)1))&1),0))){
(Alarmy[14]=1);
*((char volatile*)&(PoruchaBrusky)) = *((char*)&(PoruchaBrusky));
*((char volatile*)&(PoruchaRobota)) = *((char*)&(PoruchaRobota));
}



}imp1_else20_0:imp1_end20_0:;}
#line 176 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Alarmy/Main.nodebug"
#line 178 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Alarmy/Main.st"
void _EXIT __BUR__ENTRY_EXIT_FUNCT__(void){{


}}
#line 181 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Alarmy/Main.nodebug"

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
__asm__(".ascii \"iecfile \\\"Logical/Program/Alarmy/Types.typ\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Program/Alarmy/Variables.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Alarmy/Main.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"plcreplace \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Alarmy/Main.st.c\\\" \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Alarmy/Main.st\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Temp/Objects/Config1/AB2_CPU/Alarmy/Main.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".previous");

__asm__(".section \".plciec\"");
__asm__(".ascii \"plcdata_const 'Alarmy'\\n\"");
__asm__(".ascii \"plcdata_const 'PoruchaBrusky'\\n\"");
__asm__(".ascii \"plcdata_const 'PoruchaRobota'\\n\"");
__asm__(".previous");
