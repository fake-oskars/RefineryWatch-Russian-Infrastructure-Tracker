
import { Refinery, RefineryStatus, Pipeline } from './types';

export const INITIAL_REFINERIES: Refinery[] = [
  // --- CENTRAL & VOLGA REGION (The "Heartland") ---
  {
    id: 'ryazan',
    name: 'Ryazan Oil Refinery (Rosneft)',
    lat: 54.5944,
    lng: 39.7833,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 17.1 mln tons/year. One of Russia’s largest refineries supplying Moscow. Struck by multiple drones in March (13.03.2024) and May 2024, causing fires in the primary crude processing units (AVT-6). Operating at reduced capacity.',
    lastIncidentDate: '2024-05-01',
    capacity: '17.1 mln t/y',
    incidentVideoUrls: ['https://x.com/Osinttechnical/status/1798511326178025561']
  },
  {
    id: 'nizhny-novgorod',
    name: 'Lukoil-Nizhegorodnefteorgsintez (NORSI)',
    lat: 56.0500,
    lng: 44.1800,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 17.0 mln tons/year. Key producer of gasoline (11% of RU total). AVT-6 and FCC units damaged by drone strikes on 12.03.2024. Repairs hampered by sanctions restricting access to western components.',
    lastIncidentDate: '2024-03-12',
    capacity: '17.0 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1767468232252227665']
  },
  {
    id: 'syzran',
    name: 'Syzran Refinery (Rosneft)',
    lat: 53.1480,
    lng: 48.4500,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 7.0 mln tons/year. Located in Samara region. Major fire on 16.03.2024 after drone strikes targeted the AVT-6 distillation unit.',
    lastIncidentDate: '2024-03-16',
    capacity: '7.0 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1768904967779205279']
  },
  {
    id: 'kuibyshev',
    name: 'Kuibyshev Refinery (Rosneft)',
    lat: 53.1000,
    lng: 50.0800,
    status: RefineryStatus.OFFLINE,
    description: 'Capacity: 7.0 mln tons/year. Samara region. CDU-5 primary refining unit knocked out on 23.03.2024. Reports suggest the refinery halted production completely for a period.',
    lastIncidentDate: '2024-03-23',
    capacity: '7.0 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1771419624700096643']
  },
  {
    id: 'novokuybyshevsk',
    name: 'Novokuybyshevsk Refinery (Rosneft)',
    lat: 53.1000,
    lng: 49.9500,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 7.9 mln tons/year. Part of the Samara refinery hub. Targeted on 16.03.2024 alongside Syzran.',
    lastIncidentDate: '2024-03-16',
    capacity: '7.9 mln t/y'
  },
  {
    id: 'moscow-mnpz',
    name: 'Moscow Oil Refinery (Gazprom Neft)',
    lat: 55.6385,
    lng: 37.7940,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 10.5 mln tons/year. Located within Moscow city limits (Kapotnya). Attempts to strike it in May 2024 and Sept 2024 were reportedly intercepted, though debris caused minor fires nearby.',
    lastIncidentDate: '2024-09-01',
    capacity: '10.5 mln t/y'
  },
  {
    id: 'yaroslavl',
    name: 'Slavneft-YANOS',
    lat: 57.5800,
    lng: 39.8300,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 15.7 mln tons/year. Critical hub for Central Russia. Attempted drone strike on 29.01.2024 was neutralized by EW nearby. Remains operational.',
    lastIncidentDate: '2024-01-29',
    capacity: '15.7 mln t/y'
  },
  {
    id: 'saratov',
    name: 'Saratov Refinery (Rosneft)',
    lat: 51.4900,
    lng: 45.9400,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 7.0 mln tons/year. Fires reported near the facility in late 2024, but significant structural damage unconfirmed.',
    lastIncidentDate: '2024-03-23',
    capacity: '7.0 mln t/y'
  },

  // --- SOUTH & BLACK SEA (Export Hubs) ---
  {
    id: 'tuapse',
    name: 'Tuapse Oil Refinery (Rosneft)',
    lat: 44.1100,
    lng: 39.0900,
    status: RefineryStatus.OFFLINE,
    description: 'Capacity: 9.0 mln tons/year. Major export refinery on Black Sea. Hit on 24.01.2024, 17.05.2024, and 22.07.2024. Vacuum distillation unit damaged, halting operations repeatedly.',
    lastIncidentDate: '2024-07-22',
    capacity: '9.0 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1791342515672166783']
  },
  {
    id: 'slavyansk',
    name: 'Slavyansk-on-Kuban Refinery',
    lat: 45.2500,
    lng: 38.1200,
    status: RefineryStatus.OFFLINE,
    description: 'Capacity: 4.0 mln tons/year. Export-oriented. Hit on 17.03.2024 and massive strike on 19.05.2024 forced suspension of operations.',
    lastIncidentDate: '2024-05-19',
    capacity: '4.0 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1769233968079073734']
  },
  {
    id: 'ilsky',
    name: 'Ilsky Refinery',
    lat: 44.8500,
    lng: 38.6000,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 6.6 mln tons/year. Krasnodar region. Hit on 09.02.2024 and 27.04.2024. Primary processing units (CDU-5) damaged.',
    lastIncidentDate: '2024-04-27',
    capacity: '6.6 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1755858141744701789']
  },
  {
    id: 'novoshakhtinsk',
    name: 'Novoshakhtinsk Refinery',
    lat: 47.7800,
    lng: 39.9000,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 5.0 mln tons/year. Rostov region. Targeted 13.03.2024 and 06.06.2024. Operations unstable due to repeated threats.',
    lastIncidentDate: '2024-06-06',
    capacity: '5.0 mln t/y',

  },
  {
    id: 'volgograd',
    name: 'Volgograd Refinery (Lukoil)',
    lat: 48.5000,
    lng: 44.6000,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 14.5 mln tons/year. Largest in Southern Russia. Fire on 03.02.2024 and attack on 12.05.2024. Repairs reportedly completed.',
    lastIncidentDate: '2024-05-12',
    capacity: '14.5 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1753669959921885239']
  },
  {
    id: 'afipsky',
    name: 'Afipsky Refinery',
    lat: 44.9000,
    lng: 38.8400,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 7.0 mln tons/year. Krasnodar. Struck 20.06.2024 and 05.07.2024. Fuel oil production impacted.',
    lastIncidentDate: '2024-07-05',
    capacity: '7.0 mln t/y'
  },
  {
    id: 'astrakhan',
    name: 'Astrakhan GPP (Gazprom)',
    lat: 46.5800,
    lng: 48.0500,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 3.3 mln tons/year. Gas processing focus. Targeted 09.07.2024 but significant damage unconfirmed.',
    lastIncidentDate: '2024-07-09',
    capacity: '3.3 mln t/y'
  },

  // --- URALS & SIBERIA (Strategic Depth) ---
  {
    id: 'rostovka-gas',
    name: 'Rostovka Gas Pipeline Hub',
    lat: 54.9600,
    lng: 73.5600,
    status: RefineryStatus.DAMAGED,
    description: 'Large gas pipeline explosion reported in Rostovka, Omsk region. Visual evidence confirms significant fire.',
    lastIncidentDate: '2025-11-18',
    incidentVideoUrls: ['https://x.com/Tendar/status/1990635526005592201']
  },
  {
    id: 'omsk',
    name: 'Omsk Refinery (Gazprom Neft)',
    lat: 55.0800,
    lng: 73.2500,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 21.0 mln tons/year. Russia’s largest refinery. Major explosion and fire in the AVT-10 unit on 26.08.2024, reportedly taking out nearly half its capacity temporarily.',
    lastIncidentDate: '2024-08-26',
    capacity: '21.0 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1828045885489209357']
  },
  {
    id: 'bashneft-ufa',
    name: 'Bashneft-Ufaneftekhim',
    lat: 54.8200,
    lng: 56.0900,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 9.5 mln tons/year. Part of Ufa cluster. Targeted by long-range drones in May 2024 (record distance), but damage minimal.',
    lastIncidentDate: '2024-05-09',
    capacity: '9.5 mln t/y'
  },
  {
    id: 'salavat',
    name: 'Gazprom Neftekhim Salavat',
    lat: 53.3600,
    lng: 55.9300,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 10.0 mln tons/year. Bashkortostan. Struck on 09.05.2024. Catalytic cracking unit damaged.',
    lastIncidentDate: '2024-05-09',
    capacity: '10.0 mln t/y'
  },
  {
    id: 'taneco',
    name: 'Taneco (Tatneft)',
    lat: 55.5800,
    lng: 51.9400,
    status: RefineryStatus.DAMAGED,
    description: 'Capacity: 8.7 mln tons/year. Nizhnekamsk, Tatarstan. Struck on 02.04.2024. CDU-7 unit caught fire.',
    lastIncidentDate: '2024-04-02',
    capacity: '8.7 mln t/y',
    incidentVideoUrls: ['https://twitter.com/Tendar/status/1775062135348211731']
  },
  {
    id: 'taif-nk',
    name: 'TAIF-NK',
    lat: 55.6000,
    lng: 51.9000,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 8.3 mln tons/year. Nizhnekamsk cluster. Targeted 02.04.2024 but Taneco took the hit.',
    lastIncidentDate: '2024-04-02',
    capacity: '8.3 mln t/y'
  },
  {
    id: 'orsk',
    name: 'Orsknefteorgsintez',
    lat: 51.2500,
    lng: 58.5200,
    status: RefineryStatus.OFFLINE,
    description: 'Capacity: 6.6 mln tons/year. Forced to stop due to massive dam floods in April 2024, then targeted by UAVs on 27.05.2024.',
    lastIncidentDate: '2024-05-27',
    capacity: '6.6 mln t/y'
  },
  {
    id: 'perm',
    name: 'Lukoil-Permnefteorgsintez',
    lat: 57.9400,
    lng: 56.1400,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 13.1 mln tons/year. Deep in Urals. Operational.',
    capacity: '13.1 mln t/y'
  },

  // --- NORTH & WEST ---
  {
    id: 'kirishi',
    name: 'Kinef (Kirishi Refinery)',
    lat: 59.4500,
    lng: 32.0300,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 20.1 mln tons/year. Near St. Petersburg. Several drone attempts (12.03.2024), but remains Russia’s 2nd largest operational plant.',
    lastIncidentDate: '2024-03-12',
    capacity: '20.1 mln t/y'
  },
  {
    id: 'ukhta',
    name: 'Lukoil-Ukhta',
    lat: 63.5800,
    lng: 53.7200,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 4.2 mln tons/year. Komi Republic. Operational.',
    capacity: '4.2 mln t/y'
  },

  // --- EASTERN SIBERIA & FAR EAST (Remote) ---
  {
    id: 'angarsk',
    name: 'Angarsk Petrochemical',
    lat: 52.5000,
    lng: 103.9100,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 10.2 mln tons/year. Irkutsk region. Minor fires in late 2023/early 2024 due to maintenance issues, not drones.',
    capacity: '10.2 mln t/y'
  },
  {
    id: 'achinsk',
    name: 'Achinsk Refinery',
    lat: 56.2800,
    lng: 90.5000,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 7.5 mln tons/year. Krasnoyarsk Krai. Operational.',
    capacity: '7.5 mln t/y'
  },
  {
    id: 'komsomolsk',
    name: 'Komsomolsk Refinery',
    lat: 50.5800,
    lng: 137.0800,
    status: RefineryStatus.OPERATIONAL,
    description: 'Capacity: 8.3 mln tons/year. Far East. Operational.',
    capacity: '8.3 mln t/y'
  }
];

