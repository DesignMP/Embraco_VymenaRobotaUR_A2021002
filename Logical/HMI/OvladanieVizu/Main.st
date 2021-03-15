
PROGRAM _INIT
	
    Vizu.ZobrazHlasenie_ResetZariadenia:= 1;
	 
END_PROGRAM

PROGRAM _CYCLIC
	
    //*********************************************Zobrazenie úvodnej obrazovky**********************************************//
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
	
    //************************************Prepnutie na obrazovku Automatického režimu******************************************//
    IF EDGEPOS (Safety.STAV.SafetyPLC_Nabehlo = TRUE) THEN
        Vizu.CisloZadanejObrazovky:= 2;
    END_IF
	

    //*************************************************Zamknutie tlaèítok*******************************************************//
    //Tlaèítko režim manual//
    IF Zariadenie.STAV.Automat THEN
        Vizu.TL_RezimManual_DISABLE:= TRUE; 
    ELSE 
        Vizu.TL_RezimManual_DISABLE:= TRUE;
    END_IF
    
    
    //Tlaèítko Štart Automat//
    Vizu.TL_StartAutomat_DISABLE:= FALSE;
    
    //Tlaèítko Ukonèenie cyklu//
    IF Zariadenie.STAV.PoINIT THEN
        Vizu.TL_UkoncenieCyklu_DISABLE:= FALSE;
    ELSE  
        Vizu.TL_UkoncenieCyklu_DISABLE:= TRUE;
    END_IF    
    
    
    
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

