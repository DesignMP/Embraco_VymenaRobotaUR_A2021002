[LIT]
50
3	25	16	109	16
44	190	40	190	39
45	190	39	192	39
46	190	90	190	43
47	190	43	192	43
48	85	40	95	40
49	95	40	190	40
50	95	57	105	57
51	95	40	95	57
52	87	90	97	90
53	97	90	190	90
54	97	105	107	105
55	97	90	97	105
70	204	39	251	39
71	251	39	251	38
72	251	38	253	38
79	246	64	251	64
80	251	64	251	50
81	251	50	253	50
86	283	38	297	38
87	297	38	321	38
88	297	49	322	49
89	297	38	297	49
93	297	63	301	63
94	297	49	297	63
101	326	63	341	63
122	82	138	92	138
123	92	138	122	138
124	92	146	103	146
125	92	138	92	146
142	36	173	81	173
147	111	173	121	173
148	121	173	153	173
149	121	194	152	194
150	121	173	121	194
160	177	194	179	194
161	179	194	196	194
162	179	213	192	213
163	179	194	179	213
179	41	238	89	238
182	119	238	127	238
183	127	238	155	238
184	127	238	127	246
185	127	246	154	246
189	127	261	144	261
190	127	246	127	261
203	169	261	174	261
204	174	261	192	261
205	174	280	192	280
206	174	261	174	280
[TET]
43
26	39	35	46	37	4	5	TRUE
27	41	85	48	87	4	5	TRUE
28	32	47	46	49	4	5	TIME#20ms
29	34	97	48	99	4	5	TIME#20ms
30	27	39	46	41	4	5	SI_CS_Robot_CH1
31	27	43	46	45	4	5	SI_CS_Robot_CH2
32	24	89	48	91	4	5	SI_CS_Pracovisko_CH1
33	24	93	48	95	4	5	SI_CS_Pracovisko_CH2
56	130	56	152	58	4	3	CS_Robota_AKTIVNE
57	132	104	157	106	4	3	CS_Pracoviska_AKTIVNE
69	246	33	253	35	4	5	TRUE
73	241	41	253	43	4	5	SAFEFALSE
74	241	45	253	47	4	5	SAFEFALSE
82	219	63	234	65	4	5	ResetZony_CS
83	212	67	234	69	4	5	SpatnaVezba_ZonaCS
84	321	37	334	39	4	3	SO_ZonaCS
85	322	48	348	50	4	3	Status_ZonaCS_AKTIVNA
102	326	66	341	68	4	5	TIME#500ms
103	354	62	372	64	4	3	Release_ZonaCS
114	36	133	43	135	4	5	TRUE
115	29	145	43	147	4	5	TIME#20ms
116	15	137	43	139	4	5	SI_VyblokovanieSafety_CH1
117	15	141	43	143	4	5	SI_VyblokovanieSafety_CH2
121	122	137	149	139	4	3	Status_ZamkyVyblokovane
126	128	145	158	147	4	3	VyblokovanieSafety_AKTIVNE
138	74	168	81	170	4	5	TRUE
139	69	176	81	178	4	5	SAFETRUE
140	69	180	81	182	4	5	SAFETRUE
141	9	172	36	174	4	5	Status_ZamkyVyblokovane
143	153	172	169	174	4	3	SO_ZonaRobot
157	181	197	196	199	4	5	TIME#500ms
158	209	193	230	195	4	3	Release_ZonaRobot
159	192	212	214	214	4	3	ZonaRobot_AKTIVNA
175	82	233	89	235	4	5	TRUE
176	77	241	89	243	4	5	SAFETRUE
177	77	245	89	247	4	5	SAFETRUE
178	14	237	41	239	4	5	Status_ZamkyVyblokovane
180	155	237	180	239	4	3	SO_ZonaPracovisko_CH1
181	154	245	179	247	4	3	SO_ZonaPracovisko_CH2
207	177	264	192	266	4	5	TIME#500ms
208	177	283	192	285	4	5	TIME#500ms
209	205	260	235	262	4	3	Release_ZonaPracovisko_CH1
210	205	279	235	281	4	3	Release_ZonaPracovisko_CH2
[FBS]
18
14	48	32	83	52	0	SF_Equivalent_V1_00	CS_Robot
24	50	82	85	102	0	SF_Equivalent_V1_00	CS_Pracovisko
36	107	53	128	61	1	SAFEBOOL_TO_BOOL	
39	109	101	130	109	1	SAFEBOOL_TO_BOOL	
43	194	35	202	47	1	AND_S	
67	255	30	281	54	0	SF_EmergencyStop_V1_00	Zona_CS
78	236	60	244	72	1	AND	
92	303	59	324	67	1	SAFEBOOL_TO_BOOL	
99	343	59	352	71	0	TON	CasRelease_ZonaCS
112	45	130	80	150	0	SF_Equivalent_V1_00	PrepinacVyblokovaniaSafety
120	105	142	126	150	1	SAFEBOOL_TO_BOOL	
136	83	165	109	189	0	SF_EmergencyStop_V1_00	Zona_Robot
146	154	190	175	198	1	SAFEBOOL_TO_BOOL	
155	198	190	207	202	0	TON	CasRelease_ZonaRobot
173	91	230	117	254	0	SF_EmergencyStop_V1_00	Zona_Pracovisko
188	146	257	167	265	1	SAFEBOOL_TO_BOOL	
195	194	257	203	269	0	TON	CasRelease_Pracoviska_CH1
201	194	276	203	288	0	TON	CasRelease_Pracoviska_CH2
[FPT]
85
6	48	35	58	37	Activate	0	128	0	BOOL	
7	48	39	61	41	S_ChannelA	0	128	0	SAFEBOOL	
8	48	43	61	45	S_ChannelB	0	128	0	SAFEBOOL	
9	48	47	66	49	DiscrepancyTime	0	128	0	TIME	
10	76	35	83	37	Ready	1	0	128	BOOL	
11	66	39	83	41	S_EquivalentOut	1	0	128	SAFEBOOL	
12	77	43	83	45	Error	1	0	128	BOOL	
13	73	47	83	49	DiagCode	1	0	128	WORD	
16	50	85	60	87	Activate	0	128	0	BOOL	
17	50	89	63	91	S_ChannelA	0	128	0	SAFEBOOL	
18	50	93	63	95	S_ChannelB	0	128	0	SAFEBOOL	
19	50	97	68	99	DiscrepancyTime	0	128	0	TIME	
20	78	85	85	87	Ready	1	0	128	BOOL	
21	68	89	85	91	S_EquivalentOut	1	0	128	SAFEBOOL	
22	79	93	85	95	Error	1	0	128	BOOL	
23	75	97	85	99	DiagCode	1	0	128	WORD	
34	107	56	109	58		0	640	0	SAFEBOOL	
35	127	56	128	58		1	0	640	BOOL	
37	109	104	111	106		0	640	0	SAFEBOOL	
38	129	104	130	106		1	0	640	BOOL	
40	194	38	196	40		0	1665	0	ANY_SAFEBIT	
41	194	42	196	44		0	1665	0	ANY_SAFEBIT	
42	201	38	202	40		1	0	641	ANY_SAFEBIT	
58	255	33	265	35	Activate	0	128	0	BOOL	
59	255	37	267	39	S_EStopIn	0	128	0	SAFEBOOL	
60	255	41	269	43	S_StartReset	0	128	0	SAFEBOOL	
61	255	45	269	47	S_AutoReset	0	128	0	SAFEBOOL	
62	255	49	263	51	Reset	0	128	0	BOOL	
63	274	33	281	35	Ready	1	0	128	BOOL	
64	269	37	281	39	S_EStopOut	1	0	128	SAFEBOOL	
65	275	41	281	43	Error	1	0	128	BOOL	
66	271	45	281	47	DiagCode	1	0	128	WORD	
75	236	63	238	65		0	1665	0	ANY_BIT	
76	236	67	238	69		0	1665	0	ANY_BIT	
77	243	63	244	65		1	0	641	ANY_BIT	
90	303	62	305	64		0	640	0	SAFEBOOL	
91	323	62	324	64		1	0	640	BOOL	
95	343	62	348	64	IN	0	129	0	BOOL	
96	343	66	348	68	PT	0	128	0	TIME	
97	349	62	352	64	Q	1	0	129	BOOL	
98	348	66	352	68	ET	1	0	128	TIME	
104	45	133	55	135	Activate	0	128	0	BOOL	
105	45	137	58	139	S_ChannelA	0	128	0	SAFEBOOL	
106	45	141	58	143	S_ChannelB	0	128	0	SAFEBOOL	
107	45	145	63	147	DiscrepancyTime	0	128	0	TIME	
108	73	133	80	135	Ready	1	0	128	BOOL	
109	63	137	80	139	S_EquivalentOut	1	0	128	SAFEBOOL	
110	74	141	80	143	Error	1	0	128	BOOL	
111	70	145	80	147	DiagCode	1	0	128	WORD	
118	105	145	107	147		0	640	0	SAFEBOOL	
119	125	145	126	147		1	0	640	BOOL	
127	83	168	93	170	Activate	0	128	0	BOOL	
128	83	172	95	174	S_EStopIn	0	128	0	SAFEBOOL	
129	83	176	97	178	S_StartReset	0	128	0	SAFEBOOL	
130	83	180	97	182	S_AutoReset	0	128	0	SAFEBOOL	
131	83	184	91	186	Reset	0	128	0	BOOL	
132	102	168	109	170	Ready	1	0	128	BOOL	
133	97	172	109	174	S_EStopOut	1	0	128	SAFEBOOL	
134	103	176	109	178	Error	1	0	128	BOOL	
135	99	180	109	182	DiagCode	1	0	128	WORD	
144	154	193	156	195		0	640	0	SAFEBOOL	
145	174	193	175	195		1	0	640	BOOL	
151	198	193	203	195	IN	0	129	0	BOOL	
152	198	197	203	199	PT	0	128	0	TIME	
153	204	193	207	195	Q	1	0	129	BOOL	
154	203	197	207	199	ET	1	0	128	TIME	
164	91	233	101	235	Activate	0	128	0	BOOL	
165	91	237	103	239	S_EStopIn	0	128	0	SAFEBOOL	
166	91	241	105	243	S_StartReset	0	128	0	SAFEBOOL	
167	91	245	105	247	S_AutoReset	0	128	0	SAFEBOOL	
168	91	249	99	251	Reset	0	128	0	BOOL	
169	110	233	117	235	Ready	1	0	128	BOOL	
170	105	237	117	239	S_EStopOut	1	0	128	SAFEBOOL	
171	111	241	117	243	Error	1	0	128	BOOL	
172	107	245	117	247	DiagCode	1	0	128	WORD	
186	146	260	148	262		0	640	0	SAFEBOOL	
187	166	260	167	262		1	0	640	BOOL	
191	194	260	199	262	IN	0	129	0	BOOL	
192	194	264	199	266	PT	0	128	0	TIME	
193	200	260	203	262	Q	1	0	129	BOOL	
194	199	264	203	266	ET	1	0	128	TIME	
197	194	279	199	281	IN	0	129	0	BOOL	
198	194	283	199	285	PT	0	128	0	TIME	
199	200	279	203	281	Q	1	0	129	BOOL	
200	199	283	203	285	ET	1	0	128	TIME	
[KOT]
2
1	13	15	16	17	0	0	9	TRUE
2	118	15	121	17	1	0	9	SafetyPLC_Nabehlo
[VER]
2
4	2	16	2	16	1	1	0
5	132	16	132	16	1	0	0
