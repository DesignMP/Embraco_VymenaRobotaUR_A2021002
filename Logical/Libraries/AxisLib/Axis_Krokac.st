
(* TODO: Add your comment here *)
FUNCTION_BLOCK Axis_Krokac
	
	//***********************************************************Power krok·Ëa*********************************************************************//
	Internal.MC_Power_0.Axis:= AxisName;
	Internal.MC_Power_0.Enable:= CMD.POWER;
	ErrorDetail.Power_Error:= Internal.MC_Power_0.Error;
	ErrorDetail.Power_ErrorID:= Internal.MC_Power_0.ErrorID;
	Internal.MC_Power_0();
	
	//***********************************************************Zobrazenie stavu krok·Ëa*********************************************************//
	Internal.MC_ReadAxisInfo_0.Axis:= AxisName;
	Internal.MC_ReadAxisInfo_0.Enable:= TRUE;
	STATUS.ReadyToPower_ON := Internal.MC_ReadAxisInfo_0.ReadyForPowerOn;
	STATUS.Communication_READY:= Internal.MC_ReadAxisInfo_0.CommunicationReady;
	STATUS.Power_ON:= Internal.MC_ReadAxisInfo_0.PowerOn;
	STATUS.Homing_OK:= Internal.MC_ReadAxisInfo_0.IsHomed;
	STATUS.EnableSwitch_ACTIVE:= Internal.MC_ReadAxisInfo_0.AdditionalInfo.DigitalInputStatus.DriveEnable;
	STATUS.HomingSwitch_ACTIVE:= Internal.MC_ReadAxisInfo_0.AdditionalInfo.DigitalInputStatus.HomingSwitch;
	STATUS.NegativeLimitSwitch_ACTIVE:=	Internal.MC_ReadAxisInfo_0.AdditionalInfo.DigitalInputStatus.NegativeLimitSwitch;
	STATUS.PositiveLimitSwitch_ACTIVE:=	Internal.MC_ReadAxisInfo_0.AdditionalInfo.DigitalInputStatus.PositiveLimitSwitch;
	Internal.MC_ReadAxisInfo_0();
	

	
	
	
	//********************************************************Porucha krok·Ëa************************************************************************//
	//Zobrazenie poruchy krok·Ëa//
	Internal.MC_ReadAxisError_0.Axis:= AxisName;
	Internal.MC_ReadAxisError_0.Enable:= CMD.ENABLE;
	STATUS.ERROR_ID:= Internal.MC_ReadAxisError_0.AxisErrorID;
	Internal.MC_ReadAxisError_0();
	
	Internal.MC_ReadStatus_0.Axis:= AxisName;
	Internal.MC_ReadStatus_0.Enable:= CMD.ENABLE;
	Internal.MC_ReadStatus_0();
	
	IF Internal.MC_Power_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_Home_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_BR_JogLimitPosition_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_BR_JogVelocity_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_MoveAbsolute_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_MoveAdditive_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_MoveVelocity_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_Stop_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_BR_BrakeOperation_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF Internal.MC_BR_InitHome_StpAx_0.Error THEN
		STATUS.ERROR:= TRUE;
	ELSIF STATUS.ERROR_ID <> 0 THEN
		STATUS.ERROR:= TRUE;
	ELSE
		STATUS.ERROR:= FALSE;
	END_IF	
		
	//Reset poruchy krok·Ëa//
	Internal.MC_Reset_0.Axis:= AxisName;
	Internal.MC_Reset_0.Execute:= CMD.ErrorRESET;
	Internal.MC_Reset_0();
	
	IF CMD.ErrorRESET THEN
		CMD.ENABLE:= FALSE;
	ELSE	
		CMD.ENABLE:= TRUE;
	END_IF	
	
	//*********************************************Homing krok·Ëa***************************************************************************//
	//Parametre homingu//
	Internal.MC_BR_InitHome_StpAx_0.Axis:= AxisName;
	Internal.MC_Home_0.Axis:= AxisName;
	IF HomePAR.HomingMode = 0 THEN //Homing na mieste
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.HomingMode:= mcHOMING_DIRECT;
	ELSIF HomePAR.HomingMode = 1 THEN //Homing na refernËn˝ snÌmaË	
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.HomingMode:= mcHOMING_SWITCH_GATE;
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.StartDirection:= mcDIR_NEGATIVE;  //Smer hladania refernËnÈho snÌmaËa
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.SwitchEdge:= mcDIR_NEGATIVE; //Typ hrany referenËnÈho snÌmaËa
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.HomingDirection:= mcDIR_POSITIVE; //Smer odchodu z referenËnÈho snÌmaËa
	ELSIF HomePAR.HomingMode = 2 THEN //Homing na limitn˝ snÌmaË
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.HomingMode:= mcHOMING_LIMIT_SWITCH;
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.SwitchEdge:= mcDIR_NEGATIVE; //Typ hrany referenËnÈho snÌmaËa
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.HomingDirection:= mcDIR_POSITIVE; //Smer odchodu z referenËnÈho snÌmaËa
	ELSE	
		Internal.MC_BR_InitHome_StpAx_0.HomingParameters.HomingMode:= mcHOMING_DIRECT;
	END_IF	
	Internal.MC_BR_InitHome_StpAx_0.HomingParameters.Acceleration:= HomePAR.Acceleration;
	Internal.MC_BR_InitHome_StpAx_0.HomingParameters.HomingVelocity:= HomePAR.HomingVelocity;
	Internal.MC_BR_InitHome_StpAx_0.HomingParameters.Position:= HomePAR.Position;
	Internal.MC_BR_InitHome_StpAx_0.HomingParameters.StartVelocity:= HomePAR.StartVelocity;
	Internal.MC_BR_InitHome_StpAx_0.HomingParameters.ReferencePulse:= mcSWITCH_OFF; 
	Internal.MC_BR_InitHome_StpAx_0.HomingParameters.KeepDirection:= mcSWITCH_OFF;
	Internal.MC_Home_0.HomingMode:= mcHOMING_INIT;
	Internal.MC_Home_0.BufferMode:= mcABORTING;
	STATUS.Homing_BUSY:= Internal.MC_Home_0.Busy;
	ErrorDetail.Home_Error:= Internal.MC_Home_0.Error;
	ErrorDetail.Home_ErrorID:= Internal.MC_Home_0.ErrorID;
	Internal.MC_BR_InitHome_StpAx_0();
	Internal.MC_Home_0();
	
	
	
	CASE Internal.Home_STEP OF
		
		0: //Nulovanie//
			Internal.MC_BR_InitHome_StpAx_0.Execute:= FALSE;
			Internal.MC_Home_0.Execute:= FALSE;
			IF NOT CMD.HOME AND NOT Internal.MC_BR_InitHome_StpAx_0.Error AND NOT Internal.MC_Home_0.Error THEN
				Internal.Home_STEP:= 1;
			END_IF	
	
			
		1: //»akanie na spustenie homingu//
			IF CMD.HOME THEN
				Internal.Home_STEP:= 2;
			END_IF	
		
				
		2: //NaËÌtanie parametrov homingu//
			Internal.MC_BR_InitHome_StpAx_0.Execute:= TRUE;
			IF Internal.MC_BR_InitHome_StpAx_0.Error THEN
				Internal.Home_STEP:= 0;
			ELSIF Internal.MC_BR_InitHome_StpAx_0.Done THEN
				Internal.MC_BR_InitHome_StpAx_0.Execute:= FALSE;
				Internal.Home_STEP:= 3;
			END_IF
		
		3: //Spustenie homingu
			Internal.MC_Home_0.Execute:= TRUE;
			IF Internal.MC_Home_0.Error THEN
				Internal.Home_STEP:= 0;
			ELSIF Internal.MC_Home_0.Done THEN
				Internal.Home_STEP:= 0;
			ELSIF NOT CMD.HOME THEN
				Internal.Home_STEP:= 0;
			END_IF	
	END_CASE	
	
	
	

	
	
	
	
	//*********************************************Jogging krok·Ëa**************************************************************************//
	
	IF (CMD.JoggVPRED OR CMD.JoggVZAD) AND NOT CMD.JoggLimit_ACTIVE AND CMD.ENABLE THEN
		Internal.MC_BR_JogLimitPosition_0.Enable:= FALSE;
		Internal.MC_BR_JogVelocity_0.Enable:= TRUE;
		STATUS.Jogging_BUSY:= Internal.MC_BR_JogVelocity_0.Jogging;
	ELSIF (CMD.JoggVPRED OR CMD.JoggVZAD) AND CMD.JoggLimit_ACTIVE AND CMD.ENABLE THEN	
		Internal.MC_BR_JogVelocity_0.Enable:= FALSE;
		Internal.MC_BR_JogLimitPosition_0.Enable:= TRUE;
		STATUS.Jogging_BUSY:= Internal.MC_BR_JogLimitPosition_0.Jogging;
	ELSE
		Internal.MC_BR_JogVelocity_0.Enable:= FALSE;
		Internal.MC_BR_JogLimitPosition_0.Enable:= FALSE;
	END_IF	
		
	
	
	//Norm·lny jogg//
	Internal.MC_BR_JogVelocity_0.Axis:= AxisName;
	Internal.MC_BR_JogVelocity_0.Acceleration:= PAR.JoggAcceleration;
	Internal.MC_BR_JogVelocity_0.Deceleration:= PAR.JoggDeceleration;
	Internal.MC_BR_JogVelocity_0.Velocity:= PAR.JoggVelocity;
	Internal.MC_BR_JogVelocity_0.Jerk:= 0.0;
	Internal.MC_BR_JogVelocity_0.JogPositive:= CMD.JoggVPRED;
	Internal.MC_BR_JogVelocity_0.JogNegative:= CMD.JoggVZAD;
	ErrorDetail.Jogg_Error:= Internal.MC_BR_JogVelocity_0.Error;
	ErrorDetail.Jogg_ErrorID:= Internal.MC_BR_JogVelocity_0.ErrorID;
	Internal.MC_BR_JogVelocity_0();
	
	
	
	
	//Limitn˝ jogg//
	Internal.MC_BR_JogLimitPosition_0.Axis:= AxisName;
	IF STATUS.ActualPosition >= PAR.JoggPoziciaLimitVPRED THEN
		Internal.MC_BR_JogLimitPosition_0.LastPosition:= STATUS.ActualPosition;	
	ELSE
		Internal.MC_BR_JogLimitPosition_0.LastPosition:= PAR.JoggPoziciaLimitVPRED;	
	END_IF	
	IF STATUS.ActualPosition <= PAR.JoggPoziciaLimitVZAD THEN
		Internal.MC_BR_JogLimitPosition_0.FirstPosition:= STATUS.ActualPosition;
	ELSE
		Internal.MC_BR_JogLimitPosition_0.FirstPosition:= PAR.JoggPoziciaLimitVZAD;
	END_IF	
	Internal.MC_BR_JogLimitPosition_0.Acceleration:= PAR.JoggAcceleration;
	Internal.MC_BR_JogLimitPosition_0.Deceleration:= PAR.JoggDeceleration;
	Internal.MC_BR_JogLimitPosition_0.Jerk:= 0.0;
	Internal.MC_BR_JogLimitPosition_0.JogPositive:= CMD.JoggVPRED;
	Internal.MC_BR_JogLimitPosition_0.JogNegative:= CMD.JoggVZAD;
	Internal.MC_BR_JogLimitPosition_0.Velocity:= PAR.JoggVelocity;
	STATUS.JoggLimit_Dosiahnuty:= Internal.MC_BR_JogLimitPosition_0.LimitReached;
	ErrorDetail.JoggLimit_Error:= Internal.MC_BR_JogLimitPosition_0.Error;
	ErrorDetail.JoggLimit_ErrorID:= Internal.MC_BR_JogLimitPosition_0.ErrorID;
	Internal.MC_BR_JogLimitPosition_0();
	
	
	//********************************************Move Absolute***************************************************************************//
	Internal.MC_MoveAbsolute_0.Axis:= AxisName;
	Internal.MC_MoveAbsolute_0.Execute:= CMD.MoveAbsolute;
	Internal.MC_MoveAbsolute_0.Acceleration:= PAR.Acceleration;
	Internal.MC_MoveAbsolute_0.Deceleration:= PAR.Deceleration;
	Internal.MC_MoveAbsolute_0.BufferMode:= mcABORTING;
	IF PAR.MoveDirection = 0 THEN
		Internal.MC_MoveAbsolute_0.Direction:= mcDIR_POSITIVE;
	ELSIF PAR.MoveDirection = 1 THEN
		Internal.MC_MoveAbsolute_0.Direction:= mcDIR_NEGATIVE;
	ELSIF PAR.MoveDirection = 10 THEN
		Internal.MC_MoveAbsolute_0.Direction:= mcDIR_BOTH; 
	ELSE
		Internal.MC_MoveAbsolute_0.Direction:= 0;
	END_IF	
	Internal.MC_MoveAbsolute_0.Jerk:= 0.0;
	Internal.MC_MoveAbsolute_0.Position:= PAR.Position;
	Internal.MC_MoveAbsolute_0.Velocity:= PAR.Velocity;
	STATUS.MoveAbsolute_BUSY:= Internal.MC_MoveAbsolute_0.Busy;
	STATUS.MoveAbsolute_DONE:= Internal.MC_MoveAbsolute_0.Done;
	ErrorDetail.MoveAbsolute_Error:= Internal.MC_MoveAbsolute_0.Error;
	ErrorDetail.MoveAbsolute_ErrorID:= Internal.MC_MoveAbsolute_0.ErrorID;
	Internal.MC_MoveAbsolute_0();	
	
	
	//********************************************Move Additive*****************************************************************************//
	Internal.MC_MoveAdditive_0.Axis:= AxisName;
	Internal.MC_MoveAdditive_0.Execute:= CMD.MoveAdditive; 
	Internal.MC_MoveAdditive_0.Acceleration:= PAR.Acceleration;
	Internal.MC_MoveAdditive_0.Deceleration:= PAR.Deceleration;
	Internal.MC_MoveAdditive_0.Distance:= PAR.AdditivePosition;
	Internal.MC_MoveAdditive_0.Velocity:= PAR.Velocity;
	Internal.MC_MoveAdditive_0.BufferMode:= mcABORTING;
	Internal.MC_MoveAdditive_0.Jerk:= 0.0;
	STATUS.MoveAdditive_BUSY:= Internal.MC_MoveAdditive_0.Busy;
	STATUS.MoveAdditive_DONE:= Internal.MC_MoveAdditive_0.Done;
	ErrorDetail.MoveAdditive_Error:= Internal.MC_MoveAdditive_0.Error;
	ErrorDetail.MoveAdditive_ErrorID:= Internal.MC_MoveAdditive_0.ErrorID;
	Internal.MC_MoveAdditive_0();	
	
	
	
	//*********************************************Move Velocity****************************************************************************//
	Internal.MC_MoveVelocity_0.Axis:= AxisName;
	Internal.MC_MoveVelocity_0.Execute:= CMD.MoveVelocity;
	Internal.MC_MoveVelocity_0.Acceleration:= PAR.Acceleration;
	Internal.MC_MoveVelocity_0.Deceleration:= PAR.Deceleration;
	Internal.MC_MoveVelocity_0.BufferMode:= mcABORTING;
	IF PAR.MoveDirection = 0 THEN
		Internal.MC_MoveVelocity_0.Direction:= mcDIR_POSITIVE;
	ELSIF PAR.MoveDirection = 1 THEN
		Internal.MC_MoveVelocity_0.Direction:= mcDIR_NEGATIVE;
	ELSIF PAR.MoveDirection = 10 THEN
		Internal.MC_MoveVelocity_0.Direction:= mcDIR_BOTH; 
	ELSE
		Internal.MC_MoveVelocity_0.Direction:= 0;
	END_IF	
	Internal.MC_MoveVelocity_0.Velocity:= PAR.Velocity; 
	Internal.MC_MoveVelocity_0.Jerk:= 0.0;
	STATUS.MoveVelocity_BUSY:= Internal.MC_MoveVelocity_0.Busy;
	STATUS.Rychlost_Dosiahnuta:= Internal.MC_MoveVelocity_0.InVelocity;
	ErrorDetail.MoveVelocity_Error:= Internal.MC_MoveVelocity_0.Error;
	ErrorDetail.MoveVelocity_ErrorID:= Internal.MC_MoveVelocity_0.ErrorID;
	Internal.MC_MoveVelocity_0();

	
			
	
	//********************************************Stop krok·Ëa******************************************************************************//
	Internal.MC_Stop_0.Axis:= AxisName;
	Internal.MC_Stop_0.Execute:= CMD.STOP;
	Internal.MC_Stop_0.Deceleration:= PAR.StopDeceleration;
	Internal.MC_Stop_0.Jerk:= 0.0;
	STATUS.STOP_ACTIVE:= Internal.MC_Stop_0.Done;
	ErrorDetail.Stop_Error:= Internal.MC_Stop_0.Error;
	ErrorDetail.Stop_ErrorID:= Internal.MC_Stop_0.ErrorID;
	Internal.MC_Stop_0();
	
	//**********************************************Ovl·danie brzdy************************************************************************//
	Internal.MC_BR_BrakeOperation_0.Axis:= AxisName;
	IF CMD.UvolniBRZDU THEN
		Internal.MC_BR_BrakeOperation_0.Command:= mcBRAKE_OPEN;
		Internal.MC_BR_BrakeOperation_0.Execute:= TRUE;
		STATUS.UvolnenieBrzdy_DONE:= Internal.MC_BR_BrakeOperation_0.Done;
	ELSIF CMD.ZabrzdiBRZDU THEN
		Internal.MC_BR_BrakeOperation_0.Command:= mcBRAKE_CLOSE;
		Internal.MC_BR_BrakeOperation_0.Execute:= TRUE;
		STATUS.ZabrzdenieBrzdy_DONE:= Internal.MC_BR_BrakeOperation_0.Done;
	ELSE	
		Internal.MC_BR_BrakeOperation_0.Execute:= FALSE;
		STATUS.UvolnenieBrzdy_DONE:= FALSE;
		STATUS.ZabrzdenieBrzdy_DONE:= FALSE;
	END_IF	
	ErrorDetail.BreakOperation_Error:= Internal.MC_BR_BrakeOperation_0.Error;
	ErrorDetail.BreakOperation_ErrorID:= Internal.MC_BR_BrakeOperation_0.ErrorID;
	Internal.MC_BR_BrakeOperation_0();
	
	
	//**********************************************Aktu·lna pozÌcia*************************************************************************//
	Internal.MC_ReadActualPosition_0.Axis:= AxisName;
	Internal.MC_ReadActualPosition_0.Enable:= CMD.ENABLE;
	STATUS.ActualPosition:=	Internal.MC_ReadActualPosition_0.Position;
	Internal.MC_ReadActualPosition_0();
		
	//**********************************************Aktu·lna r˝chlosù*************************************************************************//
	Internal.MC_ReadActualVelocity_0.Axis:= AxisName;
	Internal.MC_ReadActualVelocity_0.Enable:= CMD.ENABLE;
	STATUS.ActualVelocity:= Internal.MC_ReadActualVelocity_0.Velocity;
	Internal.MC_ReadActualVelocity_0();
	
		
	//*********************************************Zmena r˝chlosti a rampy********************************************************************//
	Internal.MC_SetOverride_0.Axis:= AxisName;
	Internal.MC_SetOverride_0.Enable:= CMD.UpdatePAR;
	IF PAR.ZmenaRampy < 0.1 THEN
		Internal.MC_SetOverride_0.AccFactor:= 0.1;
	ELSIF PAR.ZmenaRampy > 2.0 THEN
		Internal.MC_SetOverride_0.AccFactor:= 2.0;
	ELSE
		Internal.MC_SetOverride_0.AccFactor:= PAR.ZmenaRampy;
	END_IF
	IF PAR.ZmenaRychlosti < 0.1 THEN
		Internal.MC_SetOverride_0.VelFactor:= 0.1;
	ELSIF PAR.ZmenaRychlosti > 2.0 THEN
		Internal.MC_SetOverride_0.VelFactor:= 2.0;
	ELSE
		Internal.MC_SetOverride_0.VelFactor:= PAR.ZmenaRychlosti;
	END_IF	
	STATUS.UpdatePAR_DONE:= Internal.MC_SetOverride_0.Enabled;
	Internal.MC_SetOverride_0();

	
	
	
END_FUNCTION_BLOCK
