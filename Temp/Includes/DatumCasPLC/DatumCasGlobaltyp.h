/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1615454422_6_
#define _BUR_1615454422_6_

#include <bur/plctypes.h>

/* Datatypes and datatypes of function blocks */
typedef struct PLC_Cas_typ
{	unsigned char Sekundy;
	unsigned char Minuty;
	unsigned char Hodiny;
} PLC_Cas_typ;

typedef struct PLC_Datum_typ
{	unsigned char Den;
	unsigned char Mesiac;
	unsigned short Rok;
} PLC_Datum_typ;






__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/DatumCasPLC/DatumCasGlobal.typ\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1615454422_6_ */

