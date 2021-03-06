
PROGRAM _INIT
	
    Vizu.ZobrazHlasenie_ResetZariadenia:= 1;
	
END_PROGRAM

PROGRAM _CYCLIC
	//***********************************************Zobrazenie stavov zariadenia***********************************************//
    //0 - Zariadenie je vypnut�.
    //1 - Prebieha inicializacia zariadenia.
    //2 - Zariadenie be�� v automatickom re�ime.
    //3 - Robot nieje prepnut� do automatick�ho re�imu !!!
    
    
    
    IF NOT Robot.KOM_IN.Stav_RezimAUTOMAT AND NOT Robot.IN.NepouzivatRobota THEN
        Vizu.StavZariadenia_Index:= 3;
        Vizu.StavZariadenia_Farba:= 3;
    ELSIF Robot.Automat AND NOT Robot.STAV.PoINIT THEN
        Vizu.StavZariadenia_Index:= 1;
        Vizu.StavZariadenia_Farba:= 1;
    ELSIF Bruska.Automat AND NOT Bruska.STAV.PoINIT THEN
        Vizu.StavZariadenia_Index:= 1;
        Vizu.StavZariadenia_Farba:= 1;    
    ELSIF Robot.Automat AND Robot.STAV.PoINIT AND NOT Bruska.Automat THEN
        Vizu.StavZariadenia_Index:= 2;
        Vizu.StavZariadenia_Farba:= 2;
    ELSIF Bruska.Automat AND Bruska.STAV.PoINIT AND NOT Robot.Automat THEN  
        Vizu.StavZariadenia_Index:= 2;
        Vizu.StavZariadenia_Farba:= 2;
    ELSIF Bruska.Automat AND Bruska.STAV.PoINIT AND Robot.Automat AND Robot.STAV.PoINIT THEN
        Vizu.StavZariadenia_Index:= 2;
        Vizu.StavZariadenia_Farba:= 2;
    ELSE    
        Vizu.StavZariadenia_Index:= 0;
        Vizu.StavZariadenia_Farba:= 0;
    END_IF    
   
   
    //**********************************************Zobrazenie stavov pracoviska brusky****************************************//
    IF PoruchaBrusky THEN
        Vizu.StavPracoviskaBrusky_Index:= 3;
    ELSIF Bruska.Automat AND NOT Bruska.STAV.PoINIT THEN
        Vizu.StavPracoviskaBrusky_Index:= 1;
    ELSIF Bruska.Automat AND Bruska.STAV.PoINIT THEN
        Vizu.StavPracoviskaBrusky_Index:= 2;
    ELSE    
        Vizu.StavPracoviskaBrusky_Index:= 0;
    END_IF    
    
    
    //**********************************************Zobrazenie stavov pracoviska robot****************************************//
    IF PoruchaRobota THEN
        Vizu.StavPracoviskaRobota_Index:= 3;
    ELSIF Robot.Automat AND NOT Robot.STAV.PoINIT THEN
        Vizu.StavPracoviskaRobota_Index:= 1;
    ELSIF Robot.Automat AND Robot.STAV.PoINIT THEN
        Vizu.StavPracoviskaRobota_Index:= 2;
    ELSE    
        Vizu.StavPracoviskaRobota_Index:= 0;
    END_IF   
    
    
    
    //*********************************************Zobrazenie �vodnej obrazovky**********************************************//
    IF NOT Safety.STAV.SafetyPLC_Nabehlo THEN
        Vizu.CisloZadanejObrazovky:= 0;
        IF EDGEPOS (Blikac500ms = TRUE) THEN
            IF Vizu.Slider < 30 THEN
                Vizu.Slider:= Vizu.Slider+1;
            ELSE 
                Vizu.Slider:= 0;
            END_IF
        END_IF
    END_IF
	
    
    //******************************************************Podsvietenie tla��tok**********************************************************//
    //Tla��tko Reset CS//
    IF Safety.STAV.CS_Pracovisko_Odblokovany AND Safety.STAV.CS_Robot_Odblokovany AND NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        Vizu.PodsvietenieTlacitka_ResetCS:= Blikac500ms;
    ELSIF Safety.STAV.ZonaCS_AKTIVNA THEN
        Vizu.PodsvietenieTlacitka_ResetCS:= 2;
    ELSE	
        Vizu.PodsvietenieTlacitka_ResetCS:= 3;
    END_IF	
    
    //Tla��tko alarmy//
    IF NastalaPorucha THEN
        Vizu.FarbaTlacitkaAlarm_Index:= Blikac500ms;
    ELSE
        Vizu.FarbaTlacitkaAlarm_Index:= FALSE;
    END_IF
    
    
    
    
    //************************************Prepnutie na obrazovku Automatick�ho re�imu******************************************//
    IF EDGEPOS (Safety.STAV.SafetyPLC_Nabehlo = TRUE) THEN
        Vizu.CisloZadanejObrazovky:= 2;
    END_IF
	

    //*************************************************Zamknutie tla��tok*******************************************************//
    //Tla��tko re�im manual//
    IF Zariadenie.STAV.Automat THEN
        Vizu.TL_RezimManual_DISABLE:= TRUE;
    ELSE 
        Vizu.TL_RezimManual_DISABLE:= FALSE;
    END_IF
    
    
    //Tla��tko �tart Automat//
    IF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        Vizu.TL_StartAutomat_DISABLE:= TRUE;
    ELSIF NastalaPorucha THEN
        Vizu.TL_StartAutomat_DISABLE:= TRUE;
    ELSE    
        Vizu.TL_StartAutomat_DISABLE:= FALSE;
    END_IF    
    
    //Tla��tko Ukon�enie cyklu//
    Vizu.TL_UkoncenieCyklu_DISABLE:= FALSE;
      
    
    //Tla��tko ovl�danie serva v ru�nom re�ime//
    IF NOT Bruska.STAV.Servo_HomingOK THEN
        Vizu.TL_RR_OvladanieServa_DISABLE:= TRUE;
    ELSIF NastalaPorucha THEN
        Vizu.TL_RR_OvladanieServa_DISABLE:= TRUE;
    ELSIF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        Vizu.TL_RR_OvladanieServa_DISABLE:= TRUE;
