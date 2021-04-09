
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
    
    
    
    
    //********************************Popis èísla aktuálnej pozície robota*****************************//
    //1 - robot je pripravený
    //2 - robot èaká na odobratie èapu z paletky
    //3 - robot odobral èap z paletky
    //4 - robot položil èap do otáèaèa
    //5 - robot odobral èap z otáèaèa
    //6 - robot odobral èap z brúsky
    //7 - robot vložil èap do brúsky
    //8 - robot je presunuty pred bruskou
    //9 - robot položil èap na dopravník
    //14 - robot je odparkovany
    
    
    
    
    
    //********************************Popis èísla zadanej pozície robota*****************************//
    //2 - robot presun do pozície èakania na odobratie èapu z paletky
    //3 - robot odober èap z paletky
    //4 - robot polož èap do otáèaèa
    //5 - robot odober èap z otáèaèa
    //6 - robot odober èap z brúsky
    //7 - robot vlož èap do brúsky
    //8 - robot presun do pozície pred brúskou
    //9 - robot polož èap na dopravník
    //14 - odparkuj robota
    
    
    
    
    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_Robot);
	
    //Volanie podprogramov//
    ProfinetKomunikaciaRobot;
    OvladanieGripra;
    
    
   
        
    
    //Reset sekcie //
    IF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        SC_Robot.Step:= 0;
    ELSIF NOT Safety.STAV.ZonaRobot_AKTIVNA THEN
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
            Robot.KOM_OUT.UkoncenieCykluRobota:= FALSE;
            Robot.KOM_OUT.ZahodenieKusu:= FALSE;
            Robot.OUT.VystupnyDopravnikNalozeny:= FALSE;
            Robot.KOM_OUT.Dopravnik_UkladaciaPozicia:= 1;
            Robot.RR_OdparkujRobota:= FALSE;
            Robot.KOM_OUT.ServisnaPozicia:= FALSE;
            Robot.PAR.CisloAktualnejPozicie:= 0;
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
            Robot.PAR.CisloAktualnejPozicie:= 1; //Robot je pripravený
            
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
			
            IF Robot.KOM_IN.Stav_ProgramRUN AND Robot.KOM_IN.Stav_VystupyZresetovane AND Robot.KOM_IN.Stav_RobotOdparkovany AND NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena AND Robot.KOM_IN.Stav_ZonaNavratuRobota_OK THEN
                Robot.KOM_OUT.StartProgramuMain:= FALSE;
                Robot.STAV.PoINIT:= TRUE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 100;
            ELSIF Robot.KOM_IN.Stav_VystupyZresetovane AND Robot.KOM_IN.Stav_ZonaNavratuRobota_NG THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 0;
            END_IF	
			
                    
		
            //********************************************************Automatický režim****************************************************************************//
        
        100:  
            SC_Robot.StepName:='100 - Automaticky Rezim - presun robota do cakacej pozície odobratia capu z paletky';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
                    
                
            IF Robot.KoniecCyklu AND NOT Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie THEN
                Robot.KOM_OUT.OdparkujRobota:= TRUE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 105;
            ELSIF Robot.IN.NepouzivatRobota THEN
                Robot.KOM_OUT.ServisnaPozicia:= TRUE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 103;
            ELSIF Robot.PAR.CisloZadanejPozicie = 2 AND NOT Robot.KoniecCyklu THEN    
                Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie:= TRUE;
            END_IF    
            
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 2;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 113;
            END_IF
       
        103:  
            SC_Robot.StepName:='103 - Automaticky Rezim - cakam na ukoncenie presunu robota do servisnej polohy';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;         
                
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.ServisnaPozicia:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 0;
            END_IF
        
        105:  
            SC_Robot.StepName:='105 - Automaticky Rezim - cakam na ukoncenie odparkovania robota';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;       
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.OdparkujRobota:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 0;
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
            SC_Robot.StepName:='115 - Automaticky Rezim - cakam na odobratie capu z paletky';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
                        
            IF Robot.KoniecCyklu AND NOT Robot.KOM_OUT.Paletka_OdoberCap THEN
                Robot.KOM_OUT.OdparkujRobota:= TRUE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 116;
             ELSIF Robot.IN.NepouzivatRobota THEN
                Robot.KOM_OUT.ServisnaPozicia:= TRUE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 103;   
            ELSIF Robot.PAR.CisloZadanejPozicie = 3 AND Zariadenie.IN.Paletka_PritomnostKusu_OS1 AND NOT Robot.KoniecCyklu THEN
                Robot.KOM_OUT.Paletka_OdoberCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Paletka_OdoberCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 3;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 118;
            ELSIF Robot.KOM_IN.Stav_PoruchaRobota THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 0;
            END_IF
        
            
        116:  
            SC_Robot.StepName:='116 - Automaticky Rezim - cakam na ukoncenie odparkovania robota';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;       
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.OdparkujRobota:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 0;
            END_IF       
            
            
            
        
        118:
            SC_Robot.StepName:='118 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                IF Robot.KOM_IN.Stav_RobotOdparkovany THEN
                    SC_Robot.ResetStep:= TRUE;
                    SC_Robot.Step:= 0;
                ELSE    
                    SC_Robot.ResetStep:= TRUE;
                    SC_Robot.Step:= 125;  
                END_IF  
            END_IF  
        
                
        
        125:  
            SC_Robot.StepName:='125 - Automaticky Rezim - cakam na polozenia capu do otacaca';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 4 AND NOT Zariadenie.IN.Otacac_PritomnostKusu_IS2 THEN
                Robot.KOM_OUT.Otacac_PolozCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Otacac_PolozCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 4;
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
            SC_Robot.StepName:='130 - Automaticky Rezim - cakam na odobratie capu z otacaca';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 5 AND Zariadenie.IN.Otacac_PritomnostKusu_IS2 THEN
                Robot.KOM_OUT.Otacac_OdoberCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Otacac_OdoberCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 5;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 133;
            ELSIF Robot.KOM_IN.Stav_PoruchaRobota THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 0;    
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
            SC_Robot.StepName:='135 - Automaticky Rezim - presun robota do cakacej pozície pred bruskou';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF NOT SC_Robot.Switch1 THEN
                Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie:= TRUE;
                SC_Robot.Switch1:= TRUE;
            END_IF    
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie:= FALSE;
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
            SC_Robot.StepName:='140 - Automaticky Rezim - cakam na odobratie capu z brusky';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 6 AND Bruska.IN.OchrannyKrytBrusky_Otvoreny AND NOT Bruska.IN.UpinaciaHlava_Otvorena THEN
                Robot.KOM_OUT.Bruska_OdoberCap:= TRUE;
            END_IF
            
            IF Robot.KOM_IN.Stav_RobotDrziHotovyCap THEN
                Robot.PAR.CisloAktualnejPozicie:= 6; 
            END_IF    
        
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Bruska_OdoberCap:= FALSE;
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
            SC_Robot.StepName:='145 - Automaticky Rezim - cakam na vlozenie capu do brusky';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 7 AND Bruska.IN.OchrannyKrytBrusky_Otvoreny AND Bruska.IN.UpinaciaHlava_Otvorena THEN
                Robot.KOM_OUT.Bruska_VlozCap:= TRUE;
            END_IF
        
            IF Robot.KOM_IN.Stav_RobotVlozilNovyCap THEN
                Robot.PAR.CisloAktualnejPozicie:= 7; 
            END_IF    
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Bruska_VlozCap:= FALSE;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 148;
            END_IF
        
        148:
            SC_Robot.StepName:='148 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 150;  
            END_IF 
        
        150:  
            SC_Robot.StepName:='150 - Automaticky Rezim - presun robota do cakacej pozície pred dopravnikom';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 8 AND Bruska.IN.OchrannyKrytBrusky_Otvoreny THEN
                Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie:= TRUE;
            END_IF    
            
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 8;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 153;
            END_IF
        
        153:
            SC_Robot.StepName:='153 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
                
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 155;  
            END_IF
        
        
        155:
            SC_Robot.StepName:='155 - Automaticky Rezim - cakam na vlozenie capu na dopravnik';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
        
            IF Robot.PAR.CisloZadanejPozicie = 9 AND Zariadenie.IN.VystupDoprav_Napolohovany AND NOT Zariadenie.IN.VystupDoprav_Bezi THEN
                Robot.KOM_OUT.Dopravnik_PolozCap:= TRUE;
            END_IF
            
                    
            IF Robot.KOM_IN.Stav_RobotCinnostUkoncena THEN
                Robot.KOM_OUT.Dopravnik_UkladaciaPozicia:= Robot.KOM_OUT.Dopravnik_UkladaciaPozicia + 1;
                IF Robot.KOM_OUT.Dopravnik_UkladaciaPozicia > 5 THEN
                    Robot.KOM_OUT.Dopravnik_UkladaciaPozicia:= 1;
                    Robot.OUT.VystupnyDopravnikNalozeny:= TRUE;
                END_IF 
                Robot.KOM_OUT.Dopravnik_PolozCap:= FALSE;
                Robot.PAR.CisloAktualnejPozicie:= 9;
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 158;
            END_IF
        
        158:
            SC_Robot.StepName:='158 - Automaticky Rezim - cakam na zrusenie signalu cinnost robota ukoncena';
            SC_Robot.IdleTime.PT:= T#500ms;
            SC_Robot.AlarmTime.PT:= T#5s;
            
            SC_Robot.IdleTime.IN:= Robot.OUT.VystupnyDopravnikNalozeny;
            IF SC_Robot.IdleTime.Q THEN
                Robot.OUT.VystupnyDopravnikNalozeny:= FALSE;
            END_IF    
            
            IF NOT Robot.KOM_IN.Stav_RobotCinnostUkoncena AND NOT Robot.OUT.VystupnyDopravnikNalozeny THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 160;  
            END_IF 
        
          
        160:
            SC_Robot.StepName:='160 - Automaticky Rezim - cakam na signal presun k paletke';
            SC_Robot.IdleTime.PT:= T#200ms;
            SC_Robot.AlarmTime.PT:= T#5s;
            
            IF Robot.PAR.CisloZadanejPozicie = 2 THEN
                SC_Robot.ResetStep:= TRUE;
                SC_Robot.Step:= 100; 
            ELSIF Robot.PAR.CisloZadanejPozicie = 14 THEN
                Robot.KOM_OUT.Dopravnik_UkladaciaPozicia:= 1;
                Robot.PAR.CisloAktualnejPozicie:= 14;
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

