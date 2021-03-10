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

#ifndef __AS__TYPE_PLC_Cas_typ
#define __AS__TYPE_PLC_Cas_typ
typedef struct PLC_Cas_typ
{	unsigned char Sekundy;
	unsigned char Minuty;
	unsigned char Hodiny;
} PLC_Cas_typ;
#endif

#ifndef __AS__TYPE_PLC_Datum_typ
#define __AS__TYPE_PLC_Datum_typ
typedef struct PLC_Datum_typ
{	unsigned char Den;
	unsigned char Mesiac;
	unsigned short Rok;
} PLC_Datum_typ;
#endif

#ifndef __AS__TYPE_DTStructure
#define __AS__TYPE_DTStructure
typedef struct DTStructure
{	unsigned short year;
	unsigned char month;
	unsigned char day;
	unsigned char wday;
	unsigned char hour;
	unsigned char minute;
	unsigned char second;
	unsigned short millisec;
	unsigned short microsec;
} DTStructure;
#endif

_BUR_PUBLIC plcstring* usint2str(unsigned char IN, plcstring pStr[81], unsigned long len);
_BUR_PUBLIC plcstring* uint2str(unsigned short IN, plcstring pStr[81], unsigned long len);
struct DTGetTime
{	unsigned short status;
	plcdt DT1;
	plcbit enable;
};
_BUR_PUBLIC void DTGetTime(struct DTGetTime* inst);
_BUR_PUBLIC unsigned long DT_TO_DTStructure(plcdt DT1, unsigned long pDTStructure);
_BUR_PUBLIC unsigned long brsmemcpy(unsigned long pDest, unsigned long pSrc, unsigned long length);
_BUR_PUBLIC unsigned long brsstrcat(unsigned long pDest, unsigned long pSrc);
_BUR_PUBLIC unsigned long brsstrlen(unsigned long pString);
_BUR_PUBLIC unsigned long brsstrcpy(unsigned long pDest, unsigned long pSrc);
_BUR_LOCAL DTStructure PLC_DatumCas;
_BUR_LOCAL struct DTGetTime DTGetTime_1;
_BUR_LOCAL plcstring Sekundy_String[3];
_BUR_LOCAL plcstring Minuty_String[3];
_BUR_LOCAL plcstring Hodiny_String[3];
_BUR_LOCAL plcstring Den_String[3];
_BUR_LOCAL plcstring Mesiac_String[3];
_BUR_LOCAL unsigned long length;
_BUR_LOCAL unsigned char PoleUSINT[4];
_BUR_LOCAL unsigned char i;
_BUR_LOCAL plcstring DvaZnaky[3];
_GLOBAL PLC_Cas_typ PLC_Cas;
_GLOBAL PLC_Datum_typ PLC_Datum;
_GLOBAL plcstring Sekunda_STR[3];
_GLOBAL plcstring Minuta_STR[3];
_GLOBAL plcstring Hodina_STR[3];
_GLOBAL plcstring Den_STR[3];
_GLOBAL plcstring Mesiac_STR[3];
_GLOBAL plcstring Rok_STR_4_Znaky[5];
_GLOBAL plcstring Rok_STR_2_Znaky[3];
