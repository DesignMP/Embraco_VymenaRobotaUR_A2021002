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
(Robot.PAR.CisloAktualnejPozicie=0);
(Robot.KOM_OUT.PocetNalozenychCapov=0);

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

if((Robot.KOM_IN.Stav_ProgramRUN&Robot.KOM_IN.Stav_VystupyZresetovane&Robot.KOM_IN.Stav_RobotOdparkovany&(Robot.KOM_IN.Stav_RobotCinnostUkoncena^1))){
(Robot.KOM_OUT.StartProgramuMain=0);
(Robot.STAV.PoINIT=1);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=100);
}





}break;case 100:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"100 - Automaticky Rezim - presun robota do cakacej pozície odobratia capu z paletky"; for(zzIndex=0; zzIndex<80l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((SC_Robot.Switch1^1)){
(Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie=1);
(SC_Robot.Switch1=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=103);
}

}break;case 103:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"103 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=105);
}

}break;case 105:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"105 - Automaticky Rezim - cakam na odobratie capu z paletky"; for(zzIndex=0; zzIndex<59l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)0))&Zariadenie.IN.Paletka_PritomnostKusu_OS1)){
(Robot.KOM_OUT.Paletka_OdoberCap=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Paletka_OdoberCap=0);
(Robot.PAR.CisloAktualnejPozicie=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=108);
}


}break;case 108:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"108 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=110);
}

}break;case 110:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"110 - Automaticky Rezim - presun robota do cakacej pozície pred otacacom"; for(zzIndex=0; zzIndex<72l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((SC_Robot.Switch1^1)){
(Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie=1);
(SC_Robot.Switch1=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=113);
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
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"115 - Automaticky Rezim - cakam na polozenia capu do otacaca"; for(zzIndex=0; zzIndex<60l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)0))&(Zariadenie.IN.Otacac_PritomnostKusu_IS2^1))){
(Robot.KOM_OUT.Otacac_PolozCap=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Otacac_PolozCap=0);
(Robot.PAR.CisloAktualnejPozicie=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=118);
}


}break;case 118:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"118 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=120);
}


}break;case 120:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"120 - Automaticky Rezim - cakam na odobratie capu z otacaca"; for(zzIndex=0; zzIndex<59l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)0))&Zariadenie.IN.Otacac_PritomnostKusu_IS2)){
(Robot.KOM_OUT.Otacac_OdoberCap=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Otacac_OdoberCap=0);
(Robot.PAR.CisloAktualnejPozicie=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=123);
}

}break;case 123:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"123 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=125);
}

}break;case 125:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"125 - Automaticky Rezim - presun robota do cakacej pozície pred bruskou"; for(zzIndex=0; zzIndex<71l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((SC_Robot.Switch1^1)){
(Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie=1);
(SC_Robot.Switch1=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie=0);
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
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"130 - Automaticky Rezim - cakam na odobratie capu z brusky"; for(zzIndex=0; zzIndex<58l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)0))&Zariadenie.IN.Otacac_PritomnostKusu_IS2)){
(Robot.KOM_OUT.Bruska_OdoberCap=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Bruska_OdoberCap=0);
(Robot.PAR.CisloAktualnejPozicie=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=133);
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
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"135 - Automaticky Rezim - cakam na vlozenie capu do brusky"; for(zzIndex=0; zzIndex<58l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if(((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)0))&Zariadenie.IN.Otacac_PritomnostKusu_IS2)){
(Robot.KOM_OUT.Bruska_VlozCap=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Bruska_VlozCap=0);
(Robot.PAR.CisloAktualnejPozicie=0);
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
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"140 - Automaticky Rezim - presun robota do cakacej pozície pred dopravnikom"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((SC_Robot.Switch1^1)){
(Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie=1);
(SC_Robot.Switch1=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie=0);
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
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"145 - Automaticky Rezim - cakam na vlozenie capu na dopravnik"; for(zzIndex=0; zzIndex<61l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((((unsigned long)(unsigned char)Robot.PAR.CisloZadanejPozicie==(unsigned long)(unsigned char)0))){
(Robot.KOM_OUT.Dopravnik_PolozCap=1);
}

if(Robot.KOM_IN.Stav_RobotCinnostUkoncena){
(Robot.KOM_OUT.Dopravnik_PolozCap=0);
(Robot.PAR.CisloAktualnejPozicie=0);
(SC_Robot.ResetStep=1);
(SC_Robot.Step=148);
}

}break;case 148:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"148 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena"; for(zzIndex=0; zzIndex<75l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=200);
(SC_Robot.AlarmTime.PT=5000);

if((Robot.KOM_IN.Stav_RobotCinnostUkoncena^1)){
(SC_Robot.ResetStep=1);
(SC_Robot.Step=100);
}








}break;case 700:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Robot.StepName; plcstring* zzRValue=(plcstring*)"700 - Manualny rezim"; for(zzIndex=0; zzIndex<20l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Robot.IdleTime.PT=3000);
(SC_Robot.AlarmTime.PT=5000);




}break;}


}imp3_case1_26:imp3_endcase1_0:;}
#line 445 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"
#line 447 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.st"
void _EXIT __BUR__ENTRY_EXIT_FUNCT__(void){{


}}
#line 450 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"
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
(Robot.KOM_IN.Gripper_ZatvorDlhyUchopovac=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit5);
(Robot.KOM_IN.Gripper_OtvorKratkyUchopovac=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit6);
(Robot.KOM_IN.Gripper_ZatvorKratkyUchopovac=((_1byte_bit_field_*)(&Robot.KOM_IN.Profinet_PLC_INPUTS[1]))->bit7);




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

