<template lang="pug">
  // Mapbox GUI
  div(id="map" ref="map")
    div(class="map-overlay" style="margin-top: 60px; margin-left: 2%;")
      div(class="map-overlay-inner")
        h3 Legend
        ul(class="legend" style="list-style: none;")
          li
            span(class="glyphicon glyphicon-stop glyph-va-verylow")
            span  - Very Low
          li
            span(class="glyphicon glyphicon-stop glyph-va-low")
            span  - Low
          li
            span(class="glyphicon glyphicon-stop glyph-va-moderate")
            span  - Moderate
          li
            span(class="glyphicon glyphicon-stop glyph-va-high")
            span  - High
          li
            span(class="glyphicon glyphicon-stop glyph-va-veryhigh")
            span  - Very High
</template>

<script>
export default {
  name: 'CrvaMap',
  mounted () {
    window.MB.initMap()
    this.$refs.map.getElementsByClassName('mapboxgl-canvas')[0].style.position = 'relative'
  }
}
</script>
