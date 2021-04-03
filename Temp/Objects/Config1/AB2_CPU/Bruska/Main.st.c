#define _DEFAULT_INCLUDE
#include <bur\plctypes.h>
#include "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Bruska/Mainst.h"
#line 1 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.st"
void __BUR__ENTRY_INIT_FUNCT__(void){{

(Bruska.PAR.Servo_JoggRychlost=5);























}}
#line 28 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.nodebug"
#line 30 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.st"
void _CYCLIC __BUR__ENTRY_CYCLIC_FUNCT__(void){{


SequenceControl(&SC_Bruska);


__AS__Action__OvlServa();


if((Safety.STAV.ZonaCS_AKTIVNA^1)){
(SC_Bruska.Step=0);
}else if(PoruchaBrusky){
(SC_Bruska.Step=0);
}else if(Bruska.Reset){
(SC_Bruska.Step=0);
(Bruska.Reset=0);
}


if((Bruska.Reset&~Edge0000200000&1?((Edge0000200000=Bruska.Reset&1),1):((Edge0000200000=Bruska.Reset&1),0))){
(Bruska.Servo_STOP=1);
}


switch(SC_Bruska.Step){


case 0:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"0 - Nulovanie"; for(zzIndex=0; zzIndex<13l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlServa.Step=0);
(Bruska.Automat=0);
(Bruska.KoniecCyklu=0);
(Bruska.Manual=0);
(Bruska.STAV.PoINIT=0);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggLimit_ACTIVE=0);
(Bruska.STAV.Servo_PoziciaDosiahnuta=0);
(Bruska.OUT.Stav_UpinaciaHlavaSaOtacaVPRED=0);
(Bruska.OUT.Stav_PoruchaMotoraUpinacejHlavy=0);

if((Safety.STAV.ZonaCS_AKTIVNA&(PoruchaBrusky^1)&Bruska.STAV.ServoREADY)){
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=1);
}

}break;case 1:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"1 - Cakam na spustenie vyroby"; for(zzIndex=0; zzIndex<29l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
if(Bruska.Automat){
(SC_Bruska.Step=2);
}else if(Bruska.Manual){
(SC_Bruska.Step=700);
}




}break;case 2:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"2 - Inicializacia - cakam na spustenie inicializacie"; for(zzIndex=0; zzIndex<52l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=500);
(SC_Bruska.AlarmTime.PT=5000);

(SC_Bruska.IdleTime.IN=(Robot.STAV.PoINIT|Robot.IN.NepouzivatRobota));

if(SC_Bruska.IdleTime.Q){
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=10);
}



}break;case 10:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"10 - Inicializacia - spustam homing serva otacania upinacej hlavy"; for(zzIndex=0; zzIndex<65l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=1000);
(SC_Bruska.AlarmTime.PT=5000);



if((SC_Bruska.Switch1^1)){
(Bruska.Servo_HOME_SWITCH=1);
(SC_Bruska.IdleTime.IN=1);
(SC_Bruska.Switch1=1);
}

if((Bruska.STAV.Servo_HomingOK&SC_Bruska.IdleTime.Q)){
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=13);
}





}break;case 13:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"13 - Inicializacia - otocenie upinacej hlavy do vychodiskovej pozicie"; for(zzIndex=0; zzIndex<69l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=2000);
(SC_Bruska.AlarmTime.PT=5000);

(Bruska.PAR.Servo_RychlostPolohovania=100);
(Bruska.PAR.Servo_PoziciaNatocenia=RemPremenne.Bruska_VychodziaPoziciaNatocenia);



if(((SC_Bruska.Switch1^1)&(((unsigned long)(unsigned short)SC_OvlServa.Step==(unsigned long)(unsigned short)1)))){
(Bruska.Servo_POLOHUJ=1);
(SC_Bruska.Switch1=1);
}



if(Bruska.STAV.Servo_PoziciaDosiahnuta){
(Bruska.STAV.Servo_PoziciaDosiahnuta=0);
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=15);
}

}break;case 15:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"15 - Inicializacia - vynulovanie pozicie natocenia upinacej hlavy"; for(zzIndex=0; zzIndex<65l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=2000);
(SC_Bruska.AlarmTime.PT=5000);


if(((SC_Bruska.Switch1^1)&(((unsigned long)(unsigned short)SC_OvlServa.Step==(unsigned long)(unsigned short)1)))){
(Bruska.Servo_HOME_DIRECT=1);
(SC_Bruska.Switch1=1);
}

