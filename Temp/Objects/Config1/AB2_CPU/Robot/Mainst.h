#ifndef __AS__TYPE_
#define __AS__TYPE_
typedef struct {
	unsigned char bit0  : 1;
	unsigned char bit1  : 1;
	unsigned char bit2  : 1;
	unsigned char bit3  : 1;
	unsigned char bit4  : 1;
	unsigned char bit5  : 1;
	unsigned char bit6  : 1;
	unsigned char bit7  : 1;
} _1byte_bit_field_;

typedef struct {
	unsigned short bit0  : 1;
	unsigned short bit1  : 1;
	unsigned short bit2  : 1;
	unsigned short bit3  : 1;
	unsigned short bit4  : 1;
	unsigned short bit5  : 1;
	unsigned short bit6  : 1;
	unsigned short bit7  : 1;
	unsigned short bit8  : 1;
	unsigned short bit9  : 1;
	unsigned short bit10 : 1;
	unsigned short bit11 : 1;
	unsigned short bit12 : 1;
	unsigned short bit13 : 1;
	unsigned short bit14 : 1;
	unsigned short bit15 : 1;
} _2byte_bit_field_;

typedef struct {
	unsigned long bit0  : 1;
	unsigned long bit1  : 1;
	unsigned long bit2  : 1;
	unsigned long bit3  : 1;
	unsigned long bit4  : 1;
	unsigned long bit5  : 1;
	unsigned long bit6  : 1;
	unsigned long bit7  : 1;
	unsigned long bit8  : 1;
	unsigned long bit9  : 1;
	unsigned long bit10 : 1;
	unsigned long bit11 : 1;
	unsigned long bit12 : 1;
	unsigned long bit13 : 1;
	unsigned long bit14 : 1;
	unsigned long bit15 : 1;
	unsigned long bit16 : 1;
	unsigned long bit17 : 1;
	unsigned long bit18 : 1;
	unsigned long bit19 : 1;
	unsigned long bit20 : 1;
	unsigned long bit21 : 1;
	unsigned long bit22 : 1;
	unsigned long bit23 : 1;
	unsigned long bit24 : 1;
	unsigned long bit25 : 1;
	unsigned long bit26 : 1;
	unsigned long bit27 : 1;
	unsigned long bit28 : 1;
	unsigned long bit29 : 1;
	unsigned long bit30 : 1;
	unsigned long bit31 : 1;
} _4byte_bit_field_;
#endif

#ifndef __AS__TYPE_SafetyIN_typ
#define __AS__TYPE_SafetyIN_typ
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
#endif

#ifndef __AS__TYPE_SafetyOUT_typ
#define __AS__TYPE_SafetyOUT_typ
typedef struct SafetyOUT_typ
{	plcbit Zona_CS;
	plcbit Zona_Robot;
	plcbit Zona_Pracovisko_CH1;
	plcbit Zona_Pracovisko_CH2;
} SafetyOUT_typ;
#endif

#ifndef __AS__TYPE_SafetyPAR_typ
#define __AS__TYPE_SafetyPAR_typ
typedef struct SafetyPAR_typ
{	unsigned char PAR_0;
} SafetyPAR_typ;
#endif

#ifndef __AS__TYPE_SafetySTAV_typ
#define __AS__TYPE_SafetySTAV_typ
typedef struct SafetySTAV_typ
{	plcbit SafetyPLC_Nabehlo;
	plcbit ZonaCS_AKTIVNA;
	plcbit ZonaRobot_AKTIVNA;
	plcbit CS_Pracovisko_Odblokovany;
	plcbit CS_Robot_Odblokovany;
} SafetySTAV_typ;
#endif

#ifndef __AS__TYPE_Safety_typ
#define __AS__TYPE_Safety_typ
typedef struct Safety_typ
{	SafetyIN_typ IN;
	SafetyOUT_typ OUT;
	SafetyPAR_typ PAR;
	SafetySTAV_typ STAV;
	plcbit RESET_ZonyRobot;
	plcbit RESET_ZonyCS;
	plcbit SpatnaVazba_ZonaRobot;
	plcbit SpatnaVazba_ZonaCS;
	plcbit SpatnaVazba_ZonaPracovisko;
} Safety_typ;
#endif

#ifndef __AS__TYPE_PracoviskoIN_typ
#define __AS__TYPE_PracoviskoIN_typ
typedef struct PracoviskoIN_typ
{	plcbit PrepatovaOchrana_OK;
	plcbit Paletka_PritomnostKusu_OS1;
	plcbit VystupDoprav_PritomnostKusu_OS2;
	plcbit Otacac_PritomnostKusu_IS2;
} PracoviskoIN_typ;
#endif

