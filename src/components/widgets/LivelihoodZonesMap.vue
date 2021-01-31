<template lang="pug">
  // Mapbox GUI
  div(id="map-livelihood" ref="map")
    div(class="map-overlay" style="margin-top: 60px; margin-left: 2%; width: 30%;")
      div(class="map-overlay-inner")
        h4 Region/Province selection
        // b-form-select(
        //  v-model="selectedZone"
        //  :disabled="disabled"
        //  :options="optionsZone"
        // )

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

        small(v-if="statusMessage === messages.NAVIGATE_TO")
          span {{ messages.NAVIGATE_TO }} or &nbsp;
          a(href="#" @click="resetCenter") [click here]
        small(v-else) {{ statusMessage || '&nbsp;' }}
        br

        div(v-if="legends.length > 0")
          div(style="width: 100%; display: flex;")
            h5(style="width: 50%;") Legend
            div(style="width: 50%; line-height: 25px;")
             div(size="sm" style="float: right;")
                b-button(size="sm" style="margin-right: 3px;" @click="resetSelections") Clear
                b-button(size="sm"
                  v-if="showViewAllBtn"
                  @click="resetCenter") View All

          div(class="legend-livelihood")
            div(v-for="item in legends")
              <div><span v-bind:style="{ backgroundColor: item.color }"></span>{{ item.text }}</div>
</template>

<script>
import { philippines, livelihoodZones } from '@/defines/constants'

