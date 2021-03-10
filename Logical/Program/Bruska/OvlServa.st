
ACTION OvlServa: 

	
	//**************************Axis 1***********************************//
	//1 otáèka serva = 0.76 otáèky upínacej hlavy//
	//Motor má klasický encodér a brzdu//
	
    //ENABLE serva//
    IF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Communication_READY THEN
        Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ENABLE:= TRUE;
    ELSE
        Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ENABLE:= FALSE;
    END_IF    
    
    
	//POWER ON serva//
	CasPowerON.IN:= Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ReadyToPower_ON AND Bruska.STAV.Servo_LimitneSnimaceBUSY AND Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.EnableSwitch_ACTIVE AND NOT Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR;
	IF CasPowerON.Q THEN
		Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.POWER:= TRUE;
	ELSE
		Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.POWER:= FALSE;
	END_IF	
	
	CasPowerON.PT:= T#1s;
	CasPowerON();
	
	
	
	
	
	
	
	
	
	
	//Zobrazenie stavou a parametrov serva//
	Bruska.STAV.Servo_AktualnaPozicia:= Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ActualPosition;
	Bruska.STAV.Servo_AktualnaRychlost:= Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ActualVelocity;
	Bruska.STAV.Servo_HomingOK:= Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Homing_OK;
	Bruska.STAV.Servo_BUSY:= Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.MoveAbsolute_BUSY;
	Bruska.STAV.Servo_JoggLimitDosiahnuty:= Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.JoggLimit_Dosiahnuty;
	
	
	//Zadané parametre serva//
	Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.Acceleration:= 200;
	Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.HomingVelocity:= 5;
	Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.StartVelocity:= 20;
	Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.Position:= 0;    //Offset homing pozície pre absolutny snímaè
	
    
	
	Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.Acceleration:= Bruska.PAR.Servo_RychlostPolohovania*10;
	Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.Deceleration:= Bruska.PAR.Servo_RychlostPolohovania*10;
	Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.StopDeceleration:= Bruska.PAR.Servo_RychlostPolohovania*10;
	Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.Velocity:= Bruska.PAR.Servo_RychlostPolohovania; 
    Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.Position:= Bruska.PAR.Servo_PoziciaNatocenia;
    
    Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.JoggAcceleration:= Bruska.PAR.Servo_JoggRychlost*10;
    Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.JoggDeceleration:= Bruska.PAR.Servo_JoggRychlost*10;
    Bruska.ServoOtacaniaUpinacejHlavy_M1.PAR.JoggVelocity:= Bruska.PAR.Servo_JoggRychlost;
		
	
	//Zastavenie pohybu serva//
	IF Bruska.Servo_STOP THEN
		Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.STOP:= TRUE;
		CasZastaveniaServa.IN:= TRUE;
		SC_OvlServa.Step:= 0;
		Bruska.Servo_STOP:= FALSE;
	END_IF
	
	IF CasZastaveniaServa.Q  THEN
		Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.STOP:= FALSE;
		CasZastaveniaServa.IN:= FALSE;
	END_IF	
	
	
	CasZastaveniaServa.PT:= T#2s;
	CasZastaveniaServa();
	
	
	
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_OvlServa);
	
	CASE SC_OvlServa.Step OF
		
		0:
			SC_OvlServa.StepName:= '0 - Nulovanie';
            Bruska.Servo_HOME_SWITCH:= FALSE;
            Bruska.Servo_HOME_DIRECT:= FALSE;
            Bruska.Servo_JoggVPRED:= FALSE;
            Bruska.Servo_JoggVZAD:= FALSE;
            Bruska.Servo_MOVE:= FALSE;
            Bruska.Servo_POLOHUJ:= FALSE;
			Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.HOME:= FALSE;
			Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggVPRED:= FALSE;
			Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggVZAD:= FALSE;
            Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.MoveAbsolute:= FALSE;
            Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.MoveVelocity:= FALSE;
            Bruska.STAV.Servo_HomingBUSY:= FALSE;
            								
			IF SC_Bruska.Step <> 0 AND Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Power_ON AND NOT Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR AND NOT Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.STOP_ACTIVE THEN
				SC_OvlServa.ResetStep:= TRUE;
				SC_OvlServa.Step:= 1;
			END_IF	
	
	
		1:
			SC_OvlServa.StepName:= '1 - Rozhodnutie o cinnosti';
			IF Bruska.Servo_JoggVPRED THEN
				SC_OvlServa.Step:= 10;
			ELSIF Bruska.Servo_JoggVZAD THEN
				SC_OvlServa.Step:= 20;
			ELSIF Bruska.Servo_HOME_SWITCH THEN
                SC_OvlServa.Step:= 30;
            ELSIF Bruska.Servo_HOME_DIRECT THEN
                SC_OvlServa.Step:= 40;    
			ELSIF Bruska.Servo_POLOHUJ THEN
                SC_OvlServa.Step:= 50;
            ELSIF Bruska.Servo_MOVE THEN
                SC_OvlServa.Step:= 60;
			END_IF
	
	
		10:
			SC_OvlServa.StepName:= '10 - Jogg VPRED';
			SC_OvlServa.IdleTime.PT:= T#3s;
			SC_OvlServa.AlarmTime.PT:= T#3s;
		
            						
			IF NOT SC_OvlServa.Switch1 THEN
				Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggVPRED:= TRUE;
				SC_OvlServa.Switch1:= TRUE;
			END_IF
			
			IF NOT Bruska.Servo_JoggVPRED THEN
				SC_OvlServa.ResetStep:= TRUE;
				SC_OvlServa.Step:= 0;
			END_IF	
			
			
			
		20:
			SC_OvlServa.StepName:= '20 - Jogg VZAD';
			SC_OvlServa.IdleTime.PT:= T#3s;
			SC_OvlServa.AlarmTime.PT:= T#3s;
		
            	
			
			IF NOT SC_OvlServa.Switch1 THEN
				Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggVZAD:= TRUE;
				SC_OvlServa.Switch1:= TRUE;
			END_IF
			
			IF NOT Bruska.Servo_JoggVZAD THEN
				SC_OvlServa.ResetStep:= TRUE;
				SC_OvlServa.Step:= 0;
			END_IF	
		
		
		30:
			SC_OvlServa.StepName:= '30 - Homing SWITCH';
			SC_OvlServa.IdleTime.PT:= T#500ms;
			SC_OvlServa.AlarmTime.PT:= T#3s;
		
            Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.HomingMode:= 1; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
            Bruska.STAV.Servo_HomingBUSY:= TRUE;
            
            
			IF NOT SC_OvlServa.Switch1 THEN
				Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.HOME:= TRUE;
				SC_OvlServa.IdleTime.IN:= TRUE;
				SC_OvlServa.Switch1:= TRUE;
			END_IF
		
			IF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Homing_OK AND SC_OvlServa.IdleTime.Q THEN
				SC_OvlServa.ResetStep:= TRUE;
				SC_OvlServa.Step:= 0;
			END_IF	
		
        40:
            SC_OvlServa.StepName:= '30 - Homing DIRECT';
            SC_OvlServa.IdleTime.PT:= T#500ms;
            SC_OvlServa.AlarmTime.PT:= T#3s;    
            
            Bruska.ServoOtacaniaUpinacejHlavy_M1.HomePAR.HomingMode:= 0; //0 - direct, 1- refrenèný snímaè, 2 - limitný snímaè, 3 - absolutny encoder, 4 - na moment//
            Bruska.STAV.Servo_HomingBUSY:= TRUE;
            
            IF NOT SC_OvlServa.Switch1 THEN
                Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.HOME:= TRUE;
                SC_OvlServa.IdleTime.IN:= TRUE;
                SC_OvlServa.Switch1:= TRUE;
            END_IF
		
            IF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.Homing_OK AND SC_OvlServa.IdleTime.Q THEN
                SC_OvlServa.ResetStep:= TRUE;
                SC_OvlServa.Step:= 0;
            END_IF	
            
                  
            
		50:
			SC_OvlServa.StepName:= '40 - Polohovanie';
			SC_OvlServa.IdleTime.PT:= T#500ms;
			SC_OvlServa.AlarmTime.PT:= T#3s;
		
            ZadanaPoziciaUINT:= LREAL_TO_UINT(Bruska.PAR.Servo_PoziciaNatocenia);
            AktualnaPoziciaUINT:= LREAL_TO_UINT(Bruska.STAV.Servo_AktualnaPozicia);
            					
            IF NOT SC_OvlServa.Switch1 THEN
				Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.MoveAbsolute:= TRUE;
				SC_OvlServa.Switch1:= TRUE;
			END_IF
			
			IF (AktualnaPoziciaUINT = ZadanaPoziciaUINT) AND Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.MoveAbsolute_DONE THEN
				Bruska.STAV.Servo_PoziciaDosiahnuta:= TRUE;
				SC_OvlServa.ResetStep:= TRUE;
				SC_OvlServa.Step:= 0;
			END_IF	
	
        
        60:
            SC_OvlServa.StepName:= '60 - Move Velocity';
            SC_OvlServa.IdleTime.PT:= T#500ms;
            SC_OvlServa.AlarmTime.PT:= T#3s;
		
                        
            IF NOT SC_OvlServa.Switch1 THEN
                Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.MoveVelocity:= TRUE;
                SC_OvlServa.Switch1:= TRUE;
            END_IF
            
            IF NOT Bruska.Servo_MOVE THEN
                SC_OvlServa.ResetStep:= TRUE;
                SC_OvlServa.Step:= 0;
            END_IF
        
		
	END_CASE
	
	
	
	
	
	
END_ACTION
