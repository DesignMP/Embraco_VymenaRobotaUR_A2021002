
PROGRAM _INIT
	
	Bruska.ServoOtacaniaUpinacejHlavy_M1.AxisName:= ADR(gAxis_1);

	
END_PROGRAM

PROGRAM _CYCLIC
	
	//********************************************Bruska*******************************************
	//Volanie funkcie//
	Bruska.ServoOtacaniaUpinacejHlavy_M1();
	
	
	//Stav - servo READY//
	IF (Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Power_ON AND NOT Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR) THEN
		Bruska.STAV.ServoREADY:= TRUE;
	ELSE	
		Bruska.STAV.ServoREADY:= FALSE;
	END_IF
	
    //Stav - servo homing OK//
    Bruska.STAV.Servo_HomingOK:= Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Homing_OK;
    
    //Stav - servo BUSY//
	IF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Jogging_BUSY THEN
        Bruska.STAV.Servo_BUSY:= TRUE;
    ELSIF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Homing_BUSY THEN
        Bruska.STAV.Servo_BUSY:= TRUE;
    ELSIF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.MoveAbsolute_BUSY THEN
        Bruska.STAV.Servo_BUSY:= TRUE;
    ELSIF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.MoveAdditive_BUSY THEN
        Bruska.STAV.Servo_BUSY:= TRUE;
    ELSIF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.MoveVelocity_BUSY THEN
        Bruska.STAV.Servo_BUSY:= TRUE;
    ELSIF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.MoveTorque_BUSY THEN
        Bruska.STAV.Servo_BUSY:= TRUE;    
    ELSE
        Bruska.STAV.Servo_BUSY:= TRUE;
    END_IF    
	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