//    ELSIF NOT Safety.STAV.ZonaRobot_AKTIVNA THEN
//        Vizu.TL_RR_OvladanieServa_DISABLE:= TRUE;
//    ELSIF NOT Safety.STAV.ZonaPracovisko_AKTIVNA THEN
//		Vizu.TL_RR_OvladanieServa_DISABLE:= TRUE;
	ELSIF Bruska.Servo_ODBRZDI THEN
		Vizu.TL_RR_OvladanieServa_DISABLE:= TRUE;
    ELSE
        Vizu.TL_RR_OvladanieServa_DISABLE:= FALSE;
    END_IF    
        
   
    //Tla��tko homing serva v ru�nom re�ime//
    IF NastalaPorucha THEN
        Vizu.TL_RR_HomingServa_DISABLE:= TRUE;
    ELSIF NOT Safety.STAV.ZonaCS_AKTIVNA THEN
        Vizu.TL_RR_HomingServa_DISABLE:= TRUE;
    ELSIF NOT Safety.STAV.ZonaRobot_AKTIVNA THEN
        Vizu.TL_RR_HomingServa_DISABLE:= TRUE;
    ELSIF NOT Safety.STAV.ZonaPracovisko_AKTIVNA THEN
		Vizu.TL_RR_HomingServa_DISABLE:= TRUE;
	ELSIF Bruska.Servo_ODBRZDI THEN
		Vizu.TL_RR_HomingServa_DISABLE:= TRUE;
    ELSE
        Vizu.TL_RR_HomingServa_DISABLE:= FALSE;
    END_IF    
    
       
    
    //Tla��tko odparkovanie robota//
    IF Zariadenie.STAV.Automat THEN
        Vizu.TL_OdparkovanieRobota_DISABLE:= TRUE;
    ELSIF NOT Safety.STAV.ZonaRobot_AKTIVNA THEN
        Vizu.TL_OdparkovanieRobota_DISABLE:= TRUE;
    ELSIF NOT Robot.KOM_IN.Stav_RezimAUTOMAT THEN
        Vizu.TL_OdparkovanieRobota_DISABLE:= TRUE;
    ELSE    
        Vizu.TL_OdparkovanieRobota_DISABLE:= FALSE;
    END_IF    
    
	//Tla��tko odbrzdenie up�nacej hlavy//
	IF Bruska.Servo_HOME_SWITCH THEN
		Vizu.TL_OdbrzdenieServa_DISABLE:= TRUE;
	ELSIF Bruska.Servo_JoggVPRED THEN
		Vizu.TL_OdbrzdenieServa_DISABLE:= TRUE;
	ELSIF Bruska.Servo_JoggVZAD THEN
		Vizu.TL_OdbrzdenieServa_DISABLE:= TRUE;	
	ELSE    
		Vizu.TL_OdbrzdenieServa_DISABLE:= FALSE;
	END_IF    
	
	
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

