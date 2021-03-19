
ACTION OvladanieGripra: 

    //Volanie funkcie SequenceControl//
    SequenceControl(SC:= SC_OvlGripra);
	
	
    CASE SC_OvlGripra.Step OF
		
        0:
            SC_OvlGripra.StepName:= '0 - Nulovanie';
            Robot.RR_OtvorDlhyUchopovac:= FALSE;
            Robot.RR_ZatvorDlhyUchopovac:= FALSE;
            Robot.RR_OtvorKratkyUchopovac:= FALSE;
            Robot.RR_ZatvorKratkyUchopovac:= FALSE;
								
            IF SC_Robot.Step <> 0 THEN
                SC_OvlGripra.ResetStep:= TRUE;
                SC_OvlGripra.Step:= 1;
            END_IF	
	
	
        1:
            SC_OvlGripra.StepName:= '1 - Rozhodnutie o cinnosti';
            IF Robot.RR_OtvorDlhyUchopovac THEN
                SC_OvlGripra.Step:= 10;
            ELSIF Robot.RR_ZatvorDlhyUchopovac THEN
                SC_OvlGripra.Step:= 20;
            ELSIF Robot.RR_OtvorKratkyUchopovac THEN
                SC_OvlGripra.Step:= 30;
            ELSIF Robot.RR_ZatvorKratkyUchopovac THEN
                SC_OvlGripra.Step:= 40;
            ELSIF EDGEPOS(Robot.Robot_OtvorDlhyUchopovac) THEN
                SC_OvlGripra.Step:= 10;
            ELSIF EDGEPOS(Robot.Robot_ZatvorDlhyUchopovac) THEN
                SC_OvlGripra.Step:= 20;
            ELSIF EDGEPOS(Robot.Robot_OtvorKratkyUchopovac) THEN
                SC_OvlGripra.Step:= 30;
            ELSIF EDGEPOS(Robot.Robot_ZatvorKratkyUchopovac) THEN
                SC_OvlGripra.Step:= 40;    
            END_IF
	
		
        10:
            SC_OvlGripra.StepName:= '10 - Otvorenie dlheho uchopovaca na gripri robota';
            SC_OvlGripra.IdleTime.PT:= T#3s;
            SC_OvlGripra.AlarmTime.PT:= T#3s;
						
            IF Robot.Automat THEN
                SC_OvlGripra.AlarmTime.IN:= TRUE;
            ELSE
                SC_OvlGripra.IdleTime.IN:= TRUE;
            END_IF	
			
            IF NOT SC_OvlGripra.Switch1 THEN
                Robot.OUT.ZatvorDlhyUchopovac_YV1:= FALSE;
                SC_OvlGripra.Switch1:= TRUE;
            END_IF	
			
            IF Robot.IN.DlhyUchopovac_Otvoreny_MS2 OR SC_OvlGripra.IdleTime.Q THEN
                SC_OvlGripra.ResetStep:= TRUE;
                SC_OvlGripra.Step:= 0;
            ELSIF SC_OvlGripra.AlarmTime.Q THEN
                Alarmy[9]:= TRUE;
                PoruchaRobota:= TRUE;
            END_IF
		
		
        20:
            SC_OvlGripra.StepName:= '20 - Zatvorenie dlheho uchopovaca na gripri robota';
            SC_OvlGripra.IdleTime.PT:= T#3s;
            SC_OvlGripra.AlarmTime.PT:= T#3s;
						
            SC_OvlGripra.IdleTime.IN:= NOT Robot.IN.DlhyUchopovac_Otvoreny_MS2;
            SC_OvlGripra.AlarmTime.IN:= Robot.IN.DlhyUchopovac_Otvoreny_MS2;
            			
            IF NOT SC_OvlGripra.Switch1 THEN
                Robot.OUT.ZatvorDlhyUchopovac_YV1:= TRUE;
                SC_OvlGripra.Switch1:= TRUE;
            END_IF	
			
            IF Robot.IN.DlhyUchopovac_Zatvoreny_MS1 OR SC_OvlGripra.IdleTime.Q THEN
                SC_OvlGripra.ResetStep:= TRUE;
                SC_OvlGripra.Step:= 0;
            ELSIF SC_OvlGripra.AlarmTime.Q THEN
                Alarmy[10]:= TRUE;
                PoruchaRobota:= TRUE;
            END_IF
		
        30:
            SC_OvlGripra.StepName:= '30 - Otvorenie kratkeho uchopovaca na gripri robota';
            SC_OvlGripra.IdleTime.PT:= T#3s;
            SC_OvlGripra.AlarmTime.PT:= T#3s;
						
            IF Robot.Automat THEN
                SC_OvlGripra.AlarmTime.IN:= TRUE;
            ELSE
                SC_OvlGripra.IdleTime.IN:= TRUE;
            END_IF	
			
            IF NOT SC_OvlGripra.Switch1 THEN
                Robot.OUT.ZatvorKratkyUchopovac_YV2:= FALSE;
                SC_OvlGripra.Switch1:= TRUE;
            END_IF	
			
            IF Robot.IN.KratkyUchopovac_Otvoreny_MS4 OR SC_OvlGripra.IdleTime.Q THEN
                SC_OvlGripra.ResetStep:= TRUE;
                SC_OvlGripra.Step:= 0;
            ELSIF SC_OvlGripra.AlarmTime.Q THEN
                Alarmy[11]:= TRUE;
                PoruchaRobota:= TRUE;
            END_IF
		
		
        40:
            SC_OvlGripra.StepName:= '40 - Zatvorenie kratkeho uchopovaca na gripri robota';
            SC_OvlGripra.IdleTime.PT:= T#3s;
            SC_OvlGripra.AlarmTime.PT:= T#3s;
						
            SC_OvlGripra.IdleTime.IN:= NOT Robot.IN.KratkyUchopovac_Otvoreny_MS4;
            SC_OvlGripra.AlarmTime.IN:= Robot.IN.KratkyUchopovac_Otvoreny_MS4;
            			
            IF NOT SC_OvlGripra.Switch1 THEN
                Robot.OUT.ZatvorKratkyUchopovac_YV2:= TRUE;
                SC_OvlGripra.Switch1:= TRUE;
            END_IF	
			
            IF Robot.IN.KratkyUchopovac_Zatvoreny_MS3 OR SC_OvlGripra.IdleTime.Q THEN
                SC_OvlGripra.ResetStep:= TRUE;
                SC_OvlGripra.Step:= 0;
            ELSIF SC_OvlGripra.AlarmTime.Q THEN
                Alarmy[12]:= TRUE;
                PoruchaRobota:= TRUE;
            END_IF
		
		
    END_CASE
    
    
    
    
    
    
END_ACTION
