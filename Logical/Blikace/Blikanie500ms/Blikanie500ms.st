
PROGRAM _INIT
	(* Insert code here *)
	 
END_PROGRAM

PROGRAM _CYCLIC
	IF NOT Blikac500ms THEN
		Blikac500ms:= TRUE;
	ELSE
		Blikac500ms:= FALSE;
	END_IF	
	 
END_PROGRAM

PROGRAM _EXIT
	(* Insert code here *)
	 
END_PROGRAM

