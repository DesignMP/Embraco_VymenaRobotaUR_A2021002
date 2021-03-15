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

#ifndef __AS__TYPE_Vizu_typ
#define __AS__TYPE_Vizu_typ
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
	unsigned char Slider;
	plcbit FarbaTlacitkaAlarm_Index;
	plcbit ZobrazSymbolAlarmu;
	unsigned char ZobrazHlasenie_ResetZariadenia;
} Vizu_typ;
#endif

#ifndef __AS__TYPE_ZariadenieIN_typ
#define __AS__TYPE_ZariadenieIN_typ
typedef struct ZariadenieIN_typ
{	plcbit PrepatovaOchrana_OK;
	plcbit Paletka_PritomnostKusu_OS1;
	plcbit VystupDoprav_PritomnostKusu_OS2;
	plcbit Otacac_PritomnostKusu_IS2;
} ZariadenieIN_typ;
#endif

#ifndef __AS__TYPE_ZariadenieOUT_typ
#define __AS__TYPE_ZariadenieOUT_typ
typedef struct ZariadenieOUT_typ
{	plcbit Majak_ZeleneSvetlo;
	plcbit Majak_ZlteSvetlo;
	plcbit Majak_CerveneSvetlo;
	plcbit Majak_Hukacka;
} ZariadenieOUT_typ;
#endif

#ifndef __AS__TYPE_ZariadeniePAR_typ
#define __AS__TYPE_ZariadeniePAR_typ
typedef struct ZariadeniePAR_typ
{	unsigned char New_Member;
} ZariadeniePAR_typ;
#endif

#ifndef __AS__TYPE_ZariadenieSTAV_typ
#define __AS__TYPE_ZariadenieSTAV_typ
typedef struct ZariadenieSTAV_typ
{	plcbit Automat;
	plcbit Manual;
	plcbit PoINIT;
	plcbit READY_TO_START;
	plcbit UkoncenieCyklu_BUSY;
	plcbit Hardware_OK;
} ZariadenieSTAV_typ;
#endif

#ifndef __AS__TYPE_Zariadenie_typ
#define __AS__TYPE_Zariadenie_typ
typedef struct Zariadenie_typ
{	ZariadenieIN_typ IN;
	ZariadenieOUT_typ OUT;
	ZariadeniePAR_typ PAR;
	ZariadenieSTAV_typ STAV;
	plcbit Automat;
	plcbit Manual;
	plcbit Reset;
	plcbit KoniecCyklu;
	plcbit Majak_HukackaON;
} Zariadenie_typ;
#endif

_GLOBAL plcbit Blikac500ms;
_GLOBAL Vizu_typ Vizu;
_GLOBAL Safety_typ Safety;
_GLOBAL Zariadenie_typ Zariadenie;
_LOCAL plcbit Edge0000100000;
_LOCAL plcbit Edge0000100001;
