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
      'NCR - National Capital Region': ['NCR, City of Manila, First District', 'NCR, Fourth District', 'NCR, Second District', 'NCR, Third District'],
      'Cordillera Administrative Region': ['Abra', 'Apayao', 'Benguet', 'Ifugao', 'Kalinga', 'Mountain Province'],
      'Region I - Ilocos': ['Ilocos Norte', 'Ilocos Sur', 'La Union', 'Pangasinan'],
      'Region II - Cagayan Valley': ['Batanes', 'Cagayan', 'Isabela', 'Nueva Vizcaya', 'Quirino'],
      'Region III - Central Luzon': ['Aurora', 'Bataan', 'Bulacan', 'Nueva Ecija', 'Pampanga', 'Tarlac', 'Zambales'],
      'Region IV-A - CALABARZON': ['Batangas', 'Cavite', 'Laguna', 'Quezon', 'Rizal'],
      'Region IV-B - MIMAROPA': ['Marinduque', 'Occidental Mindoro', 'Oriental Mindoro', 'Palawan', 'Romblon'],
      'Region V - Bicol': ['Albay', 'Camarines Norte', 'Camarines Sur', 'Catanduanes', 'Masbate', 'Sorsogon']
    },
    visayas: {
      'Negros Island Region': ['Negros Occidental', 'Negros Oriental'],
      'Region VI - Western Visayas': ['Aklan', 'Antique', 'Capiz', 'Guimaras', 'Iloilo'],
      'Region VII - Central Visayas': ['Bohol', 'Cebu', 'Siquijor'],
      'Region VIII - Eastern Visayas': ['Biliran', 'Eastern Samar', 'Leyte', 'Northern Samar', 'Samar', 'Southern Leyte']
    },
    mindanao: {
      'BARMM - Bangsamoro Autonomous Region in Muslim Mindanao': ['Basilan', 'Lanao del Sur', 'Maguindanao', 'Sulu', 'Tawi-Tawi'],
      'Region IX - Zamboanga Peninsula': ['City of Isabela', 'Zamboanga Sibugay', 'Zamboanga del Norte', 'Zamboanga del Sur'],
      'Region X - Northern Mindanao': ['Bukidnon', 'Camiguin', 'Lanao del Norte', 'Misamis Occidental', 'Misamis Oriental'],
      'Region XI - Davao': ['Compostela Valley', 'Davao Occidental', 'Davao Oriental', 'Davao del Norte', 'Davao del Sur'],
      'Region XII - SOCCSKARGEN': ['Cotabato', 'Cotabato City', 'Sarangani', 'South Cotabato', 'Sultan Kudarat'],
      'Region XIII - Caraga': ['Agusan del Norte', 'Agusan del Sur', 'Dinagat Islands', 'Surigao del Norte', 'Surigao del Sur']
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
      tilesetID: 'wfp_luzon_v3-d8d009',
      tilesetUrl: 'mapbox://ciatph.bi7iu9gj'
    },
    'visayas': {
      tilesetID: 'wfp_visayas_v3-3q13v0',
      tilesetUrl: 'mapbox://ciatph.4hl4oabg'
    },
    'mindanao': {
      tilesetID: 'wfp_mindanao_v3-4etl85',
      tilesetUrl: 'mapbox://ciatph.4vlywva5'
    }
  }
}
