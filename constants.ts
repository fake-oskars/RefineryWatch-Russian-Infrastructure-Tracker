import { Refinery, RefineryStatus, Pipeline } from './types';

export const INITIAL_REFINERIES: Refinery[] = [
  {
    "id": "ryazan",
    "name": "Ryazan Oil Refinery (Rosneft)",
    "lat": 54.5944,
    "lng": 39.7833,
    "status": "Damaged",
    "description": "Ryazan Oil Refinery (Rosneft) has been reported as damaged due to a drone attack in March 2024. Reports indicate a fire broke out at the refinery as a result of the attack.",
    "lastIncidentDate": "2024-03-13",
    "capacity": "17.1 mln t/y",
    "incidentVideoUrls": [
      "https://x.com/NSTRIKE01/status/1991120148225552705?s=20"
    ]
  },
  {
    "id": "nizhny-novgorod",
    "name": "Lukoil-Nizhegorodnefteorgsintez (NORSI)",
    "lat": 56.05,
    "lng": 44.18,
    "status": "Damaged",
    "description": "Lukoil-Nizhegorodnefteorgsintez (NORSI) has been reported as damaged due to a drone attack in March 2024. The extent of the damage is still being assessed, but it has impacted operations.",
    "lastIncidentDate": "2024-03-12",
    "capacity": "17.0 mln t/y",
    "incidentVideoUrls": [
      ""
    ]
  },
  {
    "id": "syzran",
    "name": "Syzran Refinery (Rosneft)",
    "lat": 53.148,
    "lng": 48.45,
    "status": "Damaged",
    "description": "Syzran Refinery (Rosneft) experienced a fire in March 2024, suspected to be caused by a drone strike. This has likely impacted its operational capacity.",
    "lastIncidentDate": "2024-03-16",
    "capacity": "7.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "kuibyshev",
    "name": "Kuibyshev Refinery (Rosneft)",
    "lat": 53.1,
    "lng": 50.08,
    "status": "Damaged",
    "description": "Kuibyshev Refinery (Rosneft) was reportedly hit by a drone strike in March 2024, resulting in a fire. The full extent of the damage is still being evaluated.",
    "lastIncidentDate": "2024-03-16",
    "capacity": "7.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "novokuybyshevsk",
    "name": "Novokuybyshevsk Refinery (Rosneft)",
    "lat": 53.1,
    "lng": 49.95,
    "status": "Operational",
    "description": "Novokuybyshevsk Refinery (Rosneft) is reportedly maintaining operations, despite regional security concerns.",
    "lastIncidentDate": "null",
    "capacity": "7.9 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "moscow-mnpz",
    "name": "Moscow Oil Refinery (Gazprom Neft)",
    "lat": 55.6385,
    "lng": 37.794,
    "status": "Operational",
    "description": "Moscow Oil Refinery (Gazprom Neft) is reportedly operational, supplying fuel to the Moscow region.",
    "lastIncidentDate": "null",
    "capacity": "10.5 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "yaroslavl",
    "name": "Slavneft-YANOS",
    "lat": 57.58,
    "lng": 39.83,
    "status": "Operational",
    "description": "Slavneft-YANOS is reportedly operating without significant disruptions.",
    "lastIncidentDate": "null",
    "capacity": "15.7 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "saratov",
    "name": "Saratov Refinery (Rosneft)",
    "lat": 51.49,
    "lng": 45.94,
    "status": "Operational",
    "description": "Saratov Refinery (Rosneft) is reportedly functioning, though under increased security.",
    "lastIncidentDate": "null",
    "capacity": "7.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "tuapse",
    "name": "Tuapse Oil Refinery (Rosneft)",
    "lat": 44.11,
    "lng": 39.09,
    "status": "Offline",
    "description": "Tuapse Oil Refinery (Rosneft) experienced a fire in January 2024, leading to a temporary shutdown of operations for repairs. It's reported that the Vacuum Distillation Unit was damaged.",
    "lastIncidentDate": "2024-01-25",
    "capacity": "9.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "slavyansk",
    "name": "Slavyansk-on-Kuban Refinery",
    "lat": 45.25,
    "lng": 38.12,
    "status": "Damaged",
    "description": "Slavyansk-on-Kuban Refinery was reportedly hit by a drone strike in March 2024, resulting in a fire. Production at the refinery has been suspended.",
    "lastIncidentDate": "2024-03-17",
    "capacity": "4.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "ilsky",
    "name": "Ilsky Refinery",
    "lat": 44.85,
    "lng": 38.6,
    "status": "Damaged",
    "description": "Ilsky Refinery has been targeted by multiple drone attacks, causing significant damage and operational disruptions.",
    "lastIncidentDate": "2024-06-22",
    "capacity": "6.6 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "novoshakhtinsk",
    "name": "Novoshakhtinsk Refinery",
    "lat": 47.78,
    "lng": 39.9,
    "status": "Operational",
    "description": "Novoshakhtinsk Refinery is reportedly operational, although security measures have been reinforced.",
    "lastIncidentDate": "null",
    "capacity": "5.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "volgograd",
    "name": "Volgograd Refinery (Lukoil)",
    "lat": 48.5,
    "lng": 44.6,
    "status": "Operational",
    "description": "Volgograd Refinery (Lukoil) is reportedly running, with no recent reports of disruptions.",
    "lastIncidentDate": "null",
    "capacity": "14.5 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "afipsky",
    "name": "Afipsky Refinery",
    "lat": 44.9,
    "lng": 38.84,
    "status": "Operational",
    "description": "Afipsky Refinery is reportedly operating, though vigilance is high due to regional events.",
    "lastIncidentDate": "null",
    "capacity": "7.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "astrakhan",
    "name": "Astrakhan GPP (Gazprom)",
    "lat": 46.58,
    "lng": 48.05,
    "status": "Operational",
    "description": "Astrakhan GPP (Gazprom) is reportedly functioning without interruptions.",
    "lastIncidentDate": "null",
    "capacity": "3.3 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "rostovka-gas",
    "name": "Rostovka Gas Pipeline Hub",
    "lat": 54.96,
    "lng": 73.56,
    "status": "Operational",
    "description": "Rostovka Gas Pipeline Hub is reportedly operating as normal.",
    "lastIncidentDate": "null",
    "incidentVideoUrls": []
  },
  {
    "id": "omsk",
    "name": "Omsk Refinery (Gazprom Neft)",
    "lat": 55.08,
    "lng": 73.25,
    "status": "Operational",
    "description": "Omsk Refinery (Gazprom Neft) is reportedly running, supplying fuel to its region.",
    "lastIncidentDate": "null",
    "capacity": "21.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "bashneft-ufa",
    "name": "Bashneft-Ufaneftekhim",
    "lat": 54.82,
    "lng": 56.09,
    "status": "Operational",
    "description": "Bashneft-Ufaneftekhim is reportedly operating steadily.",
    "lastIncidentDate": "null",
    "capacity": "9.5 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "salavat",
    "name": "Gazprom Neftekhim Salavat",
    "lat": 53.36,
    "lng": 55.93,
    "status": "Operational",
    "description": "Gazprom Neftekhim Salavat is reportedly functioning as usual.",
    "lastIncidentDate": "null",
    "capacity": "10.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "taneco",
    "name": "Taneco (Tatneft)",
    "lat": 55.58,
    "lng": 51.94,
    "status": "Operational",
    "description": "Taneco (Tatneft) is reportedly operating without disturbances.",
    "lastIncidentDate": "null",
    "capacity": "8.7 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "taif-nk",
    "name": "TAIF-NK",
    "lat": 55.6,
    "lng": 51.9,
    "status": "Operational",
    "description": "TAIF-NK is reportedly running smoothly.",
    "lastIncidentDate": "null",
    "capacity": "8.3 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "orsk",
    "name": "Orsknefteorgsintez",
    "lat": 51.25,
    "lng": 58.52,
    "status": "Operational",
    "description": "Orsknefteorgsintez is reportedly operating normally.",
    "lastIncidentDate": "null",
    "capacity": "6.6 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "perm",
    "name": "Lukoil-Permnefteorgsintez",
    "lat": 57.94,
    "lng": 56.14,
    "status": "Operational",
    "description": "Lukoil-Permnefteorgsintez is reportedly functioning without issues.",
    "capacity": "13.1 mln t/y",
    "incidentVideoUrls": [],
    "lastIncidentDate": "null"
  },
  {
    "id": "kirishi",
    "name": "Kinef (Kirishi Refinery)",
    "lat": 59.45,
    "lng": 32.03,
    "status": "Operational",
    "description": "Kinef (Kirishi Refinery) is reportedly operating without disruptions.",
    "lastIncidentDate": "null",
    "capacity": "20.1 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "ukhta",
    "name": "Lukoil-Ukhta",
    "lat": 63.58,
    "lng": 53.72,
    "status": "Operational",
    "description": "Lukoil-Ukhta is reportedly running as usual.",
    "capacity": "4.2 mln t/y",
    "incidentVideoUrls": [],
    "lastIncidentDate": "null"
  },
  {
    "id": "angarsk",
    "name": "Angarsk Petrochemical",
    "lat": 52.5,
    "lng": 103.91,
    "status": "Operational",
    "description": "Angarsk Petrochemical is reportedly operating without problems.",
    "capacity": "10.2 mln t/y",
    "incidentVideoUrls": [],
    "lastIncidentDate": "null"
  },
  {
    "id": "achinsk",
    "name": "Achinsk Refinery",
    "lat": 56.28,
    "lng": 90.5,
    "status": "Operational",
    "description": "Achinsk Refinery is reportedly functioning normally.",
    "capacity": "7.5 mln t/y",
    "incidentVideoUrls": [],
    "lastIncidentDate": "null"
  },
  {
    "id": "komsomolsk",
    "name": "Komsomolsk Refinery",
    "lat": 50.58,
    "lng": 137.08,
    "status": "Operational",
    "description": "Komsomolsk Refinery is reportedly operating steadily.",
    "capacity": "8.3 mln t/y",
    "incidentVideoUrls": [],
    "lastIncidentDate": "null"
  }
];

