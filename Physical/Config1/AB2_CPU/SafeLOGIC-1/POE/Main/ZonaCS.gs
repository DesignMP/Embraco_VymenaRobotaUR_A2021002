[LIT]
25
38	190	22	190	21
39	190	21	192	21
40	190	72	190	25
41	190	25	192	25
42	85	22	95	22
43	95	22	190	22
44	95	39	105	39
45	95	22	95	39
46	87	72	97	72
47	97	72	190	72
48	97	87	107	87
49	97	72	97	87
64	204	21	251	21
65	251	21	251	20
66	251	20	253	20
73	246	46	251	46
74	251	46	251	32
75	251	32	253	32
80	283	20	297	20
81	297	20	321	20
82	297	31	322	31
83	297	20	297	31
87	297	45	301	45
88	297	31	297	45
95	326	45	341	45

[TET]
19
20	39	17	46	19	4	5	TRUE
21	41	67	48	69	4	5	TRUE
22	32	29	46	31	4	5	TIME#20ms
23	34	79	48	81	4	5	TIME#20ms
24	27	21	46	23	4	5	SI_CS_Robot_CH1
25	27	25	46	27	4	5	SI_CS_Robot_CH2
26	24	71	48	73	4	5	SI_CS_Pracovisko_CH1
27	24	75	48	77	4	5	SI_CS_Pracovisko_CH2
50	130	38	152	40	4	3	CS_Robota_AKTIVNE
51	132	86	157	88	4	3	CS_Pracoviska_AKTIVNE
63	246	15	253	17	4	5	TRUE
67	241	23	253	25	4	5	SAFEFALSE
68	241	27	253	29	4	5	SAFEFALSE
76	219	45	234	47	4	5	ResetZony_CS
77	212	49	234	51	4	5	SpatnaVezba_ZonaCS
78	321	19	334	21	4	3	SO_ZonaCS
79	322	30	348	32	4	3	Status_ZonaCS_AKTIVNA
96	326	48	341	50	4	5	TIME#500ms
97	354	44	372	46	4	3	Release_ZonaCS

[FBS]
9
8	48	14	83	34	0	SF_Equivalent_V1_00	CS_Robot
18	50	64	85	84	0	SF_Equivalent_V1_00	CS_Pracovisko
30	107	35	128	43	1	SAFEBOOL_TO_BOOL	
33	109	83	130	91	1	SAFEBOOL_TO_BOOL	
37	194	17	202	29	1	AND_S	
61	255	12	281	36	0	SF_EmergencyStop_V1_00	Zona_CS
72	236	42	244	54	1	AND	
86	303	41	324	49	1	SAFEBOOL_TO_BOOL	
93	343	41	352	53	0	TON	CasRelease_ZonaCS

[FPT]
41
0	48	17	58	19	Activate	0	128	0	BOOL
1	48	21	61	23	S_ChannelA	0	128	0	SAFEBOOL
2	48	25	61	27	S_ChannelB	0	128	0	SAFEBOOL
3	48	29	66	31	DiscrepancyTime	0	128	0	TIME
4	76	17	83	19	Ready	1	0	128	BOOL
5	66	21	83	23	S_EquivalentOut	1	0	128	SAFEBOOL
6	77	25	83	27	Error	1	0	128	BOOL
7	73	29	83	31	DiagCode	1	0	128	WORD
10	50	67	60	69	Activate	0	128	0	BOOL
11	50	71	63	73	S_ChannelA	0	128	0	SAFEBOOL
12	50	75	63	77	S_ChannelB	0	128	0	SAFEBOOL
13	50	79	68	81	DiscrepancyTime	0	128	0	TIME
14	78	67	85	69	Ready	1	0	128	BOOL
15	68	71	85	73	S_EquivalentOut	1	0	128	SAFEBOOL
16	79	75	85	77	Error	1	0	128	BOOL
17	75	79	85	81	DiagCode	1	0	128	WORD
28	107	38	109	40		0	640	0	SAFEBOOL
29	127	38	128	40		1	0	640	BOOL
31	109	86	111	88		0	640	0	SAFEBOOL
32	129	86	130	88		1	0	640	BOOL
34	194	20	196	22		0	1665	0	ANY_SAFEBIT
35	194	24	196	26		0	1665	0	ANY_SAFEBIT
36	201	20	202	22		1	0	641	ANY_SAFEBIT
52	255	15	265	17	Activate	0	128	0	BOOL
53	255	19	267	21	S_EStopIn	0	128	0	SAFEBOOL
54	255	23	269	25	S_StartReset	0	128	0	SAFEBOOL
55	255	27	269	29	S_AutoReset	0	128	0	SAFEBOOL
56	255	31	263	33	Reset	0	128	0	BOOL
57	274	15	281	17	Ready	1	0	128	BOOL
58	269	19	281	21	S_EStopOut	1	0	128	SAFEBOOL
59	275	23	281	25	Error	1	0	128	BOOL
60	271	27	281	29	DiagCode	1	0	128	WORD
69	236	45	238	47		0	1665	0	ANY_BIT
70	236	49	238	51		0	1665	0	ANY_BIT
71	243	45	244	47		1	0	641	ANY_BIT
84	303	44	305	46		0	640	0	SAFEBOOL
85	323	44	324	46		1	0	640	BOOL
89	343	44	348	46	IN	0	129	0	BOOL
90	343	48	348	50	PT	0	128	0	TIME
91	349	44	352	46	Q	1	0	129	BOOL
92	348	48	352	50	ET	1	0	128	TIME

[KOT]
0

[VER]
0

