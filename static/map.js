// Mapbox map
// requires mapboxgl js
// Manages layers from a mapbox Tileset data source

const mapboxData = {
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

function MapboxMap (publicAccessToken) {
  this.map = null
  this.mapCanvas = null
  this.mapContainer = null

  // Mapbox style
  this.style = ''

  // Mapbox style's Tileset layer name
  this.sourceLayer = ''

  // Set the mapbox public access token
  this.accessToken = mapboxgl.accessToken = publicAccessToken

  // HTML hex codes mapped to feature attribute values
  this.colorCodes = null

  // User-defined layer names
  this.layerNames = []

  // Flag if a vector data source is loading
  // TO-DO: Listen for mapbox events
  this.isLoading = true

  // Flag if the map is flying using flyTo()
  this.isFlying = false

  // Click event on 1st-time data load has been initialized
  this.eventsInitialized = false

  // Mapbox custom events
  this.events = {
    DATA_LOADED: 'dataloaded',
    DATA_LOAD_FAILURE: 'dataloadfailure'
  }

  this.defaultSettings = {
    zoom: 5.6,
    center:  [120.77551644707285, 12.419614853889797]
  }
}

/**
 * mapContainer - {String} html div DOM container for the map
 * style - {String} mapbox style url
 * zoom - {Number} map zoom
 * center - {Array} [lat, lan] map center
 */
MapboxMap.prototype.initMap = function ({ mapContainer = 'map', style, zoom, center, mapboxTilesets = mapboxData }) {
  if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL')
    return
  }

  // Set the mapbox public access token
  mapboxgl.accessToken = this.accessToken
  console.log('---creating a new map!')

  // Create a new mapbox map
  this.map = new mapboxgl.Map({
    container: mapContainer,
    style,
    zoom: (zoom !== undefined) ? zoom : this.defaultSettings.zoom,
    center: (center !== undefined) ? center : this.defaultSettings.center,
    minZoom: 1,
    maxZoom: 12
  })
    .addControl(new mapboxgl.FullscreenControl())
    .addControl(new mapboxgl.NavigationControl())
    .addControl(new mapboxgl.AttributionControl({ compact: true }))

  // Resize the map
  this.mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0]
  this.mapContainer = document.getElementById(mapContainer)

  this.mapContainer.style.height = (window.outerHeight + 70) + 'px'
  this.mapCanvas.style.width = '100%'
  this.map.resize()

  this.colorCodes = this.getLegendColorCodes()
  this.eventsInitialized = false
  this.layerNames = []

  // Disable map controls
  this.toggleHandlers(false)

  // Listen for basemap loading events
  const that = this

  this.map.on('load', function () {
    console.log('---basemap loaded')
    // that.toggleHandlers(true)
    that.loadAllTilesets(mapboxTilesets)
    that.isLoading = false
  })

  this.map.on('flystart', function () {
    console.log('---fly start')
    that.isFlying = true
  })

  this.map.on('flyend', function () {
    console.log('---fly end')
    that.isFlying = false
  })

  // Add click events after all Tileset data has loaded
  // TO-DO: Stay tuned for mapbox gl updates. Confirm that 'sourcedata' fires after loading all Tilesets on e.isSourceLoaded and e.sourceId !== 'composite'
  this.map.on('sourcedata', function (e) {
    if (e.isSourceLoaded) {
      if (e.sourceId !== 'composite') {
        if (!that.eventsInitialized) {
          that.eventsInitialized = true
          let hasLoadError = false

          const attributeNames = { // Attribute name mapping
            'ADM1_EN': 'Region',
            'ADM2_EN': 'Province',
            'ADM3_EN': 'Municipality',
            'Zone': 'Zone',
            'Legend_2': 'Legend'
          }

          // TO-DO: Verify all data are loaded at this point. Only (1) is registered in console.log but all data are available
          for (let i = 0; i < that.layerNames.length; i += 1) {
            const features = that.map.queryRenderedFeatures({ layers: [that.layerNames[i]] })
            console.log(`----${that.layerNames[i]}: ${features.length}`)

            if (features.length === 0) {
              console.log(`---failed to fetch ${that.layerNames[i]}`)
              hasLoadError = true
              this.fire(that.events.DATA_LOAD_FAILURE)
              break
            }

            if (features) {
              window.MBL.map.on('click', `${that.layerNames[i]}`, function (e) {
                // print data by order as defined in attributeNames
                var content = ''
                for (let item in attributeNames) {
                  if (e.features[0].properties[item] !== undefined) {
                    content += `<strong>${attributeNames[item]}</strong>: ${e.features[0].properties[item]}`
                    content += '<br>'
                  }
                }

                new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(content)
                  .addTo(this)
              })
            }
          }

          if (!hasLoadError) {
            console.log(`---${that.events.DATA_LOADED}`)
            that.isLoading = false
            that.toggleHandlers(true)
            this.fire(that.events.DATA_LOADED)
          }
        }
      }
    }
  })
}

