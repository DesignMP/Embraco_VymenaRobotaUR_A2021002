#define _DEFAULT_INCLUDE
#include <bur\plctypes.h>
#include "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/AxisLib/Axis_Servost.h"
#line 1 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Libraries/AxisLib/Axis_Servo.nodebug"
#line 3 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Libraries/AxisLib/Axis_Servo.st"
void Axis_Servo(struct Axis_Servo* inst){struct Axis_Servo* __inst__=inst;{


((*(unsigned long*)&(__inst__->Internal.MC_Power_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_Power_0.Enable=__inst__->CMD.POWER);
(__inst__->ErrorDetail.Power_Error=__inst__->Internal.MC_Power_0.Error);
(__inst__->ErrorDetail.Power_ErrorID=__inst__->Internal.MC_Power_0.ErrorID);
MC_Power(&__inst__->Internal.MC_Power_0);




((*(unsigned long*)&(__inst__->Internal.MC_ReadAxisInfo_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_ReadAxisInfo_0.Enable=1);
(__inst__->STATUS.ReadyToPower_ON=__inst__->Internal.MC_ReadAxisInfo_0.ReadyForPowerOn);
(__inst__->STATUS.Communication_READY=__inst__->Internal.MC_ReadAxisInfo_0.CommunicationReady);
(__inst__->STATUS.Power_ON=__inst__->Internal.MC_ReadAxisInfo_0.PowerOn);
(__inst__->STATUS.Homing_OK=__inst__->Internal.MC_ReadAxisInfo_0.IsHomed);
(__inst__->STATUS.EnableSwitch_ACTIVE=__inst__->Internal.MC_ReadAxisInfo_0.AdditionalInfo.DigitalInputStatus.DriveEnable);
(__inst__->STATUS.HomingSwitch_ACTIVE=__inst__->Internal.MC_ReadAxisInfo_0.AdditionalInfo.DigitalInputStatus.HomingSwitch);
(__inst__->STATUS.NegativeLimitSwitch_ACTIVE=__inst__->Internal.MC_ReadAxisInfo_0.AdditionalInfo.DigitalInputStatus.NegativeLimitSwitch);
(__inst__->STATUS.PositiveLimitSwitch_ACTIVE=__inst__->Internal.MC_ReadAxisInfo_0.AdditionalInfo.DigitalInputStatus.PositiveLimitSwitch);
MC_ReadAxisInfo(&__inst__->Internal.MC_ReadAxisInfo_0);






((*(unsigned long*)&(__inst__->Internal.MC_ReadAxisError_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_ReadAxisError_0.Enable=__inst__->CMD.ENABLE);
(__inst__->STATUS.ERROR_ID=__inst__->Internal.MC_ReadAxisError_0.AxisErrorID);
MC_ReadAxisError(&__inst__->Internal.MC_ReadAxisError_0);

((*(unsigned long*)&(__inst__->Internal.MC_ReadStatus_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_ReadStatus_0.Enable=__inst__->CMD.ENABLE);
MC_ReadStatus(&__inst__->Internal.MC_ReadStatus_0);



if(__inst__->Internal.MC_Home_0.Error){
(__inst__->STATUS.ERROR=1);
}else if(__inst__->Internal.MC_BR_JogLimitPosition_0.Error){
(__inst__->STATUS.ERROR=1);
}else if(__inst__->Internal.MC_BR_JogVelocity_0.Error){
(__inst__->STATUS.ERROR=1);
}else if(__inst__->Internal.MC_MoveAbsolute_0.Error){
(__inst__->STATUS.ERROR=1);
}else if(__inst__->Internal.MC_MoveAdditive_0.Error){
(__inst__->STATUS.ERROR=1);
}else if(__inst__->Internal.MC_MoveVelocity_0.Error){
(__inst__->STATUS.ERROR=1);
}else if(__inst__->Internal.MC_TorqueControl_0.Error){
(__inst__->STATUS.ERROR=1);
}else if(__inst__->Internal.MC_Stop_0.Error){
(__inst__->STATUS.ERROR=1);
}else if(__inst__->Internal.MC_BR_BrakeOperation_0.Error){
(__inst__->STATUS.ERROR=1);
}else if((((signed long)__inst__->STATUS.ERROR_ID!=(signed long)0))){
(__inst__->STATUS.ERROR=1);
}else{
(__inst__->STATUS.ERROR=0);
}






((*(unsigned long*)&(__inst__->Internal.MC_Reset_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_Reset_0.Execute=__inst__->CMD.ErrorRESET);
MC_Reset(&__inst__->Internal.MC_Reset_0);

if(__inst__->CMD.ErrorRESET){
(__inst__->CMD.ENABLE=0);
}else{
(__inst__->CMD.ENABLE=1);
}









((*(unsigned long*)&(__inst__->Internal.MC_BR_InitHome_AcpAx_0.Axis))=__inst__->AxisName);
((*(unsigned long*)&(__inst__->Internal.MC_Home_0.Axis))=__inst__->AxisName);
if((((unsigned long)(unsigned char)__inst__->HomePAR.HomingMode==(unsigned long)(unsigned char)0))){
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingMode=0);
}else if((((unsigned long)(unsigned char)__inst__->HomePAR.HomingMode==(unsigned long)(unsigned char)1))){
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingMode=1);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.StartDirection=1);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.SwitchEdge=1);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingDirection=0);
}else if((((unsigned long)(unsigned char)__inst__->HomePAR.HomingMode==(unsigned long)(unsigned char)2))){
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingMode=4);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.SwitchEdge=1);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingDirection=0);
}else if((((unsigned long)(unsigned char)__inst__->HomePAR.HomingMode==(unsigned long)(unsigned char)3))){
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingMode=5);
}else if((((unsigned long)(unsigned char)__inst__->HomePAR.HomingMode==(unsigned long)(unsigned char)4))){
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingMode=9);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.StartDirection=1);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.SwitchEdge=1);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingDirection=0);
}else{
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingMode=0);
}

