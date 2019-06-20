<template lang="pug">
  div
    // map GUI
    crva-map()
    // Content - CRVA maps overview
    b-container#crvamaps(fluid class="container-fluid-custom text-center content-area-text")
      b-row
        b-col(sm="3")
        b-col(sm="6" class="content-area-text")
          h2 CRVA Maps Overview
          p(class="wp-content") Climate change and variability continue to exert increasing pressure upon the agricultural sector of the Philippines. Therefore it is vital to identify and prioritise at a high, municipal-level resolution and relevant crops that are most vulnerable to climate risk. Under the umbrella of the Department of Agriculture project the "Adaptation and Mitigation Initiative in Agriculture" (AMIA), a climate risk vulnerability assessment (CRVA) for 10 selected provinces in the Philippines. The figure below shows the framework used for CRVA and the operational definition of the three key components for the agricultural sector:
          br
          br
          img(src="../../assets/maps/crva-framework.png" width="100%")
        b-col(sm="3")
    // Content - Hazard Index
    b-container#hazard(fluid class="container-fluid-custom text-center content-area-text bg-greylight")
      b-row(class="content-text")
        b-col(sm="3")
        b-col(sm="6" class="content-area-text")
          h2 Hazard Index
          p(class="wp-content") A combination of climate-related natural hazard dataset has been used to estimate by which different municipalities are under pressure from climate variability and extremes. The development of an exposure index relies on spatially-weighted combination of different historical climate-related natural hazards in the Philippines that are open-sourced data or developed by partner institutions, such as the Department of Agriculture (DA). Eight (8) hazards were identified for the Philippines, and these are typhoon, flood, drought, erosion, landslide, storm surge, saltwater intrusion, and sea level rise. Figure below shows the degree each municipalities in target are exposed to hazards provinces. Higher index means that hazards have both 1) multiple geographical overlap and 2) wider geographic coverage.
          br
          br
          img(src="../../assets/maps/hazard-index-lowres.png" width="100%")
          div(class="download-link")
            span(class="glyphicon glyphicon-download glyph-black")
              a(href="https://firebasestorage.googleapis.com/v0/b/ciat-pdfstorage.appspot.com/o/crva%2Fmaps%2Fhi-res%2FHazard%20Index.png?alt=media&token=9fbd7b4a-24c2-4643-8e82-844be860633c" target="blank") [download high-resolution image]
        b-col(sm="3")
    // Content - Adaptive Capacity
    b-container#hazard(fluid class="container-fluid-custom text-center content-area-text")
      b-row(class="content-text")
        b-col(sm="3")
        b-col(sm="6" class="content-area-text")
          h2 Adaptive Capacity
          p(class="wp-content") Adaptive capacity forms one of the three pillars of the vulnerability assessment in addition to exposure and sensitivity to climate change. At the same time it is also one of the three components when measuring resilience, in addition to absorptive coping capacity and transformative capacity. Both are integrated concepts in a coupled human-environment system (Lei et al. 2014).
          br
          br
          img(src="../../assets/maps/adaptive-capacity-lowres.png" width="100%")
          div(class="download-link")
            a(href="https://firebasestorage.googleapis.com/v0/b/ciat-pdfstorage.appspot.com/o/crva%2Fmaps%2Fhi-res%2FAdaptive%20Capacity.png?alt=media&token=7766e5f7-f53a-4cb0-9e25-c6b0f980f514" target="blank") [download high-resolution image]
        b-col(sm="3")
      // Content - Vulnerability
    b-container#vulnerability(fluid class="container-fluid-custom text-center content-area-text bg-greylight")
      b-row(class="content-text")
        b-col(sm="3")
        b-col(sm="6" class="content-area-text")
          h2 Vulnerability
          p(class="wp-content") The final climate risk vulnerability map for the year 2050 is an integration of the exposure, sensitivity and adaptive capacity components. The weighting of each of these indicators was discussed during expert workshops and resulted in 15% for exposure, 15% for sensitivity and 70% for adaptive.
          br
          br
          img(src="../../assets/maps/vulnerability-lowres.png" width="100%")
          div(class="download-link")
            a(href="https://firebasestorage.googleapis.com/v0/b/ciat-pdfstorage.appspot.com/o/crva%2Fmaps%2Fhi-res%2FVulnerability.png?alt=media&token=49d32483-21ad-433f-a56f-196d784e9d58" target="_blank") [download high-resolution image]
        b-col(sm="3")
      // Content - Sensitivity (4 crops maps)
    b-container#vulnerability(fluid class="container-fluid-custom text-center content-area-text")
      b-row(class="content-text")
        b-col(sm="3")
        b-col(sm="6" class="content-area-text")
          h2 Sensitivity Index
          p(class="wp-content") The crop sensitivity was assessed by changes in climatic suitability to grow crops by the year 2050 in comparison with the baseline crop suitability. The sensitivity (changes in climatic suitability) of crops to climate change was derived from changes in temperature and precipitation using the ensemble of 33 GCM models. For baseline condition, the climate data was acquired from www.worldclim.org.  The Maximum entropy (Maxent) model to perform crop suitability analysis. Twenty (20) Bioclimatic variables (http://www.worldclim.org/bioclim + Number of consecutive dry days) was used to assess crop suitability in baseline vs future conditions. The modeled crops includes Rice, Maize/Corn, Vegetables (Squash, Eggplant, Tomato), and Integrated Farming (Cacao, Coffee, Mango Banana). Higher losses of crop suitability are projected to occur in low-lying areas (0-500m ASL) in the Philippines. However, there are also opportunity areas, especially in Mindanao areas, that are projected to become more beneficial for some commodities.
        b-col(sm="3")
      // Images
      b-row(class="text-center")
        b-col(sm="3")
        // Integrated Farming
        b-col(sm="3")
          div(class="thumbnail-maps")
            img(src="../../assets/maps/if-trees-sens2050-v2-lowres.png" alt="CRVA factsheet")
            p
              strong Integrated Farming
            p
              a(href="https://firebasestorage.googleapis.com/v0/b/ciat-pdfstorage.appspot.com/o/crva%2Fmaps%2Fhi-res%2FIF_Trees_sens2050_v2.png?alt=media&token=4b77f020-5603-41ea-97fd-5aceca4cd1ba" target="_blank" class="download-link") [download high-resolution image]
        // Rice
        b-col(sm="3")
          div(class="thumbnail-maps")
            img(src="../../assets/maps/rice-sens2050-v2-lowres.png" alt="Rice")
            p
              strong Rice
            p
              a(href="https://firebasestorage.googleapis.com/v0/b/ciat-pdfstorage.appspot.com/o/crva%2Fmaps%2Fhi-res%2FRice_sens2050_v2.png?alt=media&token=8e3c07ee-eea9-4057-aca1-81f7656151f4" target="_blank" class="download-link") [download high-resolution image]
        b-col(sm="3")
      // Images (maize, vegetables)
      b-row(class="text-center")
        b-col(sm="3")
        // Maize
        b-col(sm="3")
          div(class="thumbnail-maps")
            img(src="../../assets/maps/maize-sens2050-v2-lowres.png" alt="Maize")
            p
              strong Maize
            p
              a(href="https://firebasestorage.googleapis.com/v0/b/ciat-pdfstorage.appspot.com/o/crva%2Fmaps%2Fhi-res%2FMaize_sens2050_v2.png?alt=media&token=91774af7-316b-40ad-9681-eb93f77ddeb9" target="_blank" class="download-link") [download high-resolution image]
        // Vegetables
        b-col(sm="3")
          div(class="thumbnail-maps")
            img(src="../../assets/maps/vegetables-sens2050-v2-lowres.png" alt="Vegetables")
            p
              strong Rice
            p
              a(href="https://firebasestorage.googleapis.com/v0/b/ciat-pdfstorage.appspot.com/o/crva%2Fmaps%2Fhi-res%2FRice_sens2050_v2.png?alt=media&token=8e3c07ee-eea9-4057-aca1-81f7656151f4" target="_blank" class="download-link") [download high-resolution image]
        b-col(sm="3")
</template>

<script>
import CrvaMap from '@/components/widgets/CrvaMap'

export default {
  name: 'Maps',
  components: {
    CrvaMap
  }
}
</script>
