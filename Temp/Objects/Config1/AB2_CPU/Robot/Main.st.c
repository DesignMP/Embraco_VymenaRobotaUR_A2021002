#define _DEFAULT_INCLUDE
#include <bur\plctypes.h>
#include "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Robot/Mainst.h"
#line 1 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.st"
void __BUR__ENTRY_INIT_FUNCT__(void){{



}}
#line 6 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"
#line 8 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.st"
void _CYCLIC __BUR__ENTRY_CYCLIC_FUNCT__(void){{


(Robot.OUT.CisloAktualnejPozicie_Bit0=((_1byte_bit_field_*)(&Robot.PAR.CisloAktualnejPozicie))->bit0);
(Robot.OUT.CisloAktualnejPozicie_Bit1=((_1byte_bit_field_*)(&Robot.PAR.CisloAktualnejPozicie))->bit1);
(Robot.OUT.CisloAktualnejPozicie_Bit2=((_1byte_bit_field_*)(&Robot.PAR.CisloAktualnejPozicie))->bit2);
(Robot.OUT.CisloAktualnejPozicie_Bit3=((_1byte_bit_field_*)(&Robot.PAR.CisloAktualnejPozicie))->bit3);



(((_1byte_bit_field_*)(&Robot.PAR.CisloZadanejPozicie))->bit0=Robot.IN.CisloZadanejPozicie_Bit0);
(((_1byte_bit_field_*)(&Robot.PAR.CisloZadanejPozicie))->bit1=Robot.IN.CisloZadanejPozicie_Bit1);
(((_1byte_bit_field_*)(&Robot.PAR.CisloZadanejPozicie))->bit2=Robot.IN.CisloZadanejPozicie_Bit2);
(((_1byte_bit_field_*)(&Robot.PAR.CisloZadanejPozicie))->bit3=Robot.IN.CisloZadanejPozicie_Bit3);



































SequenceControl(&SC_Robot);


__AS__Action__ProfinetKomunikaciaRobot();
__AS__Action__OvladanieGripra();






if((Safety.STAV.ZonaCS_AKTIVNA^1)){
(SC_Robot.Step=0);
}else if((Safety.STAV.ZonaRobot_AKTIVNA^1)){
(SC_Robot.Step=0);
}else if(PoruchaRobota){
(SC_Robot.Step=0);
}else if(Robot.Reset){
(SC_Robot.Step=0);
(Robot.Reset=0);
}

switch(SC_Robot.Step){

case 0:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"0 - Nulovanie"; for(zzIndex=0; zzIndex<13l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(Robot.Automat=0);
(Robot.KoniecCyklu=0);
(Robot.Manual=0);
(Robot.Reset=0);
(Robot.STAV.PoINIT=0);
(SC_OvlGripra.Step=0);
(Robot.KOM_OUT.Bruska_OdoberCap=0);
(Robot.KOM_OUT.Bruska_VlozCap=0);
(Robot.KOM_OUT.Dopravnik_PolozCap=0);
(Robot.KOM_OUT.OdparkujRobota=0);
(Robot.KOM_OUT.Otacac_OdoberCap=0);
(Robot.KOM_OUT.Otacac_PolozCap=0);
(Robot.KOM_OUT.Paletka_OdoberCap=0);
(Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie=0);
(Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie=0);
(Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie=0);
(Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie=0);
(Robot.KOM_OUT.PP_na_Main=0);
(Robot.KOM_OUT.Reset_CS=0);
(Robot.KOM_OUT.StartProgramu=0);
(Robot.KOM_OUT.StartProgramuMain=0);
(Robot.KOM_OUT.VypniMotory=0);
(Robot.KOM_OUT.ZapniMotory=0);
(Robot.KOM_OUT.UkoncenieCykluRobota=0);
(Robot.KOM_OUT.ZahodenieKusu=0);
(Robot.OUT.VystupnyDopravnikNalozeny=0);
(Robot.KOM_OUT.Dopravnik_UkladaciaPozicia=1);
(Robot.RR_OdparkujRobota=0);
(Robot.KOM_OUT.ServisnaPozicia=0);
(Robot.PAR.CisloAktualnejPozicie=0);
(Taktime_Robot.CMD.START_Merania=0);
if((Robot.KOM_IN.Stav_RezimAUTOMAT&Robot.KOM_IN.Stav_ProgramRUN)){
(Robot.KOM_OUT.StopProgramu=1);
}else{
(Robot.KOM_OUT.StopProgramu=0);
}

if((Safety.STAV.ZonaCS_AKTIVNA&Safety.STAV.ZonaRobot_AKTIVNA&(PoruchaRobota^1)&(Robot.KOM_IN.Stav_ProgramRUN^1))){
(Robot.KOM_OUT.StopProgramu=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=1);
}

}break;case 1:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"1 - Cakam na spustenie vyroby"; for(zzIndex=0; zzIndex<29l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
if(Robot.Automat){
(SC_Robot.Step=2);
}else if(Robot.Manual){
(SC_Robot.Step=700);
}




}break;case 2:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"2 - Inicializacia - cakam na spustenie inicializacie"; for(zzIndex=0; zzIndex<52l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=500);
(SC_Robot.AlarmTime.PT=5000);

(SC_Robot.IdleTime.IN=1);
(Robot.PAR.CisloAktualnejPozicie=1);

if(SC_Robot.IdleTime.Q){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=3);
}

}break;case 3:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"2 - Inicializacia - kontrolujem central stop robota"; for(zzIndex=0; zzIndex<51l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=500);
(SC_Robot.AlarmTime.PT=5000);

if(Robot.KOM_IN.Stav_RobotCS){
(Robot.KOM_OUT.Reset_CS=1);
}

if((Robot.KOM_IN.Stav_RobotCS^1)){
(Robot.KOM_OUT.Reset_CS=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=4);
}


}break;case 4:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"4 - Inicializacia - zapinam motory robota"; for(zzIndex=0; zzIndex<41l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=500);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_MotoryON^1)){
(Robot.KOM_OUT.ZapniMotory=1);
}

