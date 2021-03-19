(********************************************************************
 * COPYRIGHT -- Microsoft
 ********************************************************************
 * File: Global.typ
 * Author: Martin
 * Created: February 11, 2016
 ********************************************************************
 * Global data types of project Zamazat_1
 ********************************************************************)
(**************************Remanentne premenné********************************)

TYPE
	RemPremenne_typ : 	STRUCT 
		Bruska_VychodziaPoziciaNatocenia : LREAL;
		Bruska_RychlosOtacania : REAL;
	END_STRUCT;
END_TYPE

(**************************Safety***************************************************)

TYPE
	Safety_typ : 	STRUCT 
		IN : SafetyIN_typ;
		OUT : SafetyOUT_typ;
		PAR : SafetyPAR_typ;
		STAV : SafetySTAV_typ;
		RESET_ZonyRobot : BOOL;
		RESET_ZonyCS : BOOL;
		SpatnaVazba_ZonaRobot : BOOL;
		SpatnaVazba_ZonaCS : BOOL;
		SpatnaVazba_ZonaPracovisko : BOOL; (*FF1*)
	END_STRUCT;
	SafetyIN_typ : 	STRUCT 
		Robot_CS_CH1 : BOOL;
		Robot_CS_CH2 : BOOL;
		VyblokovanieSafety_CH1 : BOOL;
		VyblokovanieSafety_CH2 : BOOL;
		Pracovisko_CS_CH1 : BOOL;
		Pracovisko_CS_CH2 : BOOL;
		SpatnaVazbaPracovisko_CH1 : BOOL; (*FF2*)
		SpatnaVazbaPracovisko_CH2 : BOOL; (*FF2*)
	END_STRUCT;
	SafetyOUT_typ : 	STRUCT 
		Zona_CS : BOOL;
		Zona_Robot : BOOL;
		Zona_Pracovisko_CH1 : BOOL; (*FF1*)
		Zona_Pracovisko_CH2 : BOOL; (*FF1*)
	END_STRUCT;
	SafetyPAR_typ : 	STRUCT 
		PAR_0 : USINT;
	END_STRUCT;
	SafetySTAV_typ : 	STRUCT 
		SafetyPLC_Nabehlo : BOOL;
		ZonaCS_AKTIVNA : BOOL;
		ZonaRobot_AKTIVNA : BOOL;
		CS_Pracovisko_Odblokovany : BOOL;
		CS_Robot_Odblokovany : BOOL;
		VyblokovanieSafety_AKTIVNE : BOOL;
	END_STRUCT;
END_TYPE

(**************************Vizualizacia**********************************************)

TYPE
	Vizu_typ : 	STRUCT 
		CisloAktualnejObrazovky : USINT;
		CisloZadanejObrazovky : USINT;
		TL_RezimAutomat : BOOL;
		StavPracoviskaRobota_Index : USINT;
		StavPracoviskaBrusky_Index : USINT;
		StavZariadenia_Farba : USINT;
		StavZariadenia_Index : USINT;
		TL_RezimManual_DISABLE : BOOL; (*0 - odomknuté, 1 - zamknuté*)
		TL_StartAutomat_DISABLE : BOOL;
		TL_UkoncenieCyklu_DISABLE : BOOL;
		Slider : USINT;
		FarbaTlacitkaAlarm_Index : BOOL;
		ZobrazSymbolAlarmu : BOOL;
		ZobrazHlasenie_ResetZariadenia : USINT;
	END_STRUCT;
END_TYPE

(**************************Pracovisko************************************************)

TYPE
	Zariadenie_typ : 	STRUCT 
		IN : ZariadenieIN_typ;
		OUT : ZariadenieOUT_typ;
		PAR : ZariadeniePAR_typ;
		STAV : ZariadenieSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		Majak_HukackaON : BOOL;
	END_STRUCT;
	ZariadenieIN_typ : 	STRUCT 
		PrepatovaOchrana_OK : BOOL;
		Paletka_PritomnostKusu_OS1 : BOOL;
		VystupDoprav_PritomnostKusu_OS2 : BOOL;
		Otacac_PritomnostKusu_IS2 : BOOL;
	END_STRUCT;
	ZariadenieOUT_typ : 	STRUCT 
		Majak_ZeleneSvetlo : BOOL;
		Majak_ZlteSvetlo : BOOL;
		Majak_CerveneSvetlo : BOOL;
		Majak_Hukacka : BOOL;
	END_STRUCT;
	ZariadeniePAR_typ : 	STRUCT 
		New_Member : USINT;
	END_STRUCT;
	ZariadenieSTAV_typ : 	STRUCT 
		Automat : BOOL;
		Manual : BOOL;
		PoINIT : BOOL;
		READY_TO_START : BOOL;
		UkoncenieCyklu_BUSY : BOOL;
		Hardware_OK : BOOL;
	END_STRUCT;
END_TYPE

(***************Robot************************************)

