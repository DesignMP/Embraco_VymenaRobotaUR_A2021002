
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
    
    //Taktime pracoviska robota//
    IF Taktime_Robot.CMD.START_Merania THEN
        
        Milisekundy:= Milisekundy + 2;//Pretože je v taskovej triede 2ms tak prirátaváme + 2//
        
        IF Milisekundy >= 1000 THEN
            Sekundy:= Sekundy + 1;
            Milisekundy:= 0;
        END_IF
        
        IF Sekundy >= 60 THEN
            Minuty:= Minuty + 1;
            Sekundy:= 0;
        END_IF	
        
        IF Minuty >= 60 THEN
            Hodiny:= Hodiny + 1;
            Minuty:= 0;
        END_IF
          
    END_IF	
		
    IF NOT Taktime_Robot.CMD.START_Merania THEN
        Milisekundy:= 0;
        Sekundy:= 0;
        Minuty:= 0;
        Hodiny:= 0;
     END_IF	
	
    IF Taktime_Robot.CMD.ZAPIS_Hodnot THEN
        Taktime_Robot.OUTPUTS.NameraneHodiny:= Hodiny;
        Taktime_Robot.OUTPUTS.NameraneMinuty:= Minuty;
        Taktime_Robot.OUTPUTS.NameraneSekundy:= Sekundy;
        Taktime_Robot.OUTPUTS.NameraneMilisekundy:= Milisekundy;
        Milisekundy:= 0;
        Sekundy:= 0;
        Minuty:= 0;
        Hodiny:= 0;	
        Taktime_Robot.CMD.ZAPIS_Hodnot:= FALSE;
    END_IF	
    
	IF Taktime_Robot.CMD.STOP_Merania THEN
		Taktime_Robot.OUTPUTS.NameraneHodiny:= Hodiny;
		Taktime_Robot.OUTPUTS.NameraneMinuty:= Minuty;
        Taktime_Robot.OUTPUTS.NameraneSekundy:= Sekundy;
        Taktime_Robot.OUTPUTS.NameraneMilisekundy:= Milisekundy;
		Taktime_Robot.CMD.START_Merania:= FALSE;
		Taktime_Robot.CMD.STOP_Merania:= FALSE;
	END_IF	
	
	

END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