if(Robot.KOM_IN.Stav_MotoryON){
(Robot.KOM_OUT.ZapniMotory=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=6);
}


}break;case 6:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"6 - Inicializacia - spustam program robota od zaciatku"; for(zzIndex=0; zzIndex<54l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=500);
(SC_Robot.AlarmTime.PT=5000);

if((SC_Robot.Switch1^1)){
(Robot.KOM_OUT.StartProgramuMain=1);
(SC_Robot.Switch1=1);
}

if((Robot.KOM_IN.Stav_ProgramRUN&Robot.KOM_IN.Stav_VystupyZresetovane&Robot.KOM_IN.Stav_RobotOdparkovany&(Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)&Robot.KOM_IN.Stav_ZonaNavratuRobota_OK)){
(Robot.KOM_OUT.StartProgramuMain=0);
(Robot.STAV.PoINIT=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=100);
}else if((Robot.KOM_IN.Stav_VystupyZresetovane&Robot.KOM_IN.Stav_ZonaNavratuRobota_NG)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=0);
}





}break;case 100:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"100 - Automaticky Rezim - cakam na signal presunu robota do cakacej pozície odobratia capu z paletky"; for(zzIndex=0; zzIndex<100l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);



if((Robot.KoniecCyklu&(Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie^1))){
(Robot.KOM_OUT.OdparkujRobota=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=105);
}else if(Robot.IN.NepouzivatRobota){
(Robot.KOM_OUT.ServisnaPozicia=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=103);
}else if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)2))&(Robot.KoniecCyklu^1)&Bruska.STAV.PoINIT&(Zariadenie.IN.RucnyRezimStarehoZariadenia^1))){
(Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie=1);
}else if((Zariadenie.IN.RucnyRezimStarehoZariadenia&(Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie^1))){
(Robot.KOM_OUT.OdparkujRobota=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=105);
}


if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie=0);
(Robot.PAR.CisloAktualnejPozicie=2);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=113);
}

}break;case 103:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"103 - Automaticky Rezim - cakam na ukoncenie presunu robota do servisnej polohy"; for(zzIndex=0; zzIndex<79l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.ServisnaPozicia=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=0);
}

}break;case 105:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"105 - Automaticky Rezim - cakam na ukoncenie odparkovania robota"; for(zzIndex=0; zzIndex<64l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.OdparkujRobota=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=0);
}




}break;case 113:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"113 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=115);
}

}break;case 115:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"115 - Automaticky Rezim - cakam na signal odober cap z paletky, snimac pritomnost kusu na paletke"; for(zzIndex=0; zzIndex<97l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);