#ifndef __AS__TYPE_PracoviskoOUT_typ
#define __AS__TYPE_PracoviskoOUT_typ
typedef struct PracoviskoOUT_typ
{	plcbit Majak_ZeleneSvetlo;
	plcbit Majak_ZlteSvetlo;
	plcbit Majak_CerveneSvetlo;
	plcbit Majak_Hukacka;
} PracoviskoOUT_typ;
#endif

#ifndef __AS__TYPE_PracoviskoPAR_typ
#define __AS__TYPE_PracoviskoPAR_typ
typedef struct PracoviskoPAR_typ
{	unsigned char New_Member;
} PracoviskoPAR_typ;
#endif

#ifndef __AS__TYPE_PracoviskoSTAV_typ
#define __AS__TYPE_PracoviskoSTAV_typ
typedef struct PracoviskoSTAV_typ
{	plcbit Automat;
	plcbit Manual;
	plcbit PoINIT;
	plcbit READY_TO_START;
	plcbit UkoncenieCyklu_BUSY;
	plcbit Hardware_OK;
} PracoviskoSTAV_typ;
#endif

#ifndef __AS__TYPE_Pracovisko_typ
#define __AS__TYPE_Pracovisko_typ
typedef struct Pracovisko_typ
{	PracoviskoIN_typ IN;
	PracoviskoOUT_typ OUT;
	PracoviskoPAR_typ PAR;
	PracoviskoSTAV_typ STAV;
	plcbit Automat;
	plcbit Manual;
	plcbit Reset;
	plcbit KoniecCyklu;
	plcbit Majak_HukackaON;
} Pracovisko_typ;
#endif

#ifndef __AS__TYPE_RobotIN_typ
#define __AS__TYPE_RobotIN_typ
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
#endif

#ifndef __AS__TYPE_RobotOUT_typ
#define __AS__TYPE_RobotOUT_typ
typedef struct RobotOUT_typ
{	plcbit CisloAktualnejPozicie_Bit0;
	plcbit CisloAktualnejPozicie_Bit1;
	plcbit CisloAktualnejPozicie_Bit2;
	plcbit CisloAktualnejPozicie_Bit3;
	plcbit ZatvorManipulacnyUchopovac;
	plcbit ZatvorOdkladaciUchopovac;
	plcbit VystupnyDopravnikNalozeny;
} RobotOUT_typ;
#endif

#ifndef __AS__TYPE_RobotKOM_IN_typ
#define __AS__TYPE_RobotKOM_IN_typ
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
#endif

#ifndef __AS__TYPE_RobotKOM_OUT_typ
#define __AS__TYPE_RobotKOM_OUT_typ
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
#endif

#ifndef __AS__TYPE_RobotPAR_typ
#define __AS__TYPE_RobotPAR_typ
typedef struct RobotPAR_typ
{	unsigned char CisloZadanejPozicie;
	unsigned char CisloAktualnejPozicie;
	unsigned char PocetNalozenychCapov;
} RobotPAR_typ;
#endif

#ifndef __AS__TYPE_RobotSTAV_typ
#define __AS__TYPE_RobotSTAV_typ
typedef struct RobotSTAV_typ
{	plcbit PoINIT;
} RobotSTAV_typ;
#endif

#ifndef __AS__TYPE_Robot_typ
#define __AS__TYPE_Robot_typ
typedef struct Robot_typ
{	RobotIN_typ IN;
	RobotOUT_typ OUT;
	RobotKOM_IN_typ KOM_IN;
	RobotKOM_OUT_typ KOM_OUT;
	RobotPAR_typ PAR;
	RobotSTAV_typ STAV;
	plcbit Automat;
	plcbit Manual;
	plcbit Reset;
	plcbit KoniecCyklu;
} Robot_typ;
#endif

struct TON
{	plctime PT;
	plctime ET;
	plctime StartTime;
	unsigned long Restart;
	plcbit IN;
	plcbit Q;
	plcbit M;
};
_BUR_PUBLIC void TON(struct TON* inst);
#ifndef __AS__TYPE_SequenceControlTyp
#define __AS__TYPE_SequenceControlTyp
typedef struct SequenceControlTyp
{	plcstring StepName[81];
	unsigned short Step;
	plcbit Switch1;
	plcbit Switch2;
	plcbit Switch3;
	plcbit ResetStep;
	plcbit LastStep;
	struct TON IdleTime;
	struct TON AlarmTime;
} SequenceControlTyp;
#endif

_BUR_PUBLIC plcbit SequenceControl(struct SequenceControlTyp(* SC));
_GLOBAL Safety_typ Safety;
_GLOBAL Pracovisko_typ Pracovisko;
_GLOBAL SequenceControlTyp SC_Robot;
_GLOBAL Robot_typ Robot;
_GLOBAL plcbit PoruchaRobota;
static void __AS__Action__ProfinetKomunikaciaRobot(void);