export default {
  name: 'LivelihoodZonesMap',
  data () {
    return {
      selectedIsland: null,
      selectedRegion: null,
      selectedProvince: null,
      selectedZone: null,

      previousRegion: '',
      previousIsland: '',

      disabled: true,
      showViewAllBtn: false,

      options: [
        { value: null, text: 'Please select a region' }
      ],

      optionsProvince: [
        { value: null, text: 'Please select a province' }
      ],

      optionsZone: [
        { value: null, text: 'Please select a livelihood zone' }
      ],

      legends: [],
      statusMessage: '',
      messages: {
        DEFAULT: '',
        LOADING: 'Please wait while loading...',
        NAVIGATE_TO: 'Please navigate to the selected region to view legends.',
        LOAD_ERROR: 'An error has occurred while fetching data. Please check your internet connection and reload the web page.',
        NO_REULTS: 'Selected options are not available for this region or province.'
      },

      filters: {
        layer: null, // zone
        ADM2_EN: null // province(s)
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
      if (!this.selectedRegion) {
        this.filters.ADM2_EN = null
        this.selectedProvince = null
        this.optionsProvince = [{ value: null, text: 'Please select a province' }]
        this.statusMessage = this.messages.DEFAULT
      } else {
        this.selectedIsland = this.getIslandFromRegion(this.selectedRegion)
        this.getProvinceOptions()
        this.filters.ADM2_EN = ['in', 'ADM2_EN', ...this.getProvinces(this.selectedIsland, this.selectedRegion)]
        this.statusMessage = this.messages.NAVIGATE_TO
      }

      // this.statusMessage = this.messages.NAVIGATE_TO
      this.updateLayers()
    },

    selectedProvince () {
      if (!this.selectedProvince) {
        if (this.selectedRegion) {
          this.filters.ADM2_EN = ['in', 'ADM2_EN', ...this.getProvinces(this.selectedIsland, this.selectedRegion)]
        } else {
          this.filters.ADM2_EN = null
        }
      } else {
        const provinceValue = (this.hardCodedNames[this.selectedProvince])
          ? this.hardCodedNames[this.selectedProvince]
          : this.camelCase(this.selectedProvince)
        this.filters.ADM2_EN = ['==', 'ADM2_EN', provinceValue]
      }

      this.updateLayers()
    },

    selectedZone () {
      if (!this.selectedZone) {
        this.filters.layer = null
      } else {
        this.filters.layer = ['==', 'layer', this.selectedZone]
      }

      this.updateLayers()
    },

    legends () {
      if (this.legends.length > 0 && (this.selectedZone || (this.selectedRegion || this.selectedProvince))) {
        this.statusMessage = this.messages.DEFAULT
      }
    }
  },

  mounted () {
    this.getLivelihoodZonesOptions()
    this.getRegionOptions()
    this.statusMessage = this.messages.LOADING
    const that = this

    // Initialize the mapbox basemap
    window.MBL.initMap({
      mapContainer: 'map-livelihood',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 5.6,
      center: [120.77551644707285, 12.419614853889797]
    })

    this.$refs.map.getElementsByClassName('mapboxgl-canvas')[0].style.position = 'relative'

    // Render legends if they are not yet visible after a moveend event
    window.MBL.map.on('moveend', function (e) {
      if ((that.selectedZone || (that.selectedRegion || that.selectedProvince))) {
        // console.log(`---updating legends! length: ${that.legends.length}, zoom ${window.MBL.map.getZoom()}`)
        that.updateLegend()
        that.showAllLegends()
      }

      if (window.MBL.isFlying) {
        window.MBL.map.fire('flyend')
        if (that.selectedZone || (that.selectedRegion || that.selectedProvince)) {
          that.updateLegend(true)
        }
      }
    })

    // Enable UI after basemap and (all) Tilesets have finished loading
    window.MBL.map.on(window.MBL.events.DATA_LOADED, function (e) {
      console.log('---ALL DATA HAS LOADED')
      if (that.statusMessage === that.messages.LOADING) {
        that.statusMessage = that.messages.DEFAULT
        that.disabled = false
      }
    })

    // Display an error message if initial Tilesets pre-load has failed
    window.MBL.map.on(window.MBL.events.DATA_LOAD_FAILURE, function (e) {
      console.log('---DATA FAILED TO DOWNLOAD')
      that.statusMessage = that.messages.LOAD_ERROR
    })
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
      const isles = Object.keys(philippines)
      let mainIsle

      for (let i = 0; i < isles.length; i += 1) {
        const regions = Object.keys(philippines[isles[i]])
        if (regions.includes(region)) {
          mainIsle = isles[i]
          break
        }
      }

      return mainIsle
    },

    // Build the regions list
    getRegionOptions () {
      for (let isle in philippines) {
        Object.keys(philippines[isle]).forEach((item, index) => {
          this.options.push({ value: item, text: this.camelCase(item) })
        })
      }
    },

    getProvinces (island, region) {
      if (!region) {
        return
      }

      return Array.from(philippines[island][region],
        (x) => {
          if (this.hardCodedNames[x]) {
            return this.hardCodedNames[x]
          } else {
            return Array.from(x.split(' '), (y) => `${y[0].toUpperCase()}${y.substr(1, y.length)}`).join(' ')
          }
        })
    },

    // Build a region's province list
    getProvinceOptions () {
      this.selectedProvince = null
      this.optionsProvince = [{ value: null, text: 'Please select a province' }]

      if (philippines[this.selectedIsland][this.selectedRegion]) {
        philippines[this.selectedIsland][this.selectedRegion].forEach((item, index) => {
          const provinceValue = (this.hardCodedNames[item]) ? this.hardCodedNames[item] : this.camelCase(item)
          this.optionsProvince.push({ value: item, text: provinceValue })
        })
      }
    },

    getLivelihoodZonesOptions () {
      for (let i = 0; i < livelihoodZones.length; i += 1) {
        this.optionsZone.push({ value: livelihoodZones[i], text: livelihoodZones[i] })
      }
    },

    // Highlight the polygons on the selected layers
    updateLayers () {
      let finalFilter = null
      const that = this
      this.legends = []

      // Has zone filter
      if (this.filters.layer && this.filters.ADM2_EN) {
        finalFilter = ['all', this.filters.layer, this.filters.ADM2_EN]
      } else {
        // Append individual filters
        if (this.filters.layer) {
          finalFilter = this.filters.layer
        }

        if (this.filters.ADM2_EN) {
          finalFilter = this.filters.ADM2_EN
        }
      }

      console.log(finalFilter)
      window.MBL.setLayersFilter(finalFilter)

      if (this.selectedZone || (this.selectedRegion || this.selectedProvince)) {
        setTimeout(() => {
          that.updateLegend()
          that.showAllLegends()
        }, 200)
      }
    },

    updateLegend (fromFlyEnd = false) {
      let colorCodes = []
      this.legends = []

      const features = window.MBL.map.queryRenderedFeatures({ layers: window.MBL.layerNames })
      if (features.length === 0) {
        console.log('---no legends to show')
        this.statusMessage = (fromFlyEnd) ? this.messages.NO_REULTS : this.messages.NAVIGATE_TO
        return
      }

      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }

      colorCodes = (Array.from(features, (x) => x.properties['Legend_v2']).filter(unique)).sort()
      // console.log(`---legends: ${colorCodes.length}`)

      for (let i = 0; i < colorCodes.length; i += 1) {
        this.legends.push({
          text: colorCodes[i],
          color: window.MBL.colorCodes[colorCodes[i]]
        })
      }
    },

    resetCenter () {
      window.MBL.resetCenter()
    },

    resetSelections () {
      this.selectedIsland = null
      this.selectedZone = null
      this.selectedRegion = null
      this.selectedProvince = null
    },

    showAllLegends () {
      const zoom = window.MBL.map.getZoom()
      if (zoom > window.MBL.defaultSettings.zoom && this.legends.length > 0) {
        this.showViewAllBtn = true
      } else {
        this.showViewAllBtn = false
      }
    }
  }
}
</script>
