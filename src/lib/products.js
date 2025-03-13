// Sample product data
export const products = [
  {
    id: 1,
    name: 'Safeline Metaaldetector',
    price: '2950',
    condition: 'Gebruikt',
    category: 'Voedselveiligheid',
    description: 'Professionele metaaldetector van Safeline, perfect voor het detecteren van metalen verontreinigingen in voedselproducten. In goede staat en volledig functioneel.',
    features: [
      'Hoge gevoeligheid voor alle metalen',
      'Automatische kalibratie',
      'Eenvoudige bediening',
      'Inclusief transportband',
      'Geschikt voor diverse voedselproducten'
    ],
    specifications: {
      merk: 'Safeline',
      model: 'MD-5000',
      bouwjaar: '2018',
      afmetingen: '120 x 80 x 140 cm',
      gewicht: '180 kg',
      voeding: '230V, 50Hz',
      vermogen: '1.5 kW'
    },
    imageUrl: '/products/safeline/safeline.jpg',
    images: [
      '/products/safeline/safeline.jpg'
    ]
  },
  {
    id: 2,
    name: 'Industriële Vaatwasser',
    price: '1850',
    condition: 'Gereviseerd',
    category: 'Keukenapparatuur',
    description: 'Krachtige industriële vaatwasser, perfect voor restaurants en cateringbedrijven. Recent gereviseerd en in uitstekende staat.',
    features: [
      'Snelle wascyclus van 2-3 minuten',
      'Energiezuinig ontwerp',
      'Automatische dosering van wasmiddel',
      'Zelfreinigend filter',
      'Inclusief waterontharder'
    ],
    specifications: {
      merk: 'Hobart',
      model: 'FX-40',
      bouwjaar: '2019',
      afmetingen: '60 x 65 x 140 cm',
      gewicht: '95 kg',
      voeding: '400V, 50Hz',
      vermogen: '6.2 kW'
    },
    imageUrl: '/products/safeline/safeline.jpg', // Placeholder, would be replaced with actual image
    images: [
      '/products/safeline/safeline.jpg' // Placeholder, would be replaced with actual images
    ]
  },
  {
    id: 3,
    name: 'Professionele Koffiemachine',
    price: '1250',
    condition: 'Gebruikt',
    category: 'Koffiemachines',
    description: 'Professionele espressomachine met 2 groepen, ideaal voor cafés en restaurants. Maakt perfect espresso, cappuccino en andere koffiespecialiteiten.',
    features: [
      'Dubbele boiler systeem',
      'Programmeerbare doseringen',
      'Stoom- en heetwaterfunctie',
      'Kopjeswarmer',
      'Automatische reiniging'
    ],
    specifications: {
      merk: 'La Cimbali',
      model: 'M32 Dosatron',
      bouwjaar: '2020',
      afmetingen: '80 x 55 x 55 cm',
      gewicht: '75 kg',
      voeding: '230V, 50Hz',
      vermogen: '3.3 kW'
    },
    imageUrl: '/products/safeline/safeline.jpg', // Placeholder, would be replaced with actual image
    images: [
      '/products/safeline/safeline.jpg' // Placeholder, would be replaced with actual images
    ]
  },
  {
    id: 4,
    name: 'Koelwerkbank',
    price: '1450',
    condition: 'Gebruikt',
    category: 'Koeling',
    description: 'Professionele koelwerkbank met 3 deuren, ideaal voor keukens met beperkte ruimte. Biedt zowel werkruimte als koeling in één apparaat.',
    features: [
      'Digitale temperatuurregeling',
      'Automatische ontdooiing',
      'Energielabel A',
      'Verstelbare poten',
      'Inclusief GN-bakken'
    ],
    specifications: {
      merk: 'Gram',
      model: 'Gastro K 1807',
      bouwjaar: '2019',
      afmetingen: '180 x 70 x 85 cm',
      gewicht: '120 kg',
      voeding: '230V, 50Hz',
      vermogen: '0.35 kW',
      koelmiddel: 'R600a'
    },
    imageUrl: '/products/safeline/safeline.jpg', // Placeholder, would be replaced with actual image
    images: [
      '/products/safeline/safeline.jpg' // Placeholder, would be replaced with actual images
    ]
  },
  {
    id: 5,
    name: 'Industriële Mixer',
    price: '950',
    condition: 'Gereviseerd',
    category: 'Keukenapparatuur',
    description: 'Krachtige industriële mixer voor bakkerijen en restaurants. Geschikt voor het mengen van deeg, beslag en andere ingrediënten.',
    features: [
      '20 liter capaciteit',
      'Variabele snelheidsregeling',
      'Inclusief 3 hulpstukken',
      'Robuuste constructie',
      'Eenvoudig te reinigen'
    ],
    specifications: {
      merk: 'KitchenAid',
      model: 'Commercial 8',
      bouwjaar: '2020',
      afmetingen: '45 x 55 x 90 cm',
      gewicht: '65 kg',
      voeding: '230V, 50Hz',
      vermogen: '1.3 kW'
    },
    imageUrl: '/products/safeline/safeline.jpg', // Placeholder, would be replaced with actual image
    images: [
      '/products/safeline/safeline.jpg' // Placeholder, would be replaced with actual images
    ]
  },
  {
    id: 6,
    name: 'Salamander Grill',
    price: '650',
    condition: 'Gebruikt',
    category: 'Keukenapparatuur',
    description: 'Professionele salamander grill voor het gratineren, grillen en warmhouden van gerechten. Ideaal voor restaurants en cateringbedrijven.',
    features: [
      'Snelle opwarmtijd',
      'Verstelbaar bovenblad',
      'Onafhankelijke temperatuurzones',
      'Uitneembare vetopvangbak',
      'Robuuste RVS constructie'
    ],
    specifications: {
      merk: 'Lincat',
      model: 'AS3',
      bouwjaar: '2019',
      afmetingen: '60 x 40 x 50 cm',
      gewicht: '35 kg',
      voeding: '230V, 50Hz',
      vermogen: '2.8 kW'
    },
    imageUrl: '/products/safeline/safeline.jpg', // Placeholder, would be replaced with actual image
    images: [
      '/products/safeline/safeline.jpg' // Placeholder, would be replaced with actual images
    ]
  }
];

// Get all products
export function getAllProducts() {
  return products;
}

// Get product by ID
export function getProductById(id) {
  return products.find(product => product.id === Number(id)) || null;
}

// Get products by category
export function getProductsByCategory(category) {
  return products.filter(product => product.category === category);
}

// Get unique categories
export function getCategories() {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
} 