/**
 * Change the map Style (layer)
 */
MapboxMap.prototype.loadStyle = function (styleUrl, tilesetID, filter) {
  this.map.setStyle(styleUrl)
  this.initLoadedStyle(tilesetID, filter)
}

/**
 * Show or hide a layer (consisting of a data source and layer)
 * layerName - {String} Unique map layer name
 */
MapboxMap.prototype.toggleLayer = function (layerName) {
  const visible = this.map.getLayoutProperty(layerName, 'visibility')

  if (visible !== undefined) {
    const set = (visible === 'none') ? 'visible' : 'none'
    this.map.setLayoutProperty(layerName, 'visibility', set)
  }
}

/**
 * Livelihood zones map fill styles
 */
MapboxMap.prototype.getLegendColorCodes = function () {
  const styles = {
    '1 Aquaculture/Freshwater fisheries mixed with perennial crops and tourism': '#350972',
    '1 Aquaculture/Freshwater fisheries mixed with urban': '#532b8a',
    '1 Aquaculture/Freshwater fisheries mixed with urban and tourism': '#714ea1',
    '1 Aquaculture/Freshwater fisheries mixed with vegetable farming and tourism': '#8f70b9',
    '1 Aquaculture/Freshwater fisheries mixed with vegetables': '#ac92d0',
    '2 Aquaculture/Coastal and freshwater fisheries mixed with urban': '#08306b',
    '2 Aquaculture/Coastal fisheries mixed with freshwater fisheries': '#0a549e',
    '2 Aquaculture/Coastal fisheries mixed with freshwater fisheries and urban': '#2272b5',
    '2 Aquaculture/Coastal fisheries mixed with perennial crops': '#3e8ec4',
    '2 Aquaculture/Coastal fisheries mixed with perennial crops and tourism': '#60a6d2',
    '2 Aquaculture/Coastal fisheries mixed with vegetable farming': '#89bedc',
    '2 Aquaculture/Coastal fisheries mixed with vegetable farming and tourism': '#afd1e7',
    '2 Aquaculture/Coastal fisheries mixed with vegetable farming, mining, and/or tourism': '#cde0f1',
    '3 Irrigated rice mixed with vegetables': '#006400',
    '3 Irrigated rice mixed with vegetables and mining': '#2c8b25',
    '3 Irrigated rice mixed with vegetables and tourism': '#59b24b',
    '3 Irrigated rice mixed with vegetables, mining, and/or tourism': '#85d870',
    '4 Perennial crops mixed with rainfed rice': '#5a7300',
    '4 Rainfed rice mixed with vegetables': '#6e802c',
    '4 Rainfed rice mixed with vegetables and mining': '#788f29',
    '4 Rainfed rice mixed with vegetables and tourism': '#91ab36',
    '4 Rainfed rice mixed with vegetables, mining, and/or tourism': '#aac743',
    '5 Vegetable farming': '#91003f',
    '5 Vegetable farming mixed with mining': '#960d49',
    '5 Vegetable farming mixed with pasture and livestock': '#9a1b53',
    '5 Vegetable farming mixed with pasture,  livestock, and mining': '#9f295d',
    '5 Vegetable farming mixed with perennial crops': '#a33768',
    '5 Vegetable farming mixed with perennial crops and mining': '#a74572',
    '5 Vegetable farming mixed with perennial crops and tourism': '#b06086',
    '5 Vegetable farming mixed with perennial crops, mining, and/or tourism': '#b56e90',
    '5 Vegetable farming mixed with perennial crops, pasture, and tourism': '#be8aa5',
    '5 Vegetable farming mixed with perennial crops, pasture, mining, and/or tourism': '#c298af',
    '5 Vegetable farming mixed with urban and tourism': '#c7a5b9',
    '5 Vegetable farming mixed with urban, mining, and/or tourism': '#c7aabb',
    '5 Vegetables farming mixed with aquaculture/freshwater fisheries': '#c7b3bf',
    '6 Perennial crops': '#722e14',
    '6 Perennial crops mixed with aquaculture/coastal fisheries': '#7b3b21',
    '6 Perennial crops mixed with mining': '#84482e',
    '6 Perennial crops mixed with pasture and livestock': '#8d543b',
    '6 Perennial crops mixed with pasture, livestock, and mining': '#976148',
    '6 Perennial crops mixed with urban and tourism': '#a97b62',
    '6 Perennial crops mixed with urban, mining, and/or tourism': '#b2876e',
    '6 Perennial crops mixed with vegetables': '#b2876e',
    '6 Perennial crops mixed with vegetables and mining': '#bb947b',
    '6 Perennial crops mixed with vegetables and tourism': '#c4a188',
    '6 Perennial crops mixed with vegetables, mining, and/or tourism': '#ceae95',
    '7 Cool environment - Pasture mixed with vegetable farming and tourism': '#d4d400',
    '7 Cool environment - Pasture mixed with vegetable farming, mining, and/or tourism': '#d9d918',
    '7 Cool environment - Perennial crops and tourism': '#dfdf30',
    '7 Cool environment - Vegetable farming': '#e4e448',
    '7 Cool environment - Vegetable farming mixed with irrigated rice': '#eaea61',
    '7 Cool environment - Vegetable farming mixed with mining': '#efef79',
    '7 Cool environment - Vegetable farming mixed with perennial crops': '#f4f491',
    '7 Cool environment - Vegetable farming mixed with urban and tourism': '#fafaa9',
    '8 Pasture mixed with aquaculture/freshwater fisheries': '#585858',
    '8 Pasture mixed with perennial crops': '#666666',
    '8 Pasture mixed with perennial crops and tourism': '#747474',
    '8 Pasture mixed with perennial crops, mining, and/or tourism': '#828282',
    '8 Pasture mixed with urban': '#909090',
    '8 Pasture mixed with urban and mining': '#9e9e9e',
    '8 Pasture mixed with vegetable farming': '#acacac',
    '8 Pasture mixed with vegetable farming and mining': '#bababa',
    '8 Pasture mixed with vegetable farming and tourism': '#c8c8c8',
    '9 Built-up areas - Low Density Rural Cluster': '#67000d',
    '9 Built-up areas - Low Density Rural Cluster with presence of mining': '#a91016',
    '9 Built-up areas - Rural Cluster': '#cc191d',
    '9 Built-up areas - Rural Cluster with presence of mining': '#ea372a',
    '9 Built-up areas - Suburban/Peri-Urban': '#f85d42',
    '9 Built-up areas - Urban Centre': '#fc8161',
    '9 Built-up areas - Urban Centre with presence of mining': '#fca486',
    '9 Built-up areas - Very Low Density Rural Cluster': '#fdc6af',
    '9 Built-up areas - Very Low Density Rural Cluster with presence of mining': '#fee3d6'
  }
  
  return styles
}

