
ACTION ProfinetKomunikaciaRobot: 

	//Vstupy z Robota do PLC//
	Robot.KOM_IN.Stav_RezimAUTOMAT:= Robot.KOM_IN.Profinet_PLC_INPUTS[0].0;         //0
	Robot.KOM_IN.Stav_ProgramRUN:= Robot.KOM_IN.Profinet_PLC_INPUTS[0].1;           //1
	Robot.KOM_IN.Stav_MotoryOFF:= Robot.KOM_IN.Profinet_PLC_INPUTS[0].2;            //2
	Robot.KOM_IN.Stav_MotoryON:= Robot.KOM_IN.Profinet_PLC_INPUTS[0].3;             //3
	Robot.KOM_IN.Stav_RobotCS:= Robot.KOM_IN.Profinet_PLC_INPUTS[0].4;              //4
	
	Robot.KOM_IN.Stav_RobotOdparkovany:= Robot.KOM_IN.Profinet_PLC_INPUTS[1].0;     //8
    Robot.KOM_IN.Stav_RobotCinnostUkoncena:= Robot.KOM_IN.Profinet_PLC_INPUTS[1].1; //9
    Robot.KOM_IN.Stav_Dopravnik_Plny:= Robot.KOM_IN.Profinet_PLC_INPUTS[1].2;       //10
    Robot.KOM_IN.Stav_RobotDrziCap:= Robot.KOM_IN.Profinet_PLC_INPUTS[1].3;         //11
        
    
	
    //Vystupy z PLC do Robota//
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].0:= Robot.KOM_OUT.VypniMotory;                        //0
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].1:= Robot.KOM_OUT.ZapniMotory;                        //1
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].2:= Robot.KOM_OUT.PP_na_Main;                         //2
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].3:= Robot.KOM_OUT.StartProgramu;                      //3
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].4:= Robot.KOM_OUT.StartProgramuMain;                  //4
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].5:= Robot.KOM_OUT.StopProgramu;                       //5
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[0].6:= Robot.KOM_OUT.Reset_CS;                           //6
	
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].0:= Robot.KOM_OUT.OdparkujRobota;                     //8
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].1:= Robot.KOM_OUT.Paletka_OdoberCap;                  //9
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].2:= Robot.KOM_OUT.Otacac_PolozCap;                    //10
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].3:= Robot.KOM_OUT.Otacac_OdoberCap;                   //11
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].4:= Robot.KOM_OUT.Bruska_OdoberCap;                   //12
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].5:= Robot.KOM_OUT.Bruska_VlozCap;                     //13
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[1].6:= Robot.KOM_OUT.Dopravnik_PolozCap;                 //14
    
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].0:= Robot.KOM_OUT.Paletka_PresunDoCakacejPozicie;     //16
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].1:= Robot.KOM_OUT.Otacac_PresunDoCakacejPozicie;      //17
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].2:= Robot.KOM_OUT.Bruska_PresunDoCakacejPozicie;      //18    
    Robot.KOM_OUT.Profinet_PLC_OUTPUTS[2].3:= Robot.KOM_OUT.Dopravnik_PresunDoCakacejPozicie;   //19
    
	Robot.KOM_OUT.Profinet_PLC_OUTPUTS[3]:= Robot.KOM_OUT.PocetNalozenychCapov;                 //24 - 31
    
    
    
    
END_ACTION
