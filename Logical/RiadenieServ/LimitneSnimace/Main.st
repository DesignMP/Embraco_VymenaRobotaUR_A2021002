
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	//ENABLE pre limitnÈ snÌmaËe sa musÌ spustiù pred Power serva//
	
	//************************Bruska********************************//
	IF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Communication_READY THEN
		ServoLimSnimace_0.ENABLE:= TRUE;
	ELSE
		ServoLimSnimace_0.ENABLE:= FALSE;
	END_IF	
	ServoLimSnimace_0.AxisName:= ADR(gAxis_1);
	Bruska.STAV.Servo_LimitneSnimaceBUSY:= ServoLimSnimace_0.BUSY;
	ServoLimSnimace_0.HomingSwitch:= Bruska.IN.ReferencnySnimac_IS1;
	ServoLimSnimace_0.NegativeLimitSwitch;
	ServoLimSnimace_0.PositiveLimitSwitch;
	ServoLimSnimace_0();
		
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

