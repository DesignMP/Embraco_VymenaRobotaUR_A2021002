
PROGRAM _INIT
	
END_PROGRAM

PROGRAM _CYCLIC
	
    //****************************************Príznak hardware pracoviska OK***********************************//
    
    IF StavHardware.KartaAB1_ProfinetMaster_OK AND
        StavHardware.KartaAB3_NapajanieCPU_OK AND
        StavHardware.KartaAB4_SafetyMaster_OK AND
        StavHardware.KartaAB5_16DI_OK AND
        StavHardware.KartaAB6_16DI_OK AND
        StavHardware.KartaAB7_16DO_OK THEN
        Pracovisko.STAV.Hardware_OK:= TRUE; 
    ELSE
        Pracovisko.STAV.Hardware_OK:= FALSE;
    END_IF
        
       
    
    //***************************************Ovládanie majáka**************************************************//
    //Zelene svetlo//
    IF Pracovisko.STAV.Automat THEN
        Pracovisko.OUT.Majak_ZeleneSvetlo:= TRUE;
    ELSIF Pracovisko.STAV.Manual THEN
        Pracovisko.OUT.Majak_ZeleneSvetlo:= Blikac500ms;
    ELSE
        Pracovisko.OUT.Majak_ZeleneSvetlo:= FALSE;
    END_IF    
    
    //Žlté svetlo//
    IF Pracovisko.STAV.Automat AND NOT Pracovisko.STAV.PoINIT THEN
        Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSE
        Pracovisko.OUT.Majak_ZlteSvetlo:= FALSE;
    END_IF    
    
    //Èervené svetlo//
    IF NastalaPorucha THEN
       Pracovisko.OUT.Majak_CerveneSvetlo:= TRUE; 
    ELSE
        Pracovisko.OUT.Majak_CerveneSvetlo:= FALSE;
    END_IF   
    
    //Húkaèka//
    IF EDGEPOS(NastalaPorucha) THEN
        Pracovisko.Majak_HukackaON:= TRUE;
    END_IF
    
    IF Pracovisko.Majak_HukackaON THEN
        Pracovisko.OUT.Majak_Hukacka:= Blikac500ms;
    ELSE
        Pracovisko.OUT.Majak_Hukacka:= FALSE;
    END_IF   
    
    
    
    //**************************************Ukonèenie pracovného cyklu na pracovisku**********************************************//
    //Normálne//
    IF Pracovisko.KoniecCyklu THEN
        IF Robot.Automat THEN
            Robot.KoniecCyklu:= TRUE;
        END_IF
        IF Bruska.Automat THEN
            Bruska.KoniecCyklu:= TRUE;
        END_IF
        Pracovisko.KoniecCyklu:= FALSE;
     END_IF   
    
    //Pri poruche//
    IF PoruchaBrusky AND NOT PoruchaRobota THEN
        IF Robot.Automat THEN
            Robot.KoniecCyklu:= TRUE;
        END_IF
    ELSIF PoruchaRobota AND NOT PoruchaBrusky THEN
        IF Bruska.Automat THEN
            Bruska.KoniecCyklu:= TRUE;
        END_IF
    END_IF    
    
    //Status prebieha ukonèenie cyklu//
    IF Robot.KoniecCyklu OR Bruska.KoniecCyklu THEN
        Pracovisko.STAV.UkoncenieCyklu_BUSY:= TRUE;
    ELSE
        Pracovisko.STAV.UkoncenieCyklu_BUSY:= FALSE;
    END_IF    
        
    
    //****************************************Resetovanie pracoviska****************************************************************//
    //Normálne//
    IF Pracovisko.Reset THEN
        Bruska.Reset:= TRUE;
        Robot.Reset:= TRUE;
        Pracovisko.Reset:= FALSE;
    END_IF
    
        
    //Pri stlaèení tlaèítka Automat//
    IF Vizu.TL_RezimAutomat THEN
        IF Pracovisko.STAV.Manual THEN
            Pracovisko.Reset:= TRUE;
        END_IF
        Vizu.TL_RezimAutomat:= FALSE;
    END_IF
    
    
    //**************************************Manuálny režim pracoviska*************************************************************//
    IF Pracovisko.Manual THEN
        Bruska.Manual:= TRUE;
        Robot.Manual:= TRUE;
        Pracovisko.Manual:= FALSE;
    END_IF
    
    
    //Príznak je zvolený režim Manuál//
    IF Bruska.Manual OR Robot.Manual THEN
        Pracovisko.STAV.Manual:= TRUE;
    ELSE
        Pracovisko.STAV.Manual:= FALSE;
    END_IF    
    
    
    //***************************************Automatický režim pracoviska**********************************************************//
    IF Pracovisko.Automat THEN
        Bruska.Automat:= TRUE;
        Robot.Automat:= TRUE;
        Pracovisko.Automat:= FALSE;
    END_IF
    
    
    //Príznak je zvolený režim Automat//
    IF Bruska.Automat OR Robot.Automat THEN
        Pracovisko.STAV.Automat:= TRUE;
    ELSE
        Pracovisko.STAV.Automat:= FALSE;
    END_IF   
    
    //Príznak pracovisko je po inicializácii//
    IF Bruska.STAV.PoINIT AND Robot.STAV.PoINIT THEN
        Pracovisko.STAV.PoINIT:= TRUE;
    ELSE    
        Pracovisko.STAV.PoINIT:= FALSE;
    END_IF
    
    
    //****************************************Príznak pracovisko pripravené na spustenie********************************************//
    IF SC_Bruska.Step = 1 AND SC_Robot.Step = 1 THEN
        Pracovisko.STAV.READY_TO_START:= TRUE;
    ELSE    
        Pracovisko.STAV.READY_TO_START:= FALSE;
    END_IF    
    
    
    
    
    
    
    
    
    
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