TYPE
	Robot_typ : 	STRUCT 
		IN : RobotIN_typ;
		OUT : RobotOUT_typ;
		KOM_IN : RobotKOM_IN_typ;
		KOM_OUT : RobotKOM_OUT_typ;
		PAR : RobotPAR_typ;
		STAV : RobotSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
	END_STRUCT;
	RobotIN_typ : 	STRUCT 
		ManipulUchopovac_Otvoreny_MS2 : BOOL;
		ManipulUchopovac_Zatvoreny_MS1 : BOOL;
		OdkladaciUchopovac_Otvoreny_MS4 : BOOL;
		OdkladaciUchopovac_Zatvoreny_MS3 : BOOL;
		CisloZadanejPozicie_Bit0 : BOOL;
		CisloZadanejPozicie_Bit1 : BOOL;
		CisloZadanejPozicie_Bit2 : BOOL;
		CisloZadanejPozicie_Bit3 : BOOL;
	END_STRUCT;
	RobotOUT_typ : 	STRUCT 
		CisloAktualnejPozicie_Bit0 : BOOL;
		CisloAktualnejPozicie_Bit1 : BOOL;
		CisloAktualnejPozicie_Bit2 : BOOL;
		CisloAktualnejPozicie_Bit3 : BOOL;
		ZatvorManipulacnyUchopovac : BOOL;
		ZatvorOdkladaciUchopovac : BOOL;
		VystupnyDopravnikNalozeny : BOOL;
	END_STRUCT;
	RobotPAR_typ : 	STRUCT 
		CisloZadanejPozicie : USINT;
		CisloAktualnejPozicie : USINT;
		PocetNalozenychCapov : USINT;
	END_STRUCT;
	RobotSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
	END_STRUCT;
	RobotKOM_IN_typ : 	STRUCT 
		Stav_RobotOdparkovany : BOOL;
		Stav_RobotDrziCap : BOOL;
		Stav_RobotCinnostUkoncena : BOOL;
		Stav_Dopravnik_Plny : BOOL;
		Stav_MotoryON : BOOL;
		Stav_MotoryOFF : BOOL;
		Stav_ProgramRUN : BOOL;
		Stav_RezimAUTOMAT : BOOL;
		Stav_RobotCS : BOOL;
		Stav_VystupyZresetovane : BOOL;
		Profinet_PLC_INPUTS : ARRAY[0..63]OF USINT;
	END_STRUCT;
	RobotKOM_OUT_typ : 	STRUCT 
		PocetNalozenychCapov : USINT;
		ZapniMotory : BOOL;
		VypniMotory : BOOL;
		PP_na_Main : BOOL;
		Reset_CS : BOOL;
		StartProgramu : BOOL;
		StartProgramuMain : BOOL;
		StopProgramu : BOOL;
		OdparkujRobota : BOOL;
		Paletka_PresunDoCakacejPozicie : BOOL;
		Paletka_OdoberCap : BOOL;
		Otacac_PresunDoCakacejPozicie : BOOL;
		Otacac_PolozCap : BOOL;
		Otacac_OdoberCap : BOOL;
		Bruska_PresunDoCakacejPozicie : BOOL;
		Bruska_OdoberCap : BOOL;
		Bruska_VlozCap : BOOL;
		Dopravnik_PresunDoCakacejPozicie : BOOL;
		Dopravnik_PolozCap : BOOL;
		Profinet_PLC_OUTPUTS : ARRAY[0..63]OF USINT;
	END_STRUCT;
END_TYPE

(***************Bruska*************************************)

TYPE
	Bruska_typ : 	STRUCT 
		IN : BruskaIN_typ;
		OUT : BruskaOUT_typ;
		PAR : BruskaPAR_typ;
		STAV : BruskaSTAV_typ;
		Automat : BOOL;
		Manual : BOOL;
		Reset : BOOL;
		KoniecCyklu : BOOL;
		ServoOtacaniaUpinacejHlavy_M1 : Axis_Servo;
		Servo_STOP : BOOL;
		Servo_JoggVPRED : BOOL;
		Servo_JoggVZAD : BOOL;
		Servo_HOME_SWITCH : BOOL;
		Servo_HOME_DIRECT : BOOL;
		Servo_POLOHUJ : BOOL;
		Servo_MOVE : BOOL;
	END_STRUCT;
	BruskaIN_typ : 	STRUCT 
		ReferencnySnimac_IS1 : BOOL;
		UpinaciaHlava_OtacanieVPRED : BOOL;
		UpinaciaHlava_OtacanieVZAD : BOOL;
	END_STRUCT;
	BruskaOUT_typ : 	STRUCT 
		Stav_UpinaciaHlavaSaOtacaVPRED : BOOL;
		Stav_UpinaciaHlavaSaOtacaVZAD : BOOL;
		Stav_PoruchaMotoraUpinacejHlavy : BOOL;
	END_STRUCT;
	BruskaPAR_typ : 	STRUCT 
		Servo_JoggRychlost : REAL;
		Servo_RychlostPolohovania : REAL;
		Servo_PoziciaNatocenia : LREAL;
	END_STRUCT;
	BruskaSTAV_typ : 	STRUCT 
		PoINIT : BOOL;
		ServoREADY : BOOL;
		Servo_LimitneSnimaceBUSY : BOOL;
		Servo_AktualnaPozicia : LREAL;
		Servo_AktualnaRychlost : REAL;
		Servo_HomingOK : BOOL;
		Servo_BUSY : BOOL;
		Servo_JoggLimitDosiahnuty : BOOL;
		Servo_HomingBUSY : BOOL;
		Servo_PoziciaDosiahnuta : BOOL;
		Servo_AktualnyPocetOtacok : LREAL;
	END_STRUCT;
END_TYPE

(**************Stav hardware*****************************)

TYPE
	HardwareSTAV_typ : 	STRUCT 
		KartaAB1_ProfinetMaster_OK : BOOL;
		KartaAB3_NapajanieCPU_OK : BOOL;
		KartaAB4_SafetyMaster_OK : BOOL;
		KartaAB5_16DI_OK : BOOL;
		KartaAB6_16DI_OK : BOOL;
		KartaAB7_16DO_OK : BOOL;
		Komunikacia_Robot_OK : BOOL;
	END_STRUCT;
END_TYPE
