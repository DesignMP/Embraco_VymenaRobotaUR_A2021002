
TYPE
	ServoCommand_typ : 	STRUCT 
		ENABLE : BOOL;
		POWER : BOOL;
		HOME : BOOL;
		JoggVPRED : BOOL;
		JoggVZAD : BOOL;
		JoggLimit_ACTIVE : BOOL;
		MoveAbsolute : BOOL;
		MoveVelocity : BOOL;
		MoveAdditive : BOOL;
		MoveTorque : BOOL;
		STOP : BOOL;
		ErrorRESET : BOOL;
		UvolniBRZDU : BOOL;
		ZabrzdiBRZDU : BOOL;
		UpdatePAR : BOOL;
	END_STRUCT;
	ServoParametre_typ : 	STRUCT 
		Acceleration : REAL;
		Deceleration : REAL;
		Velocity : REAL;
		Position : LREAL;
		AdditivePosition : LREAL;
		MoveDirection : USINT; (*0 - chod vpred, 1 - chod vzad, 10 - chod obojsmern˝*)
		JoggAcceleration : REAL;
		JoggDeceleration : REAL;
		JoggVelocity : REAL;
		JoggPoziciaLimitVPRED : LREAL;
		JoggPoziciaLimitVZAD : LREAL;
		Torque : REAL;
		TorqueVelocity : REAL;
		TorqueAcceleration : REAL;
		TorqueRamp : REAL;
		StopDeceleration : REAL; (*Rampa zastavenia po Stop*)
		ZmenaRychlosti : REAL; (*Rozsah od 0.0 do 2.0 po 0.0001, 1.0 - 100%, 2.0 - 200% *)
		ZmenaRampy : REAL; (*Rozsah od 0.1 do 2.0 po 0.0001, 1.0 - 100%, 2.0 - 200%*)
	END_STRUCT;
	ServoStatus_typ : 	STRUCT 
		ReadyToPower_ON : BOOL;
		Communication_READY : BOOL;
		Power_ON : BOOL;
		ActualPosition : LREAL;
		ActualVelocity : REAL;
		ActualTorque : REAL;
		MoveAbsolute_DONE : BOOL;
		MoveAdditive_DONE : BOOL;
		Rychlost_Dosiahnuta : BOOL;
		JoggLimit_Dosiahnuty : BOOL;
		Torque_Dosiahnuty : BOOL;
		Homing_OK : BOOL;
		Homing_BUSY : BOOL;
		MoveAbsolute_BUSY : BOOL;
		MoveVelocity_BUSY : BOOL;
		MoveAdditive_BUSY : BOOL;
		MoveTorque_BUSY : BOOL;
		Jogging_BUSY : BOOL;
		UpdatePAR_DONE : BOOL;
		STOP_ACTIVE : BOOL;
		EnableSwitch_ACTIVE : BOOL;
		HomingSwitch_ACTIVE : BOOL;
		PositiveLimitSwitch_ACTIVE : BOOL;
		NegativeLimitSwitch_ACTIVE : BOOL;
		Torque_AxisLimit_ACTIVE : BOOL;
		ERROR : BOOL;
		ERROR_ID : DINT;
		UvolnenieBrzdy_DONE : BOOL;
		ZabrzdenieBrzdy_DONE : BOOL;
	END_STRUCT;
	ServoErrorDetail_typ : 	STRUCT 
		Power_Error : BOOL;
		Power_ErrorID : DINT;
		Home_Error : BOOL;
		Home_ErrorID : DINT;
		JoggLimit_Error : BOOL;
		JoggLimit_ErrorID : DINT;
		Jogg_Error : BOOL;
		Jogg_ErrorID : DINT;
		MoveAbsolute_Error : BOOL;
		MoveAbsolute_ErrorID : DINT;
		MoveAdditive_Error : BOOL;
		MoveAdditive_ErrorID : DINT;
		MoveVelocity_Error : BOOL;
		MoveVelocity_ErrorID : DINT;
		MoveTorque_Error : BOOL;
		MoveTorque_ErrorID : DINT;
		Stop_Error : BOOL;
		Stop_ErrorID : DINT;
		BreakOperation_Error : BOOL;
		BreakOperation_ErrorID : DINT;
	END_STRUCT;
	ServoHomeParametre_typ : 	STRUCT 
		Position : LREAL; (*Offset od home pozÌcie, alebo offset od absolutneho snÌmaËa*)
		StartVelocity : REAL; (*R˝chlosù hladanie snÌmaËa*)
		HomingVelocity : REAL; (*R˝chlosù zostupu zo snÌmaËa*)
		Acceleration : REAL;
		HomeTorque : REAL; (*Moment na ktorom servo zastane a znuluje sa*)
		HomingOffset : LREAL; (*Offset od homing pozÌcie*)
		HomingMode : USINT; (*0 - direct, 1 - referenËn˝ snÌmaË, 2 - limitn˝ snÌmaË, 3 - absolutn˝ snÌmaË, 4 - moment*)
	END_STRUCT;
	ServoInternal_typ : 	STRUCT 
		MC_Power_0 : MC_Power;
		MC_ReadAxisInfo_0 : MC_ReadAxisInfo;
		MC_Home_0 : MC_Home;
		MC_ReadAxisError_0 : MC_ReadAxisError;
		MC_ReadStatus_0 : MC_ReadStatus;
		MC_BR_JogLimitPosition_0 : MC_BR_JogLimitPosition;
		MC_MoveAbsolute_0 : MC_MoveAbsolute;
		MC_MoveAdditive_0 : MC_MoveAdditive;
		MC_MoveVelocity_0 : MC_MoveVelocity;
		MC_Reset_0 : MC_Reset;
		MC_TorqueControl_0 : MC_TorqueControl; (*Iba pre servo*)
		MC_Stop_0 : MC_Stop;
		MC_BR_BrakeOperation_0 : MC_BR_BrakeOperation;
		MC_ReadActualPosition_0 : MC_ReadActualPosition;
		MC_ReadActualVelocity_0 : MC_ReadActualVelocity;
		MC_ReadActualTorque_0 : MC_ReadActualTorque; (*Iba pre servo*)
		MC_SetOverride_0 : MC_SetOverride;
		MC_BR_JogVelocity_0 : MC_BR_JogVelocity;
		MC_BR_InitHome_AcpAx_0 : MC_BR_InitHome_AcpAx;
		Home_STEP : USINT;
		CasTorque : TON;
	END_STRUCT;
	KrokacCommand_typ : 	STRUCT 
		ENABLE : BOOL;
		POWER : BOOL;
		HOME : BOOL;
		JoggVPRED : BOOL;
		JoggVZAD : BOOL;
		JoggLimit_ACTIVE : BOOL;
		MoveAbsolute : BOOL;
		MoveVelocity : BOOL;
		MoveAdditive : BOOL;
		STOP : BOOL;
		ErrorRESET : BOOL;
		UvolniBRZDU : BOOL;
		ZabrzdiBRZDU : BOOL;
		UpdatePAR : BOOL;
	END_STRUCT;
	KrokacParametre_typ : 	STRUCT 
		Acceleration : REAL;
		Deceleration : REAL;
		Velocity : REAL;
		Position : LREAL;
		AdditivePosition : LREAL;
		MoveDirection : USINT; (*0 - chod vpred, 1 - chod vzad, 10 - chod obojsmern˝*)
		JoggAcceleration : REAL;
		JoggDeceleration : REAL;
		JoggVelocity : REAL;
		JoggPoziciaLimitVPRED : LREAL;
		JoggPoziciaLimitVZAD : LREAL;
		StopDeceleration : REAL; (*Rampa zastavenia po Stop*)
		ZmenaRychlosti : REAL; (*Rozsah od 0.0 do 2.0 po 0.0001, 1.0 - 100%, 2.0 - 200% *)
		ZmenaRampy : REAL; (*Rozsah od 0.1 do 2.0 po 0.0001, 1.0 - 100%, 2.0 - 200%*)
	END_STRUCT;
	KrokacStatus_typ : 	STRUCT 
		ReadyToPower_ON : BOOL;
		Communication_READY : BOOL;
		Power_ON : BOOL;
		ActualPosition : LREAL;
		ActualVelocity : REAL;
		MoveAbsolute_DONE : BOOL;
		MoveAdditive_DONE : BOOL;
		Rychlost_Dosiahnuta : BOOL;
		JoggLimit_Dosiahnuty : BOOL;
		Homing_OK : BOOL;
		Homing_BUSY : BOOL;
		MoveAbsolute_BUSY : BOOL;
		MoveVelocity_BUSY : BOOL;
		MoveAdditive_BUSY : BOOL;
		Jogging_BUSY : BOOL;
		UpdatePAR_DONE : BOOL;
		STOP_ACTIVE : BOOL;
		EnableSwitch_ACTIVE : BOOL;
		HomingSwitch_ACTIVE : BOOL;
		PositiveLimitSwitch_ACTIVE : BOOL;
		NegativeLimitSwitch_ACTIVE : BOOL;
		ERROR : BOOL;
		ERROR_ID : DINT;
		UvolnenieBrzdy_DONE : BOOL;
		ZabrzdenieBrzdy_DONE : BOOL;
	END_STRUCT;
	KrokacErrorDetail_typ : 	STRUCT 
		Power_Error : BOOL;
		Power_ErrorID : DINT;
		Home_Error : BOOL;
		Home_ErrorID : DINT;
		JoggLimit_Error : BOOL;
		JoggLimit_ErrorID : DINT;
		Jogg_Error : BOOL;
		Jogg_ErrorID : DINT;
		MoveAbsolute_Error : BOOL;
		MoveAbsolute_ErrorID : DINT;
		MoveAdditive_Error : BOOL;
		MoveAdditive_ErrorID : DINT;
		MoveVelocity_Error : BOOL;
		MoveVelocity_ErrorID : DINT;
		Stop_Error : BOOL;
		Stop_ErrorID : DINT;
		BreakOperation_Error : BOOL;
		BreakOperation_ErrorID : DINT;
		HomeSetup_Error : BOOL;
		HomeSetup_ErrorID : DINT;
	END_STRUCT;
	KrokacHomeParametre_typ : 	STRUCT 
		Position : LREAL; (*Offset od home pozÌcie*)
		StartVelocity : REAL; (*R˝chlosù hladanie snÌmaËa*)
		HomingVelocity : REAL; (*R˝chlosù zostupu zo snÌmaËa*)
		Acceleration : REAL;
		HomingMode : USINT; (*0 - direct, 1 - referenËn˝ snÌmaË, 2 - limitn˝ snÌmaË*)
	END_STRUCT;
	KrokacInternal_typ : 	STRUCT 
		MC_Power_0 : MC_Power;
		MC_ReadAxisInfo_0 : MC_ReadAxisInfo;
		MC_Home_0 : MC_Home;
		MC_ReadAxisError_0 : MC_ReadAxisError;
		MC_ReadStatus_0 : MC_ReadStatus;
		MC_BR_JogLimitPosition_0 : MC_BR_JogLimitPosition;
		MC_MoveAbsolute_0 : MC_MoveAbsolute;
		MC_MoveAdditive_0 : MC_MoveAdditive;
		MC_MoveVelocity_0 : MC_MoveVelocity;
		MC_Reset_0 : MC_Reset;
		MC_Stop_0 : MC_Stop;
		MC_BR_BrakeOperation_0 : MC_BR_BrakeOperation;
		MC_ReadActualPosition_0 : MC_ReadActualPosition;
		MC_ReadActualVelocity_0 : MC_ReadActualVelocity;
		MC_SetOverride_0 : MC_SetOverride;
		MC_BR_JogVelocity_0 : MC_BR_JogVelocity;
		MC_BR_InitHome_StpAx_0 : MC_BR_InitHome_StpAx;
		Home_STEP : USINT;
	END_STRUCT;
	ServoLimInternal_typ : 	STRUCT 
		STEP : USINT;
		MC_BR_ProcessParID_AcpAx_0 : MC_BR_ProcessParID_AcpAx;
		McAcpAxProcessParIDType_0 : McAcpAxProcessParIDType;
		AktivaciaLimSnimacov_Data : UDINT;
		MC_BR_CyclicProcessParID_AcpAx_0 : MC_BR_CyclicProcessParID_AcpAx;
		McAcpAxCycParIDType_0 : McAcpAxCycParIDType;
		LimSnimace_Data : UDINT;
		KorekcnyCas : TON;
	END_STRUCT;
END_TYPE
