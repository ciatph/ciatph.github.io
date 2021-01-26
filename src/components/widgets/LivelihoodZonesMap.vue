<template lang="pug">
  // Mapbox GUI
  div(id="map" ref="map")
    div(class="map-overlay" style="margin-top: 60px; margin-left: 2%;")
      div(class="map-overlay-inner")
        h4 Region/Province selection

        b-form-select(
          v-model="selectedRegion"
          :disabled="disabled"
          :options="options"
        )

        b-form-select(
          v-model="selectedProvince"
          :disabled="disabled"
          :options="optionsProvince"
        )
</template>

<script>
export default {
  name: 'LivelihoodZonesMap',
  data () {
    return {
      selectedIsland: 'luzon',
      selectedRegion: null,
      selectedProvince: null,

      previousRegion: '',
      previousIsland: '',

      disabled: false,

      options: [
        { value: null, text: 'Please select a region' }
      ],

      optionsProvince: [
        { value: null, text: 'Please select a province' }
      ],

      islands: {
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

      mapboxData: {
        'luzon': {
          tilesetID: 'wfp_luzon-0i1ren',
          tilesetUrl: 'mapbox://ciatph02.0e42q1es',
          styleUrl: 'mapbox://styles/ciatph02/ckkd7292b00e217ob16egq3f7'
        },
        'visayas': {
          tilesetID: 'wfp_visayas-74aprl',
          tilesetUrl: 'mapbox://ciatph02.c08hjtkc',
          styleUrl: 'mapbox://styles/ciatph02/ckkd74y2200f417n6bmkfifhz'
        },
        'mindanao': {
          tilesetID: 'wfp_mindanao-0jf4sv',
          tilesetUrl: 'mapbox://ciatph02.3xpx7078',
          styleUrl: 'mapbox://styles/ciatph02/ckkdv5x7h0npp17qjtj9o01u0'
        }
      },

      hardCodedNames: {
        'lanao del sur': 'Lanao del Sur',
        'lanao del norte': 'Lanao del Norte',
        'davao del norte': 'Davao del Norte',
        'davao del sur': 'Davao del Sur',
        'NCR, city of manila, first district': 'NCR, City of Manila, First District',
        'agusan del norte': 'Agusan del Norte',
        'agusan del sur': 'Agusan del Sur',
        'surigao del norte': 'Surigao del Norte',
        'surigao del sur': 'Surigao del Sur',
        'city of isabela': 'City of Isabela',
        'zamboanga del norte': 'Zamboanga del Norte',
        'zamboanga del sur': 'Zamboanga del Sur',
        'zamboanga sibugay': 'Zamboanga Sibugay'
      }
    }
  },

  watch: {
    selectedRegion () {
      this.selectedIsland = this.getIslandFromRegion(this.selectedRegion)
      this.getProvinceOptions()

      // Hide the previous selected region
      if (this.previousRegion) {
        window.MBL.toggleLayer(`${this.previousRegion}-layer`)
      }

      // Build the province list filter. Format the hard-coded values
      let provinceList = Array.from(this.islands[this.selectedIsland][this.selectedRegion],
        (x) => {
          if (this.hardCodedNames[x]) {
            return this.hardCodedNames[x]
          } else {
            return Array.from(x.split(' '), (y) => `${y[0].toUpperCase()}${y.substr(1, y.length)}`).join(' ')
          }
        })

      // Draw the region layer
      window.MBL.addLayerSource(
        // this.selectedRegion,
        this.selectedIsland,
        this.mapboxData[this.selectedIsland].tilesetID,
        this.mapboxData[this.selectedIsland].tilesetUrl,
        { // filter
          expression: 'in',
          key: 'ADM2_EN',
          value: provinceList
        }
      )

      // this.previousIsland = this.selectedIsland
      this.previousRegion = this.selectedIsland

      // Disable the UI
      this.disabled = true
      const that = this
      const time = setInterval(() => {
        if (!window.MBL.isLoading) {
          console.log('map loaded!')
          that.disabled = false
          clearInterval(time)
        }
      }, 200)
    },

    selectedProvince () {
      if (!this.selectedProvince) {
        return
      }

      const provinceValue = (this.hardCodedNames[this.selectedProvince])
        ? this.hardCodedNames[this.selectedProvince]
        : this.camelCase(this.selectedProvince)

      window.MBL.setLayerFilter(`${this.selectedIsland}-layer`, {
        key: 'ADM2_EN',
        value: provinceValue
      })
    }
  },

  mounted () {
    this.getRegionOptions()

    // Initialize the mapbox basemap
    window.MBL.initMap({
      mapContainer: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 5.0,
      center: [122.016, 12.127]
    })

    this.$refs.map.getElementsByClassName('mapboxgl-canvas')[0].style.position = 'relative'
  },

  methods: {
    camelCase (str, special = '') {
      if (str === null) {
        return
      }

      let string = str
      if (string.includes('-')) {
        string = Array.from(string.split('-'), (x) => `${x[0].toUpperCase()}${x.substr(1, x.length)}`).join('-')
      }

      return Array.from(string.split(' '), (x) => `${x[0].toUpperCase()}${x.substr(1, x.length)}`).join(' ')
    },

    getIslandFromRegion (region) {
      const isles = Object.keys(this.islands)
      let mainIsle

      for (let i = 0; i < isles.length; i += 1) {
        const regions = Object.keys(this.islands[isles[i]])
        if (regions.includes(region)) {
          mainIsle = isles[i]
          break
        }
      }

      return mainIsle
    },

    // Build the regions list
    getRegionOptions () {
      for (let isle in this.islands) {
        Object.keys(this.islands[isle]).forEach((item, index) => {
          this.options.push({ value: item, text: this.camelCase(item) })
        })
      }
    },

    // Build a region's province list
    getProvinceOptions () {
      this.selectedProvince = null
      this.optionsProvince = [{ value: null, text: 'Please select a province' }]

      if (this.islands[this.selectedIsland][this.selectedRegion]) {
        this.islands[this.selectedIsland][this.selectedRegion].forEach((item, index) => {
          const provinceValue = (this.hardCodedNames[item]) ? this.hardCodedNames[item] : this.camelCase(item)
          this.optionsProvince.push({ value: item, text: provinceValue })
        })
      }
    }
  }
}
</script>