if((Bruska.STAV.Servo_HomingOK&((Bruska.STAV.Servo_AktualnaPozicia==0)))){
(Bruska.OUT.Stav_UpinaciaHlavaSaOtacaVPRED=0);
(Bruska.STAV.PoINIT=1);
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=100);
}








}break;case 100:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"100 - Automaticky Rezim - cakam na spustenie otacania upinacej hlavy"; for(zzIndex=0; zzIndex<68l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=200);
(SC_Bruska.AlarmTime.PT=5000);

(Bruska.PAR.Servo_RychlostPolohovania=(RemPremenne.Bruska_RychlosOtacania*4.50000000000000000000E+00));

if((Bruska.IN.UpinaciaHlava_OtacanieVPRED&(((unsigned long)(unsigned short)SC_OvlServa.Step==(unsigned long)(unsigned short)1)))){
(Bruska.Servo_MOVE=1);
(Bruska.OUT.Stav_UpinaciaHlavaSaOtacaVPRED=1);
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=103);
}else if((Bruska.KoniecCyklu&(Robot.Automat^1))){
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=0);
}

}break;case 103:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"103 - Automaticky Rezim - cakam na zastavenie otacania upinacej hlavy"; for(zzIndex=0; zzIndex<69l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=200);
(SC_Bruska.AlarmTime.PT=5000);


if((Bruska.IN.UpinaciaHlava_OtacanieVPRED^1)){
(Bruska.Servo_MOVE=0);
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=105);
}


}break;case 105:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"105 - Automaticky Rezim - napolohovanie na nasobok vychodzej pozicie natocenia upinacej hlavy"; for(zzIndex=0; zzIndex<80l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=200);
(SC_Bruska.AlarmTime.PT=5000);


if(((SC_Bruska.Switch1^1)&(((unsigned long)(unsigned short)SC_OvlServa.Step==(unsigned long)(unsigned short)1)))){
(Bruska.STAV.Servo_AktualnyPocetOtacok=(Bruska.STAV.Servo_AktualnaPozicia/360));
(AktualnyPocetOtacokINT=(((signed long)(Bruska.STAV.Servo_AktualnyPocetOtacok))+10));
(AktualnyPocetOtacokLREAL=(double)AktualnyPocetOtacokINT);
(Bruska.PAR.Servo_PoziciaNatocenia=(AktualnyPocetOtacokLREAL*360));
(Bruska.PAR.Servo_RychlostPolohovania=(RemPremenne.Bruska_RychlosOtacania*4.50000000000000000000E+00));
(Bruska.Servo_POLOHUJ=1);
(SC_Bruska.Switch1=1);
}

if(Bruska.STAV.Servo_PoziciaDosiahnuta){
(Bruska.STAV.Servo_PoziciaDosiahnuta=0);
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=108);
}


}break;case 108:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"108 - Automaticky Rezim - vynulovanie pozicie natocenia upinacej hlavy"; for(zzIndex=0; zzIndex<70l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=200);
(SC_Bruska.AlarmTime.PT=5000);


if(((SC_Bruska.Switch1^1)&(((unsigned long)(unsigned short)SC_OvlServa.Step==(unsigned long)(unsigned short)1)))){
(Bruska.Servo_HOME_DIRECT=1);
(SC_Bruska.Switch1=1);
}

if((Bruska.STAV.Servo_HomingOK&((Bruska.STAV.Servo_AktualnaPozicia==0)))){
(Bruska.OUT.Stav_UpinaciaHlavaSaOtacaVPRED=0);
(SC_Bruska.ResetStep=1);
(SC_Bruska.Step=100);
}







}break;case 700:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_Bruska.StepName; plcstring* zzRValue=(plcstring*)"700 - Manualny Rezim"; for(zzIndex=0; zzIndex<20l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_Bruska.IdleTime.PT=8000);
(SC_Bruska.AlarmTime.PT=5000);



}break;}

}imp2_case2_10:imp2_endcase2_0:;}
#line 254 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.nodebug"
#line 256 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.st"
void _EXIT __BUR__ENTRY_EXIT_FUNCT__(void){{


}}
#line 259 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.nodebug"
#line 2 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/OvlServa.st"
static void __AS__Action__OvlServa(void){
{






if(Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Communication_READY){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ENABLE=1);
}else{
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ENABLE=0);
}