export const MAJOR_PIPELINES: Pipeline[] = [
  {
    id: 'druzhba-oil',
    name: 'Druzhba Pipeline (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [53.2, 50.1], [53.2, 45.0], [52.7, 41.4], [52.9, 36.1], [53.2, 34.3],
      [52.4, 31.0], [52.0, 29.2], [52.1, 23.7], [51.2, 28.5], [50.6, 26.2],
      [49.8, 24.0], [48.6, 22.3]
    ]
  },
  {
    id: 'brotherhood-gas',
    name: 'Brotherhood Pipeline (Gas)',
    type: 'gas',
    status: 'operational',
    coordinates: [
      [51.3, 37.8], [50.9, 34.8], [50.4, 30.5], [49.4, 27.0], [48.9, 24.7], [48.6, 22.3]
    ]
  },
  {
    id: 'nord-stream-1',
    name: 'Nord Stream 1 (Gas)',
    type: 'gas',
    status: 'destroyed',
    coordinates: [
      [60.7, 28.5], [59.5, 25.5], [55.5, 15.8], [54.1, 13.6]
    ]
  },
  {
    id: 'cpc-oil',
    name: 'Caspian Pipeline Consortium (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [46.7, 51.4], [46.5, 48.0], [45.4, 43.0], [44.7, 37.8]
    ]
  },
  {
    id: 'baltic-pipeline-system',
    name: 'Baltic Pipeline System (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [57.6, 39.9], [59.4, 32.0], [60.3, 28.6]
    ]
  }
];