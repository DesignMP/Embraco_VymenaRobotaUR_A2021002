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

#ifndef __AS__TYPE_Taktime_CMD_typ
#define __AS__TYPE_Taktime_CMD_typ
typedef struct Taktime_CMD_typ
{	plcbit START_Merania;
	plcbit ZAPIS_Hodnot;
	plcbit STOP_Merania;
} Taktime_CMD_typ;
#endif

#ifndef __AS__TYPE_Taktime_OUTPUTS_typ
#define __AS__TYPE_Taktime_OUTPUTS_typ
typedef struct Taktime_OUTPUTS_typ
{	unsigned short NameraneHodiny;
	unsigned short NameraneMinuty;
	unsigned short NameraneSekundy;
	unsigned short NameraneMilisekundy;
} Taktime_OUTPUTS_typ;
#endif

#ifndef __AS__TYPE_Taktime_typ
#define __AS__TYPE_Taktime_typ
typedef struct Taktime_typ
{	Taktime_CMD_typ CMD;
	Taktime_OUTPUTS_typ OUTPUTS;
} Taktime_typ;
#endif

_BUR_LOCAL unsigned short Milisekundy;
_BUR_LOCAL unsigned short Sekundy;
_BUR_LOCAL unsigned short Minuty;
_BUR_LOCAL unsigned short Hodiny;
_GLOBAL Taktime_typ Taktime_Robot;