(CasPowerON.IN=(Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ReadyToPower_ON&Bruska.STAV.Servo_LimitneSnimaceBUSY&Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.EnableSwitch_ACTIVE&(Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR^1)));
if(CasPowerON.Q){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.POWER=1);
}else{
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.POWER=0);
}

(CasPowerON.PT=1000);
TON(&CasPowerON);











(Bruska.STAV.Servo_AktualnaPozicia=Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ActualPosition);
(Bruska.STAV.Servo_AktualnaRychlost=Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ActualVelocity);
(Bruska.STAV.Servo_HomingOK=Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Homing_OK);
(Bruska.STAV.Servo_BUSY=Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.MoveAbsolute_BUSY);
(Bruska.STAV.Servo_JoggLimitDosiahnuty=Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.JoggLimit_Dosiahnuty);



(Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.Acceleration=200);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.HomingVelocity=5);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.StartVelocity=20);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.Position=0);



(Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.Acceleration=(Bruska.PAR.Servo_RychlostPolohovania*1));
(Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.Deceleration=(Bruska.PAR.Servo_RychlostPolohovania*1));
(Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.StopDeceleration=(Bruska.PAR.Servo_RychlostPolohovania*5));
(Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.Velocity=Bruska.PAR.Servo_RychlostPolohovania);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.Position=Bruska.PAR.Servo_PoziciaNatocenia);

(Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.JoggAcceleration=(Bruska.PAR.Servo_JoggRychlost*10));
(Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.JoggDeceleration=(Bruska.PAR.Servo_JoggRychlost*10));
(Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.JoggVelocity=Bruska.PAR.Servo_JoggRychlost);



if(Bruska.Servo_STOP){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.STOP=1);
(CasZastaveniaServa.IN=1);
(SC_OvlServa.Step=0);
(Bruska.Servo_STOP=0);
}

if(CasZastaveniaServa.Q){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.STOP=0);
(CasZastaveniaServa.IN=0);
}


(CasZastaveniaServa.PT=2000);
TON(&CasZastaveniaServa);




SequenceControl(&SC_OvlServa);

switch(SC_OvlServa.Step){

case 0:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlServa.StepName; plcstring* zzRValue=(plcstring*)"0 - Nulovanie"; for(zzIndex=0; zzIndex<13l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(Bruska.Servo_HOME_SWITCH=0);
(Bruska.Servo_HOME_DIRECT=0);
(Bruska.Servo_JoggVPRED=0);
(Bruska.Servo_JoggVZAD=0);
(Bruska.Servo_MOVE=0);
(Bruska.Servo_POLOHUJ=0);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.HOME=0);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggVPRED=0);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggVZAD=0);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.MoveAbsolute=0);
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.MoveVelocity=0);
(Bruska.STAV.Servo_HomingBUSY=0);

if(((((unsigned long)(unsigned short)SC_Bruska.Step!=(unsigned long)(unsigned short)0))&Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Power_ON&(Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR^1)&(Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.STOP_ACTIVE^1))){
(SC_OvlServa.ResetStep=1);
(SC_OvlServa.Step=1);
}


}break;case 1:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlServa.StepName; plcstring* zzRValue=(plcstring*)"1 - Rozhodnutie o cinnosti"; for(zzIndex=0; zzIndex<26l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
if(Bruska.Servo_JoggVPRED){
(SC_OvlServa.Step=10);
}else if(Bruska.Servo_JoggVZAD){
(SC_OvlServa.Step=20);
}else if(Bruska.Servo_HOME_SWITCH){
(SC_OvlServa.Step=30);
}else if(Bruska.Servo_HOME_DIRECT){
(SC_OvlServa.Step=40);
}else if(Bruska.Servo_POLOHUJ){
(SC_OvlServa.Step=50);
}else if(Bruska.Servo_MOVE){
(SC_OvlServa.Step=60);
}


}break;case 10:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlServa.StepName; plcstring* zzRValue=(plcstring*)"10 - Jogg VPRED"; for(zzIndex=0; zzIndex<15l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlServa.IdleTime.PT=3000);
(SC_OvlServa.AlarmTime.PT=3000);


if((SC_OvlServa.Switch1^1)){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggVPRED=1);
(SC_OvlServa.Switch1=1);
}

if((Bruska.Servo_JoggVPRED^1)){
(SC_OvlServa.ResetStep=1);
(SC_OvlServa.Step=0);
}



}break;case 20:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlServa.StepName; plcstring* zzRValue=(plcstring*)"20 - Jogg VZAD"; for(zzIndex=0; zzIndex<14l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlServa.IdleTime.PT=3000);
(SC_OvlServa.AlarmTime.PT=3000);