(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.Acceleration=__inst__->HomePAR.Acceleration);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.HomingVelocity=__inst__->HomePAR.HomingVelocity);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.Position=__inst__->HomePAR.Position);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.StartVelocity=__inst__->HomePAR.StartVelocity);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.TorqueLimit=__inst__->HomePAR.HomeTorque);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.ReferencePulse=0);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.KeepDirection=0);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.BlockDetectionPositionError=1.00000000000000000000E+00);
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.HomingParameters.PositionErrorStopLimit=1.00000000000000000000E+00);
(__inst__->Internal.MC_Home_0.HomingMode=141);
(__inst__->Internal.MC_Home_0.BufferMode=0);
(__inst__->STATUS.Homing_BUSY=__inst__->Internal.MC_Home_0.Busy);
(__inst__->ErrorDetail.Home_Error=__inst__->Internal.MC_Home_0.Error);
(__inst__->ErrorDetail.Home_ErrorID=__inst__->Internal.MC_Home_0.ErrorID);
MC_BR_InitHome_AcpAx(&__inst__->Internal.MC_BR_InitHome_AcpAx_0);
MC_Home(&__inst__->Internal.MC_Home_0);




switch(__inst__->Internal.Home_STEP){



case 0:{
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.Execute=0);
(__inst__->Internal.MC_Home_0.Execute=0);
if(((__inst__->CMD.HOME^1)&(__inst__->Internal.MC_BR_InitHome_AcpAx_0.Error^1)&(__inst__->Internal.MC_Home_0.Error^1))){
(__inst__->Internal.Home_STEP=1);
}


}break;case 1:{
if(__inst__->CMD.HOME){
(__inst__->Internal.Home_STEP=2);
}


}break;case 2:{
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.Execute=1);
if(__inst__->Internal.MC_BR_InitHome_AcpAx_0.Error){
(__inst__->Internal.Home_STEP=0);
}else if(__inst__->Internal.MC_BR_InitHome_AcpAx_0.Done){
(__inst__->Internal.MC_BR_InitHome_AcpAx_0.Execute=0);
(__inst__->Internal.Home_STEP=3);
}

}break;case 3:{
(__inst__->Internal.MC_Home_0.Execute=1);
if(__inst__->Internal.MC_Home_0.Error){
(__inst__->Internal.Home_STEP=0);
}else if(__inst__->Internal.MC_Home_0.Done){
(__inst__->Internal.Home_STEP=0);
}else if((__inst__->CMD.HOME^1)){
(__inst__->Internal.Home_STEP=0);
}
}break;}











