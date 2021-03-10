
(* TODO: Add your comment here *)
FUNCTION_BLOCK ServoLim
	
	//*******************************Aktivácia limitných snímaèov*****************************************//
	//Reset poruchy//
	IF NOT ENABLE THEN
		Internal.STEP:= 0;
		Error:= FALSE;
	END_IF	
	
	
	
	//Zápis do parametrov//
	
	CASE Internal.STEP OF
		
		0: //Èakanie na spustenie sekvencie//
			Internal.MC_BR_ProcessParID_AcpAx_0.Execute:= FALSE;
			Internal.MC_BR_CyclicProcessParID_AcpAx_0.Enable:= FALSE;
			BUSY:= FALSE;
			IF ENABLE AND NOT Error THEN
				Internal.STEP:= 1;
			END_IF
		
		1://Zápis parametru - povolenie limitných snímaèov//
			Internal.MC_BR_ProcessParID_AcpAx_0.Axis:= AxisName;
			Internal.MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(Internal.McAcpAxProcessParIDType_0);
			Internal.MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 0;
			Internal.MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_SET;
			Internal.McAcpAxProcessParIDType_0.DataType:= mcACPAX_PARTYPE_USINT;	
			Internal.McAcpAxProcessParIDType_0.ParID:= 184;
			Internal.McAcpAxProcessParIDType_0.VariableAddress:= ADR(Internal.AktivaciaLimSnimacov_Data);	
			Internal.AktivaciaLimSnimacov_Data:= 7;	
			Internal.MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;
				
			IF Internal.MC_BR_ProcessParID_AcpAx_0.Done THEN
				Internal.MC_BR_ProcessParID_AcpAx_0.Execute:= FALSE;
				Internal.AktivaciaLimSnimacov_Data:= 0;
				Internal.STEP:= 3;
			ELSIF Internal.MC_BR_ProcessParID_AcpAx_0.Error THEN
				Error:= TRUE;
				Internal.STEP:= 0;
			END_IF
		
		3://Korekèný èas//	
			IF NOT Internal.MC_BR_ProcessParID_AcpAx_0.Done THEN
				Internal.KorekcnyCas.IN:= TRUE;
			END_IF
			
			IF Internal.KorekcnyCas.Q THEN
				Internal.KorekcnyCas.IN:= FALSE;
				Internal.STEP:= 5;
			END_IF	
			
			
		5://Èítanie parametru - overenie povolenia limitných snímaèov//
			Internal.MC_BR_ProcessParID_AcpAx_0.Axis:= AxisName;
			Internal.MC_BR_ProcessParID_AcpAx_0.DataAddress:= ADR(Internal.McAcpAxProcessParIDType_0);
			Internal.MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs:= 0;
			Internal.MC_BR_ProcessParID_AcpAx_0.Mode:= mcACPAX_PARID_GET;
			Internal.McAcpAxProcessParIDType_0.DataType:= mcACPAX_PARTYPE_USINT;	
			Internal.McAcpAxProcessParIDType_0.ParID:= 184;
			Internal.McAcpAxProcessParIDType_0.VariableAddress:= ADR(Internal.AktivaciaLimSnimacov_Data);	
			Internal.MC_BR_ProcessParID_AcpAx_0.Execute:= TRUE;		
		
			IF Internal.MC_BR_ProcessParID_AcpAx_0.Done THEN
				IF Internal.AktivaciaLimSnimacov_Data = 7 THEN
					Internal.MC_BR_ProcessParID_AcpAx_0.Execute:= FALSE;
					Internal.STEP:= 10;
				ELSE	
					Error:= TRUE;
					Internal.STEP:= 0;
				END_IF
			ELSIF Internal.MC_BR_ProcessParID_AcpAx_0.Error THEN
				Error:= TRUE;
				Internal.STEP:= 0;
			END_IF	
		
		8://Korekèný èas//
			IF NOT Internal.MC_BR_ProcessParID_AcpAx_0.Done THEN
				Internal.KorekcnyCas.IN:= TRUE;
			END_IF
			
			IF Internal.KorekcnyCas.Q THEN
				Internal.KorekcnyCas.IN:= FALSE;
				Internal.STEP:= 10;
			END_IF	
			
			
		
		10://
			Internal.MC_BR_CyclicProcessParID_AcpAx_0.Axis:= AxisName;
			Internal.MC_BR_CyclicProcessParID_AcpAx_0.DataAddress:= ADR(Internal.McAcpAxCycParIDType_0);
			Internal.MC_BR_CyclicProcessParID_AcpAx_0.NumberOfParIDs:= 0;
			Internal.MC_BR_CyclicProcessParID_AcpAx_0.Mode:= mcACPAX_CYCLIC_PARID_WRITE;
			Internal.McAcpAxCycParIDType_0.DataType:= mcACPAX_PARTYPE_USINT;
			Internal.McAcpAxCycParIDType_0.ParID:= 185;
			Internal.McAcpAxCycParIDType_0.VariableAddress:= ADR(Internal.LimSnimace_Data);
			Internal.McAcpAxCycParIDType_0.RefreshMode:= mcACPAX_CYCLIC_EVERY_RECORD;
			Internal.MC_BR_CyclicProcessParID_AcpAx_0.Enable:= TRUE;
			Internal.LimSnimace_Data.0:= HomingSwitch;
			Internal.LimSnimace_Data.1:= PositiveLimitSwitch;
			Internal.LimSnimace_Data.2:= NegativeLimitSwitch;
			
			BUSY:= Internal.MC_BR_CyclicProcessParID_AcpAx_0.Busy;
		
			IF Internal.MC_BR_CyclicProcessParID_AcpAx_0.Error THEN
				Error:= TRUE;
				Internal.STEP:= 0;
			END_IF	
		
		
	END_CASE	
	
		
	Internal.MC_BR_ProcessParID_AcpAx_0();
	Internal.MC_BR_CyclicProcessParID_AcpAx_0();
	
	Internal.KorekcnyCas.PT:= T#200ms;
	Internal.KorekcnyCas();
	
	
END_FUNCTION_BLOCK
