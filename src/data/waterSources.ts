import { WaterSource } from '@/types'

export const waterSources: WaterSource[] = [
  {
    id: 'w1',
    type: 'water',
    name: 'Source de la Montagne Noire',
    region: 'Laurentides',
    lat: 46.43,
    lng: -74.72,
    description:
      "Source artésienne naturelle jaillissant à 8 °C toute l'année. Eau pure filtrée à travers les couches de granite des Laurentides, reconnue pour sa minéralité équilibrée.",
    access:
      'Stationnement au km 12 du chemin de la Montagne Noire. Marche de 5 min sur sentier balisé. Apporter vos contenants.',
    tested: true,
    flow_rate: 'Fort débit continu, accessible 12 mois/an',
  },
  {
    id: 'w2',
    type: 'water',
    name: 'Source du Ruisseau Bellerive',
    region: 'Charlevoix',
    lat: 47.76,
    lng: -70.24,
    description:
      "Source de montagne alimentée par la fonte des neiges et les précipitations des Appalaches. Eau froide et cristalline avec une très faible minéralisation.",
    access:
      "Accessible depuis le sentier de randonnée du Massif. Panneau 'Source naturelle' à 2,5 km de l'entrée principale.",
    tested: true,
    flow_rate: "Débit modéré, meilleur au printemps et à l'automne",
  },
  {
    id: 'w3',
    type: 'water',
    name: 'Source de la Forêt Boréale',
    region: 'Saguenay–Lac-Saint-Jean',
    lat: 48.11,
    lng: -71.55,
    description:
      "Source sauvage au cœur de la forêt boréale, alimentée par un aquifère profond. L'eau émerge à 6 °C, riche en calcium naturel.",
    access:
      "Route forestière 168, prendre le sentier des Sources à gauche, 800 m à pied. Apporter une lampe de poche en automne.",
    tested: false,
    flow_rate: "Débit régulier toute l'année",
  },
  {
    id: 'w4',
    type: 'water',
    name: 'Source Estrie Pure',
    region: 'Estrie',
    lat: 45.61,
    lng: -71.93,
    description:
      "Source karstique émergeant d'une formation calcaire des Appalaches. L'eau naturellement alcaline (pH 7,8) traverse plusieurs couches de roche calcaire avant d'émerger.",
    access:
      'Près du parc de la Gorge de Coaticook. Stationnement gratuit au bout du chemin des Sources. La source est à 200 m.',
    tested: true,
    flow_rate: "Débit fort, accessible toute l'année",
  },
  {
    id: 'w5',
    type: 'water',
    name: 'Source des Appalaches',
    region: 'Chaudière-Appalaches',
    lat: 46.52,
    lng: -70.52,
    description:
      "Source de colline dans les contreforts appalachiens. Reconnue par les agriculteurs locaux depuis plus d'un siècle. Eau légèrement magnésienne de très bonne qualité.",
    access:
      "Chemin du rang Sainte-Anne, 3 km après Saint-Lazare. Stationnement au bord de la route, panonceau en bois.",
    tested: true,
    flow_rate: "Fort débit printanier, modéré l'été",
  },
  {
    id: 'w6',
    type: 'water',
    name: 'Source Laurentienne',
    region: 'Laurentides',
    lat: 46.89,
    lng: -74.03,
    description:
      "Source ancienne connue des Anishinaabe pour ses vertus thérapeutiques. Eau légèrement effervescente due à une concentration naturelle en CO₂. Très appréciée des randonneurs.",
    access:
      "Parc régional de la Rivière-du-Nord, sentier 4 (bleu). Source indiquée à 2,5 km de l'entrée principale.",
    tested: true,
    flow_rate: 'Débit constant, légèrement pétillant',
  },
  {
    id: 'w7',
    type: 'water',
    name: 'Source de la Haute-Gaspésie',
    region: 'Gaspésie',
    lat: 49.12,
    lng: -65.48,
    description:
      "Source de haute altitude (640 m) dans les sommets gaspésiens. L'eau de pluie et de fonte des neiges se filtre naturellement pendant des années avant d'émerger pure et froide.",
    access:
      'Accessible via la route 132 puis sentier de randonnée de 3 h. Équipement de montagne recommandé. Accessible mai–octobre seulement.',
    tested: false,
    flow_rate: 'Débit variable, absent en hiver',
  },
  {
    id: 'w8',
    type: 'water',
    name: 'Source Abitibi Sauvage',
    region: 'Abitibi-Témiscamingue',
    lat: 48.33,
    lng: -78.95,
    description:
      "Source naturelle au cœur de la forêt abitibienne, alimentée par un aquifère glaciaire de grande profondeur. L'eau émerge à 5 °C, translucide et sans goût de chlore.",
    access:
      "Route de la Morandière, km 28, chemin forestier à droite marqué 'Source'. Accessible en véhicule tout-terrain ou à pied (2 km).",
    tested: false,
    flow_rate: 'Débit modéré, plus fort au printemps',
  },
]
