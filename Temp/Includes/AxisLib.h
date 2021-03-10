/* Automation Studio generated header file */
/* Do not edit ! */
/* AxisLib  */

#ifndef _AXISLIB_
#define _AXISLIB_
#ifdef __cplusplus
extern "C" 
{
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Datatypes and datatypes of function blocks */
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

typedef struct ServoHomeParametre_typ
{	double Position;
	float StartVelocity;
	float HomingVelocity;
	float Acceleration;
	float HomeTorque;
	double HomingOffset;
	unsigned char HomingMode;
} ServoHomeParametre_typ;

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

typedef struct KrokacCommand_typ
{	plcbit ENABLE;
	plcbit POWER;
	plcbit HOME;
	plcbit JoggVPRED;
	plcbit JoggVZAD;
	plcbit JoggLimit_ACTIVE;
	plcbit MoveAbsolute;
	plcbit MoveVelocity;
	plcbit MoveAdditive;
	plcbit STOP;
	plcbit ErrorRESET;
	plcbit UvolniBRZDU;
	plcbit ZabrzdiBRZDU;
	plcbit UpdatePAR;
} KrokacCommand_typ;

typedef struct KrokacParametre_typ
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
	float StopDeceleration;
	float ZmenaRychlosti;
	float ZmenaRampy;
} KrokacParametre_typ;

typedef struct KrokacStatus_typ
{	plcbit ReadyToPower_ON;
	plcbit Communication_READY;
	plcbit Power_ON;
	double ActualPosition;
	float ActualVelocity;
	plcbit MoveAbsolute_DONE;
	plcbit MoveAdditive_DONE;
	plcbit Rychlost_Dosiahnuta;
	plcbit JoggLimit_Dosiahnuty;
	plcbit Homing_OK;
	plcbit Homing_BUSY;
	plcbit MoveAbsolute_BUSY;
	plcbit MoveVelocity_BUSY;
	plcbit MoveAdditive_BUSY;
	plcbit Jogging_BUSY;
	plcbit UpdatePAR_DONE;
	plcbit STOP_ACTIVE;
	plcbit EnableSwitch_ACTIVE;
	plcbit HomingSwitch_ACTIVE;
	plcbit PositiveLimitSwitch_ACTIVE;
	plcbit NegativeLimitSwitch_ACTIVE;
	plcbit ERROR;
	signed long ERROR_ID;
	plcbit UvolnenieBrzdy_DONE;
	plcbit ZabrzdenieBrzdy_DONE;
} KrokacStatus_typ;

typedef struct KrokacErrorDetail_typ
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
	plcbit Stop_Error;
	signed long Stop_ErrorID;
	plcbit BreakOperation_Error;
	signed long BreakOperation_ErrorID;
	plcbit HomeSetup_Error;
	signed long HomeSetup_ErrorID;
} KrokacErrorDetail_typ;

typedef struct KrokacHomeParametre_typ
{	double Position;
	float StartVelocity;
	float HomingVelocity;
	float Acceleration;
	unsigned char HomingMode;
} KrokacHomeParametre_typ;

typedef struct KrokacInternal_typ
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
	struct MC_Stop MC_Stop_0;
	struct MC_BR_BrakeOperation MC_BR_BrakeOperation_0;
	struct MC_ReadActualPosition MC_ReadActualPosition_0;
	struct MC_ReadActualVelocity MC_ReadActualVelocity_0;
	struct MC_SetOverride MC_SetOverride_0;
	struct MC_BR_JogVelocity MC_BR_JogVelocity_0;
	struct MC_BR_InitHome_StpAx MC_BR_InitHome_StpAx_0;
	unsigned char Home_STEP;
} KrokacInternal_typ;

typedef struct ServoLimInternal_typ
{	unsigned char STEP;
	struct MC_BR_ProcessParID_AcpAx MC_BR_ProcessParID_AcpAx_0;
	struct McAcpAxProcessParIDType McAcpAxProcessParIDType_0;
	unsigned long AktivaciaLimSnimacov_Data;
	struct MC_BR_CyclicProcessParID_AcpAx MC_BR_CyclicProcessParID_AcpAx_0;
	struct McAcpAxCycParIDType McAcpAxCycParIDType_0;
	unsigned long LimSnimace_Data;
	struct TON KorekcnyCas;
} ServoLimInternal_typ;

typedef struct Axis_Servo
{
	/* VAR_INPUT (analog) */
	unsigned long AxisName;
	struct ServoCommand_typ CMD;
	struct ServoParametre_typ PAR;
	struct ServoHomeParametre_typ HomePAR;
	/* VAR_OUTPUT (analog) */
	struct ServoStatus_typ STATUS;
	struct ServoErrorDetail_typ ErrorDetail;
	/* VAR (analog) */
	struct ServoInternal_typ Internal;
} Axis_Servo_typ;

typedef struct Axis_Krokac
{
	/* VAR_INPUT (analog) */
	unsigned long AxisName;
	struct KrokacCommand_typ CMD;
	struct KrokacParametre_typ PAR;
	struct KrokacHomeParametre_typ HomePAR;
	/* VAR_OUTPUT (analog) */
	struct KrokacStatus_typ STATUS;
	struct KrokacErrorDetail_typ ErrorDetail;
	/* VAR (analog) */
	struct KrokacInternal_typ Internal;
} Axis_Krokac_typ;

typedef struct ServoLim
{
	/* VAR_INPUT (analog) */
	unsigned long AxisName;
	/* VAR (analog) */
	struct ServoLimInternal_typ Internal;
	/* VAR_INPUT (digital) */
	plcbit ENABLE;
	plcbit PositiveLimitSwitch;
	plcbit NegativeLimitSwitch;
	plcbit HomingSwitch;
	/* VAR_OUTPUT (digital) */
	plcbit BUSY;
	plcbit Error;
} ServoLim_typ;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC void Axis_Servo(struct Axis_Servo* inst);
_BUR_PUBLIC void Axis_Krokac(struct Axis_Krokac* inst);
_BUR_PUBLIC void ServoLim(struct ServoLim* inst);


#ifdef __cplusplus
};
#endif
#endif /* _AXISLIB_ */

