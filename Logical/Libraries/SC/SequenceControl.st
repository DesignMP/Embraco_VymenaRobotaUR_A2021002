
(* TODO: Add your comment here *)
FUNCTION SequenceControl

	IF SC.ResetStep THEN
		brsmemset(ADR(SC.StepName),0,SIZEOF(SC.StepName));
		SC.Switch1:= FALSE;
		SC.Switch2:= FALSE;
		SC.Switch3:= FALSE;
		SC.IdleTime.IN:= FALSE;
		SC.AlarmTime.IN:= FALSE;
		SC.ResetStep:= FALSE;
	END_IF

	IF SC.LastStep THEN
		brsmemset(ADR(SC.StepName),0,SIZEOF(SC.StepName));
		SC.Switch1:= FALSE;
		SC.Switch2:= FALSE;
		SC.Switch3:= FALSE;
		SC.IdleTime.IN:= FALSE;
		SC.AlarmTime.IN:= FALSE;
		SC.Step:= 0;
		SC.LastStep:= FALSE;
	END_IF
	
		
	//Volanie èasovaèov//
	SC.AlarmTime();
	SC.IdleTime();

END_FUNCTION