if((Robot.KoniecCyklu&(Robot.KOM_OUT.Paletka_OdoberCap^1))){
(Robot.KOM_OUT.OdparkujRobota=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=116);
}else if(Robot.IN.NepouzivatRobota){
(Robot.KOM_OUT.ServisnaPozicia=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=103);
}else if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)3))&Zariadenie.IN.Paletka_PritomnostKusu_OS1&(Robot.KoniecCyklu^1)&(Zariadenie.IN.RucnyRezimStarehoZariadenia^1))){
if((SC_Robot.Switch1^1)){
if((Taktime_Robot.CMD.START_Merania^1)){
(Taktime_Robot.CMD.START_Merania=1);
}else{
(Taktime_Robot.CMD.ZAPIS_Hodnot=1);
}
(SC_Robot.Switch1=1);
}
(Robot.KOM_OUT.Paletka_OdoberCap=1);
}else if((Zariadenie.IN.RucnyRezimStarehoZariadenia&(Robot.KOM_OUT.Paletka_OdoberCap^1))){
(Robot.KOM_OUT.OdparkujRobota=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=105);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Paletka_OdoberCap=0);
(Robot.PAR.CisloAktualnejPozicie=3);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=118);
}else if(Robot.KOM_IN.Stav_PoruchaRobota){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=0);
}


}break;case 116:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"116 - Automaticky Rezim - cakam na ukoncenie odparkovania robota"; for(zzIndex=0; zzIndex<64l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.OdparkujRobota=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=0);
}




}break;case 118:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"118 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
if(Robot.KOM_IN.Stav_RobotOdparkovany){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=0);
}else{
(SC_Robot.ResetStep=1);
(SC_Robot.Step=125);
}
}



}break;case 125:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"125 - Automaticky Rezim - cakam na signal poloz cap do otacaca, snimac nepritomnosti kusu v otacaci"; for(zzIndex=0; zzIndex<99l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)4))&(Zariadenie.IN.Otacac_PritomnostKusu_IS2^1))){
(Robot.KOM_OUT.Otacac_PolozCap=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Otacac_PolozCap=0);
(Robot.PAR.CisloAktualnejPozicie=4);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=128);
}


}break;case 128:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"128 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=130);
}


}break;case 130:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"130 - Automaticky Rezim - cakam na signal odober cap z otacaca, snimac pritomnosti kusu v otacaci"; for(zzIndex=0; zzIndex<97l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)5))&Zariadenie.IN.Otacac_PritomnostKusu_IS2)){
(Robot.KOM_OUT.Otacac_OdoberCap=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Otacac_OdoberCap=0);
(Robot.PAR.CisloAktualnejPozicie=5);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=133);
}else if(Robot.KOM_IN.Stav_PoruchaRobota){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=0);
}

}break;case 133:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"133 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=135);
}

}break;case 135:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"135 - Automaticky Rezim - presun robota do cakacej pozície pred bruskou"; for(zzIndex=0; zzIndex<71l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((SC_Robot.Switch1^1)){
(Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie=1);
(SC_Robot.Switch1=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=138);
}

}break;case 138:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"138 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=140);
}


}break;case 140:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"140 - Automaticky Rezim - cakam na signal odober cap z brusky, snimac ochranny kryt otvoreny, vystup upinacia hlava zatvorena"; for(zzIndex=0; zzIndex<125l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)6))&Bruska.IN.OchrannyKrytBrusky_Otvoreny&(Bruska.IN.UpinaciaHlava_Otvorena^1)&(Zariadenie.IN.RucnyRezimStarehoZariadenia^1))){
(Robot.KOM_OUT.Bruska_OdoberCap=1);
}else if((Zariadenie.IN.RucnyRezimStarehoZariadenia&(Robot.KOM_OUT.Bruska_OdoberCap^1))){
(Robot.KOM_OUT.OdparkujRobota=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=105);
}

if(Robot.KOM_IN.Stav_RobotDrziHotovyCap){
(Robot.PAR.CisloAktualnejPozicie=6);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Bruska_OdoberCap=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=143);
}



}break;case 143:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"143 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=145);
}

}break;case 145:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"145 - Automaticky Rezim - cakam na signal vloz cap do brusky, snimac ochranny kryt otvoreny, vystup upinacia hlava otvorena"; for(zzIndex=0; zzIndex<123l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)7))&Bruska.IN.OchrannyKrytBrusky_Otvoreny&Bruska.IN.UpinaciaHlava_Otvorena)){
(Robot.KOM_OUT.Bruska_VlozCap=1);
}

