#ifndef __AS__TYPE_DTStructure
#define __AS__TYPE_DTStructure
typedef struct DTStructure
{	unsigned short year;
	unsigned char month;
	unsigned char day;
	unsigned char wday;
	unsigned char hour;
	unsigned char minute;
	unsigned char second;
	unsigned short millisec;
	unsigned short microsec;
} DTStructure;
#endif

struct DTGetTime
{	unsigned short status;
	plcdt DT1;
	plcbit enable;
};
_BUR_PUBLIC void DTGetTime(struct DTGetTime* inst);
_BUR_LOCAL DTStructure PLC_DatumCas;
_BUR_LOCAL struct DTGetTime DTGetTime_1;
_BUR_LOCAL plcstring Sekundy_String[3];
_BUR_LOCAL plcstring Minuty_String[3];
_BUR_LOCAL plcstring Hodiny_String[3];
_BUR_LOCAL plcstring Den_String[3];
_BUR_LOCAL plcstring Mesiac_String[3];
_BUR_LOCAL unsigned long length;
_BUR_LOCAL unsigned char PoleUSINT[4];
_BUR_LOCAL unsigned char i;
_BUR_LOCAL plcstring DvaZnaky[3];