export const MAJOR_PIPELINES: Pipeline[] = [
  {
    id: 'druzhba-oil',
    name: 'Druzhba Pipeline (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [53.2, 50.1], // Samara
      [53.2, 45.0], // Penza
      [52.7, 41.4], // Tambov
      [52.9, 36.1], // Orel
      [53.2, 34.3], // Bryansk
      [52.4, 31.0], // Entering Belarus
      [52.0, 29.2], // Mozyr (Split point)
      // Northern Branch
      [52.1, 23.7], // Brest (Belarus/Poland border)
      // Southern Branch
      [51.2, 28.5], // Towards Ukraine
      [50.6, 26.2], // Rivne
      [49.8, 24.0], // Lviv
      [48.6, 22.3]  // Uzhhorod (Slovakia border)
    ]
  },
  {
    id: 'brotherhood-gas',
    name: 'Brotherhood Pipeline (Gas)',
    type: 'gas',
    status: 'operational',
    coordinates: [
      [51.3, 37.8], // Near Kursk
      [50.9, 34.8], // Sumy
      [50.4, 30.5], // Kyiv
      [49.4, 27.0], // Khmelnytskyi
      [48.9, 24.7], // Ivano-Frankivsk
      [48.6, 22.3]  // Uzhhorod
    ]
  },
  {
    id: 'nord-stream-1',
    name: 'Nord Stream 1 (Gas)',
    type: 'gas',
    status: 'destroyed',
    coordinates: [
      [60.7, 28.5], // Vyborg
      [59.5, 25.5], // Gulf of Finland
      [55.5, 15.8], // Baltic Sea (Bornholm)
      [54.1, 13.6]  // Greifswald (Germany)
    ]
  },
  {
    id: 'cpc-oil',
    name: 'Caspian Pipeline Consortium (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [46.7, 51.4], // Atyrau (Kazakhstan)
      [46.5, 48.0], // Astrakhan area
      [45.4, 43.0], // Stavropol Kray
      [44.7, 37.8]  // Novorossiysk
    ]
  },
  {
    id: 'baltic-pipeline-system',
    name: 'Baltic Pipeline System (Oil)',
    type: 'oil',
    status: 'operational',
    coordinates: [
      [57.6, 39.9], // Yaroslavl
      [59.4, 32.0], // Kirishi
      [60.3, 28.6]  // Primorsk
    ]
  }
];
