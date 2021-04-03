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

#ifndef __AS__TYPE_McInternalType
#define __AS__TYPE_McInternalType
typedef struct McInternalType
{	unsigned long ID;
	unsigned long Check;
	unsigned long ParamHash;
	plcword State;
	unsigned short Error;
	struct McInternalFubProcessingType(* Treating);
	unsigned long Memory[14];
	unsigned char Flags;
	struct McInternalControlIfType(* ControlIf);
	signed long SeqNo;
} McInternalType;
#endif

#ifndef __AS__TYPE_McInternalFubProcessingType
#define __AS__TYPE_McInternalFubProcessingType
typedef struct McInternalFubProcessingType
{	signed long states[2];
} McInternalFubProcessingType;
#endif

#ifndef __AS__TYPE_McInternalControlIfType
#define __AS__TYPE_McInternalControlIfType
typedef struct McInternalControlIfType
{	plcdword vtable;
} McInternalControlIfType;
#endif

#ifndef __AS__TYPE_McInternalMappLinkType
#define __AS__TYPE_McInternalMappLinkType
typedef struct McInternalMappLinkType
{	unsigned long Internal[2];
} McInternalMappLinkType;
#endif

#ifndef __AS__TYPE_McInternalAxisIfType
#define __AS__TYPE_McInternalAxisIfType
typedef struct McInternalAxisIfType
{	plcdword vtable;
} McInternalAxisIfType;
#endif

#ifndef __AS__TYPE_McAxisType
#define __AS__TYPE_McAxisType
typedef struct McAxisType
{	struct McInternalAxisIfType(* controlif);
	McInternalMappLinkType mappLinkInternal;
	signed long seqNo;
} McAxisType;
#endif

#ifndef __AS__TYPE_McAcpAxDataTypeEnum
#define __AS__TYPE_McAcpAxDataTypeEnum
typedef enum McAcpAxDataTypeEnum
{	mcACPAX_PARTYPE_BOOL = 1,
	mcACPAX_PARTYPE_SINT = 2,
	mcACPAX_PARTYPE_INT = 3,
	mcACPAX_PARTYPE_DINT = 4,
	mcACPAX_PARTYPE_USINT = 5,
	mcACPAX_PARTYPE_UINT = 6,
	mcACPAX_PARTYPE_UDINT = 7,
	mcACPAX_PARTYPE_REAL = 8,
	mcACPAX_PARTYPE_VOID = 65535,
} McAcpAxDataTypeEnum;
#endif

#ifndef __AS__TYPE_McAcpAxProcessParIDModeEnum
#define __AS__TYPE_McAcpAxProcessParIDModeEnum
typedef enum McAcpAxProcessParIDModeEnum
{	mcACPAX_PARID_GET = 0,
	mcACPAX_PARID_SET = 1,
	mcACPAX_PARID_GET_NO_NCT = 2,
} McAcpAxProcessParIDModeEnum;
#endif

#ifndef __AS__TYPE_McAcpAxProcessParIDType
#define __AS__TYPE_McAcpAxProcessParIDType
typedef struct McAcpAxProcessParIDType
{	unsigned short ParID;
	unsigned long VariableAddress;
	McAcpAxDataTypeEnum DataType;
} McAcpAxProcessParIDType;
#endif

struct MC_BR_ProcessParID_AcpAx
{	struct McAxisType(* Axis);
	unsigned long DataAddress;
	unsigned long NumberOfParIDs;
	McAcpAxProcessParIDModeEnum Mode;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit Done;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_BR_ProcessParID_AcpAx(struct MC_BR_ProcessParID_AcpAx* inst);
_BUR_LOCAL struct TON CasPowerON;
_BUR_LOCAL struct TON CasZastaveniaServa;
_BUR_LOCAL SequenceControlTyp SC_OvlServa;
_BUR_LOCAL unsigned short ZadanaPoziciaUINT;
_BUR_LOCAL unsigned short AktualnaPoziciaUINT;
_BUR_LOCAL signed short AktualnyPocetOtacokINT;
_BUR_LOCAL double AktualnyPocetOtacokLREAL;
_BUR_LOCAL struct MC_BR_ProcessParID_AcpAx MC_BR_ProcessParID_AcpAx_0;
_BUR_LOCAL struct McAcpAxProcessParIDType McAcpAxProcessParIDType_0[2];
_BUR_LOCAL float NovaHodnotaMomentu_POS;
_BUR_LOCAL float NovaHodnotaMomentu_NEG;
