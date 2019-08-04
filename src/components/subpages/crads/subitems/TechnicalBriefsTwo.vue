<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 AMIA Phase 2 - CRA Technical Briefs
      b-breadcrumb(:items="items")
      br
      div(class="subtitle")
        h4(style="font-style: italic; color: #00802b;") Highlight the potential of CRA practices for climate change adaptation and mitigation and outline the benefits of adopting CRA practices over conventional non-CRA measures. Technical Briefs present information on:
        ul
          li Initial investment and material requirements, estimated annual production costs and indicators of profitability and feasibility
          li Targeted recommendations and evidence-based reasons to invest, along with site-specific recommendations such as timing of planting, suitable areas, and favourable conditions for CRA adoption.
          li Roles of stakeholders and institutions as well as the technical support that farmers need to scale out CRA

      loading-indicator(
        v-if="thumbnailData === null")

      thumbnails-gallery(
        v-else
        :thumbnailData="thumbnailData")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
import {iconData} from '@/defines/iconmaps/thumbnails-sub-cracba-technical2'
export default {
  name: 'TechnicalBriefsTwo',
  components: {
    LoadingIndicator,
    ThumbnailsGallery
  },
  data () {
    return {
      thumbnailData: null,
      items: [
        {
          text: 'CRA-DS',
          to: { name: 'crads' }
        },
        {
          text: 'Cost-Benefit Analysis (CBA) of CRA Practices',
          to: { name: 'cba' }
        },
        {
          text: 'CRA Technical Briefs - AMIA Phase 2',
          active: true
        }
      ]
    }
  },

  created () {
    this.thumbnailData = iconData
  }
}
</script>
