[LIT]
4
0	86	26	96	26
1	96	26	126	26
2	96	34	107	34
3	96	26	96	34

[TET]
6
5	40	21	47	23	4	5	TRUE
6	33	33	47	35	4	5	TIME#20ms
7	19	25	47	27	4	5	SI_VyblokovanieSafety_CH1
8	19	29	47	31	4	5	SI_VyblokovanieSafety_CH2
9	126	25	153	27	4	3	Status_ZamkyVyblokovane
10	132	33	162	35	4	3	VyblokovanieSafety_AKTIVNE

[FBS]
2
21	49	18	84	38	0	SF_Equivalent_V1_00	PrepinacVyblokovaniaSafety
22	109	30	130	38	1	SAFEBOOL_TO_BOOL	

[FPT]
10
11	49	21	59	23	Activate	0	128	0	BOOL
12	49	25	62	27	S_ChannelA	0	128	0	SAFEBOOL
13	49	29	62	31	S_ChannelB	0	128	0	SAFEBOOL
14	49	33	67	35	DiscrepancyTime	0	128	0	TIME
15	77	21	84	23	Ready	1	0	128	BOOL
16	67	25	84	27	S_EquivalentOut	1	0	128	SAFEBOOL
17	78	29	84	31	Error	1	0	128	BOOL
18	74	33	84	35	DiagCode	1	0	128	WORD
19	109	33	111	35		0	640	0	SAFEBOOL
20	129	33	130	35		1	0	640	BOOL

[KOT]
0

[VER]
0

