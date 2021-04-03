
ACTION OvladanieGripra: 

    
    //Gripper vstupy//
      
    Robot.KOM_OUT.Gripper_DlhyUchopov_OTVORENY:= Robot.IN.DlhyUchopovac_Otvoreny_MS2;
    Robot.KOM_OUT.Gripper_DlhyUchopov_ZATVORENY:= Robot.IN.DlhyUchopovac_Zatvoreny_MS1;
    Robot.KOM_OUT.Gripper_DlhyUchopov_PRAZDNY:= CasZatvorenia_DlhyUchopovac.Q;
    Robot.KOM_OUT.Gripper_KratkyUchopov_OTVORENY:= Robot.IN.KratkyUchopovac_Otvoreny_MS4;
    Robot.KOM_OUT.Gripper_KratkyUchopov_ZATVORENY:= Robot.IN.KratkyUchopovac_Zatvoreny_MS3;
    Robot.KOM_OUT.Gripper_KratkyUchopov_PRAZDNY:= CasZatvorenia_KratkyUchopovac.Q;
    
    
        
    CasZatvorenia_DlhyUchopovac.IN:= NOT Robot.OUT.OtvorDlhyUchopovac_YV1 AND NOT Robot.IN.DlhyUchopovac_Otvoreny_MS2 AND NOT Robot.IN.DlhyUchopovac_Zatvoreny_MS1; 
    CasZatvorenia_DlhyUchopovac.PT:= T#2s;
    CasZatvorenia_DlhyUchopovac();
    
    CasZatvorenia_KratkyUchopovac.IN:= NOT Robot.OUT.OtvorKratkyUchopovac_YV2 AND NOT Robot.IN.KratkyUchopovac_Otvoreny_MS4 AND NOT Robot.IN.KratkyUchopovac_Zatvoreny_MS3;
    CasZatvorenia_KratkyUchopovac.PT:= T#2s; 
    CasZatvorenia_KratkyUchopovac();
    
    
    
    
    //Gripper výstupy//
    Robot.OUT.OtvorDlhyUchopovac_YV1:= Robot.KOM_IN.Gripper_OtvorDlhyUchopovac;
    Robot.OUT.OtvorKratkyUchopovac_YV2:= Robot.KOM_IN.Gripper_OtvorKratkyUchopovac;
        
    
    
    
    
    
END_ACTION
