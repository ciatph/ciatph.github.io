// Mapbox map
// requires mapboxgl js
// Manages layers from a mapbox Tileset data source

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

  // Flag if a vector data source is loading
  // TO-DO: Listen for mapbox events
  this.isLoading = true
}

/**
 * mapContainer - {String} html div DOM container for the map
 * style - {String} mapbox style url
 * zoom - {Number} map zoom
 * center - {Array} [lat, lan] map center
 */
MapboxMap.prototype.initMap = function ({ mapContainer = 'map', style, zoom = 5.0, center = [122.016, 12.127], sourceLayer}) {
  if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL')
    return
  }

  // Set the mapbox public access token
  mapboxgl.accessToken = this.accessToken

  // Set the Style's source layer name
  this.sourceLayer = sourceLayer

  // Layer definitions. Should have a source added via addSource
  this.layers = {}

  // Create a new mapbox map
  this.map = new mapboxgl.Map({
    container: mapContainer,
    style, 
    zoom,
    center: center
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

  // Disable map controls
  this.toggleHandlers(false)

  // Listen for basemap loading events
  const that = this

  this.map.on('load', function() {
    console.log('---basemap loaded')
    that.toggleHandlers(true)
    that.isLoading = false
  })

  /* Detects if a source data has loaded. Override this method on vue component
  this.map.on('sourcedata', function(e) {
    if (e.isSourceLoaded) {
      console.log('---vector loaded')
      if (e.sourceId !== 'composite') {
        that.features = that.map.queryRenderedFeatures({layers: [`${e.sourceId}-layer`] })
        console.log(`--loaded vector length: ${that.features.length}`)
      }
      that.isLoading = false
    }
  })
  */
} 

/**
 * Change the map Style (layer)
 */
MapboxMap.prototype.loadStyle = function (styleUrl, tilesetID, filter) {
  // this.map.setStyle(`mapbox://styles/ciatph02/${styles[0]}`)
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
    '1 Aquaculture/Freshwater fisheries': '#08306b',
    '1 Aquaculture/Freshwater fisheries mixed with coconuts, banana, mango, etc.': '#1c6cb1',
    '1 Aquaculture/Freshwater fisheries mixed with coconuts, banana, mango, etc., and mining and/or touri': '#529dcc',
    '1 Aquaculture/Freshwater fisheries mixed with urban and mining and/or tourism': '#9ac8e1',
    '1 Aquaculture/Freshwater fisheries mixed with vegetable farming, mining and/or tourism': '#d1e3f3',
    '1 Aquaculture/Freshwater fisheries mixed with vegetables': '#f7fbff',
    '2 Aquaculture/Coastal fisheries mixed with coconuts, banana, mango, etc.': '#54278f',
    '2 Aquaculture/Coastal fisheries mixed with coconuts, banana, mango, etc., and mining and/or tourism': '#6f49a0',
    '2 Aquaculture/Coastal fisheries mixed with freshwater fisheries': '#896bb1',
    '2 Aquaculture/Coastal fisheries mixed with freshwater fisheries, urban and/or mining': '#a48ec2',
    '2 Aquaculture/Coastal fisheries mixed with vegetable farming': '#bfb0d3',
    '2 Aquaculture/Coastal fisheries mixed with vegetable farming, and mining and/or tourism': '#dad2e4',
    '3 Irrigated rice mixed with vegetables': '#006400',
    '3 Irrigated rice mixed with vegetables, mining and/or tourism': '#40da0c',
    '4 Coconut, banana, mango, etc. mixed with rainfed rice': '#72746a',
    '4 Coconut, banana, mango, etc. mixed with rainfed rice and mining': '#929f64',
    '4 Rainfed rice mixed with vegetables': '#04c159',
    '4 Rainfed rice mixed with vegetables, mining and tourism': '#71eca9',
    '5 Vegetable farming': '#91003f',
    '5 Vegetable farming mixed with coconut, banana, mango, etc.': '#9c1e56',
    '5 Vegetable farming mixed with coconut, banana, mango, etc. mixed with pasture, mining and/or touris': '#a63d6c',
    '5 Vegetable farming mixed with coconut, banana, mango, etc., and mining and/or tourism': '#b05c83',
    '5 Vegetable farming mixed with pasture and livestock': '#bb7a9a',
    '5 Vegetable farming mixed with urban, mining and/or tourism': '#c599b1',
    '5 Vegetables farming mixed with aquaculture/freshwater fisheries, and mining': '#d0b8c8',
    '6 Coconut, banana, mango, etc. mixed with vegetables, mining and/or tourism': '#792605',
    '6 Coconut, banana, mango, etc. mixed with vegetables': '#8d4425',
    '6 Coconut, banana, mango, etc. mixed with urban, mining and/or tourism': '#a16144',
    '6 Coconut, banana, mango, etc. mixed with pasture and livestock, and mining': '#b47f63',
    '6 Coconut, banana, mango, etc. mixed with pasture and livestock': '#c89c82',
    '6 Coconut, banana, mango, etc. mixed with aquaculture/coastal fisheries': '#dcbaa1',
    '6 Coconut, banana, mango, etc.': '#efd7c0',
    '7 Cool environment - Coconut, banana, mango, etc. and tourism': '#b10026',
    '7 Cool environment - Pasture mixed with vegetable farming, mining and/or tourism': '#e31a1c',
    '7 Cool environment - Vegetable farming': '#fc4e2a',
    '7 Cool environment - Vegetable farming mixed with coconut, banana, mango, etc.': '#fd8d3c',
    '7 Cool environment - Vegetable farming mixed with irrigated rice': '#feb24c',
    '7 Cool environment - Vegetable farming mixed with irrigated rice and mining': '#fed976',
    '7 Cool environment - Vegetable farming mixed with urban, mining and/or tourism': '#ffffb2',
    '8 Pasture mixed with aquaculture/freshwater fisheries, and mining': '#050505',
    '8 Pasture mixed with Coconut, banana, mango, etc.': '#363636',
    '8 Pasture mixed with Coconut, banana, mango, etc. and tourism': '#676767',
    '8 Pasture mixed with urban and mining': '#989898',
    '8 Pasture mixed with vegetable farming': '#c9c9c9',
    '8 Pasture mixed with vegetable farming, and tourism': '#fafafa',
    '9 Built-up areas': '#ffff00'
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
 */
MapboxMap.prototype.addLayerSource = function (layerName, tilesetName, tilesetUrl, filter) {
  const that = this
  const layerID = `${layerName}-layer`
  this.isLoading = true

  // Remove popups
  this.removePopups()

  // Set the color expression to use on the layer
  const colorExpression = ['match', ['get', 'Legend_v2']]

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
    "paint": {
      "fill-outline-color": "rgba(0,0,0,1.0)",
      "fill-color": colorExpression,
      "fill-opacity": 1.0,
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
    const that = this
    const time = setInterval(function() {
      const features = that.map.queryRenderedFeatures({layers: [layerID] })
      if (features) {
        that.features = features

        // NOTE: this is set to false by the global 'sourcedata' event
        // that.isLoading = false

        window.MBL.map.on('click', layerID, function(e) {
          // print all data
          var content = ""
          for(key in e.features[0].properties){
            content += `${key}: ${e.features[0].properties[key]}`
            content += "<br>"
          }
      
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(content)
            .addTo(this)
        })

        clearInterval(time)
      }
    }, 200)
    /*
    this.map.on('load', function(e) {
      console.log('---DONE!!!')
    })
    */
  } else {
    // Display the layer if its source already exists
    this.toggleLayer(layerID)
    this.setLayerFilter(layerID, filter)
  }
}

/**
 * Display only (1) feature attribute on the map
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

MapboxMap.prototype.removePopups = function () {
  const popups = document.getElementsByClassName('mapboxgl-popup')
  for (let i = 0; i < popups.length; i += 1) {
    popups[i].remove()
  }
}

MapboxMap.prototype.resetCenter = function () {
  this.map.setZoom(5)
  this.map.flyTo({
    center: [122.016, 12.127]
  })
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