if(((__inst__->CMD.JoggVPRED|__inst__->CMD.JoggVZAD)&(__inst__->CMD.JoggLimit_ACTIVE^1)&__inst__->CMD.ENABLE)){
(__inst__->Internal.MC_BR_JogLimitPosition_0.Enable=0);
(__inst__->Internal.MC_BR_JogVelocity_0.Enable=1);
(__inst__->STATUS.Jogging_BUSY=__inst__->Internal.MC_BR_JogVelocity_0.Jogging);
}else if(((__inst__->CMD.JoggVPRED|__inst__->CMD.JoggVZAD)&__inst__->CMD.JoggLimit_ACTIVE&__inst__->CMD.ENABLE)){
(__inst__->Internal.MC_BR_JogVelocity_0.Enable=0);
(__inst__->Internal.MC_BR_JogLimitPosition_0.Enable=1);
(__inst__->STATUS.Jogging_BUSY=__inst__->Internal.MC_BR_JogLimitPosition_0.Jogging);
}else{
(__inst__->Internal.MC_BR_JogVelocity_0.Enable=0);
(__inst__->Internal.MC_BR_JogLimitPosition_0.Enable=0);
}



((*(unsigned long*)&(__inst__->Internal.MC_BR_JogVelocity_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_BR_JogVelocity_0.Acceleration=__inst__->PAR.JoggAcceleration);
(__inst__->Internal.MC_BR_JogVelocity_0.Deceleration=__inst__->PAR.JoggDeceleration);
(__inst__->Internal.MC_BR_JogVelocity_0.Velocity=__inst__->PAR.JoggVelocity);
(__inst__->Internal.MC_BR_JogVelocity_0.Jerk=0.00000000000000000000E+00);
(__inst__->Internal.MC_BR_JogVelocity_0.JogPositive=__inst__->CMD.JoggVPRED);
(__inst__->Internal.MC_BR_JogVelocity_0.JogNegative=__inst__->CMD.JoggVZAD);
(__inst__->ErrorDetail.Jogg_Error=__inst__->Internal.MC_BR_JogVelocity_0.Error);
(__inst__->ErrorDetail.Jogg_ErrorID=__inst__->Internal.MC_BR_JogVelocity_0.ErrorID);
MC_BR_JogVelocity(&__inst__->Internal.MC_BR_JogVelocity_0);





((*(unsigned long*)&(__inst__->Internal.MC_BR_JogLimitPosition_0.Axis))=__inst__->AxisName);
if(((__inst__->STATUS.ActualPosition>=__inst__->PAR.JoggPoziciaLimitVPRED))){
(__inst__->Internal.MC_BR_JogLimitPosition_0.LastPosition=__inst__->STATUS.ActualPosition);
}else{
(__inst__->Internal.MC_BR_JogLimitPosition_0.LastPosition=__inst__->PAR.JoggPoziciaLimitVPRED);
}
if(((__inst__->STATUS.ActualPosition<=__inst__->PAR.JoggPoziciaLimitVZAD))){
(__inst__->Internal.MC_BR_JogLimitPosition_0.FirstPosition=__inst__->STATUS.ActualPosition);
}else{
(__inst__->Internal.MC_BR_JogLimitPosition_0.FirstPosition=__inst__->PAR.JoggPoziciaLimitVZAD);
}
(__inst__->Internal.MC_BR_JogLimitPosition_0.Acceleration=__inst__->PAR.JoggAcceleration);
(__inst__->Internal.MC_BR_JogLimitPosition_0.Deceleration=__inst__->PAR.JoggDeceleration);
(__inst__->Internal.MC_BR_JogLimitPosition_0.Jerk=0.00000000000000000000E+00);
(__inst__->Internal.MC_BR_JogLimitPosition_0.JogPositive=__inst__->CMD.JoggVPRED);
(__inst__->Internal.MC_BR_JogLimitPosition_0.JogNegative=__inst__->CMD.JoggVZAD);
(__inst__->Internal.MC_BR_JogLimitPosition_0.Velocity=__inst__->PAR.JoggVelocity);
(__inst__->STATUS.JoggLimit_Dosiahnuty=__inst__->Internal.MC_BR_JogLimitPosition_0.LimitReached);
(__inst__->ErrorDetail.JoggLimit_Error=__inst__->Internal.MC_BR_JogLimitPosition_0.Error);
(__inst__->ErrorDetail.JoggLimit_ErrorID=__inst__->Internal.MC_BR_JogLimitPosition_0.ErrorID);
MC_BR_JogLimitPosition(&__inst__->Internal.MC_BR_JogLimitPosition_0);



((*(unsigned long*)&(__inst__->Internal.MC_MoveAbsolute_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_MoveAbsolute_0.Execute=__inst__->CMD.MoveAbsolute);
(__inst__->Internal.MC_MoveAbsolute_0.Acceleration=__inst__->PAR.Acceleration);
(__inst__->Internal.MC_MoveAbsolute_0.Deceleration=__inst__->PAR.Deceleration);
(__inst__->Internal.MC_MoveAbsolute_0.BufferMode=0);
if((((unsigned long)(unsigned char)__inst__->PAR.MoveDirection==(unsigned long)(unsigned char)0))){
(__inst__->Internal.MC_MoveAbsolute_0.Direction=0);
}else if((((unsigned long)(unsigned char)__inst__->PAR.MoveDirection==(unsigned long)(unsigned char)1))){
(__inst__->Internal.MC_MoveAbsolute_0.Direction=1);
}else if((((unsigned long)(unsigned char)__inst__->PAR.MoveDirection==(unsigned long)(unsigned char)10))){
(__inst__->Internal.MC_MoveAbsolute_0.Direction=10);
}else{
(__inst__->Internal.MC_MoveAbsolute_0.Direction=0);
}
(__inst__->Internal.MC_MoveAbsolute_0.Jerk=0.00000000000000000000E+00);
(__inst__->Internal.MC_MoveAbsolute_0.Position=__inst__->PAR.Position);
(__inst__->Internal.MC_MoveAbsolute_0.Velocity=__inst__->PAR.Velocity);
(__inst__->STATUS.MoveAbsolute_BUSY=__inst__->Internal.MC_MoveAbsolute_0.Busy);
(__inst__->STATUS.MoveAbsolute_DONE=__inst__->Internal.MC_MoveAbsolute_0.Done);
(__inst__->ErrorDetail.MoveAbsolute_Error=__inst__->Internal.MC_MoveAbsolute_0.Error);
(__inst__->ErrorDetail.MoveAbsolute_ErrorID=__inst__->Internal.MC_MoveAbsolute_0.ErrorID);
MC_MoveAbsolute(&__inst__->Internal.MC_MoveAbsolute_0);



((*(unsigned long*)&(__inst__->Internal.MC_MoveAdditive_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_MoveAdditive_0.Execute=__inst__->CMD.MoveAdditive);
(__inst__->Internal.MC_MoveAdditive_0.Acceleration=__inst__->PAR.Acceleration);
(__inst__->Internal.MC_MoveAdditive_0.Deceleration=__inst__->PAR.Deceleration);
(__inst__->Internal.MC_MoveAdditive_0.Distance=__inst__->PAR.AdditivePosition);
(__inst__->Internal.MC_MoveAdditive_0.Velocity=__inst__->PAR.Velocity);
(__inst__->Internal.MC_MoveAdditive_0.BufferMode=0);
(__inst__->Internal.MC_MoveAdditive_0.Jerk=0.00000000000000000000E+00);
(__inst__->STATUS.MoveAdditive_BUSY=__inst__->Internal.MC_MoveAdditive_0.Busy);
(__inst__->STATUS.MoveAdditive_DONE=__inst__->Internal.MC_MoveAdditive_0.Done);
(__inst__->ErrorDetail.MoveAdditive_Error=__inst__->Internal.MC_MoveAdditive_0.Error);
(__inst__->ErrorDetail.MoveAdditive_ErrorID=__inst__->Internal.MC_MoveAdditive_0.ErrorID);
MC_MoveAdditive(&__inst__->Internal.MC_MoveAdditive_0);




((*(unsigned long*)&(__inst__->Internal.MC_MoveVelocity_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_MoveVelocity_0.Execute=__inst__->CMD.MoveVelocity);
(__inst__->Internal.MC_MoveVelocity_0.Acceleration=__inst__->PAR.Acceleration);
(__inst__->Internal.MC_MoveVelocity_0.Deceleration=__inst__->PAR.Deceleration);
(__inst__->Internal.MC_MoveVelocity_0.BufferMode=0);
if((((unsigned long)(unsigned char)__inst__->PAR.MoveDirection==(unsigned long)(unsigned char)0))){
(__inst__->Internal.MC_MoveVelocity_0.Direction=0);
}else if((((unsigned long)(unsigned char)__inst__->PAR.MoveDirection==(unsigned long)(unsigned char)1))){
(__inst__->Internal.MC_MoveVelocity_0.Direction=1);
}else if((((unsigned long)(unsigned char)__inst__->PAR.MoveDirection==(unsigned long)(unsigned char)10))){
(__inst__->Internal.MC_MoveVelocity_0.Direction=10);
}else{
(__inst__->Internal.MC_MoveVelocity_0.Direction=0);
}
(__inst__->Internal.MC_MoveVelocity_0.Velocity=__inst__->PAR.Velocity);
(__inst__->Internal.MC_MoveVelocity_0.Jerk=0.00000000000000000000E+00);
(__inst__->STATUS.MoveVelocity_BUSY=__inst__->Internal.MC_MoveVelocity_0.Busy);
(__inst__->STATUS.Rychlost_Dosiahnuta=__inst__->Internal.MC_MoveVelocity_0.InVelocity);
(__inst__->ErrorDetail.MoveVelocity_Error=__inst__->Internal.MC_MoveVelocity_0.Error);
(__inst__->ErrorDetail.MoveVelocity_ErrorID=__inst__->Internal.MC_MoveVelocity_0.ErrorID);
MC_MoveVelocity(&__inst__->Internal.MC_MoveVelocity_0);



((*(unsigned long*)&(__inst__->Internal.MC_TorqueControl_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_TorqueControl_0.Execute=__inst__->CMD.MoveTorque);
(__inst__->Internal.MC_TorqueControl_0.Torque=__inst__->PAR.Torque);
(__inst__->Internal.MC_TorqueControl_0.TorqueRamp=__inst__->PAR.TorqueRamp);
(__inst__->Internal.MC_TorqueControl_0.Velocity=__inst__->PAR.TorqueVelocity);
(__inst__->Internal.MC_TorqueControl_0.Acceleration=__inst__->PAR.TorqueAcceleration);
(__inst__->Internal.MC_TorqueControl_0.Jerk=0.00000000000000000000E+00);
(__inst__->Internal.MC_TorqueControl_0.BufferMode=0);
(__inst__->STATUS.MoveTorque_BUSY=__inst__->Internal.MC_TorqueControl_0.Busy);
if((((__inst__->PAR.Torque>0))&__inst__->STATUS.MoveTorque_BUSY)){
(__inst__->Internal.CasTorque.IN=((__inst__->STATUS.ActualTorque>=__inst__->PAR.Torque)));
}else if((((__inst__->PAR.Torque<0))&__inst__->STATUS.MoveTorque_BUSY)){
(__inst__->Internal.CasTorque.IN=((__inst__->STATUS.ActualTorque<=__inst__->PAR.Torque)));
}else{
(__inst__->Internal.CasTorque.IN=0);
(__inst__->STATUS.Torque_Dosiahnuty=0);
}
if(__inst__->Internal.CasTorque.Q){
(__inst__->STATUS.Torque_Dosiahnuty=1);
}

(__inst__->STATUS.Torque_AxisLimit_ACTIVE=__inst__->Internal.MC_TorqueControl_0.AxisLimitActive);
(__inst__->ErrorDetail.MoveTorque_Error=__inst__->Internal.MC_TorqueControl_0.Error);
(__inst__->ErrorDetail.MoveTorque_ErrorID=__inst__->Internal.MC_TorqueControl_0.ErrorID);
MC_TorqueControl(&__inst__->Internal.MC_TorqueControl_0);

(__inst__->Internal.CasTorque.PT=200);
TON(&__inst__->Internal.CasTorque);


((*(unsigned long*)&(__inst__->Internal.MC_Stop_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_Stop_0.Execute=__inst__->CMD.STOP);
(__inst__->Internal.MC_Stop_0.Deceleration=__inst__->PAR.StopDeceleration);
(__inst__->Internal.MC_Stop_0.Jerk=0.00000000000000000000E+00);
(__inst__->STATUS.STOP_ACTIVE=__inst__->Internal.MC_Stop_0.Done);
(__inst__->ErrorDetail.Stop_Error=__inst__->Internal.MC_Stop_0.Error);
(__inst__->ErrorDetail.Stop_ErrorID=__inst__->Internal.MC_Stop_0.ErrorID);
MC_Stop(&__inst__->Internal.MC_Stop_0);


((*(unsigned long*)&(__inst__->Internal.MC_BR_BrakeOperation_0.Axis))=__inst__->AxisName);
if(__inst__->CMD.UvolniBRZDU){
(__inst__->Internal.MC_BR_BrakeOperation_0.Command=1);
(__inst__->Internal.MC_BR_BrakeOperation_0.Execute=1);
(__inst__->STATUS.UvolnenieBrzdy_DONE=__inst__->Internal.MC_BR_BrakeOperation_0.Done);
}else if(__inst__->CMD.ZabrzdiBRZDU){
(__inst__->Internal.MC_BR_BrakeOperation_0.Command=0);
(__inst__->Internal.MC_BR_BrakeOperation_0.Execute=1);
(__inst__->STATUS.ZabrzdenieBrzdy_DONE=__inst__->Internal.MC_BR_BrakeOperation_0.Done);
}else{
(__inst__->Internal.MC_BR_BrakeOperation_0.Execute=0);
(__inst__->STATUS.UvolnenieBrzdy_DONE=0);
(__inst__->STATUS.ZabrzdenieBrzdy_DONE=0);
}
(__inst__->ErrorDetail.BreakOperation_Error=__inst__->Internal.MC_BR_BrakeOperation_0.Error);
(__inst__->ErrorDetail.BreakOperation_ErrorID=__inst__->Internal.MC_BR_BrakeOperation_0.ErrorID);
MC_BR_BrakeOperation(&__inst__->Internal.MC_BR_BrakeOperation_0);



((*(unsigned long*)&(__inst__->Internal.MC_ReadActualPosition_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_ReadActualPosition_0.Enable=__inst__->CMD.ENABLE);
(__inst__->STATUS.ActualPosition=__inst__->Internal.MC_ReadActualPosition_0.Position);
MC_ReadActualPosition(&__inst__->Internal.MC_ReadActualPosition_0);


((*(unsigned long*)&(__inst__->Internal.MC_ReadActualVelocity_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_ReadActualVelocity_0.Enable=__inst__->CMD.ENABLE);
(__inst__->STATUS.ActualVelocity=__inst__->Internal.MC_ReadActualVelocity_0.Velocity);
MC_ReadActualVelocity(&__inst__->Internal.MC_ReadActualVelocity_0);


((*(unsigned long*)&(__inst__->Internal.MC_ReadActualTorque_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_ReadActualTorque_0.Enable=__inst__->CMD.ENABLE);
(__inst__->STATUS.ActualTorque=__inst__->Internal.MC_ReadActualTorque_0.Torque);
MC_ReadActualTorque(&__inst__->Internal.MC_ReadActualTorque_0);


((*(unsigned long*)&(__inst__->Internal.MC_SetOverride_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_SetOverride_0.Enable=__inst__->CMD.UpdatePAR);
if(((__inst__->PAR.ZmenaRampy<1.00000001490116119385E-01))){
(__inst__->Internal.MC_SetOverride_0.AccFactor=1.00000001490116119385E-01);
}else if(((__inst__->PAR.ZmenaRampy>2.00000000000000000000E+00))){
(__inst__->Internal.MC_SetOverride_0.AccFactor=2.00000000000000000000E+00);
}else{
(__inst__->Internal.MC_SetOverride_0.AccFactor=__inst__->PAR.ZmenaRampy);
}
if(((__inst__->PAR.ZmenaRychlosti<1.00000001490116119385E-01))){
(__inst__->Internal.MC_SetOverride_0.VelFactor=1.00000001490116119385E-01);
}else if(((__inst__->PAR.ZmenaRychlosti>2.00000000000000000000E+00))){
(__inst__->Internal.MC_SetOverride_0.VelFactor=2.00000000000000000000E+00);
}else{
(__inst__->Internal.MC_SetOverride_0.VelFactor=__inst__->PAR.ZmenaRychlosti);
}
(__inst__->STATUS.UpdatePAR_DONE=__inst__->Internal.MC_SetOverride_0.Enabled);
MC_SetOverride(&__inst__->Internal.MC_SetOverride_0);


}}
#line 400 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Libraries/AxisLib/Axis_Servo.nodebug"

void __AS__ImplInitAxis_Servo_st(void){}

__asm__(".section \".plc\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/Runtime/runtime.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/astime/astime.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/standard/standard.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsBrStr/AsBrStr.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/FileIO/FileIO.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/sys_lib/sys_lib.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsSafety/AsSafety.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/DataObj/DataObj.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsXml/AsXml.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsZip/AsZip.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AxisLib/Types.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/SC/Types.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McBase/McBase.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McBase/McBaseCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAcpAx/McAcpAx.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAcpAx/McAcpAxCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAxCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxisCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpAxis/MpAxis.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpAxis/MpAxisError.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpBase/MpBase.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipe.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipeAlarm.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipeError.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/CoTrace/CoTrace.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/Runtime/runtime.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/Operator/operator.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsIecCon/AsIecCon.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/astime/astime.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/standard/standard.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsBrStr/AsBrStr.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/FileIO/FileIO.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/sys_lib/sys_lib.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsSafety/AsSafety.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/DataObj/DataObj.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsXml/AsXml.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsZip/AsZip.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AxisLib/AxisLib.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/SC/SC.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McBase/McBase.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAcpAx/McAcpAx.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpAxis/MpAxis.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpBase/MpBase.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpRecipe/MpRecipe.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/CoTrace/CoTrace.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/Runtime/runtime.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/astime/astime.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/standard/standard.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsBrStr/AsBrStr.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/FileIO/FileIO.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/sys_lib/sys_lib.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsSafety/AsSafety.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/DataObj/DataObj.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsXml/AsXml.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AsZip/AsZip.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/AxisLib/Constants.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/SC/Constants.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McBase/McBase.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAcpAx/McAcpAx.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpBase/MpBase.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/CoTrace/CoTrace.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/AxisLib/Axis_Servo.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"plcreplace \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/AxisLib/Axis_Servo.st.c\\\" \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Libraries/AxisLib/Axis_Servo.st\\\"\\n\"");
__asm__(".ascii \"plcexport \\\"Axis_Servo\\\" FUB\\n\"");
__asm__(".ascii \"plcexport \\\"Axis_Krokac\\\" FUB\\n\"");
__asm__(".ascii \"plcexport \\\"ServoLim\\\" FUB\\n\"");
__asm__(".previous");
