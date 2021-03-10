
PROGRAM _INIT
	
    Bruska.PAR.Servo_JoggRychlost:= 5;
	 
END_PROGRAM

PROGRAM _CYCLIC
	
     //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_Bruska);
	
    //Volanie podprogramov//
    OvlServa;
	 
    //Reset sekcie //
    IF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        SC_Bruska.Step:= 0;
    ELSIF PoruchaBrusky THEN
        SC_Bruska.Step:= 0;
    ELSIF Bruska.Reset THEN
        SC_Bruska.Step:= 0;
        Bruska.Reset:= FALSE;
    END_IF	
	
    //Zastavenie serva//
    IF EDGEPOS(Bruska.Reset) THEN
        Bruska.Servo_STOP:= TRUE;
    END_IF	
    
    
    CASE SC_Bruska.Step OF 
	
	
        0:
            SC_Bruska.StepName:='0 - Nulovanie';
            SC_OvlServa.Step:= 0;
            Bruska.Automat:= FALSE;
            Bruska.KoniecCyklu:= FALSE;
            Bruska.Manual:= FALSE;
            Bruska.STAV.PoINIT:= FALSE;
            Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.JoggLimit_ACTIVE:= FALSE;
            Bruska.STAV.Servo_PoziciaDosiahnuta:= FALSE;
            Bruska.OUT.Stav_UpinaciaHlavaSaOtacaVPRED:= FALSE;
            			
            IF Safety.STAV.ZonaCS_AKTIVNA AND NOT PoruchaBrusky AND Bruska.STAV.ServoREADY THEN
                SC_Bruska.ResetStep:= TRUE;
                SC_Bruska.Step:= 1;
            END_IF
	
        1:
            SC_Bruska.StepName:='1 - Cakam na spustenie vyroby';
            IF Bruska.Automat THEN
                SC_Bruska.Step:= 2;
            ELSIF Bruska.Manual THEN
                SC_Bruska.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	
    
        2:
            SC_Bruska.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_Bruska.IdleTime.PT:= T#2s;
            SC_Bruska.AlarmTime.PT:= T#5s;
			
            SC_Bruska.IdleTime.IN:= Robot.STAV.PoINIT;
									
            IF SC_Bruska.IdleTime.Q THEN
                SC_Bruska.ResetStep:= TRUE;
                SC_Bruska.Step:= 10;
            END_IF
    
      		
			
        10:
            SC_Bruska.StepName:='10 - Inicializacia - spustam homing serva otacania upinacej hlavy';
            SC_Bruska.IdleTime.PT:= T#1s;
            SC_Bruska.AlarmTime.PT:= T#5s;
		
            
			
            IF NOT SC_Bruska.Switch1 THEN
                Bruska.Servo_HOME_SWITCH:= TRUE;
                SC_Bruska.IdleTime.IN:= TRUE;
                SC_Bruska.Switch1:= TRUE;
            END_IF
		
            IF Bruska.STAV.Servo_HomingOK AND SC_Bruska.IdleTime.Q THEN
                SC_Bruska.ResetStep:= TRUE;
                SC_Bruska.Step:= 13;
            END_IF	
	
            
			
		
				
        13:
            SC_Bruska.StepName:='13 - Inicializacia - otocenie upinacej hlavy do vychodiskovej pozicie';
            SC_Bruska.IdleTime.PT:= T#2s;
            SC_Bruska.AlarmTime.PT:= T#5s;
			
            Bruska.PAR.Servo_RychlostPolohovania:= 10;
            Bruska.PAR.Servo_PoziciaNatocenia:= RemPremenne.Bruska_VychodziaPoziciaNatocenia;
            
            
			
            IF NOT SC_Bruska.Switch1 AND SC_OvlServa.Step = 1 THEN
                Bruska.Servo_POLOHUJ:= TRUE;
                SC_Bruska.Switch1:= TRUE;
            END_IF
            
            
            
            IF Bruska.STAV.Servo_PoziciaDosiahnuta THEN
                Bruska.STAV.Servo_PoziciaDosiahnuta:= FALSE;
                Bruska.STAV.PoINIT:= TRUE;
                SC_Bruska.ResetStep:= TRUE;
                SC_Bruska.Step:= 100;
            END_IF	
			
				
            //********************************************************Automatický režim****************************************************************************//
		
        100:
            SC_Bruska.StepName:='100 - Automaticky Rezim - cakam na spustenie otacania upinacej hlavy';
            SC_Bruska.IdleTime.PT:= T#200ms;
            SC_Bruska.AlarmTime.PT:= T#5s;	
            
            Bruska.PAR.Servo_RychlostPolohovania:= RemPremenne.Bruska_RychlosOtacania;
            
            IF Bruska.IN.UpinaciaHlava_OtacanieVPRED AND SC_OvlServa.Step = 1 THEN
                Bruska.Servo_MOVE:= TRUE;
                Bruska.OUT.Stav_UpinaciaHlavaSaOtacaVPRED:= TRUE;
                SC_Bruska.ResetStep:= TRUE;
                SC_Bruska.Step:= 103;
            END_IF
            
        103:
            SC_Bruska.StepName:='103 - Automaticky Rezim - cakam na zastavenie otacania upinacej hlavy';
            SC_Bruska.IdleTime.PT:= T#200ms;
            SC_Bruska.AlarmTime.PT:= T#5s;	
                    
            
            IF NOT Bruska.IN.UpinaciaHlava_OtacanieVPRED THEN
                Bruska.Servo_MOVE:= FALSE;
                SC_Bruska.ResetStep:= TRUE;
                SC_Bruska.Step:= 105;
            END_IF
                
        
        105:
            SC_Bruska.StepName:='105 - Automaticky Rezim - napolohovanie na nasobok vychodzej pozicie natocenia upinacej hlavy';
            SC_Bruska.IdleTime.PT:= T#200ms;
            SC_Bruska.AlarmTime.PT:= T#5s;
                    
            
            IF NOT SC_Bruska.Switch1 AND SC_OvlServa.Step = 1 THEN
                Bruska.STAV.Servo_AktualnyPocetOtacok:= (Bruska.STAV.Servo_AktualnaPozicia /RemPremenne.Bruska_VychodziaPoziciaNatocenia);	
                AktualnyPocetOtacokINT:= (TRUNC(Bruska.STAV.Servo_AktualnyPocetOtacok) + 10);
                AktualnyPocetOtacokLREAL:= INT_TO_LREAL(AktualnyPocetOtacokINT); 
                Bruska.PAR.Servo_PoziciaNatocenia:= (AktualnyPocetOtacokLREAL * RemPremenne.Bruska_VychodziaPoziciaNatocenia);
                Bruska.PAR.Servo_RychlostPolohovania:= RemPremenne.Bruska_RychlosOtacania;
                Bruska.Servo_POLOHUJ:= TRUE;
                SC_Bruska.Switch1:= TRUE;
            END_IF
                
            IF Bruska.STAV.Servo_PoziciaDosiahnuta THEN
                Bruska.STAV.Servo_PoziciaDosiahnuta:= FALSE;
                SC_Bruska.ResetStep:= TRUE;
                SC_Bruska.Step:= 108;
            END_IF	
            
        
        108:
            SC_Bruska.StepName:='108 - Automaticky Rezim - vynulovanie pozicie natocenia upinacej hlavy';
            SC_Bruska.IdleTime.PT:= T#200ms;
            SC_Bruska.AlarmTime.PT:= T#5s;
            
            	
            IF NOT SC_Bruska.Switch1 AND SC_OvlServa.Step = 1 THEN
                Bruska.Servo_HOME_DIRECT:= TRUE;
                SC_Bruska.Switch1:= TRUE;
            END_IF
		
            IF Bruska.STAV.Servo_HomingOK AND Bruska.STAV.Servo_AktualnaPozicia = 0 THEN
                Bruska.OUT.Stav_UpinaciaHlavaSaOtacaVPRED:= FALSE;
                SC_Bruska.ResetStep:= TRUE;
                SC_Bruska.Step:= 100;
            END_IF	
            
            
            
            
            
        
            //*******************************************************Manuálny režim*******************************************************************************//
        700:
            SC_Bruska.StepName:='700 - Manualny Rezim';
            SC_Bruska.IdleTime.PT:= T#8s;
            SC_Bruska.AlarmTime.PT:= T#5s;
				
    
    
    END_CASE
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

