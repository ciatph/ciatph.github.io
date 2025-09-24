<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 AMIA M&E Strategy Paper
      b-breadcrumb(:items="items")
      br
      h4(class="subtitle-normal") “A comprehensive guide in the systematization of the collection and use of information towards building an evidence base on climate resilience outcomes and the pathways through which these are achieved.”

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
import {iconData} from '@/defines/iconmaps/thumbnails-sub-me-strategy'
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
          text: 'AMIA M&E Strategy Paper',
          active: true
        }
      ]
    }
  },

  async created () {
    try {
      // const links = await this.mFirebaseGetURLS('M&E/AMIA M&E Strategy paper')
      this.thumbnailData = this.mCloudinaryUpdateDownloadLink(iconData)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
