
PROGRAM _INIT
	
END_PROGRAM

PROGRAM _CYCLIC
	
    //****************************************Pr�znak hardware pracoviska OK***********************************//
    
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
        
       
    
    //***************************************Ovl�danie maj�ka**************************************************//
    //Zelene svetlo//
    IF Pracovisko.STAV.Automat THEN
        Pracovisko.OUT.Majak_ZeleneSvetlo:= TRUE;
    ELSIF Pracovisko.STAV.Manual THEN
        Pracovisko.OUT.Majak_ZeleneSvetlo:= Blikac500ms;
    ELSE
        Pracovisko.OUT.Majak_ZeleneSvetlo:= FALSE;
    END_IF    
    
    //�lt� svetlo//
    IF Pracovisko.STAV.Automat AND NOT Pracovisko.STAV.PoINIT THEN
        Pracovisko.OUT.Majak_ZlteSvetlo:= Blikac500ms;
    ELSE
        Pracovisko.OUT.Majak_ZlteSvetlo:= FALSE;
    END_IF    
    
    //�erven� svetlo//
    IF NastalaPorucha THEN
       Pracovisko.OUT.Majak_CerveneSvetlo:= TRUE; 
    ELSE
        Pracovisko.OUT.Majak_CerveneSvetlo:= FALSE;
    END_IF   
    
    //H�ka�ka//
    IF EDGEPOS(NastalaPorucha) THEN
        Pracovisko.Majak_HukackaON:= TRUE;
    END_IF
    
    IF Pracovisko.Majak_HukackaON THEN
        Pracovisko.OUT.Majak_Hukacka:= Blikac500ms;
    ELSE
        Pracovisko.OUT.Majak_Hukacka:= FALSE;
    END_IF   
    
    
    
    //**************************************Ukon�enie pracovn�ho cyklu na pracovisku**********************************************//
    //Norm�lne//
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
    
    //Status prebieha ukon�enie cyklu//
    IF Robot.KoniecCyklu OR Bruska.KoniecCyklu THEN
        Pracovisko.STAV.UkoncenieCyklu_BUSY:= TRUE;
    ELSE
        Pracovisko.STAV.UkoncenieCyklu_BUSY:= FALSE;
    END_IF    
        
    
    //****************************************Resetovanie pracoviska****************************************************************//
    //Norm�lne//
    IF Pracovisko.Reset THEN
        Bruska.Reset:= TRUE;
        Robot.Reset:= TRUE;
        Pracovisko.Reset:= FALSE;
    END_IF
    
        
    //Pri stla�en� tla��tka Automat//
    IF Vizu.TL_RezimAutomat THEN
        IF Pracovisko.STAV.Manual THEN
            Pracovisko.Reset:= TRUE;
        END_IF
        Vizu.TL_RezimAutomat:= FALSE;
    END_IF
    
    
    //**************************************Manu�lny re�im pracoviska*************************************************************//
    IF Pracovisko.Manual THEN
        Bruska.Manual:= TRUE;
        Robot.Manual:= TRUE;
        Pracovisko.Manual:= FALSE;
    END_IF
    
    
    //Pr�znak je zvolen� re�im Manu�l//
    IF Bruska.Manual OR Robot.Manual THEN
        Pracovisko.STAV.Manual:= TRUE;
    ELSE
        Pracovisko.STAV.Manual:= FALSE;
    END_IF    
    
    
    //***************************************Automatick� re�im pracoviska**********************************************************//
    IF Pracovisko.Automat THEN
        Bruska.Automat:= TRUE;
        Robot.Automat:= TRUE;
        Pracovisko.Automat:= FALSE;
    END_IF
    
    
    //Pr�znak je zvolen� re�im Automat//
    IF Bruska.Automat OR Robot.Automat THEN
        Pracovisko.STAV.Automat:= TRUE;
    ELSE
        Pracovisko.STAV.Automat:= FALSE;
    END_IF   
    
    //Pr�znak pracovisko je po inicializ�cii//
    IF Bruska.STAV.PoINIT AND Robot.STAV.PoINIT THEN
        Pracovisko.STAV.PoINIT:= TRUE;
    ELSE    
        Pracovisko.STAV.PoINIT:= FALSE;
    END_IF
    
    
    //****************************************Pr�znak pracovisko pripraven� na spustenie********************************************//
    IF SC_Bruska.Step = 1 AND SC_Robot.Step = 1 THEN
        Pracovisko.STAV.READY_TO_START:= TRUE;
    ELSE    
        Pracovisko.STAV.READY_TO_START:= FALSE;
    END_IF    
    
    
    
    
    
    
    
    
    
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM
