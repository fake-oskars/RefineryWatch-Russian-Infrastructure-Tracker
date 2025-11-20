import { Refinery, RefineryStatus, Pipeline } from './types';

export const INITIAL_REFINERIES: Refinery[] = [
  {
    "id": "ryazan",
    "name": "Ryazan Oil Refinery (Rosneft)",
    "lat": 54.5944,
    "lng": 39.7833,
    "status": "Damaged",
    "description": "The Ryazan Oil Refinery (Rosneft) was reportedly attacked by a drone on March 13, 2024, causing a large fire. Reports indicate the refinery was struck, leading to a fire covering 150 square meters.",
    "lastIncidentDate": "2024-03-13",
    "capacity": "17.1 mln t/y",
    "incidentVideoUrls": [
      "https://x.com/Osinttechnical/status/1767915326736046126"
    ]
  },
  {
    "id": "nizhny-novgorod",
    "name": "Lukoil-Nizhegorodnefteorgsintez (NORSI)",
    "lat": 56.05,
    "lng": 44.18,
    "status": "Damaged",
    "description": "Lukoil-Nizhegorodnefteorgsintez (NORSI) was reportedly attacked by drones on March 12, 2024, resulting in a fire. The extent of the damage and impact on operations are still being assessed.",
    "lastIncidentDate": "2024-03-12",
    "capacity": "17.0 mln t/y",
    "incidentVideoUrls": [
      "https://x.com/Osinttechnical/status/1767625240044749135"
    ]
  },
  {
    "id": "syzran",
    "name": "Syzran Refinery (Rosneft)",
    "lat": 53.148,
    "lng": 48.45,
    "status": "Operational",
    "description": "Limited information available regarding attacks; current operational status is presumed to be operational. Further investigation is needed to confirm any incidents or disruptions.",
    "lastIncidentDate": "null",
    "capacity": "7.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "kuibyshev",
    "name": "Kuibyshev Refinery (Rosneft)",
    "lat": 53.1,
    "lng": 50.08,
    "status": "Operational",
    "description": "Limited information available regarding attacks; current operational status is presumed to be operational. Further investigation is needed to confirm any incidents or disruptions.",
    "lastIncidentDate": "null",
    "capacity": "7.0 mln t/y",
    "incidentVideoUrls": []
  },
  {
    "id": "novokuybyshevsk",
    "name": "Novokuybyshevsk Refinery (Rosneft)",
    "lat": 53.1,
    "lng": 49.95,
    "status": "Operational",
    "description": "Limited information available regarding attacks; current operational status is presumed to be operational. Further investigation is needed to confirm any incidents or disruptions.",
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
    "description": "Limited information available regarding attacks; current operational status is presumed to be operational. Further investigation is needed to confirm any incidents or disruptions.",
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
    "description": "Limited information available regarding attacks; current operational status is presumed to be operational. Further investigation is needed to confirm any incidents or disruptions.",
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
    "description": "Limited information available regarding attacks; current operational status is presumed to be operational. Further investigation is needed to confirm any incidents or disruptions.",
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
    "description": "The Tuapse Oil Refinery was reportedly damaged by drones in January 2024, leading to a fire, and is expected to take time to come back online. Initial reports suggested that the vacuum and distillation units were damaged.",
    "lastIncidentDate": "2024-01",
    "capacity": "9.0 mln t/y",
    "incidentVideoUrls": [
      "https://x.com/Osinttechnical/status/1750541037177215075"
    ]
  },
  {
    "id": "slavyansk",
    "name": "Slavyansk-on-Kuban Refinery",
    "lat": 45.25,
    "lng": 38.12,
    "status": "Damaged",
    "description": "The Slavyansk-on-Kuban Refinery was reportedly attacked by drones in March 2024, resulting in damage and fires. Reports indicated that the atmospheric distillation column was damaged.",
    "lastIncidentDate": "2024-03",
    "capacity": "4.0 mln t/y",
    "incidentVideoUrls": [
      "https://x.com/Osinttechnical/status/1769234985330354552"
    ]
  },
  {
    "id": "ilsky",
    "name": "Ilsky Refinery",
    "lat": 44.85,
    "lng": 38.6,
    "status": "Damaged",
    "description": "The Ilsky Refinery has been reportedly targeted multiple times, including an attack in June 2024 that caused a significant fire. Drone attacks on May 3 and 5 in 2023 also caused fires.",
    "lastIncidentDate": "2024-06",
    "capacity": "6.6 mln t/y",
    "incidentVideoUrls": [
      "https://x.com/Osinttechnical/status/1654779589291769856"
    ]
  },
  {
    "id": "novoshakhtinsk",
    "name": "Novoshakhtinsk Refinery",
    "lat": 47.78,
    "lng": 39.9,
    "status": "Operational",
    "description": "While there were reports of drone attacks in 2022 that caused a fire, the refinery appears to be operational as of November 2025. Recent reports suggest no new confirmed incidents causing significant operational disruptions.",
    "lastIncidentDate": "2022-06",
    "capacity": "5.0 mln t/y",
    "incidentVideoUrls": [
      "https://x.com/RALee85/status/1538788746260674560"
    ]
  },
  {
    "id": "volgograd",
    "name": "Volgograd Refinery (Lukoil)",
    "lat": 48.5,
    "lng": 44.6,
    "status": "Operational",
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the hub is presumed to be operational.",
    "lastIncidentDate": "null",
    "incidentVideoUrls": []
  },
  {
    "id": "omsk",
    "name": "Omsk Refinery (Gazprom Neft)",
    "lat": 55.08,
    "lng": 73.25,
    "status": "Operational",
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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
    "description": "No confirmed reports of attacks or significant incidents causing operational disruptions have been found. Therefore, the refinery is presumed to be operational.",
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