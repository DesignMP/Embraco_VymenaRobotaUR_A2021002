
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	
	//Vyèítavanie systémového èasu//
	DTGetTime_1.enable:= TRUE;
	DTGetTime_1();
	DT_TO_DTStructure(DTGetTime_1.DT1,ADR(PLC_DatumCas));          
	
	PLC_Cas.Sekundy:= PLC_DatumCas.second;
	PLC_Cas.Minuty:= PLC_DatumCas.minute;
	PLC_Cas.Hodiny:= PLC_DatumCas.hour;
	
	PLC_Datum.Den:= PLC_DatumCas.day;
	PLC_Datum.Mesiac:= PLC_DatumCas.month;
	PLC_Datum.Rok:= PLC_DatumCas.year;
	
	
	
	//Prevod èasu na String//
	//Sekundy//
	IF PLC_Cas.Sekundy < 10 THEN
		Sekundy_String:= USINT_TO_STRING(PLC_Cas.Sekundy);
		Sekunda_STR:= '0';
		brsstrcat(ADR(Sekunda_STR),ADR(Sekundy_String));
	ELSE
		Sekunda_STR:= USINT_TO_STRING(PLC_Cas.Sekundy);
	END_IF	
	
	//Minuty//
	IF PLC_Cas.Minuty < 10 THEN
		Minuty_String:= USINT_TO_STRING(PLC_Cas.Minuty);
		Minuta_STR:= '0';
		brsstrcat(ADR(Minuta_STR),ADR(Minuty_String));
	ELSE
		Minuta_STR:= USINT_TO_STRING(PLC_Cas.Minuty);
	END_IF	
		
	//Hodiny//
	IF PLC_Cas.Hodiny < 10 THEN
		Hodiny_String:= USINT_TO_STRING(PLC_Cas.Hodiny);
		Hodina_STR:= '0';
		brsstrcat(ADR(Hodina_STR),ADR(Hodiny_String));
	ELSE
		Hodina_STR:= USINT_TO_STRING(PLC_Cas.Hodiny);
	END_IF	
	
	
	//Prevod dátumu na String//
	//Deò//
	IF PLC_Datum.Den < 10 THEN
		Den_String:= USINT_TO_STRING(PLC_Datum.Den);
		Den_STR:= '0';
		brsstrcat(ADR(Den_STR),ADR(Den_String));
	ELSE
		Den_STR:= USINT_TO_STRING(PLC_Datum.Den);
	END_IF	
	
	
	//Masiac//
	IF PLC_Datum.Mesiac < 10 THEN
		Mesiac_String:= USINT_TO_STRING(PLC_Datum.Mesiac);
		Mesiac_STR:= '0';
		brsstrcat(ADR(Mesiac_STR),ADR(Mesiac_String));
	ELSE
		Mesiac_STR:= USINT_TO_STRING(PLC_Datum.Mesiac);
	END_IF	
	
	//Rok - 4 znaky//
	Rok_STR_4_Znaky:= UINT_TO_STRING(PLC_Datum.Rok);
	
	//Rok - posledné 2 znaky//
	length := brsstrlen(ADR(Rok_STR_4_Znaky)); //Zistí poèet znakov//
	
	IF length >= 4 THEN
		brsmemcpy(ADR(PoleUSINT),ADR(Rok_STR_4_Znaky),SIZEOF(Rok_STR_4_Znaky));
		i := PoleUSINT[length-2]; //Vyèítanie predposledného znaku//
		brsstrcpy(ADR(DvaZnaky),ADR(i));
		i := PoleUSINT[length-1]; //Vyèítanie posledneho znaku// 
		brsstrcat(ADR(DvaZnaky),ADR(i));
	END_IF	
		
	Rok_STR_2_Znaky:= DvaZnaky;	
	
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