if(Robot.KOM_IN.Stav_RobotVlozilNovyCap){
(Robot.PAR.CisloAktualnejPozicie=7);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Bruska_VlozCap=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=148);
}

}break;case 148:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"148 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=150);
}

}break;case 150:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"150 - Automaticky Rezim - cakam na signal presun robota do cakacej pozície pred dopravnikom, snimac ochranny kryt otvoreny"; for(zzIndex=0; zzIndex<122l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)8))&Bruska.IN.OchrannyKrytBrusky_Otvoreny)){
(Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie=0);
(Robot.PAR.CisloAktualnejPozicie=8);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=153);
}

}break;case 153:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"153 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=155);
}


}break;case 155:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"155 - Automaticky Rezim - cakam na signal vloz cap na dopravnik, snimac dopravnik napolohovany, vystup dopravnik zastaveny"; for(zzIndex=0; zzIndex<122l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)9))&Zariadenie.IN.VystupDoprav_Napolohovany&(Zariadenie.IN.VystupDoprav_Bezi^1))){
(Robot.KOM_OUT.Dopravnik_PolozCap=1);
}


if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Dopravnik_UkladaciaPozicia=(Robot.KOM_OUT.Dopravnik_UkladaciaPozicia+1));
if((((unsigned long)(unsigned char)Robot.KOM_OUT.Dopravnik_UkladaciaPozicia>(unsigned long)(unsigned char)5))){
(Robot.KOM_OUT.Dopravnik_UkladaciaPozicia=1);
(Robot.OUT.VystupnyDopravnikNalozeny=1);
}
(Robot.KOM_OUT.Dopravnik_PolozCap=0);
(Robot.PAR.CisloAktualnejPozicie=9);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=158);
}

}break;case 158:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"158 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=500);
(SC_Robot.AlarmTime.PT=5000);

(SC_Robot.IdleTime.IN=Robot.OUT.VystupnyDopravnikNalozeny);
if(SC_Robot.IdleTime.Q){
(Robot.OUT.VystupnyDopravnikNalozeny=0);
}

if(((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)&(Robot.OUT.VystupnyDopravnikNalozeny^1))){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=160);
}


}break;case 160:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"160 - Automaticky Rezim - cakam na signal presun k paletke alebo ukoncenie cyklu"; for(zzIndex=0; zzIndex<80l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)2))){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=100);
}else if((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)14))){
(Robot.KOM_OUT.Dopravnik_UkladaciaPozicia=1);
(Robot.PAR.CisloAktualnejPozicie=14);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=100);
}




}break;case 700:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"700 - Manualny rezim"; for(zzIndex=0; zzIndex<20l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=3000);
(SC_Robot.AlarmTime.PT=5000);




}break;}


}imp3_case1_28:imp3_endcase1_0:;}
#line 586 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"
#line 588 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.st"
void _EXIT __BUR__ENTRY_EXIT_FUNCT__(void){{


}}
#line 591 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/ProfinetKomunikaciaRobot.st"
static void __AS__Action__ProfinetKomunikaciaRobot(void){
{

(Robot.KOM_IN.Stav_RezimAUTOMAT=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[0]))->bit0);
(Robot.KOM_IN.Stav_ProgramRUN=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[0]))->bit1);
(Robot.KOM_IN.Stav_MotoryOFF=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[0]))->bit2);
(Robot.KOM_IN.Stav_MotoryON=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[0]))->bit3);
(Robot.KOM_IN.Stav_RobotCS=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[0]))->bit4);

(Robot.KOM_IN.Stav_RobotOdparkovany=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit0);
(Robot.KOM_IN.Stav_RobotCinnostUkoncena=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit1);
(Robot.KOM_IN.Stav_Dopravnik_Plny=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit2);
(Robot.KOM_IN.Stav_RobotDrziCap=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit3);
(Robot.KOM_IN.Gripper_OtvorDlhyUchopovac=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit4);
(Robot.KOM_IN.Gripper_OtvorKratkyUchopovac=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit5);
(Robot.KOM_IN.Stav_RobotVlozilNovyCap=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit6);
(Robot.KOM_IN.Stav_RobotDrziHotovyCap=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit7);

(Robot.KOM_IN.Stav_VystupyZresetovane=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[2]))->bit0);
(Robot.KOM_IN.Stav_ZonaNavratuRobota_NG=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[2]))->bit1);
(Robot.KOM_IN.Stav_ZonaNavratuRobota_OK=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[2]))->bit2);
(Robot.KOM_IN.Stav_PoruchaRobota=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[2]))->bit3);



(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0]))->bit0=Robot.KOM_OUT.VypniMotory);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0]))->bit1=Robot.KOM_OUT.ZapniMotory);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0]))->bit2=Robot.KOM_OUT.PP_na_Main);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0]))->bit3=Robot.KOM_OUT.StartProgramu);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0]))->bit4=Robot.KOM_OUT.StartProgramuMain);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0]))->bit5=Robot.KOM_OUT.StopProgramu);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0]))->bit6=Robot.KOM_OUT.Reset_CS);

