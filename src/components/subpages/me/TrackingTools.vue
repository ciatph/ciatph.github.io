<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Tracking Tools
      b-breadcrumb(:items="items")

      loading-indicator(
        v-if="thumbnailData === null")

      div(v-if="thumbnailData != null")
        h3(style="margin-top: 70px; margin-bottom: 50px;") {{ thumbnailData[0].name }}
        thumbnails-gallery(
          :thumbnailData="thumbnailData[0].content")

        h3(style="margin-top: 70px; margin-bottom: 50px;") {{ thumbnailData[1].name }}
        thumbnails-gallery(
          :thumbnailData="thumbnailData[1].content")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
import cloudinaryMixin from '@/components/mixins/cloudinaryMixin'
import {iconData} from '@/defines/iconmaps/thumbnails-sub-me-tools'
export default {
  name: 'TrackingTools',
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
          text: 'Tracking Tools',
          active: true
        }
      ]
    }
  },

  async mounted () {
    try {
      iconData[0].content = await this.mCloudinaryUpdateDownloadLink(iconData[0].content)
      iconData[1].content = await this.mCloudinaryUpdateDownloadLink(iconData[1].content)
      this.thumbnailData = this.mCloudinaryUpdateDownloadLink(iconData)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
