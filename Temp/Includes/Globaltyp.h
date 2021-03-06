/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1622801201_1_
#define _BUR_1622801201_1_

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
	plcbit OploteniePracoviska_CH1;
	plcbit OploteniePracoviska_CH2;
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
	plcbit ZonaRobot_Odblokovana;
	plcbit ZonaRobot_AKTIVNA;
	plcbit ZonaPracovisko_Odblokovana;
	plcbit ZonaPracovisko_AKTIVNA;
	plcbit CS_Pracovisko_Odblokovany;
	plcbit CS_Robot_Odblokovany;
	plcbit VyblokovanieSafety_AKTIVNE;
} SafetySTAV_typ;

typedef struct Safety_typ
{	struct SafetyIN_typ IN;
	struct SafetyOUT_typ OUT;
	struct SafetyPAR_typ PAR;
	struct SafetySTAV_typ STAV;
	plcbit RESET_ZonyRobot;
	plcbit RESET_ZonyCS;
	plcbit RESET_ZonyPracovisko;
	plcbit SpatnaVazba_ZonaRobot;
	plcbit SpatnaVazba_ZonaCS;
	plcbit SpatnaVazba_ZonaPracovisko;
} Safety_typ;

typedef struct Vizu_typ
{	unsigned char CisloAktualnejObrazovky;
	unsigned char CisloZadanejObrazovky;
	plcbit TL_RezimAutomat;
	unsigned char StavPracoviskaRobota_Index;
	unsigned char StavPracoviskaBrusky_Index;
	unsigned char StavZariadenia_Farba;
	unsigned char StavZariadenia_Index;
	plcbit TL_RezimManual_DISABLE;
	plcbit TL_StartAutomat_DISABLE;
	plcbit TL_UkoncenieCyklu_DISABLE;
	plcbit TL_RR_OvladanieServa_DISABLE;
	plcbit TL_RR_HomingServa_DISABLE;
	plcbit TL_OdparkovanieRobota_DISABLE;
	plcbit TL_OdbrzdenieServa_DISABLE;
	unsigned char Slider;
	plcbit FarbaTlacitkaAlarm_Index;
	plcbit ZobrazSymbolAlarmu;
	unsigned char ZobrazHlasenie_ResetZariadenia;
	unsigned char PodsvietenieTlacitka_ResetCS;
} Vizu_typ;

typedef struct ZariadenieIN_typ
{	plcbit PrepatovaOchrana_OK;
	plcbit Paletka_PritomnostKusu_OS1;
	plcbit VystupDoprav_PritomnostKusu_OS2;
	plcbit Otacac_PritomnostKusu_IS2;
	plcbit VystupDoprav_Napolohovany;
	plcbit VystupDoprav_Bezi;
	plcbit RucnyRezimStarehoZariadenia;
} ZariadenieIN_typ;

typedef struct ZariadenieOUT_typ
{	plcbit Majak_ZeleneSvetlo;
	plcbit Majak_ZlteSvetlo;
	plcbit Majak_CerveneSvetlo;
	plcbit Majak_Hukacka;
} ZariadenieOUT_typ;

typedef struct ZariadeniePAR_typ
{	unsigned char New_Member;
} ZariadeniePAR_typ;

typedef struct ZariadenieSTAV_typ
{	plcbit Automat;
	plcbit Manual;
	plcbit PoINIT;
	plcbit READY_TO_START;
	plcbit UkoncenieCyklu_BUSY;
	plcbit Hardware_OK;
} ZariadenieSTAV_typ;

typedef struct Zariadenie_typ
{	struct ZariadenieIN_typ IN;
	struct ZariadenieOUT_typ OUT;
	struct ZariadeniePAR_typ PAR;
	struct ZariadenieSTAV_typ STAV;
	plcbit Automat;
	plcbit Manual;
	plcbit Reset;
	plcbit KoniecCyklu;
	plcbit Majak_HukackaON;
} Zariadenie_typ;

