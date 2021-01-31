module.exports = {
  LIVE: true,
  EXTERNAL_PROJ_URL: 'https://ciatphweb.firebaseapp.com',
  GITHUB_PROJECTS: [
    'dextraction',
    'terrai-gbif',
    'webscraper'
  ],

  firebaseSettings: {
    apiKey: 'AIzaSyACza2B6mkzcf6IuC2BIaP0avr_kHj-I_M',
    authDomain: 'ciat-pdfstorage.firebaseapp.com',
    databaseURL: 'https://ciat-pdfstorage.firebaseio.com',
    projectId: 'ciat-pdfstorage',
    storageBucket: 'ciat-pdfstorage.appspot.com',
    messagingSenderId: '20173839232',
    appId: '1:20173839232:web:b5fc59d9e7a01dac'
  },

  philippines: {
    luzon: {
      'national capital region': ['NCR, city of manila, first district', 'NCR, second district', 'NCR, third district', 'NCR, fourth district'],
      'cordillera administrative region': ['abra', 'apayao', 'benguet', 'ifugao', 'kalinga', 'mountain province'],
      'ilocos region': ['ilocos norte', 'ilocos sur', 'la union'],
      'cagayan valley': ['batanes', 'cagayan', 'isabela', 'nueva vizcaya', 'quirino'],
      'central luzon': ['aurora', 'bataan', 'bulacan', 'nueva ecija', 'pampanga', 'tarlac', 'zambales'],
      'calabarzon': ['batangas', 'cavite', 'laguna', 'quezon', 'rizal'],
      'mimaropa': ['marinduque', 'occidental mindoro', 'oriental mindoro', 'palawan', 'romblon'],
      'bicol region': ['albay', 'camarines norte', 'camarines sur', 'catanduanes', 'masbate', 'sorsogon']
    },
    visayas: {
      'western visayas': ['aklan', 'antique', 'capiz', 'guimaras', 'iloilo', 'negros occidental'],
      'central visayas': ['bohol', 'cebu', 'negros oriental', 'siquijor'],
      'eastern visayas': ['biliran', 'eastern samar', 'leyte', 'northern samar', 'samar', 'southern leyte']
    },
    mindanao: {
      'autonomous region in muslim mindanao': ['basilan', 'lanao del sur', 'maguindanao', 'sulu', 'tawi-tawi'],
      'zamboanga peninsula': ['city of isabela', 'zamboanga del norte', 'zamboanga del sur', 'zamboanga sibugay'],
      'northern mindanao': ['bukidnon', 'camiguin', 'lanao del norte', 'misamis occidental', 'misamis oriental'],
      'davao region': ['compostela valley', 'davao del norte', 'davao del sur', 'davao occidental', 'davao oriental'],
      'soccskargen': ['cotabato', 'sarangani', 'south cotabato', 'sultan kudarat'],
      'caraga': ['agusan del norte', 'agusan del sur', 'dinagat islands', 'surigao del norte', 'surigao del sur']
    }
  },

  livelihoodZones: [
    'Annual Crops Zone',
    'Aquaculture/Coastal Zone',
    'Aquaculture/Freshwater Zone',
    'Cool Environment Zone',
    'Irrigated Rice Zone',
    'Pasture Zone',
    'Perennial Crops Zone',
    'Rainfed Rice Zone',
    'Urban Zone'
  ],

  mapboxData: {
    'luzon': {
      tilesetID: 'wfp_luzon_v2-4v4oaa',
      tilesetUrl: 'mapbox://ciatph.5kaa86pi'
    },
    'visayas': {
      tilesetID: 'wfp_visayas_v2-7fws23',
      tilesetUrl: 'mapbox://ciatph.4dv34cxw'
    },
    'mindanao': {
      tilesetID: 'wfp_mindanao_v2-bxk5d4',
      tilesetUrl: 'mapbox://ciatph.6g0cm3sd'
    }
  }
}
