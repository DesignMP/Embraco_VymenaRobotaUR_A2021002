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

_BUR_LOCAL SequenceControlTyp SC_OvlGripra;
