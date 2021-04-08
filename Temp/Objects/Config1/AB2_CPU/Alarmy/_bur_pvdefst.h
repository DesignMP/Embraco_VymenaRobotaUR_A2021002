struct TON
{	plctime PT;
	plctime ET;
	plctime StartTime;
	unsigned long Restart;
	plcbit IN;
	plcbit Q;
	plcbit M;
};
_BUR_PUBLIC void TON(struct TON* inst);
_BUR_LOCAL unsigned char a;
_BUR_LOCAL struct TON CasResetovaniaServa;
_BUR_LOCAL struct TON CasKontroly_KarietPLC;
_BUR_LOCAL struct TON CasKontroly_Robota;
_BUR_LOCAL struct TON CasPoruchyServa;
