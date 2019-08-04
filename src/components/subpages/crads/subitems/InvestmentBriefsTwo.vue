<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 AMIA Phase 2 - CRA Investment Briefs
      b-breadcrumb(:items="items")
      br
      div(class="subtitle-center")
        h4(class="subtitle-normal")  “Investment Briefs present a visual comparison of farm scenarios with CRA and without CRA coupled with indicators of profitability and estimates of investment requirements”

      loading-indicator(
        v-if="thumbnailData === null")

      thumbnails-gallery(
        v-else
        :thumbnailData="thumbnailData")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
import firebaseMixin from '@/components/mixins/firebaseMixin'
import {iconData} from '@/defines/iconmaps/thumbnails-sub-cracba-investment2'
export default {
  name: 'InvestmentBriefsTwo',
  mixins: [firebaseMixin],

  components: {
    ThumbnailsGallery,
    LoadingIndicator
  },

  data () {
    return {
      thumbnailData: null,
      storagePath: 'yula/CRA Investment Briefs',
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
          text: 'CRA Investment Briefs - AMIA Phase 2',
          active: true
        }
      ]
    }
  },

  async created () {
    try {
      let links = await this.mFirebaseGetURLS(this.storagePath)
      this.thumbnailData = await this.mFirebaseUpdateDownloadLink(iconData, links)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