(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit0=Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit1=Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit2=Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit3=Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit4=Robot.KOM_OUT.Gripper_DlhyUchopov_OTVORENY);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit5=Robot.KOM_OUT.Gripper_DlhyUchopov_ZATVORENY);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit6=Robot.KOM_OUT.Gripper_KratkyUchopov_OTVORENY);
(((_1byte_bit_field_*)(&Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2]))->bit7=Robot.KOM_OUT.Gripper_KratkyUchopov_ZATVORENY);



(Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3]=Robot.KOM_OUT.PocetNalozenychCapov);




}}
#line 452 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/OvladanieGripra.st"
static void __AS__Action__OvladanieGripra(void){
{

SequenceControl(&SC_OvlGripra);


switch(SC_OvlGripra.Step){

case 0:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlGripra.StepName; plcstring* zzRValue=(plcstring*)"0 - Nulovanie"; for(zzIndex=0; zzIndex<13l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(Robot.RR_OtvorDlhyUchopovac=0);
(Robot.RR_ZatvorDlhyUchopovac=0);
(Robot.RR_OtvorKratkyUchopovac=0);
(Robot.RR_ZatvorKratkyUchopovac=0);

if((((unsigned long)(unsigned short)SC_Robot.Step!=(unsigned long)(unsigned short)0))){
(SC_OvlGripra.ResetStep=1);
(SC_OvlGripra.Step=1);
}


}break;case 1:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlGripra.StepName; plcstring* zzRValue=(plcstring*)"1 - Rozhodnutie o cinnosti"; for(zzIndex=0; zzIndex<26l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
if(Robot.RR_OtvorDlhyUchopovac){
(SC_OvlGripra.Step=10);
}else if(Robot.RR_ZatvorDlhyUchopovac){
(SC_OvlGripra.Step=20);
}else if(Robot.RR_OtvorKratkyUchopovac){
(SC_OvlGripra.Step=30);
}else if(Robot.RR_ZatvorKratkyUchopovac){
(SC_OvlGripra.Step=40);
}else if((Robot.Robot_OtvorDlhyUchopovac&~Edge1638500000&1?((Edge1638500000=Robot.Robot_OtvorDlhyUchopovac&1),1):((Edge1638500000=Robot.Robot_OtvorDlhyUchopovac&1),0))){
(SC_OvlGripra.Step=10);
}else if((Robot.Robot_ZatvorDlhyUchopovac&~Edge1638500001&1?((Edge1638500001=Robot.Robot_ZatvorDlhyUchopovac&1),1):((Edge1638500001=Robot.Robot_ZatvorDlhyUchopovac&1),0))){
(SC_OvlGripra.Step=20);
}else if((Robot.Robot_OtvorKratkyUchopovac&~Edge1638500002&1?((Edge1638500002=Robot.Robot_OtvorKratkyUchopovac&1),1):((Edge1638500002=Robot.Robot_OtvorKratkyUchopovac&1),0))){
(SC_OvlGripra.Step=30);
}else if((Robot.Robot_ZatvorKratkyUchopovac&~Edge1638500003&1?((Edge1638500003=Robot.Robot_ZatvorKratkyUchopovac&1),1):((Edge1638500003=Robot.Robot_ZatvorKratkyUchopovac&1),0))){
(SC_OvlGripra.Step=40);
}


}break;case 10:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlGripra.StepName; plcstring* zzRValue=(plcstring*)"10 - Otvorenie dlheho uchopovaca na gripri robota"; for(zzIndex=0; zzIndex<49l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlGripra.IdleTime.PT=3000);
(SC_OvlGripra.AlarmTime.PT=3000);

if(Robot.Automat){
(SC_OvlGripra.AlarmTime.IN=1);
}else{
(SC_OvlGripra.IdleTime.IN=1);
}

if((SC_OvlGripra.Switch1^1)){
(Robot.OUT.ZatvorDlhyUchopovac_YV1=0);
(SC_OvlGripra.Switch1=1);
}

if((Robot.IN.DlhyUchopovac_Otvoreny_MS2|SC_OvlGripra.IdleTime.Q)){
(SC_OvlGripra.ResetStep=1);
(SC_OvlGripra.Step=0);
}else if(SC_OvlGripra.AlarmTime.Q){
(Alarmy[9]=1);
(PoruchaRobota=1);
}


}break;case 20:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlGripra.StepName; plcstring* zzRValue=(plcstring*)"20 - Zatvorenie dlheho uchopovaca na gripri robota"; for(zzIndex=0; zzIndex<50l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlGripra.IdleTime.PT=3000);
(SC_OvlGripra.AlarmTime.PT=3000);

(SC_OvlGripra.IdleTime.IN=(Robot.IN.DlhyUchopovac_Otvoreny_MS2^1));
(SC_OvlGripra.AlarmTime.IN=Robot.IN.DlhyUchopovac_Otvoreny_MS2);

if((SC_OvlGripra.Switch1^1)){
(Robot.OUT.ZatvorDlhyUchopovac_YV1=1);
(SC_OvlGripra.Switch1=1);
}

if((Robot.IN.DlhyUchopovac_Zatvoreny_MS1|SC_OvlGripra.IdleTime.Q)){
(SC_OvlGripra.ResetStep=1);
(SC_OvlGripra.Step=0);
}else if(SC_OvlGripra.AlarmTime.Q){
(Alarmy[10]=1);
(PoruchaRobota=1);
}

}break;case 30:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlGripra.StepName; plcstring* zzRValue=(plcstring*)"30 - Otvorenie kratkeho uchopovaca na gripri robota"; for(zzIndex=0; zzIndex<51l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlGripra.IdleTime.PT=3000);
(SC_OvlGripra.AlarmTime.PT=3000);

if(Robot.Automat){
(SC_OvlGripra.AlarmTime.IN=1);
}else{
(SC_OvlGripra.IdleTime.IN=1);
}

if((SC_OvlGripra.Switch1^1)){
(Robot.OUT.ZatvorKratkyUchopovac_YV2=0);
(SC_OvlGripra.Switch1=1);
}

if((Robot.IN.KratkyUchopovac_Otvoreny_MS4|SC_OvlGripra.IdleTime.Q)){
(SC_OvlGripra.ResetStep=1);
(SC_OvlGripra.Step=0);
}else if(SC_OvlGripra.AlarmTime.Q){
(Alarmy[11]=1);
(PoruchaRobota=1);
}


}break;case 40:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlGripra.StepName; plcstring* zzRValue=(plcstring*)"40 - Zatvorenie kratkeho uchopovaca na gripri robota"; for(zzIndex=0; zzIndex<52l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlGripra.IdleTime.PT=3000);
(SC_OvlGripra.AlarmTime.PT=3000);

(SC_OvlGripra.IdleTime.IN=(Robot.IN.KratkyUchopovac_Otvoreny_MS4^1));
(SC_OvlGripra.AlarmTime.IN=Robot.IN.KratkyUchopovac_Otvoreny_MS4);

if((SC_OvlGripra.Switch1^1)){
(Robot.OUT.ZatvorKratkyUchopovac_YV2=1);
(SC_OvlGripra.Switch1=1);
}

if((Robot.IN.KratkyUchopovac_Zatvoreny_MS3|SC_OvlGripra.IdleTime.Q)){
(SC_OvlGripra.ResetStep=1);
(SC_OvlGripra.Step=0);
}else if(SC_OvlGripra.AlarmTime.Q){
(Alarmy[12]=1);
(PoruchaRobota=1);
}


}break;}






}imp16385_case0_5:imp16385_endcase0_0:;}
#line 452 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Robot/Main.nodebug"

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
__asm__(".ascii \"iecfile \\\"Temp/Objects/Config1/AB2_CPU/Robot/Main.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".previous");
