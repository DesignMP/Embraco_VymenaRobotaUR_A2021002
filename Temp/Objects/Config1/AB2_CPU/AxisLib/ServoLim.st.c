#define _DEFAULT_INCLUDE
#include <bur\plctypes.h>
#include "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/AxisLib/ServoLimst.h"
#line 1 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Libraries/AxisLib/ServoLim.nodebug"
#line 3 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Libraries/AxisLib/ServoLim.st"
void ServoLim(struct ServoLim* inst){struct ServoLim* __inst__=inst;{



if((__inst__->ENABLE^1)){
(__inst__->Internal.STEP=0);
(__inst__->Error=0);
}





switch(__inst__->Internal.STEP){

case 0:{
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Execute=0);
(__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0.Enable=0);
(__inst__->BUSY=0);
if((__inst__->ENABLE&(__inst__->Error^1))){
(__inst__->Internal.STEP=1);
}

}break;case 1:{
((*(unsigned long*)&(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.DataAddress=((unsigned long)(&__inst__->Internal.McAcpAxProcessParIDType_0)));
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs=0);
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Mode=1);
(__inst__->Internal.McAcpAxProcessParIDType_0.DataType=5);
(__inst__->Internal.McAcpAxProcessParIDType_0.ParID=184);
(__inst__->Internal.McAcpAxProcessParIDType_0.VariableAddress=((unsigned long)(&__inst__->Internal.AktivaciaLimSnimacov_Data)));
(__inst__->Internal.AktivaciaLimSnimacov_Data=7);
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Execute=1);

if(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Done){
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Execute=0);
(__inst__->Internal.AktivaciaLimSnimacov_Data=0);
(__inst__->Internal.STEP=3);
}else if(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Error){
(__inst__->Error=1);
(__inst__->Internal.STEP=0);
}

}break;case 3:{
if((__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Done^1)){
(__inst__->Internal.KorekcnyCas.IN=1);
}

if(__inst__->Internal.KorekcnyCas.Q){
(__inst__->Internal.KorekcnyCas.IN=0);
(__inst__->Internal.STEP=5);
}


}break;case 5:{
((*(unsigned long*)&(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.DataAddress=((unsigned long)(&__inst__->Internal.McAcpAxProcessParIDType_0)));
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.NumberOfParIDs=0);
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Mode=0);
(__inst__->Internal.McAcpAxProcessParIDType_0.DataType=5);
(__inst__->Internal.McAcpAxProcessParIDType_0.ParID=184);
(__inst__->Internal.McAcpAxProcessParIDType_0.VariableAddress=((unsigned long)(&__inst__->Internal.AktivaciaLimSnimacov_Data)));
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Execute=1);

if(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Done){
if((((unsigned long)__inst__->Internal.AktivaciaLimSnimacov_Data==(unsigned long)7))){
(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Execute=0);
(__inst__->Internal.STEP=10);
}else{
(__inst__->Error=1);
(__inst__->Internal.STEP=0);
}
}else if(__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Error){
(__inst__->Error=1);
(__inst__->Internal.STEP=0);
}

}break;case 8:{
if((__inst__->Internal.MC_BR_ProcessParID_AcpAx_0.Done^1)){
(__inst__->Internal.KorekcnyCas.IN=1);
}

if(__inst__->Internal.KorekcnyCas.Q){
(__inst__->Internal.KorekcnyCas.IN=0);
(__inst__->Internal.STEP=10);
}



}break;case 10:{
((*(unsigned long*)&(__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0.Axis))=__inst__->AxisName);
(__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0.DataAddress=((unsigned long)(&__inst__->Internal.McAcpAxCycParIDType_0)));
(__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0.NumberOfParIDs=0);
(__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0.Mode=1);
(__inst__->Internal.McAcpAxCycParIDType_0.DataType=5);
(__inst__->Internal.McAcpAxCycParIDType_0.ParID=185);
(__inst__->Internal.McAcpAxCycParIDType_0.VariableAddress=((unsigned long)(&__inst__->Internal.LimSnimace_Data)));
(__inst__->Internal.McAcpAxCycParIDType_0.RefreshMode=1);
(__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0.Enable=1);
(((_4byte_bit_field_*)(&__inst__->Internal.LimSnimace_Data))->bit0=__inst__->HomingSwitch);
(((_4byte_bit_field_*)(&__inst__->Internal.LimSnimace_Data))->bit1=__inst__->PositiveLimitSwitch);
(((_4byte_bit_field_*)(&__inst__->Internal.LimSnimace_Data))->bit2=__inst__->NegativeLimitSwitch);

(__inst__->BUSY=__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0.Busy);

if(__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0.Error){
(__inst__->Error=1);
(__inst__->Internal.STEP=0);
}


}break;}


MC_BR_ProcessParID_AcpAx(&__inst__->Internal.MC_BR_ProcessParID_AcpAx_0);
MC_BR_CyclicProcessParID_AcpAx(&__inst__->Internal.MC_BR_CyclicProcessParID_AcpAx_0);

(__inst__->Internal.KorekcnyCas.PT=200);
TON(&__inst__->Internal.KorekcnyCas);


}}
#line 124 "D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Libraries/AxisLib/ServoLim.nodebug"

void __AS__ImplInitServoLim_st(void){}

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
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxisCfg.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.typ\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAxCfg.typ\\\" scope \\\"global\\\"\\n\"");
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
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.fun\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.fun\\\" scope \\\"global\\\"\\n\"");
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
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McAxis/McAxis.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/McStpAx/McStpAx.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/MpBase/MpBase.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"Logical/Libraries/CoTrace/CoTrace.var\\\" scope \\\"global\\\"\\n\"");
__asm__(".ascii \"iecfile \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/AxisLib/ServoLim.st.var\\\" scope \\\"local\\\"\\n\"");
__asm__(".ascii \"plcreplace \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Temp/Objects/Config1/AB2_CPU/AxisLib/ServoLim.st.c\\\" \\\"D:/Projekty BER/Embraco_VymenaRobotaUR_A2021002/Logical/Libraries/AxisLib/ServoLim.st\\\"\\n\"");
__asm__(".ascii \"plcexport \\\"Axis_Servo\\\" FUB\\n\"");
__asm__(".ascii \"plcexport \\\"Axis_Krokac\\\" FUB\\n\"");
__asm__(".ascii \"plcexport \\\"ServoLim\\\" FUB\\n\"");
__asm__(".previous");
