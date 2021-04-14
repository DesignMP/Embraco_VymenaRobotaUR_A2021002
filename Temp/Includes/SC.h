/* Automation Studio generated header file */
/* Do not edit ! */
/* SC  */

#ifndef _SC_
#define _SC_
#ifdef __cplusplus
extern "C" 
{
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Datatypes and datatypes of function blocks */
typedef struct SequenceControlTyp
{	plcstring StepName[201];
	unsigned short Step;
	plcbit Switch1;
	plcbit Switch2;
	plcbit Switch3;
	plcbit ResetStep;
	plcbit LastStep;
	struct TON IdleTime;
	struct TON AlarmTime;
} SequenceControlTyp;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC plcbit SequenceControl(struct SequenceControlTyp* SC);


#ifdef __cplusplus
};
#endif
#endif /* _SC_ */

