
PROGRAM _INIT
	
    
	 
END_PROGRAM

PROGRAM _CYCLIC
	
    //********************************Robot èíslo aktuálnej pozície**********************************//
    Robot.OUT.CisloAktualnejPozicie_Bit0:= Robot.PAR.CisloAktualnejPozicie.0;
    Robot.OUT.CisloAktualnejPozicie_Bit1:= Robot.PAR.CisloAktualnejPozicie.1;
    Robot.OUT.CisloAktualnejPozicie_Bit2:= Robot.PAR.CisloAktualnejPozicie.2;
    Robot.OUT.CisloAktualnejPozicie_Bit3:= Robot.PAR.CisloAktualnejPozicie.3;
    
    
    //********************************Robot èíslo zadanej pozície************************************//
    Robot.PAR.CisloZadanejPozicie.0:= Robot.IN.CisloZadanejPozicie_Bit0;
    Robot.PAR.CisloZadanejPozicie.1:= Robot.IN.CisloZadanejPozicie_Bit1;
    Robot.PAR.CisloZadanejPozicie.2:= Robot.IN.CisloZadanejPozicie_Bit2;
    Robot.PAR.CisloZadanejPozicie.3:= Robot.IN.CisloZadanejPozicie_Bit3;
    
    
    
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_Robot);
	
    //Volanie podprogramov//
    ProfinetKomunikaciaRobot;
    OvladanieGripra;
    
    
    //Reset sekcie //
    IF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        SC_Robot.Step:= 0;
    ELSIF PoruchaRobota THEN
        SC_Robot.Step:= 0;
    ELSIF Robot.Reset THEN
        SC_Robot.Step:= 0;
        Robot.Reset:= FALSE;
    END_IF
    
    CASE SC_Robot.Step OF 
	
        0:
            SC_Robot.StepName:='0 - Nulovanie';
            Robot.Automat:= FALSE;
            Robot.KoniecCyklu:= FALSE;
            Robot.Manual:= FALSE;
            Robot.Reset:= FALSE;
            Robot.STAV.PoINIT:= FALSE;
            SC_OvlGripra.Step:= 0;
            Robot.KOM_OUT.Bruska_OdoberCap:= FALSE;
            Robot.KOM_OUT.Bruska_VlozCap:= FALSE;
            Robot.KOM_OUT.Dopravnik_PolozCap:= FALSE;
            Robot.KOM_OUT.OdparkujRobota:= FALSE;
            Robot.KOM_OUT.Otacac_OdoberCap:= FALSE;
            Robot.KOM_OUT.Otacac_PolozCap:= FALSE;
            Robot.KOM_OUT.Paletka_OdoberCap:= FALSE;
            Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie:= FALSE;
            Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie:= FALSE;
            Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie:= FALSE;
            Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie:= FALSE;
            Robot.KOM_OUT.PP_na_Main:= FALSE;
            Robot.KOM_OUT.Reset_CS:= FALSE;
            Robot.KOM_OUT.StartProgramu:= FALSE;
            Robot.KOM_OUT.StartProgramuMain:= FALSE;
            Robot.KOM_OUT.VypniMotory:= FALSE;
            Robot.KOM_OUT.ZapniMotory:= FALSE;
            Robot.PAR.CisloAktualnejPozicie:= 0;
            Robot.KOM_OUT.PocetNalozenychCapov:= 0;
            
            IF Robot.KOM_IN.Stav_RezimAUTOMAT AND Robot.KOM_IN.Stav_ProgramRUN THEN
                Robot.KOM_OUT.StopProgramu:= TRUE;
            ELSE	
                Robot.KOM_OUT.StopProgramu:= FALSE;
            END_IF	
            IF Safety.STAV.ZonaCS_AKTIVNA AND Safety.STAV.ZonaRobot_AKTIVNA AND NOT PoruchaRobota AND NOT Robot.KOM_IN.Stav_ProgramRUN THEN
                Robot.KOM_OUT.StopProgramu:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 1;
            END_IF
	
        1:
            SC_Robot.StepName:='1 - Cakam na spustenie vyroby';
            IF Robot.Automat THEN
                SC_Robot.Step:= 2;
            ELSIF Robot.Manual THEN
                SC_Robot.Step:= 700;
            END_IF
			
		
            //********************************************************Inicializácia****************************************************************************//	 
            
        2:
            SC_Robot.StepName:='2 - Inicializacia - cakam na spustenie inicializacie';
            SC_Robot.IdleTime.PT:= T#500ms;
            SC_Robot.AlarmTime.PT:= T#5s;
			
            SC_Robot.IdleTime.IN:= TRUE;
									
            IF SC_Robot.IdleTime.Q THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 3;
            END_IF
			
        3:
            SC_Robot.StepName:='2 - Inicializacia - kontrolujem central stop robota';
            SC_Robot.IdleTime.PT:= T#500ms;
            SC_Robot.AlarmTime.PT:= T#5s;
	
            IF Robot.KOM_IN.Stav_RobotCS THEN
                Robot.KOM_OUT.Reset_CS:= TRUE;
            END_IF
		
            IF NOT Robot.KOM_IN.Stav_RobotCS THEN
                Robot.KOM_OUT.Reset_CS:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 4;
            END_IF
		
		
        4:
            SC_Robot.StepName:='4 - Inicializacia - zapinam motory robota';
            SC_Robot.IdleTime.PT:= T#500ms;
            SC_Robot.AlarmTime.PT:= T#5s;
			
            IF NOT Robot.KOM_IN.Stav_MotoryON THEN
                Robot.KOM_OUT.ZapniMotory:= TRUE;
            END_IF
			
            IF Robot.KOM_IN.Stav_MotoryON THEN
                Robot.KOM_OUT.ZapniMotory:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 6;
            END_IF
			
			
        6:
            SC_Robot.StepName:='6 - Inicializacia - spustam program robota od zaciatku';
            SC_Robot.IdleTime.PT:= T#500ms;
            SC_Robot.AlarmTime.PT:= T#5s;
		
            IF NOT SC_Robot.Switch1 THEN
                Robot.KOM_OUT.StartProgramuMain:= TRUE;
                SC_Robot.Switch1:= TRUE;
            END_IF
			
            IF Robot.KOM_IN.Stav_ProgramRUN AND Robot.KOM_IN.Stav_VystupyZresetovane AND Robot.KOM_IN.Stav_RobotOdparkovany AND NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.StartProgramuMain:= FALSE;
                Robot.STAV.PoINIT:= TRUE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 100;
            END_IF	
			
	           
		
            //********************************************************Automatický režim****************************************************************************//
        
        100:  
            SC_Robot.StepName:='100 - Automaticky Rezim - presun robota do cakacej pozície odobratia capu z paletky';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF NOT SC_Robot.Switch1 THEN
                Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie:= TRUE;
                SC_Robot.Switch1:= TRUE;
            END_IF    
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 103;
            END_IF
        
        103:
            SC_Robot.StepName:='103 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 105;  
            END_IF  
    
        105:  
            SC_Robot.StepName:='105 - Automaticky Rezim - cakam na odobratie capu z paletky';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 0 AND Zariadenie.IN.Paletka_PritomnostKusu_OS1 THEN
                Robot.KOM_OUT.Paletka_OdoberCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Paletka_OdoberCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 0;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 108;
            END_IF
        
        
        108:
            SC_Robot.StepName:='108 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 110;  
            END_IF  
        
        110:    
            SC_Robot.StepName:='110 - Automaticky Rezim - presun robota do cakacej pozície pred otacacom';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF NOT SC_Robot.Switch1 THEN
                Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie:= TRUE;
                SC_Robot.Switch1:= TRUE;
            END_IF    
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 113;
            END_IF
        
        
        113:
            SC_Robot.StepName:='113 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 115;  
            END_IF  
        
        
        115:  
            SC_Robot.StepName:='115 - Automaticky Rezim - cakam na polozenia capu do otacaca';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 0 AND NOT Zariadenie.IN.Otacac_PritomnostKusu_IS2 THEN
                Robot.KOM_OUT.Otacac_PolozCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Otacac_PolozCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 0;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 118;
            END_IF
        
        
        118:
            SC_Robot.StepName:='118 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 120;  
            END_IF  
        
        
        120:  
            SC_Robot.StepName:='120 - Automaticky Rezim - cakam na odobratie capu z otacaca';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 0 AND Zariadenie.IN.Otacac_PritomnostKusu_IS2 THEN
                Robot.KOM_OUT.Otacac_OdoberCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Otacac_OdoberCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 0;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 123;
            END_IF
        
        123:
            SC_Robot.StepName:='123 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 125;  
            END_IF  
        
        125:  
            SC_Robot.StepName:='125 - Automaticky Rezim - presun robota do cakacej pozície pred bruskou';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF NOT SC_Robot.Switch1 THEN
                Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie:= TRUE;
                SC_Robot.Switch1:= TRUE;
            END_IF    
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 128;
            END_IF
        
        128:
            SC_Robot.StepName:='128 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 130;  
            END_IF
        
        
        130:
            SC_Robot.StepName:='130 - Automaticky Rezim - cakam na odobratie capu z brusky';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 0 AND Zariadenie.IN.Otacac_PritomnostKusu_IS2 THEN
                Robot.KOM_OUT.Bruska_OdoberCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Bruska_OdoberCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 0;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 133;
            END_IF
        
        133:
            SC_Robot.StepName:='133 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 135;  
            END_IF  
        
        135:
            SC_Robot.StepName:='135 - Automaticky Rezim - cakam na vlozenie capu do brusky';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 0 AND Zariadenie.IN.Otacac_PritomnostKusu_IS2 THEN
                Robot.KOM_OUT.Bruska_VlozCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Bruska_VlozCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 0;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 138;
            END_IF
        
        138:
            SC_Robot.StepName:='138 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 140;  
            END_IF 
        
        140:  
            SC_Robot.StepName:='140 - Automaticky Rezim - presun robota do cakacej pozície pred dopravnikom';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF NOT SC_Robot.Switch1 THEN
                Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie:= TRUE;
                SC_Robot.Switch1:= TRUE;
            END_IF    
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 143;
            END_IF
        
        143:
            SC_Robot.StepName:='143 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 145;  
            END_IF
        
        
        145:
            SC_Robot.StepName:='145 - Automaticky Rezim - cakam na vlozenie capu na dopravnik';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 0 THEN
                Robot.KOM_OUT.Dopravnik_PolozCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Dopravnik_PolozCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 0;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 148;
            END_IF
        
        148:
            SC_Robot.StepName:='148 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 100;  
            END_IF 
        
          
            
            
            
            
        
            //*******************************************Manuálny režim***************************************************************//
        700:
            SC_Robot.StepName:='700 - Manualny rezim';
            SC_Robot.IdleTime.PT:= T#3s;
            SC_Robot.AlarmTime.PT:= T#5s;	
		
        
        
        
    END_CASE
    
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

