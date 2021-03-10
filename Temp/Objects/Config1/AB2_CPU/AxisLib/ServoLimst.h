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

#ifndef __AS__TYPE_McAcpAxProcessParIDModeEnum
#define __AS__TYPE_McAcpAxProcessParIDModeEnum
typedef enum McAcpAxProcessParIDModeEnum
{	mcACPAX_PARID_GET = 0,
	mcACPAX_PARID_SET = 1,
	mcACPAX_PARID_GET_NO_NCT = 2,
} McAcpAxProcessParIDModeEnum;
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

#ifndef __AS__TYPE_McAcpAxProcessParIDType
#define __AS__TYPE_McAcpAxProcessParIDType
typedef struct McAcpAxProcessParIDType
{	unsigned short ParID;
	unsigned long VariableAddress;
	McAcpAxDataTypeEnum DataType;
} McAcpAxProcessParIDType;
#endif

#ifndef __AS__TYPE_McAcpAxCycParIDModeEnum
#define __AS__TYPE_McAcpAxCycParIDModeEnum
typedef enum McAcpAxCycParIDModeEnum
{	mcACPAX_CYCLIC_PARID_READ = 0,
	mcACPAX_CYCLIC_PARID_WRITE = 1,
} McAcpAxCycParIDModeEnum;
#endif

struct MC_BR_CyclicProcessParID_AcpAx
{	struct McAxisType(* Axis);
	unsigned long DataAddress;
	unsigned long NumberOfParIDs;
	McAcpAxCycParIDModeEnum Mode;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Enable;
	plcbit Valid;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_BR_CyclicProcessParID_AcpAx(struct MC_BR_CyclicProcessParID_AcpAx* inst);
#ifndef __AS__TYPE_McAcpAxCycParIDRefreshModeEnum
#define __AS__TYPE_McAcpAxCycParIDRefreshModeEnum
typedef enum McAcpAxCycParIDRefreshModeEnum
{	mcACPAX_CYCLIC_MULTIPLEXED = 0,
	mcACPAX_CYCLIC_EVERY_RECORD = 1,
} McAcpAxCycParIDRefreshModeEnum;
#endif

#ifndef __AS__TYPE_McAcpAxCycParIDType
#define __AS__TYPE_McAcpAxCycParIDType
typedef struct McAcpAxCycParIDType
{	unsigned short ParID;
	unsigned long VariableAddress;
	McAcpAxDataTypeEnum DataType;
	McAcpAxCycParIDRefreshModeEnum RefreshMode;
} McAcpAxCycParIDType;
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
#ifndef __AS__TYPE_ServoLimInternal_typ
#define __AS__TYPE_ServoLimInternal_typ
typedef struct ServoLimInternal_typ
{	unsigned char STEP;
	struct MC_BR_ProcessParID_AcpAx MC_BR_ProcessParID_AcpAx_0;
	McAcpAxProcessParIDType McAcpAxProcessParIDType_0;
	unsigned long AktivaciaLimSnimacov_Data;
	struct MC_BR_CyclicProcessParID_AcpAx MC_BR_CyclicProcessParID_AcpAx_0;
	McAcpAxCycParIDType McAcpAxCycParIDType_0;
	unsigned long LimSnimace_Data;
	struct TON KorekcnyCas;
} ServoLimInternal_typ;
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

struct ServoLim
{	unsigned long AxisName;
	ServoLimInternal_typ Internal;
	plcbit ENABLE;
	plcbit PositiveLimitSwitch;
	plcbit NegativeLimitSwitch;
	plcbit HomingSwitch;
	plcbit BUSY;
	plcbit Error;
};
_BUR_PUBLIC void ServoLim(struct ServoLim* inst);
