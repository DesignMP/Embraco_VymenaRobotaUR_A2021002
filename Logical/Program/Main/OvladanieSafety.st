
ACTION OvladanieSafety: 

    //Reset zóny robot//
    IF Safety.STAV.ZonaRobot_Odblokovana AND NOT Safety.STAV.ZonaRobot_AKTIVNA AND Safety.SpatnaVazba_ZonaRobot THEN
        Safety.RESET_ZonyRobot:= TRUE;
    ELSE    
        Safety.RESET_ZonyRobot:= FALSE;
    END_IF    
    
    //Reset zóny pracovisko//
    IF Safety.STAV.ZonaPracovisko_Odblokovana AND NOT Safety.STAV.ZonaPracovisko_AKTIVNA AND Safety.SpatnaVazba_ZonaPracovisko THEN
        Safety.RESET_ZonyPracovisko:= TRUE;
    ELSE    
        Safety.RESET_ZonyPracovisko:= FALSE;
    END_IF  
    
    
    
    
END_ACTION
