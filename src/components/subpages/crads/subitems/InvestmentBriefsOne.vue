<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 AMIA Phase 1 - CRA Investment Briefs
      b-breadcrumb(:items="items")
      br
      div(class="subtitle-center")
        h4 “Highlight the potential of CRA practices for climate change adaptation and mitigation and present the economic feasibility of adopting CRA.”

      loading-indicator(
        v-if="thumbnailData === null")

      thumbnails-gallery(
        v-else
        :thumbnailData="thumbnailData")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
export default {
  name: 'InvestmentBriefsOne',

  components: {
    ThumbnailsGallery,
    LoadingIndicator
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
          text: 'CRA Investment Briefs - AMIA Phase 1',
          active: true
        }
      ]
    }
  },

  created () {
    this.$http.get('/static/data/thumbnails-sub-cracba-investment1.json')
      .then((result) => {
        this.thumbnailData = result.data
      })
      .catch((error) => {
        console.log('error! ' + error)
      })
  }
}
</script>