if((SC_OvlServa.Switch1^1)){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggVZAD=1);
(SC_OvlServa.Switch1=1);
}

if((Bruska.Servo_JoggVZAD^1)){
(SC_OvlServa.ResetStep=1);
(SC_OvlServa.Step=0);
}


}break;case 30:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlServa.StepName; plcstring* zzRValue=(plcstring*)"30 - Homing SWITCH"; for(zzIndex=0; zzIndex<18l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlServa.IdleTime.PT=500);
(SC_OvlServa.AlarmTime.PT=3000);

(Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.HomingMode=1);
(Bruska.STAV.Servo_HomingBUSY=1);


if((SC_OvlServa.Switch1^1)){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.HOME=1);
(SC_OvlServa.IdleTime.IN=1);
(SC_OvlServa.Switch1=1);
}

if((Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Homing_OK&SC_OvlServa.IdleTime.Q)){
(SC_OvlServa.ResetStep=1);
(SC_OvlServa.Step=0);
}

}break;case 40:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlServa.StepName; plcstring* zzRValue=(plcstring*)"30 - Homing DIRECT"; for(zzIndex=0; zzIndex<18l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlServa.IdleTime.PT=500);
(SC_OvlServa.AlarmTime.PT=3000);

(Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.HomingMode=0);
(Bruska.STAV.Servo_HomingBUSY=1);

if((SC_OvlServa.Switch1^1)){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.HOME=1);
(SC_OvlServa.IdleTime.IN=1);
(SC_OvlServa.Switch1=1);
}

if((Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Homing_OK&SC_OvlServa.IdleTime.Q)){
(SC_OvlServa.ResetStep=1);
(SC_OvlServa.Step=0);
}



}break;case 50:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlServa.StepName; plcstring* zzRValue=(plcstring*)"40 - Polohovanie"; for(zzIndex=0; zzIndex<16l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlServa.IdleTime.PT=500);
(SC_OvlServa.AlarmTime.PT=3000);

(ZadanaPoziciaUINT=(unsigned short)(Bruska.PAR.Servo_PoziciaNatocenia>=0.0?Bruska.PAR.Servo_PoziciaNatocenia+0.5:Bruska.PAR.Servo_PoziciaNatocenia-0.5));
(AktualnaPoziciaUINT=(unsigned short)(Bruska.STAV.Servo_AktualnaPozicia>=0.0?Bruska.STAV.Servo_AktualnaPozicia+0.5:Bruska.STAV.Servo_AktualnaPozicia-0.5));

if((SC_OvlServa.Switch1^1)){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.MoveAbsolute=1);
(SC_OvlServa.Switch1=1);
}

if(((((unsigned long)(unsigned short)AktualnaPoziciaUINT==(unsigned long)(unsigned short)ZadanaPoziciaUINT))&Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.MoveAbsolute_DONE)){
(Bruska.STAV.Servo_PoziciaDosiahnuta=1);
(SC_OvlServa.ResetStep=1);
(SC_OvlServa.Step=0);
}


}break;case 60:{
{int zzIndex; plcstring* zzLValue=(plcstring*)SC_OvlServa.StepName; plcstring* zzRValue=(plcstring*)"60 - Move Velocity"; for(zzIndex=0; zzIndex<18l && zzRValue[zzIndex]!=0; zzIndex++) zzLValue[zzIndex] = zzRValue[zzIndex]; zzLValue[zzIndex] = 0;};
(SC_OvlServa.IdleTime.PT=500);
(SC_OvlServa.AlarmTime.PT=3000);


if((SC_OvlServa.Switch1^1)){
(Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.MoveVelocity=1);
(SC_OvlServa.Switch1=1);
}

if((Bruska.Servo_MOVE^1)){
(SC_OvlServa.ResetStep=1);
(SC_OvlServa.Step=0);
}


}break;}






}imp16385_case4_7:imp16385_endcase4_0:;}
#line 261 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.nodebug"

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
__asm__(".ascii \"iecfile \\\"Logical/Program/Bruska/Types.typ\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Program/Bruska/Variables.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Bruska/Main.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"plcreplace \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/Bruska/Main.st.c\\\" \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Program/Bruska/Main.st\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Temp/Objects/Config1/AB2_CPU/Bruska/Main.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".previous");
