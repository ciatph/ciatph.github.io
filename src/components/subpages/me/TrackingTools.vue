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
import firebaseMixin from '@/components/mixins/firebaseMixin'
import {iconData} from '@/defines/iconmaps/thumbnails-sub-me-tools'
export default {
  name: 'TrackingTools',
  mixins: [firebaseMixin],
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
      let links = await this.mFirebaseGetURLS('josh/Tracking Tools')
      iconData[0].content = await this.mFirebaseUpdateDownloadLink(iconData[0].content, links)
      iconData[1].content = await this.mFirebaseUpdateDownloadLink(iconData[1].content, links)
      this.thumbnailData = await this.mFirebaseUpdateDownloadLink(iconData, links)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