(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1]))->bit0=Robot.KOM_OUT.OdparkujRobota);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1]))->bit1=Robot.KOM_OUT.Paletka_OdoberCap);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1]))->bit2=Robot.KOM_OUT.Otacac_PolozCap);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1]))->bit3=Robot.KOM_OUT.Otacac_OdoberCap);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1]))->bit4=Robot.KOM_OUT.Bruska_OdoberCap);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1]))->bit5=Robot.KOM_OUT.Bruska_VlozCap);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1]))->bit6=Robot.KOM_OUT.Dopravnik_PolozCap);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1]))->bit7=Robot.KOM_OUT.ServisnaPozicia);

(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit0=Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit1=Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit2=Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit3=Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit4=Robot.KOM_OUT.Gripper_DlhyUchopov_OTVORENY);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit5=Robot.KOM_OUT.Gripper_DlhyUchopov_DRZI_KUS);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit6=Robot.KOM_OUT.Gripper_KratkyUchopov_OTVORENY);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit7=Robot.KOM_OUT.Gripper_KratkyUchopov_DRZI_KUS);

(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3]))->bit0=Robot.KOM_OUT.UkoncenieCykluRobota);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3]))->bit1=Robot.KOM_OUT.Gripper_DlhyUchopov_PRAZDNY);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3]))->bit2=Robot.KOM_OUT.Gripper_KratkyUchopov_PRAZDNY);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3]))->bit3=Robot.KOM_OUT.UpinaciaHlava_Otvorena);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3]))->bit4=Robot.KOM_OUT.ZahodenieKusu);


(Robot.KOM_OUT.Profinet_PLC_OUTPUTS[4]=Robot.KOM_OUT.Dopravnik_UkladaciaPozicia);









}}
#line 593 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/OvladanieGripra.st"
static void __AS__Action__OvladanieGripra(void){
{



(Robot.KOM_OUT.Gripper_DlhyUchopov_OTVORENY=Robot.IN.DlhyUchopovac_Otvoreny_MS2);
(Robot.KOM_OUT.Gripper_DlhyUchopov_DRZI_KUS=Robot.IN.DlhyUchopovac_Zatvoreny_MS1);
(Robot.KOM_OUT.Gripper_DlhyUchopov_PRAZDNY=CasZatvorenia_DlhyUchopovac.Q);
(Robot.KOM_OUT.Gripper_KratkyUchopov_OTVORENY=Robot.IN.KratkyUchopovac_Otvoreny_MS4);
(Robot.KOM_OUT.Gripper_KratkyUchopov_DRZI_KUS=Robot.IN.KratkyUchopovac_Zatvoreny_MS3);
(Robot.KOM_OUT.Gripper_KratkyUchopov_PRAZDNY=CasZatvorenia_KratkyUchopovac.Q);



(CasZatvorenia_DlhyUchopovac.IN=((Robot.OUT.OtvorDlhyUchopovac_YV1^1)&(Robot.IN.DlhyUchopovac_Otvoreny_MS2^1)&(Robot.IN.DlhyUchopovac_Zatvoreny_MS1^1)));
(CasZatvorenia_DlhyUchopovac.PT=2000);
TON(&CasZatvorenia_DlhyUchopovac);

(CasZatvorenia_KratkyUchopovac.IN=((Robot.OUT.OtvorKratkyUchopovac_YV2^1)&(Robot.IN.KratkyUchopovac_Otvoreny_MS4^1)&(Robot.IN.KratkyUchopovac_Zatvoreny_MS3^1)));
(CasZatvorenia_KratkyUchopovac.PT=2000);
TON(&CasZatvorenia_KratkyUchopovac);





(Robot.OUT.OtvorDlhyUchopovac_YV1=Robot.KOM_IN.Gripper_OtvorDlhyUchopovac);
(Robot.OUT.OtvorKratkyUchopovac_YV2=Robot.KOM_IN.Gripper_OtvorKratkyUchopovac);






}}
#line 593 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"

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
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAxCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxisCfg.typ\\\" scope \\\"global\\\"\\n\"");
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
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.fun\\\" scope \\\"global\\\"\\n\"");
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
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpBase/MpBase.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/CoTrace/CoTrace.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Program/Robot/Types.typ\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Program/Robot/Variables.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Robot/Main.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"plcreplace \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Robot/Main.st.c\\\" \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.st\\\"\\n\"");
__asm__(".previous");
