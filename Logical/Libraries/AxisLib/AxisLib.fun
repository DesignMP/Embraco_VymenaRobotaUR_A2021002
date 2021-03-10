
{REDUND_ERROR} FUNCTION_BLOCK Axis_Servo (*TODO: Add your comment here*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		AxisName : {REDUND_UNREPLICABLE} UDINT;
		CMD : ServoCommand_typ;
		PAR : ServoParametre_typ;
		HomePAR : ServoHomeParametre_typ;
	END_VAR
	VAR_OUTPUT
		STATUS : ServoStatus_typ;
		ErrorDetail : ServoErrorDetail_typ;
	END_VAR
	VAR
		Internal : ServoInternal_typ;
	END_VAR
END_FUNCTION_BLOCK

{REDUND_ERROR} FUNCTION_BLOCK Axis_Krokac (*TODO: Add your comment here*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		AxisName : {REDUND_UNREPLICABLE} UDINT;
		CMD : KrokacCommand_typ;
		PAR : KrokacParametre_typ;
		HomePAR : KrokacHomeParametre_typ;
	END_VAR
	VAR_OUTPUT
		STATUS : KrokacStatus_typ;
		ErrorDetail : KrokacErrorDetail_typ;
	END_VAR
	VAR
		Internal : KrokacInternal_typ;
	END_VAR
END_FUNCTION_BLOCK

{REDUND_ERROR} FUNCTION_BLOCK ServoLim (*TODO: Add your comment here*) (*$GROUP=User,$CAT=User,$GROUPICON=User.png,$CATICON=User.png*)
	VAR_INPUT
		AxisName : UDINT;
		ENABLE : BOOL;
		PositiveLimitSwitch : BOOL;
		NegativeLimitSwitch : BOOL;
		HomingSwitch : BOOL;
	END_VAR
	VAR_OUTPUT
		BUSY : BOOL;
		Error : BOOL;
	END_VAR
	VAR
		Internal : ServoLimInternal_typ;
	END_VAR
END_FUNCTION_BLOCK