/**
 * Add a vector layer from a Tileset
 * layerName - {String} Unique map layer name
 * tilesetName - {String} Mapbox Tileset name
 * tilesetUrl - {String} mapbox Tileset url
 * filter = {Object} feature attribute to show on the layer
 *    filter.expression - {String} mapbox filter equality expression ('in', '==', etc)
 *    filter.key - {String} attribute name
 *    filter.value - {String} attribute value OR
 *    filter.value - {Array} string attribute value(s)
 * attributeNames - {Object} key-value pair of alternate names for feature attributes to display on the pop-up
 *     i.e. { 'ADM2_EN': 'Province', 'ADM3_EN': 'Municipality' }
 */
MapboxMap.prototype.addLayerSource = function (layerName, tilesetName, tilesetUrl, filter, attributeNames) {
  const that = this
  const layerID = `${layerName}-layer`
  this.isLoading = true

  // Remove popups
  this.removePopups()

  // Set the color expression to use on the layer
  const colorExpression = ['match', ['get', 'Legend_2']]

  const styles = this.colorCodes
  Object.keys(styles).forEach((item, index) => {
    colorExpression.push(item, styles[item])
  })

  colorExpression.push('rgb(0, 0, 0)')

  // Build the layer, setting its color styles
  const layer = {
    'id': layerID,
    'type': 'fill', // line
    'source': layerName,
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'fill-outline-color': 'rgba(0,0,0,0.2)',
      'fill-color': colorExpression,
      'fill-opacity': 1.0
    },
    'source-layer': tilesetName
  }

  // Apply filters on the polygons to display
  if (filter) {
    if (filter.expression === '==') {
      layer.filter = ['==', filter.key, filter.value]
    } else if (filter.expression === 'in') {
      layer.filter = ['in', filter.key, ...filter.value]
    }
  }

  // Add the data source on the map if its not yet added
  if (!this.map.getSource(layerName)) {
    this.map.addSource(layerName, {
      type: 'vector',
      url: tilesetUrl
    })

    console.log(layer)
    this.isLoading = true
    this.map.addLayer(layer)

    // Enable click events (display a pop-up message) after the layer and source has loaded
    const time = setInterval(function () {
      const features = that.map.queryRenderedFeatures({ layers: [layerID] })
      if (features) {
        that.features = features

        // NOTE: this is set to false by the global 'sourcedata' event
        // that.isLoading = false

        window.MBL.map.on('click', layerID, function (e) {
          // print all data
          var content = ''
          for (let key in e.features[0].properties) {
            let attr = key
            if (attributeNames) {
              attr = attributeNames[key] ? attributeNames[key] : key
            }

            content += `${attr}: ${e.features[0].properties[key]}`
            content += '<br>'
          }
      
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(content)
            .addTo(this)
        })

        clearInterval(time)
      }
    }, 200)
  } else {
    // Display the layer if its source already exists
    this.toggleLayer(layerID)
    this.setLayerFilter(layerID, filter)
  }
}

