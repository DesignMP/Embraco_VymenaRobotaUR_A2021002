
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
    //Alarmy pracoviska (0 - 100)//
	//A0 - Porucha prepatovej ochrany !!!
    //A1 - Porucha komunikacie s robotom !!!
    //A2 - Porucha PLC karty AB1 - Profinet master !!!
    //A3 - Porucha PLC karty AB3 - Napajanie CPU !!!
    //A4 - Porucha PLC karty AB4 - Safety master !!!
    //A5 - Porucha PLC karty AB5 - Digitalne vstupy !!!
    //A6 - Porucha PLC karty AB6 - Digitalne vstupy !!!
    //A7 - Porucha PLC karty AB7 - Digitalne vystupy !!!
    //A8 - Porucha serva otacania upinacej hlavy brusky !!!
    
	 
     //***********************************Hladanie poruchy*****************************************//
   	
    FOR a:=0 TO 100 BY 1 DO
        Alarmy[a];
        IF Alarmy[a] = TRUE THEN
            NastalaPorucha:= TRUE;
        END_IF	
    END_FOR
    
    //********************************Zobrazenie symbolu alarmu*****************************************************//
	
    IF NastalaPorucha THEN
        ZobrazSymbolAlarmu:= Blikac500ms;
    ELSE
        ZobrazSymbolAlarmu:= FALSE;
    END_IF	
    
    
    //*************************************Potvrdenie alarmov*********************************************************//
    IF PotvrdenieAlarmov THEN
        brsmemset(ADR(Alarmy),0,SIZEOF(Alarmy));
        NastalaPorucha:= FALSE;
        PoruchaBrusky:= FALSE;
        PoruchaRobota:= FALSE;
        Pracovisko.Majak_HukackaON:= FALSE;
        IF Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR AND Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ReadyToPower_ON THEN
            Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET:= TRUE;
        END_IF    
        PotvrdenieAlarmov:= FALSE;
    END_IF	
	
	
    //Resetovanie serva otáèania upínacej hlavy brusky//
    IF EDGEPOS(Safety.STAV.ZonaCS_AKTIVNA) THEN
        Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET:= TRUE;
    END_IF    
       
    
    //Zrušenie resetovania porúchy serva//
    IF NOT Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR THEN
        Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET:= FALSE;
    ELSIF CasResetovaniaServa.Q THEN
        Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET:= FALSE;
    END_IF    
    
       	
    
    CasResetovaniaServa.PT:= T#2s;
    CasResetovaniaServa.IN:= Bruska.ServoOtacaniaUpinacejHlavy_M1.CMD.ErrorRESET;
    CasResetovaniaServa();
    
    //*******************************Porucha prepatovej ochrany*********************************************************//
    IF Safety.STAV.SafetyPLC_Nabehlo AND NOT Pracovisko.IN.PrepatovaOchrana_OK THEN
        Alarmy[0]:= TRUE;
    END_IF 
    
    
    //********************************Porucha komunikácie s robotom******************************************************//
    IF CasKontroly_Robota.Q AND NOT StavHardware.Komunikacia_Robot_OK THEN
        Alarmy[1]:= TRUE;
        PoruchaRobota:= TRUE;
    END_IF
    
    
    CasKontroly_Robota.PT:= T#2s;
    CasKontroly_Robota();
    
    //**********************************Porucha - karty PLC niesu online**************************************************//
    IF CasKontroly_KarietPLC.Q THEN
        IF NOT StavHardware.KartaAB1_ProfinetMaster_OK THEN
            Alarmy[2]:= TRUE;
            PoruchaBrusky:= TRUE;
            PoruchaRobota:= TRUE;
        END_IF
        IF NOT StavHardware.KartaAB3_NapajanieCPU_OK THEN
            Alarmy[3]:= TRUE;
            PoruchaBrusky:= TRUE;
            PoruchaRobota:= TRUE;
        END_IF
        IF NOT StavHardware.KartaAB4_SafetyMaster_OK THEN
            Alarmy[4]:= TRUE;
            PoruchaBrusky:= TRUE;
            PoruchaRobota:= TRUE;
        END_IF
        IF NOT StavHardware.KartaAB5_16DI_OK THEN
            Alarmy[5]:= TRUE;
            PoruchaBrusky:= TRUE;
            PoruchaRobota:= TRUE;
        END_IF
        IF NOT StavHardware.KartaAB6_16DI_OK THEN
            Alarmy[6]:= TRUE;
            PoruchaBrusky:= TRUE;
            PoruchaRobota:= TRUE;
        END_IF
        IF NOT StavHardware.KartaAB7_16DO_OK THEN
            Alarmy[7]:= TRUE;
            PoruchaBrusky:= TRUE;
            PoruchaRobota:= TRUE;
        END_IF
     END_IF    
    
    
    IF Safety.STAV.ZonaCS_AKTIVNA AND NOT Pracovisko.STAV.Hardware_OK THEN
        CasKontroly_KarietPLC.IN:= TRUE;
    ELSE
        CasKontroly_KarietPLC.IN:= FALSE;
    END_IF    
        
    CasKontroly_KarietPLC.PT:= T#2s;
    CasKontroly_KarietPLC();
    
    //********************************Porucha serva otáèania upínacej hlavy****************************************//
    
    IF CasPoruchyServa.Q THEN
        Alarmy[8]:= TRUE;
        PoruchaBrusky:= TRUE;
    END_IF
    
    IF Safety.STAV.ZonaCS_AKTIVNA AND Bruska.ServoOtacaniaUpinacejHlavy_M1.STATUS.ERROR THEN
        CasPoruchyServa.IN:= TRUE;
    ELSE    
        CasPoruchyServa.IN:= FALSE;
    END_IF    
        
    	
    
    
    CasPoruchyServa.PT:= T#2s;
    CasPoruchyServa();
    
    
    
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

