/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1615384270_1_
#define _BUR_1615384270_1_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct RemPremenne_typ
{	double Bruska_VychodziaPoziciaNatocenia;
	float Bruska_RychlosOtacania;
} RemPremenne_typ;

typedef struct SafetyIN_typ
{	plcbit Robot_CS_CH1;
	plcbit Robot_CS_CH2;
	plcbit VyblokovanieSafety_CH1;
	plcbit VyblokovanieSafety_CH2;
	plcbit Pracovisko_CS_CH1;
	plcbit Pracovisko_CS_CH2;
	plcbit SpatnaVazbaPracovisko_CH1;
	plcbit SpatnaVazbaPracovisko_CH2;
} SafetyIN_typ;

typedef struct SafetyOUT_typ
{	plcbit Zona_CS;
	plcbit Zona_Robot;
	plcbit Zona_Pracovisko_CH1;
	plcbit Zona_Pracovisko_CH2;
} SafetyOUT_typ;

typedef struct SafetyPAR_typ
{	unsigned char PAR_0;
} SafetyPAR_typ;

typedef struct SafetySTAV_typ
{	plcbit SafetyPLC_Nabehlo;
	plcbit ZonaCS_AKTIVNA;
	plcbit ZonaRobot_AKTIVNA;
	plcbit CS_Pracovisko_Odblokovany;
	plcbit CS_Robot_Odblokovany;
} SafetySTAV_typ;

typedef struct Safety_typ
{	struct SafetyIN_typ IN;
	struct SafetyOUT_typ OUT;
	struct SafetyPAR_typ PAR;
	struct SafetySTAV_typ STAV;
	plcbit RESET_ZonyRobot;
	plcbit RESET_ZonyCS;
	plcbit SpatnaVazba_ZonaRobot;
	plcbit SpatnaVazba_ZonaCS;
	plcbit SpatnaVazba_ZonaPracovisko;
} Safety_typ;

typedef struct Vizu_typ
{	unsigned char CisloAktualnejObrazovky;
	unsigned char CisloZadanejObrazovky;
} Vizu_typ;

typedef struct PracoviskoIN_typ
{	plcbit PrepatovaOchrana_OK;
	plcbit Paletka_PritomnostKusu_OS1;
	plcbit VystupDoprav_PritomnostKusu_OS2;
	plcbit Otacac_PritomnostKusu_IS2;
} PracoviskoIN_typ;

typedef struct PracoviskoOUT_typ
{	plcbit Majak_ZeleneSvetlo;
	plcbit Majak_ZlteSvetlo;
	plcbit Majak_CerveneSvetlo;
	plcbit Majak_Hukacka;
} PracoviskoOUT_typ;

typedef struct PracoviskoPAR_typ
{	unsigned char New_Member;
} PracoviskoPAR_typ;

typedef struct PracoviskoSTAV_typ
{	plcbit Automat;
	plcbit Manual;
	plcbit PoINIT;
	plcbit READY;
	plcbit UkoncenieCyklu_BUSY;
	plcbit Hardware_OK;
} PracoviskoSTAV_typ;

typedef struct Pracovisko_typ
{	struct PracoviskoIN_typ IN;
	struct PracoviskoOUT_typ OUT;
	struct PracoviskoPAR_typ PAR;
	struct PracoviskoSTAV_typ STAV;
	plcbit Automat;
	plcbit Manual;
	plcbit Reset;
	plcbit KoniecCyklu;
} Pracovisko_typ;

typedef struct RobotIN_typ
{	plcbit ManipulUchopovac_Otvoreny_MS2;
	plcbit ManipulUchopovac_Zatvoreny_MS1;
	plcbit OdkladaciUchopovac_Otvoreny_MS4;
	plcbit OdkladaciUchopovac_Zatvoreny_MS3;
	plcbit CisloZadanejPozicie_Bit0;
	plcbit CisloZadanejPozicie_Bit1;
	plcbit CisloZadanejPozicie_Bit2;
	plcbit CisloZadanejPozicie_Bit3;
} RobotIN_typ;

typedef struct RobotOUT_typ
{	plcbit CisloAktualnejPozicie_Bit0;
	plcbit CisloAktualnejPozicie_Bit1;
	plcbit CisloAktualnejPozicie_Bit2;
	plcbit CisloAktualnejPozicie_Bit3;
	plcbit ZatvorManipulacnyUchopovac;
	plcbit ZatvorOdkladaciUchopovac;
	plcbit VystupnyDopravnikNalozeny;
} RobotOUT_typ;

typedef struct RobotKOM_IN_typ
{	plcbit Stav_RobotOdparkovany;
	plcbit Stav_RobotDrziCap;
	plcbit Stav_RobotCinnostUkoncena;
	plcbit Stav_Dopravnik_Plny;
	plcbit Stav_MotoryON;
	plcbit Stav_MotoryOFF;
	plcbit Stav_ProgramRUN;
	plcbit Stav_RezimAUTOMAT;
	plcbit Stav_RobotCS;
	plcbit Stav_VystupyZresetovane;
	unsigned char Profinet_PLC_INPUTS[64];
} RobotKOM_IN_typ;

typedef struct RobotKOM_OUT_typ
{	unsigned char PocetNalozenychCapov;
	plcbit ZapniMotory;
	plcbit VypniMotory;
	plcbit PP_na_Main;
	plcbit Reset_CS;
	plcbit StartProgramu;
	plcbit StartProgramuMain;
	plcbit StopProgramu;
	plcbit OdparkujRobota;
	plcbit Paletka_PresunDoCakacejPozicie;
	plcbit Paletka_OdoberCap;
	plcbit Otacac_PresunDoCakacejPozicie;
	plcbit Otacac_PolozCap;
	plcbit Otacac_OdoberCap;
	plcbit Bruska_PresunDoCakacejPozicie;
	plcbit Bruska_OdoberCap;
	plcbit Bruska_VlozCap;
	plcbit Dopravnik_PresunDoCakacejPozicie;
	plcbit Dopravnik_PolozCap;
	unsigned char Profinet_PLC_OUTPUTS[64];
} RobotKOM_OUT_typ;

typedef struct RobotPAR_typ
{	unsigned char CisloZadanejPozicie;
	unsigned char CisloAktualnejPozicie;
	unsigned char PocetNalozenychCapov;
} RobotPAR_typ;

typedef struct RobotSTAV_typ
{	plcbit PoINIT;
} RobotSTAV_typ;

typedef struct Robot_typ
{	struct RobotIN_typ IN;
	struct RobotOUT_typ OUT;
	struct RobotKOM_IN_typ KOM_IN;
	struct RobotKOM_OUT_typ KOM_OUT;
	struct RobotPAR_typ PAR;
	struct RobotSTAV_typ STAV;
	plcbit Automat;
	plcbit Manual;
	plcbit Reset;
	plcbit KoniecCyklu;
} Robot_typ;

typedef struct BruskaIN_typ
{	plcbit ReferencnySnimac_IS1;
	plcbit UpinaciaHlava_OtacanieVPRED;
	plcbit UpinaciaHlava_OtacanieVZAD;
} BruskaIN_typ;

typedef struct BruskaOUT_typ
{	plcbit Stav_UpinaciaHlavaSaOtacaVPRED;
	plcbit Stav_UpinaciaHlavaSaOtacaVZAD;
	plcbit Stav_PoruchaMotoraUpinacejHlavy;
} BruskaOUT_typ;

typedef struct BruskaPAR_typ
{	float Servo_JoggRychlost;
	float Servo_RychlostPolohovania;
	double Servo_PoziciaNatocenia;
} BruskaPAR_typ;

typedef struct BruskaSTAV_typ
{	plcbit PoINIT;
	plcbit ServoREADY;
	plcbit Servo_LimitneSnimaceBUSY;
	double Servo_AktualnaPozicia;
	float Servo_AktualnaRychlost;
	plcbit Servo_HomingOK;
	plcbit Servo_BUSY;
	plcbit Servo_JoggLimitDosiahnuty;
	plcbit Servo_HomingBUSY;
	plcbit Servo_PoziciaDosiahnuta;
	double Servo_AktualnyPocetOtacok;
} BruskaSTAV_typ;

typedef struct Bruska_typ
{	struct BruskaIN_typ IN;
	struct BruskaOUT_typ OUT;
	struct BruskaPAR_typ PAR;
	struct BruskaSTAV_typ STAV;
	plcbit Automat;
	plcbit Manual;
	plcbit Reset;
	plcbit KoniecCyklu;
	struct Axis_Servo ServoOtacaniaUpinacejHlavy_M1;
	plcbit Servo_STOP;
	plcbit Servo_JoggVPRED;
	plcbit Servo_JoggVZAD;
	plcbit Servo_HOME_SWITCH;
	plcbit Servo_HOME_DIRECT;
	plcbit Servo_POLOHUJ;
	plcbit Servo_MOVE;
} Bruska_typ;

typedef struct HardwareSTAV_typ
{	plcbit KartaAB1_ProfinetMaster_OK;
	plcbit KartaAB3_NapajanieCPU_OK;
	plcbit KartaAB4_SafetyMaster_OK;
	plcbit KartaAB5_16DI_OK;
	plcbit KartaAB6_16DI_OK;
	plcbit KartaAB7_16DO_OK;
	plcbit Komunikacia_Robot_OK;
} HardwareSTAV_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Global.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1615384270_1_ */

