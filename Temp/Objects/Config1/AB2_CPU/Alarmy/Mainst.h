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
	plcbit OploteniePracoviska_CH1;
	plcbit OploteniePracoviska_CH2;
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
	plcbit ZonaRobot_Odblokovana;
	plcbit ZonaRobot_AKTIVNA;
	plcbit ZonaPracovisko_Odblokovana;
	plcbit ZonaPracovisko_AKTIVNA;
	plcbit CS_Pracovisko_Odblokovany;
	plcbit CS_Robot_Odblokovany;
	plcbit VyblokovanieSafety_AKTIVNE;
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
	plcbit RESET_ZonyPracovisko;
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
	plcbit TL_RR_OvladanieServa_DISABLE;
	plcbit TL_RR_HomingServa_DISABLE;
	plcbit TL_OdparkovanieRobota_DISABLE;
	unsigned char Slider;
	plcbit FarbaTlacitkaAlarm_Index;
	plcbit ZobrazSymbolAlarmu;
	unsigned char ZobrazHlasenie_ResetZariadenia;
	unsigned char PodsvietenieTlacitka_ResetCS;
} Vizu_typ;
#endif

#ifndef __AS__TYPE_ZariadenieIN_typ
#define __AS__TYPE_ZariadenieIN_typ
typedef struct ZariadenieIN_typ
{	plcbit PrepatovaOchrana_OK;
	plcbit Paletka_PritomnostKusu_OS1;
	plcbit VystupDoprav_PritomnostKusu_OS2;
	plcbit Otacac_PritomnostKusu_IS2;
	plcbit VystupDoprav_Napolohovany;
	plcbit VystupDoprav_Bezi;
	plcbit RucnyRezimStarehoZariadenia;
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

#ifndef __AS__TYPE_BruskaIN_typ
#define __AS__TYPE_BruskaIN_typ
typedef struct BruskaIN_typ
{	plcbit ReferencnySnimac_IS1;
	plcbit UpinaciaHlava_OtacanieVPRED;
	plcbit UpinaciaHlava_OtacanieVZAD;
	plcbit OchrannyKrytBrusky_Otvoreny;
	plcbit UpinaciaHlava_Otvorena;
} BruskaIN_typ;
#endif

#ifndef __AS__TYPE_BruskaOUT_typ
#define __AS__TYPE_BruskaOUT_typ
typedef struct BruskaOUT_typ
{	plcbit Stav_UpinaciaHlavaSaOtacaVPRED;
	plcbit Stav_UpinaciaHlavaSaOtacaVZAD;
	plcbit Stav_PoruchaMotoraUpinacejHlavy;
} BruskaOUT_typ;
#endif

#ifndef __AS__TYPE_BruskaPAR_typ
#define __AS__TYPE_BruskaPAR_typ
typedef struct BruskaPAR_typ
{	float Servo_JoggRychlost;
	float Servo_RychlostPolohovania;
	double Servo_PoziciaNatocenia;
} BruskaPAR_typ;
#endif

#ifndef __AS__TYPE_BruskaSTAV_typ
#define __AS__TYPE_BruskaSTAV_typ
typedef struct BruskaSTAV_typ
{	plcbit PoINIT;
	plcbit ServoREADY;
	plcbit Servo_LimitneSnimaceBUSY;
	double Servo_AktualnaPozicia;
	float Servo_AktualnaRychlost;
	plcbit Servo_HomingOK;
	plcbit Servo_BUSY;
	plcbit Servo_JoggLimitDosiahnuty;
	plcbit Servo_HomingBUSY;
	plcbit Servo_PoziciaDosiahnuta;
	double Servo_AktualnyPocetOtacok;
} BruskaSTAV_typ;
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

struct MC_Power
{	struct McAxisType(* Axis);
	signed long ErrorID;
	McInternalType Internal;
	plcbit Enable;
	plcbit Status;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_Power(struct MC_Power* inst);
#ifndef __AS__TYPE_McDigitalInputStatusType
#define __AS__TYPE_McDigitalInputStatusType
typedef struct McDigitalInputStatusType
{	plcbit HomingSwitch;
	plcbit PositiveLimitSwitch;
	plcbit NegativeLimitSwitch;
	plcbit Trigger1;
	plcbit Trigger2;
	plcbit DriveEnable;
} McDigitalInputStatusType;
#endif

#ifndef __AS__TYPE_McCommunicationStateEnum
#define __AS__TYPE_McCommunicationStateEnum
typedef enum McCommunicationStateEnum
{	mcCOMM_STATE_NOT_ACTIVE = 0,
	mcCOMM_STATE_WAITING = 100,
	mcCOMM_STATE_CONNECTED = 200,
	mcCOMM_STATE_FW_UPDATE = 300,
	mcCOMM_STATE_CONFIG = 400,
	mcCOMM_STATE_ACTIVATING = 500,
	mcCOMM_STATE_ACTIVE = 600,
	mcCOMM_STATE_INACTIVE = 700,
	mcCOMM_STATE_FAILED = 1000,
} McCommunicationStateEnum;
#endif

#ifndef __AS__TYPE_McAxisPLCopenStateEnum
#define __AS__TYPE_McAxisPLCopenStateEnum
typedef enum McAxisPLCopenStateEnum
{	mcAXIS_DISABLED = 0,
	mcAXIS_STANDSTILL = 1,
	mcAXIS_HOMING = 2,
	mcAXIS_STOPPING = 3,
	mcAXIS_DISCRETE_MOTION = 4,
	mcAXIS_CONTINUOUS_MOTION = 5,
	mcAXIS_SYNCHRONIZED_MOTION = 6,
	mcAXIS_ERRORSTOP = 7,
	mcAXIS_STARTUP = 8,
	mcAXIS_INVALID_CONFIGURATION = 9,
} McAxisPLCopenStateEnum;
#endif

#ifndef __AS__TYPE_McAddInfoType
#define __AS__TYPE_McAddInfoType
typedef struct McAddInfoType
{	McDigitalInputStatusType DigitalInputStatus;
	plcbit LagWarning;
	unsigned long StartupCount;
	McCommunicationStateEnum CommunicationState;
	McAxisPLCopenStateEnum PLCopenState;
	plcbit InMotion;
} McAddInfoType;
#endif

struct MC_ReadAxisInfo
{	struct McAxisType(* Axis);
	signed long ErrorID;
	McAddInfoType AdditionalInfo;
	McInternalType Internal;
	plcbit Enable;
	plcbit Valid;
	plcbit Busy;
	plcbit Error;
	plcbit Simulation;
	plcbit CommunicationReady;
	plcbit ReadyForPowerOn;
	plcbit PowerOn;
	plcbit IsHomed;
	plcbit AxisWarning;
};
_BUR_PUBLIC void MC_ReadAxisInfo(struct MC_ReadAxisInfo* inst);
#ifndef __AS__TYPE_McHomingModeEnum
#define __AS__TYPE_McHomingModeEnum
typedef enum McHomingModeEnum
{	mcHOMING_DIRECT = 0,
	mcHOMING_SWITCH_GATE = 1,
	mcHOMING_ABSOLUTE_SWITCH = 2,
	mcHOMING_LIMIT_SWITCH = 4,
	mcHOMING_ABSOLUTE = 5,
	mcHOMING_DCM = 7,
	mcHOMING_BLOCK_TORQUE = 9,
	mcHOMING_BLOCK_LAG_ERROR = 10,
	mcHOMING_ABSOLUTE_CORRECTION = 133,
	mcHOMING_DCM_CORRECTION = 135,
	mcHOMING_DEFAULT = 140,
	mcHOMING_INIT = 141,
	mcHOMING_RESTORE_POSITION = 142,
} McHomingModeEnum;
#endif

#ifndef __AS__TYPE_McBufferModeEnum
#define __AS__TYPE_McBufferModeEnum
typedef enum McBufferModeEnum
{	mcABORTING = 0,
	mcBUFFERED = 1,
	mcBLENDING_LOW = 2,
	mcBLENDING_PREVIOUS = 3,
	mcBLENDING_NEXT = 4,
	mcBLENDING_HIGH = 5,
} McBufferModeEnum;
#endif

struct MC_Home
{	struct McAxisType(* Axis);
	double Position;
	McHomingModeEnum HomingMode;
	McBufferModeEnum BufferMode;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit Done;
	plcbit Busy;
	plcbit Active;
	plcbit CommandAborted;
	plcbit Error;
};
_BUR_PUBLIC void MC_Home(struct MC_Home* inst);
struct MC_ReadAxisError
{	struct McAxisType(* Axis);
	signed long ErrorID;
	signed long AxisErrorID;
	signed long RecordID;
	McInternalType Internal;
	plcbit Enable;
	plcbit ReadNext;
	plcbit Valid;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_ReadAxisError(struct MC_ReadAxisError* inst);
struct MC_ReadStatus
{	struct McAxisType(* Axis);
	signed long ErrorID;
	McInternalType Internal;
	plcbit Enable;
	plcbit Valid;
	plcbit Busy;
	plcbit Error;
	plcbit ErrorStop;
	plcbit Disabled;
	plcbit Stopping;
	plcbit Homing;
	plcbit StandStill;
	plcbit DiscreteMotion;
	plcbit ContinuousMotion;
	plcbit SynchronizedMotion;
};
_BUR_PUBLIC void MC_ReadStatus(struct MC_ReadStatus* inst);
struct MC_BR_JogLimitPosition
{	struct McAxisType(* Axis);
	double FirstPosition;
	double LastPosition;
	float Velocity;
	float Acceleration;
	float Deceleration;
	float Jerk;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Enable;
	plcbit JogPositive;
	plcbit JogNegative;
	plcbit Ready;
	plcbit Busy;
	plcbit CommandAborted;
	plcbit Error;
	plcbit Jogging;
	plcbit LimitReached;
};
_BUR_PUBLIC void MC_BR_JogLimitPosition(struct MC_BR_JogLimitPosition* inst);
#ifndef __AS__TYPE_McDirectionEnum
#define __AS__TYPE_McDirectionEnum
typedef enum McDirectionEnum
{	mcDIR_POSITIVE = 0,
	mcDIR_NEGATIVE = 1,
	mcDIR_CURRENT = 2,
	mcDIR_SHORTEST_WAY = 3,
	mcDIR_EXCEED_PERIOD = 8,
	mcDIR_UNDEFINED = 9,
	mcDIR_BOTH = 10,
} McDirectionEnum;
#endif

struct MC_MoveAbsolute
{	struct McAxisType(* Axis);
	double Position;
	float Velocity;
	float Acceleration;
	float Deceleration;
	float Jerk;
	McDirectionEnum Direction;
	McBufferModeEnum BufferMode;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit Done;
	plcbit Busy;
	plcbit Active;
	plcbit CommandAborted;
	plcbit Error;
};
_BUR_PUBLIC void MC_MoveAbsolute(struct MC_MoveAbsolute* inst);
struct MC_MoveAdditive
{	struct McAxisType(* Axis);
	double Distance;
	float Velocity;
	float Acceleration;
	float Deceleration;
	float Jerk;
	McBufferModeEnum BufferMode;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit Done;
	plcbit Busy;
	plcbit Active;
	plcbit CommandAborted;
	plcbit Error;
};
_BUR_PUBLIC void MC_MoveAdditive(struct MC_MoveAdditive* inst);
struct MC_MoveVelocity
{	struct McAxisType(* Axis);
	float Velocity;
	float Acceleration;
	float Deceleration;
	float Jerk;
	McDirectionEnum Direction;
	McBufferModeEnum BufferMode;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit InVelocity;
	plcbit Busy;
	plcbit Active;
	plcbit CommandAborted;
	plcbit Error;
};
_BUR_PUBLIC void MC_MoveVelocity(struct MC_MoveVelocity* inst);
struct MC_Reset
{	struct McAxisType(* Axis);
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit Done;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_Reset(struct MC_Reset* inst);
struct MC_TorqueControl
{	struct McAxisType(* Axis);
	float Torque;
	float TorqueRamp;
	float Velocity;
	float Acceleration;
	float Jerk;
	McBufferModeEnum BufferMode;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit InTorque;
	plcbit Busy;
	plcbit Active;
	plcbit CommandAborted;
	plcbit Error;
	plcbit AxisLimitActive;
};
_BUR_PUBLIC void MC_TorqueControl(struct MC_TorqueControl* inst);
struct MC_Stop
{	struct McAxisType(* Axis);
	float Deceleration;
	float Jerk;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit Done;
	plcbit Busy;
	plcbit CommandAborted;
	plcbit Error;
};
_BUR_PUBLIC void MC_Stop(struct MC_Stop* inst);
#ifndef __AS__TYPE_McBrakeCmdEnum
#define __AS__TYPE_McBrakeCmdEnum
typedef enum McBrakeCmdEnum
{	mcBRAKE_CLOSE = 0,
	mcBRAKE_OPEN = 1,
	mcBRAKE_GET_STATUS = 2,
} McBrakeCmdEnum;
#endif

#ifndef __AS__TYPE_McBrakeStatusEnum
#define __AS__TYPE_McBrakeStatusEnum
typedef enum McBrakeStatusEnum
{	mcBRAKE_STATUS_NOT_PROVIDED = 0,
	mcBRAKE_CLOSED = 1,
	mcBRAKE_OPENED = 2,
} McBrakeStatusEnum;
#endif

struct MC_BR_BrakeOperation
{	struct McAxisType(* Axis);
	McBrakeCmdEnum Command;
	signed long ErrorID;
	McBrakeStatusEnum BrakeStatus;
	McInternalType Internal;
	plcbit Execute;
	plcbit Done;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_BR_BrakeOperation(struct MC_BR_BrakeOperation* inst);
struct MC_ReadActualPosition
{	struct McAxisType(* Axis);
	signed long ErrorID;
	double Position;
	McInternalType Internal;
	plcbit Enable;
	plcbit Valid;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_ReadActualPosition(struct MC_ReadActualPosition* inst);
struct MC_ReadActualVelocity
{	struct McAxisType(* Axis);
	signed long ErrorID;
	float Velocity;
	McInternalType Internal;
	plcbit Enable;
	plcbit Valid;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_ReadActualVelocity(struct MC_ReadActualVelocity* inst);
struct MC_ReadActualTorque
{	struct McAxisType(* Axis);
	signed long ErrorID;
	float Torque;
	McInternalType Internal;
	plcbit Enable;
	plcbit Valid;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_ReadActualTorque(struct MC_ReadActualTorque* inst);
struct MC_SetOverride
{	struct McAxisType(* Axis);
	float VelFactor;
	float AccFactor;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Enable;
	plcbit Enabled;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_SetOverride(struct MC_SetOverride* inst);
struct MC_BR_JogVelocity
{	struct McAxisType(* Axis);
	float Velocity;
	float Acceleration;
	float Deceleration;
	float Jerk;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Enable;
	plcbit JogPositive;
	plcbit JogNegative;
	plcbit Ready;
	plcbit Busy;
	plcbit CommandAborted;
	plcbit Error;
	plcbit Jogging;
};
_BUR_PUBLIC void MC_BR_JogVelocity(struct MC_BR_JogVelocity* inst);
#ifndef __AS__TYPE_McSwitchEnum
#define __AS__TYPE_McSwitchEnum
typedef enum McSwitchEnum
{	mcSWITCH_OFF = 0,
	mcSWITCH_ON = 1,
} McSwitchEnum;
#endif

#ifndef __AS__TYPE_McAcpAxHomingParType
#define __AS__TYPE_McAcpAxHomingParType
typedef struct McAcpAxHomingParType
{	McHomingModeEnum HomingMode;
	double Position;
	float StartVelocity;
	float HomingVelocity;
	float Acceleration;
	McDirectionEnum SwitchEdge;
	McDirectionEnum StartDirection;
	McDirectionEnum HomingDirection;
	McSwitchEnum ReferencePulse;
	McSwitchEnum KeepDirection;
	float ReferencePulseBlockingDistance;
	float TorqueLimit;
	float BlockDetectionPositionError;
	float PositionErrorStopLimit;
	unsigned long RestorePositionVariableAddress;
} McAcpAxHomingParType;
#endif

struct MC_BR_InitHome_AcpAx
{	struct McAxisType(* Axis);
	McAcpAxHomingParType HomingParameters;
	signed long ErrorID;
	McInternalType Internal;
	plcbit Execute;
	plcbit Done;
	plcbit Busy;
	plcbit Error;
};
_BUR_PUBLIC void MC_BR_InitHome_AcpAx(struct MC_BR_InitHome_AcpAx* inst);
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
#ifndef __AS__TYPE_ServoInternal_typ
#define __AS__TYPE_ServoInternal_typ
typedef struct ServoInternal_typ
{	struct MC_Power MC_Power_0;
	struct MC_ReadAxisInfo MC_ReadAxisInfo_0;
	struct MC_Home MC_Home_0;
	struct MC_ReadAxisError MC_ReadAxisError_0;
	struct MC_ReadStatus MC_ReadStatus_0;
	struct MC_BR_JogLimitPosition MC_BR_JogLimitPosition_0;
	struct MC_MoveAbsolute MC_MoveAbsolute_0;
	struct MC_MoveAdditive MC_MoveAdditive_0;
	struct MC_MoveVelocity MC_MoveVelocity_0;
	struct MC_Reset MC_Reset_0;
	struct MC_TorqueControl MC_TorqueControl_0;
	struct MC_Stop MC_Stop_0;
	struct MC_BR_BrakeOperation MC_BR_BrakeOperation_0;
	struct MC_ReadActualPosition MC_ReadActualPosition_0;
	struct MC_ReadActualVelocity MC_ReadActualVelocity_0;
	struct MC_ReadActualTorque MC_ReadActualTorque_0;
	struct MC_SetOverride MC_SetOverride_0;
	struct MC_BR_JogVelocity MC_BR_JogVelocity_0;
	struct MC_BR_InitHome_AcpAx MC_BR_InitHome_AcpAx_0;
	unsigned char Home_STEP;
	struct TON CasTorque;
} ServoInternal_typ;
#endif

#ifndef __AS__TYPE_ServoCommand_typ
#define __AS__TYPE_ServoCommand_typ
typedef struct ServoCommand_typ
{	plcbit ENABLE;
	plcbit POWER;
	plcbit HOME;
	plcbit JoggVPRED;
	plcbit JoggVZAD;
	plcbit JoggLimit_ACTIVE;
	plcbit MoveAbsolute;
	plcbit MoveVelocity;
	plcbit MoveAdditive;
	plcbit MoveTorque;
	plcbit STOP;
	plcbit ErrorRESET;
	plcbit UvolniBRZDU;
	plcbit ZabrzdiBRZDU;
	plcbit UpdatePAR;
} ServoCommand_typ;
#endif

#ifndef __AS__TYPE_ServoParametre_typ
#define __AS__TYPE_ServoParametre_typ
typedef struct ServoParametre_typ
{	float Acceleration;
	float Deceleration;
	float Velocity;
	double Position;
	double AdditivePosition;
	unsigned char MoveDirection;
	float JoggAcceleration;
	float JoggDeceleration;
	float JoggVelocity;
	double JoggPoziciaLimitVPRED;
	double JoggPoziciaLimitVZAD;
	float Torque;
	float TorqueVelocity;
	float TorqueAcceleration;
	float TorqueRamp;
	float StopDeceleration;
	float ZmenaRychlosti;
	float ZmenaRampy;
} ServoParametre_typ;
#endif

#ifndef __AS__TYPE_ServoHomeParametre_typ
#define __AS__TYPE_ServoHomeParametre_typ
typedef struct ServoHomeParametre_typ
{	double Position;
	float StartVelocity;
	float HomingVelocity;
	float Acceleration;
	float HomeTorque;
	double HomingOffset;
	unsigned char HomingMode;
} ServoHomeParametre_typ;
#endif

#ifndef __AS__TYPE_ServoStatus_typ
#define __AS__TYPE_ServoStatus_typ
typedef struct ServoStatus_typ
{	plcbit ReadyToPower_ON;
	plcbit Communication_READY;
	plcbit Power_ON;
	double ActualPosition;
	float ActualVelocity;
	float ActualTorque;
	plcbit MoveAbsolute_DONE;
	plcbit MoveAdditive_DONE;
	plcbit Rychlost_Dosiahnuta;
	plcbit JoggLimit_Dosiahnuty;
	plcbit Torque_Dosiahnuty;
	plcbit Homing_OK;
	plcbit Homing_BUSY;
	plcbit MoveAbsolute_BUSY;
	plcbit MoveVelocity_BUSY;
	plcbit MoveAdditive_BUSY;
	plcbit MoveTorque_BUSY;
	plcbit Jogging_BUSY;
	plcbit UpdatePAR_DONE;
	plcbit STOP_ACTIVE;
	plcbit EnableSwitch_ACTIVE;
	plcbit HomingSwitch_ACTIVE;
	plcbit PositiveLimitSwitch_ACTIVE;
	plcbit NegativeLimitSwitch_ACTIVE;
	plcbit Torque_AxisLimit_ACTIVE;
	plcbit ERROR;
	signed long ERROR_ID;
	plcbit UvolnenieBrzdy_DONE;
	plcbit ZabrzdenieBrzdy_DONE;
} ServoStatus_typ;
#endif

#ifndef __AS__TYPE_ServoErrorDetail_typ
#define __AS__TYPE_ServoErrorDetail_typ
typedef struct ServoErrorDetail_typ
{	plcbit Power_Error;
	signed long Power_ErrorID;
	plcbit Home_Error;
	signed long Home_ErrorID;
	plcbit JoggLimit_Error;
	signed long JoggLimit_ErrorID;
	plcbit Jogg_Error;
	signed long Jogg_ErrorID;
	plcbit MoveAbsolute_Error;
	signed long MoveAbsolute_ErrorID;
	plcbit MoveAdditive_Error;
	signed long MoveAdditive_ErrorID;
	plcbit MoveVelocity_Error;
	signed long MoveVelocity_ErrorID;
	plcbit MoveTorque_Error;
	signed long MoveTorque_ErrorID;
	plcbit Stop_Error;
	signed long Stop_ErrorID;
	plcbit BreakOperation_Error;
	signed long BreakOperation_ErrorID;
} ServoErrorDetail_typ;
#endif

struct Axis_Servo
{	unsigned long AxisName;
	ServoCommand_typ CMD;
	ServoParametre_typ PAR;
	ServoHomeParametre_typ HomePAR;
	ServoStatus_typ STATUS;
	ServoErrorDetail_typ ErrorDetail;
	ServoInternal_typ Internal;
};
_BUR_PUBLIC void Axis_Servo(struct Axis_Servo* inst);
#ifndef __AS__TYPE_Bruska_typ
#define __AS__TYPE_Bruska_typ
typedef struct Bruska_typ
{	BruskaIN_typ IN;
	BruskaOUT_typ OUT;
	BruskaPAR_typ PAR;
	BruskaSTAV_typ STAV;
	plcbit Automat;
	plcbit Manual;
	plcbit Reset;
	plcbit KoniecCyklu;
	struct Axis_Servo ServoOtacaniaUpinacejHlavy_M1;
	plcbit Servo_STOP;
	plcbit Servo_JoggVPRED;
	plcbit Servo_JoggVZAD;
	plcbit Servo_HOME_SWITCH;
	plcbit Servo_HOME_DIRECT;
	plcbit Servo_POLOHUJ;
	plcbit Servo_MOVE;
} Bruska_typ;
#endif

#ifndef __AS__TYPE_HardwareSTAV_typ
#define __AS__TYPE_HardwareSTAV_typ
typedef struct HardwareSTAV_typ
{	plcbit KartaAB1_ProfinetMaster_OK;
	plcbit KartaAB3_NapajanieCPU_OK;
	plcbit KartaAB4_SafetyMaster_OK;
	plcbit KartaAB5_16DI_OK;
	plcbit KartaAB6_16DI_OK;
	plcbit KartaAB7_16DO_OK;
	plcbit Komunikacia_Robot_OK;
} HardwareSTAV_typ;
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

_BUR_PUBLIC unsigned long brsmemset(unsigned long pDest, unsigned char value, unsigned long length);
_BUR_LOCAL unsigned char a;
_BUR_LOCAL struct TON CasResetovaniaServa;
_BUR_LOCAL struct TON CasKontroly_KarietPLC;
_BUR_LOCAL struct TON CasKontroly_Robota;
_BUR_LOCAL struct TON CasPoruchyServa;
_GLOBAL plcbit Blikac500ms;
_GLOBAL Vizu_typ Vizu;
_GLOBAL Safety_typ Safety;
_GLOBAL Zariadenie_typ Zariadenie;
_GLOBAL HardwareSTAV_typ StavHardware;
_GLOBAL Bruska_typ Bruska;
_GLOBAL plcbit Alarmy[101];
_GLOBAL plcbit NastalaPorucha;
_GLOBAL plcbit PotvrdenieAlarmov;
_GLOBAL plcbit PoruchaBrusky;
_GLOBAL plcbit PoruchaRobota;
_LOCAL plcbit Edge0000100000;
_LOCAL plcbit Edge0000100001;
_LOCAL plcbit Edge0000100002;