typedef struct RobotIN_typ
{	plcbit DlhyUchopovac_Otvoreny_MS2;
	plcbit DlhyUchopovac_Zatvoreny_MS1;
	plcbit KratkyUchopovac_Otvoreny_MS4;
	plcbit KratkyUchopovac_Zatvoreny_MS3;
	plcbit CisloZadanejPozicie_Bit0;
	plcbit CisloZadanejPozicie_Bit1;
	plcbit CisloZadanejPozicie_Bit2;
	plcbit CisloZadanejPozicie_Bit3;
	plcbit NepouzivatRobota;
} RobotIN_typ;

typedef struct RobotOUT_typ
{	plcbit CisloAktualnejPozicie_Bit0;
	plcbit CisloAktualnejPozicie_Bit1;
	plcbit CisloAktualnejPozicie_Bit2;
	plcbit CisloAktualnejPozicie_Bit3;
	plcbit OtvorDlhyUchopovac_YV1;
	plcbit OtvorKratkyUchopovac_YV2;
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
	plcbit Stav_ZonaNavratuRobota_OK;
	plcbit Stav_ZonaNavratuRobota_NG;
	plcbit Stav_RobotDrziHotovyCap;
	plcbit Stav_RobotVlozilNovyCap;
	plcbit Stav_PoruchaRobota;
	plcbit Gripper_OtvorDlhyUchopovac;
	plcbit Gripper_OtvorKratkyUchopovac;
	unsigned char Profinet_PLC_INPUTS[64];
} RobotKOM_IN_typ;

typedef struct RobotKOM_OUT_typ
{	plcbit ZapniMotory;
	plcbit VypniMotory;
	plcbit PP_na_Main;
	plcbit Reset_CS;
	plcbit StartProgramu;
	plcbit StartProgramuMain;
	plcbit StopProgramu;
	plcbit OdparkujRobota;
	plcbit ServisnaPozicia;
	plcbit ZahodenieKusu;
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
	plcbit UkoncenieCykluRobota;
	plcbit UpinaciaHlava_Otvorena;
	plcbit Gripper_DlhyUchopov_OTVORENY;
	plcbit Gripper_DlhyUchopov_DRZI_KUS;
	plcbit Gripper_KratkyUchopov_OTVORENY;
	plcbit Gripper_KratkyUchopov_DRZI_KUS;
	plcbit Gripper_DlhyUchopov_PRAZDNY;
	plcbit Gripper_KratkyUchopov_PRAZDNY;
	unsigned char Dopravnik_UkladaciaPozicia;
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
	plcbit RR_OtvorKratkyUchopovac;
	plcbit RR_ZatvorKratkyUchopovac;
	plcbit RR_OtvorDlhyUchopovac;
	plcbit RR_ZatvorDlhyUchopovac;
	plcbit RR_OdparkujRobota;
	plcbit Robot_OtvorKratkyUchopovac;
	plcbit Robot_ZatvorKratkyUchopovac;
	plcbit Robot_OtvorDlhyUchopovac;
	plcbit Robot_ZatvorDlhyUchopovac;
} Robot_typ;

typedef struct BruskaIN_typ
{	plcbit ReferencnySnimac_IS1;
	plcbit UpinaciaHlava_OtacanieVPRED;
	plcbit UpinaciaHlava_OtacanieVZAD;
	plcbit OchrannyKrytBrusky_Otvoreny;
	plcbit UpinaciaHlava_Otvorena;
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
	plcbit Servo_ODBRZDI;
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

typedef struct Taktime_CMD_typ
{	plcbit START_Merania;
	plcbit ZAPIS_Hodnot;
	plcbit STOP_Merania;
} Taktime_CMD_typ;

typedef struct Taktime_OUTPUTS_typ
{	unsigned short NameraneHodiny;
	unsigned short NameraneMinuty;
	unsigned short NameraneSekundy;
	unsigned short NameraneMilisekundy;
} Taktime_OUTPUTS_typ;

typedef struct Taktime_typ
{	struct Taktime_CMD_typ CMD;
	struct Taktime_OUTPUTS_typ OUTPUTS;
} Taktime_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Global.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1622801201_1_ */

