<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Climate Risk and Vulnerability Assessment (CRVA)
      i
        h4(class="subtitle-normal") “Climate risks pose a major threat to sustaining the productivity of the agri-fisheries sector. CRVA aims to support regional targeting and planning for AMIA. This also addresses the inherent spatial and temporal variabilities within and across AMIA sites.”

      loading-indicator(
        v-if="thumbnailData === null")

      thumbnails-gallery(
        v-else
        :thumbnailData="thumbnailData")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
import cloudinaryMixin from '@/components/mixins/cloudinaryMixin'
import {iconData} from '@/defines/iconmaps/thumbnails-crva'
export default {
  name: 'Crva',
  mixins: [cloudinaryMixin],
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
      // const links = await this.mFirebaseGetURLS('crva')
      this.thumbnailData = this.mCloudinaryUpdateDownloadLink(iconData)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
