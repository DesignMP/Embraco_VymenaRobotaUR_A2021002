
PROGRAM _INIT
	
END_PROGRAM

PROGRAM _CYCLIC
	
    //Volanie podprogramov//
    OvladanieSafety;
    
    
    
    
    //****************************************Príznak hardware pracoviska OK***********************************//
    
    IF StavHardware.KartaAB1_ProfinetMaster_OK AND
        StavHardware.KartaAB3_NapajanieCPU_OK AND
        StavHardware.KartaAB4_SafetyMaster_OK AND
        StavHardware.KartaAB5_16DI_OK AND
        StavHardware.KartaAB6_16DI_OK AND
        StavHardware.KartaAB7_16DO_OK THEN
        Zariadenie.STAV.Hardware_OK:= TRUE; 
    ELSE
        Zariadenie.STAV.Hardware_OK:= FALSE;
    END_IF
        
       
    
    //***************************************Ovládanie majáka**************************************************//
    //Zelene svetlo//
    IF Zariadenie.STAV.Automat THEN
        Zariadenie.OUT.Majak_ZeleneSvetlo:= TRUE;
    ELSIF Zariadenie.STAV.Manual THEN
        Zariadenie.OUT.Majak_ZeleneSvetlo:= Blikac500ms;
    ELSE
        Zariadenie.OUT.Majak_ZeleneSvetlo:= FALSE;
    END_IF    
    
    //Žlté svetlo//
    IF Zariadenie.STAV.Automat AND NOT Zariadenie.STAV.PoINIT THEN
        Zariadenie.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSE
        Zariadenie.OUT.Majak_ZlteSvetlo:= FALSE;
    END_IF    
    
    //Èervené svetlo//
    IF NastalaPorucha THEN
        Zariadenie.OUT.Majak_CerveneSvetlo:= TRUE; 
    ELSIF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        Zariadenie.OUT.Majak_CerveneSvetlo:= TRUE;
    ELSE
        Zariadenie.OUT.Majak_CerveneSvetlo:= FALSE;
    END_IF   
    
    //Húkaèka//
    IF EDGEPOS(NastalaPorucha) THEN
        Zariadenie.Majak_HukackaON:= TRUE;
    END_IF
    
    IF Zariadenie.Majak_HukackaON THEN
        Zariadenie.OUT.Majak_Hukacka:= Blikac500ms;
    ELSE
        Zariadenie.OUT.Majak_Hukacka:= FALSE;
    END_IF   
    
    
    
    //**************************************Ukonèenie pracovného cyklu na pracovisku**********************************************//
    //Normálne//
    IF Zariadenie.KoniecCyklu THEN
        IF Robot.Automat THEN
            Robot.KoniecCyklu:= TRUE;
        END_IF
        IF Bruska.Automat THEN
            Bruska.KoniecCyklu:= TRUE;
        END_IF
        Zariadenie.KoniecCyklu:= FALSE;
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
        Zariadenie.STAV.UkoncenieCyklu_BUSY:= TRUE;
    ELSE
        Zariadenie.STAV.UkoncenieCyklu_BUSY:= FALSE;
    END_IF    
        
    
    //****************************************Resetovanie pracoviska****************************************************************//
    //Normálne//
    IF Zariadenie.Reset THEN
        Bruska.Reset:= TRUE;
        Robot.Reset:= TRUE;
        Zariadenie.Reset:= FALSE;
    END_IF
    
        
    //Pri stlaèení tlaèítka Automat//
    IF Vizu.TL_RezimAutomat THEN
        IF Zariadenie.STAV.Manual THEN
            Zariadenie.Reset:= TRUE;
        END_IF
        Vizu.TL_RezimAutomat:= FALSE;
    END_IF
    
    
    //**************************************Manuálny režim pracoviska*************************************************************//
    IF Zariadenie.Manual THEN
        Bruska.Manual:= TRUE;
        Robot.Manual:= TRUE;
        Zariadenie.Manual:= FALSE;
    END_IF
    
    
    //Príznak je zvolený režim Manuál//
    IF Bruska.Manual OR Robot.Manual THEN
        Zariadenie.STAV.Manual:= TRUE;
    ELSE
        Zariadenie.STAV.Manual:= FALSE;
    END_IF    
    
    
    //***************************************Automatický režim pracoviska**********************************************************//
    IF Zariadenie.Automat THEN
        Bruska.Automat:= TRUE;
        IF Safety.STAV.ZonaRobot_AKTIVNA AND Robot.KOM_IN.Stav_RezimAUTOMAT THEN
            Robot.Automat:= TRUE;
        END_IF
        Zariadenie.Automat:= FALSE;
    END_IF
    
    
    //Príznak je zvolený režim Automat//
    IF Bruska.Automat OR Robot.Automat THEN
        Zariadenie.STAV.Automat:= TRUE;
    ELSE
        Zariadenie.STAV.Automat:= FALSE;
    END_IF   
    
    //Príznak Zariadenie je po inicializácii//
    IF Bruska.STAV.PoINIT AND (Robot.STAV.PoINIT OR Robot.IN.NepouzivatRobota) THEN
        Zariadenie.STAV.PoINIT:= TRUE;
    ELSE    
        Zariadenie.STAV.PoINIT:= FALSE;
    END_IF
    
    
    //****************************************Príznak Zariadenie pripravené na spustenie********************************************//
    IF SC_Bruska.Step = 1 AND SC_Robot.Step = 1 THEN
        Zariadenie.STAV.READY_TO_START:= TRUE;
    ELSE    
        Zariadenie.STAV.READY_TO_START:= FALSE;
    END_IF    
    
    
    
    
    
    
    
    
    
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