/**
 * Display only (1) feature attribute on the map using a filter
 * layerName - {String} Unique map layer name
 * filter = {Object} feature attribute to show on the layer
 *    filter.expression - {String} mapbox filter equality expression ('in', '==', etc)
 *    filter.key - {String} attribute name
 *    filter.value - {String} attribute value OR
 *    filter.value - {Array} string attribute value(s)
 */
MapboxMap.prototype.setLayerFilter = function (layerName, filter) {
  // Remove popups
  this.removePopups()

  // Apply filters on the polygons to display
  let filterExpression = ['==', filter.key, filter.value]
  if (filter.expression === 'in') {
    filterExpression = ['in', filter.key, ...filter.value]
  }

  this.map.setFilter(layerName, filterExpression)
}

/**
 * Apply single or multiple mapbox filters on all declared layers
 * filter - {Array} Mapbox filter expression ('all', 'in', '==', etc)
 */
MapboxMap.prototype.setLayersFilter = function (filter) {
  // Remove popups
  this.removePopups()

  for (let i = 0; i < this.layerNames.length; i += 1) {
    this.map.setFilter(this.layerNames[i], filter)
    this.map.setLayoutProperty(this.layerNames[i], 'visibility', 'visible')
  }
}

/**
 * Hide all pop-ups
 */
MapboxMap.prototype.removePopups = function () {
  const popups = document.getElementsByClassName('mapboxgl-popup')
  for (let i = 0; i < popups.length; i += 1) {
    popups[i].remove()
  }
}

MapboxMap.prototype.resetCenter = function () {
  // this.map.setZoom(5.6)
  this.map.flyTo({
    center: [120.77551644707285, 12.419614853889797],
    zoom: 5.6
    // bearing: 0,
    // speed: 0.2,
    // curve: 1,
    // easing: function (t) { return t },
    // essential: true
  })

  this.map.fire('flystart')
}

/**
 * Emable or disable mapbox ma controls
 */
MapboxMap.prototype.toggleHandlers = function (enable) {
  const handlers = ['scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate']
  for (let i = 0; i < handlers.length; i += 1) {
    if (enable) {
      this.map[handlers[i]].enable()
    } else {
      this.map[handlers[i]].disable()
    }
  }
}

/**
 * Load multiple mapbox Tilesets as source and add them as layers
 * tilesets - {Object} contains Objects of mapbox tileset definitions
 *    tilesets.SAMPLE_KEY.tilesetID - {String} mapbox Tileset ID
 *    tilesets.SAMPLE_KEY.tilesetUrl - {String} mapbox Tileset URL
 */
MapboxMap.prototype.loadAllTilesets = function (tilesets) {
  // Set the color expression to use on the layer
  const colorExpression = ['match', ['get', 'Legend_2']]
  const styles = this.colorCodes

  Object.keys(styles).forEach((item, index) => {
    colorExpression.push(item, styles[item])
  })

  colorExpression.push('rgb(0, 0, 0)')

  for (let key in tilesets) {
    this.layerNames.push(`${key}-layer`)

    // Build the layer, setting its color styles
    let layer = {
      'id': `${key}-layer`,
      'type': 'fill', // line
      'source': key,
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-outline-color': 'rgba(0,0,0,0.2)',
        'fill-color': colorExpression,
        'fill-opacity': 1.0
      },
      'source-layer': tilesets[key].tilesetID
    }

    this.map.addSource(key, {
      type: 'vector',
      url: tilesets[key].tilesetUrl
    })

    this.map.addLayer(layer)
  }
}

/**
 * Check if all Tileset data sources defined during loadAllTilesets() already exist
 */
MapboxMap.prototype.sourcesExist = function () {
  if (this.layerNames.length === 0) {
    return false
  }

  let count = 0
  for (let i = 0; i < this.layerNames.length; i += 1) {
    const source = this.layerNames[i].substr(0, this.layerNames[i].lastIndexOf('-'))
    if (this.map.getSource(source)) {
      count += 1
    }
  }

  console.log(`--count: ${count}, layernames: ${this.layerNames.length}`)
  return (count === this.layerNames.length)
}
