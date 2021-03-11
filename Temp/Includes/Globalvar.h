/* Automation Studio generated header file */
/* Do not edit ! */

#ifndef _BUR_1615454422_2_
#define _BUR_1615454422_2_

#include <bur/plctypes.h>

/* Constants */
#ifdef _REPLACE_CONST
#else
#endif


/* Variables */
_GLOBAL plcbit PoruchaRobota;
_GLOBAL plcbit PoruchaBrusky;
_GLOBAL plcbit PotvrdenieAlarmov;
_GLOBAL plcbit ZobrazSymbolAlarmu;
_GLOBAL plcbit NastalaPorucha;
_GLOBAL plcbit Alarmy[101];
_GLOBAL struct Bruska_typ Bruska;
_GLOBAL struct SequenceControlTyp SC_Bruska;
_GLOBAL struct Robot_typ Robot;
_GLOBAL struct SequenceControlTyp SC_Robot;
_GLOBAL struct HardwareSTAV_typ StavHardware;
_GLOBAL struct Pracovisko_typ Pracovisko;
_GLOBAL struct Safety_typ Safety;
_GLOBAL struct Vizu_typ Vizu;
_GLOBAL plcbit NacitajPremenne;
_GLOBAL plcbit UlozPremenne;
_GLOBAL struct MpRecipeUI MpRecipeUI_0;
_GLOBAL struct MpRecipeRegPar MpRecipeRegPar_0;
_GLOBAL struct MpRecipeXml MpRecipeXml_0;
_GLOBAL struct RemPremenne_typ RemPremenne;
_GLOBAL struct DTGetTime DTGetTime_0;
_GLOBAL struct DTSetTime DTSetTime_0;
_GLOBAL plcbit Blikac1s;
_GLOBAL plcbit Blikac500ms;
_GLOBAL plcbit Blikac200ms;
_GLOBAL plcbit Blikac100ms;





__asm__(".section \".plc\"");

/* Used IEC files */
__asm__(".ascii \"iecfile \\\"Logical/Global.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipe.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/astime/astime.fun\\\" scope \\\"global\\\"\\n\"");

/* Exported library functions and function blocks */

__asm__(".previous");


#endif /* _BUR_1615454422_2_ */

