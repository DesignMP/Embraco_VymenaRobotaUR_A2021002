
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	
	//Naèítanie premenných pri prvom spustení//
	IF EDGEPOS(Safety.STAV.SafetyPLC_Nabehlo) THEN
		NacitajPremenne:= TRUE;
	END_IF
	
	//Naèítanie premenných z pamäte//
	IF NacitajPremenne THEN
		MpRecipeXml_0.Load:= TRUE;
		NacitajPremenne:= FALSE;
	END_IF	
		
	IF MpRecipeXml_0.Load AND (MpRecipeXml_0.CommandDone OR MpRecipeXml_0.Error) THEN
		MpRecipeXml_0.Load:= FALSE;
	END_IF	
	
	//Konfigurácia premenných//
	MpRecipeXml_0.MpLink:= ADR(gRemPremenne);  //takto sa menuje mapp komponenta v configurating view//
	MpRecipeXml_0.Enable:= TRUE;
	MpRecipeXml_0.Category:= ADR('PREMENNE');
	MpRecipeXml_0.DeviceName:= ADR('HDD_RemPremenne');  //Názov media, kde sa budú receptury ukladat//
	MpRecipeXml_0.FileName:= ADR('RemPremenne'); //Názov súboru do ktorého sa receptúry uložia//
	MpRecipeXml_0();
	
	MpRecipeRegPar_0.MpLink:= ADR(gRemPremenne);
	MpRecipeRegPar_0.Enable:= TRUE;
	MpRecipeRegPar_0.Category:= ADR('PREMENNE');
	MpRecipeRegPar_0.PVName:= ADR('RemPremenne'); //Názov premenné, kde je vytvorená štruktura dat premennych//
	MpRecipeRegPar_0();

	
	
	//Uloženie premenných//
	IF UlozPremenne THEN
		MpRecipeXml_0.Save:= TRUE;
		UlozPremenne:= FALSE;
	END_IF
	
	IF MpRecipeXml_0.Save AND (MpRecipeXml_0.CommandDone OR MpRecipeXml_0.Error) THEN
		MpRecipeXml_0.Save:= FALSE;
	END_IF	
		
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

