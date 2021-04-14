
TYPE
	SequenceControlTyp : 	STRUCT 
		StepName : STRING[200];
		Step : UINT;
		Switch1 : BOOL;
		Switch2 : BOOL;
		Switch3 : BOOL;
		ResetStep : BOOL;
		LastStep : BOOL;
		IdleTime : TON;
		AlarmTime : TON;
	END_STRUCT;
END_TYPE
