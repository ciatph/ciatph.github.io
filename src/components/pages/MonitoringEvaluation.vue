<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Monitoring and Evaluation: Systematizing Outcome Evidence for Climate-Resilient Agri-fisheries Communities, Services, and Institutions
      h4(class="subtitle-normal") “AMIA envisions to achieve outcomes at scale by promoting the proven CRA practices and enhancing access to support services. An M&E system can help in decision-making, learning, and scaling of the intervention like CRA.”

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
import {iconData} from '@/defines/iconmaps/thumbnails-me'
export default {
  name: 'MonitoringEvaluation',
  mixins: [firebaseMixin],
  components: {
    LoadingIndicator,
    ThumbnailsGallery
  },
  data () {
    return {
      thumbnailData: null
    }
  },

  async created () {
    try {
      let links = await this.mFirebaseGetURLS('josh/Indicator Factsheet')
      this.thumbnailData = await this.mFirebaseUpdateDownloadLink(iconData, links)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
