[LIT]
29
16	231	23	239	23
17	239	23	267	23
18	239	23	239	31
19	239	31	266	31
23	239	46	256	46
24	239	31	239	46
37	281	46	286	46
38	286	46	304	46
39	286	65	304	65
40	286	46	286	65
50	140	23	140	75
57	190	50	199	50
58	199	50	199	35
59	199	35	201	35
61	286	83	290	83
62	286	65	286	83
63	140	23	201	23
64	140	75	150	75
73	28	23	120	23
74	132	23	140	23
79	108	58	118	58
80	118	58	118	27
81	118	27	120	27
93	79	59	94	59
94	94	59	94	58
95	94	58	96	58
96	74	92	94	92
97	94	92	94	62
98	94	62	96	62

[TET]
19
11	194	18	201	20	4	5	TRUE
12	189	26	201	28	4	5	SAFEFALSE
13	189	30	201	32	4	5	SAFEFALSE
14	267	22	292	24	4	3	SO_ZonaPracovisko_CH1
15	266	30	291	32	4	3	SO_ZonaPracovisko_CH2
41	289	49	304	51	4	5	TIME#500ms
42	289	68	304	70	4	5	TIME#500ms
43	317	45	347	47	4	3	Release_ZonaPracovisko_CH1
44	317	64	347	66	4	3	Release_ZonaPracovisko_CH2
45	2	22	28	24	4	5	Status_ZonaCS_AKTIVNA
46	175	73	205	75	4	3	ZonaPracovisko_Odblokovana
51	155	49	178	51	4	5	ResetZony_Pracoviska
52	148	53	178	55	4	5	SpatnaVezba_ZonaPracovisko
60	290	82	316	84	4	3	ZonaPracovisko_AKTIVNA
65	33	54	40	56	4	5	TRUE
66	26	66	40	68	4	5	TIME#20ms
67	11	58	40	60	4	5	SI_OploteniePracoviska_CH1
68	11	62	40	64	4	5	SI_OploteniePracoviska_CH2
82	47	91	74	93	4	5	Status_ZamkyVyblokovane

[FBS]
9
9	203	15	229	39	0	SF_EmergencyStop_V1_00	Zona_Pracovisko
22	258	42	279	50	1	SAFEBOOL_TO_BOOL	
29	306	42	315	54	0	TON	CasRelease_Pracoviska_CH1
35	306	61	315	73	0	TON	CasRelease_Pracoviska_CH2
49	152	71	173	79	1	SAFEBOOL_TO_BOOL	
56	180	46	188	58	1	AND	
72	122	19	130	31	1	AND_S	
78	98	54	106	66	1	OR_S	
91	42	51	77	71	0	SF_Equivalent_V1_00	OploteniePracoviska_1

[FPT]
38
0	203	18	213	20	Activate	0	128	0	BOOL
1	203	22	215	24	S_EStopIn	0	128	0	SAFEBOOL
2	203	26	217	28	S_StartReset	0	128	0	SAFEBOOL
3	203	30	217	32	S_AutoReset	0	128	0	SAFEBOOL
4	203	34	211	36	Reset	0	128	0	BOOL
5	222	18	229	20	Ready	1	0	128	BOOL
6	217	22	229	24	S_EStopOut	1	0	128	SAFEBOOL
7	223	26	229	28	Error	1	0	128	BOOL
8	219	30	229	32	DiagCode	1	0	128	WORD
20	258	45	260	47		0	640	0	SAFEBOOL
21	278	45	279	47		1	0	640	BOOL
25	306	45	311	47	IN	0	129	0	BOOL
26	306	49	311	51	PT	0	128	0	TIME
27	312	45	315	47	Q	1	0	129	BOOL
28	311	49	315	51	ET	1	0	128	TIME
31	306	64	311	66	IN	0	129	0	BOOL
32	306	68	311	70	PT	0	128	0	TIME
33	312	64	315	66	Q	1	0	129	BOOL
34	311	68	315	70	ET	1	0	128	TIME
47	152	74	154	76		0	640	0	SAFEBOOL
48	172	73	173	75		1	0	640	BOOL
53	180	49	182	51		0	1665	0	ANY_BIT
54	180	53	182	55		0	1665	0	ANY_BIT
55	187	49	188	51		1	0	641	ANY_BIT
69	122	22	124	24		0	1665	0	ANY_SAFEBIT
70	122	26	124	28		0	1665	0	ANY_SAFEBIT
71	129	22	130	24		1	0	641	ANY_SAFEBIT
75	98	57	100	59		0	1665	0	ANY_SAFEBIT
76	98	61	100	63		0	1665	0	ANY_SAFEBIT
77	105	57	106	59		1	0	641	ANY_SAFEBIT
83	42	54	52	56	Activate	0	128	0	BOOL
84	42	58	55	60	S_ChannelA	0	128	0	SAFEBOOL
85	42	62	55	64	S_ChannelB	0	128	0	SAFEBOOL
86	42	66	60	68	DiscrepancyTime	0	128	0	TIME
87	70	54	77	56	Ready	1	0	128	BOOL
88	60	58	77	60	S_EquivalentOut	1	0	128	SAFEBOOL
89	71	62	77	64	Error	1	0	128	BOOL
90	67	66	77	68	DiagCode	1	0	128	WORD

[KOT]
0

[VER]
0

