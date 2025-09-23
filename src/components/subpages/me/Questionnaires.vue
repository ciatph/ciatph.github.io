<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Questionnaires
      b-breadcrumb(:items="items")

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
import {iconData} from '@/defines/iconmaps/thumbnails-sub-me-questionnaires'
export default {
  name: 'Strategy',
  mixins: [cloudinaryMixin],
  components: {
    LoadingIndicator,
    ThumbnailsGallery
  },
  data () {
    return {
      thumbnailData: null,
      items: [
        {
          text: 'M&E',
          to: { name: 'me' }
        },
        {
          text: 'Questionnaires',
          active: true
        }
      ]
    }
  },

  async created () {
    try {
      this.thumbnailData = this.mCloudinaryUpdateDownloadLink(iconData)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
