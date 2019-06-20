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
export default {
  name: 'TrackingTools',
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

  mounted () {
    this.$http.get('/static/data/thumbnails-sub-me-tools.json')
      .then((result) => {
        this.thumbnailData = result.data
        console.log(this.thumbnailData)
      })
      .catch((error) => {
        console.log('error! ' + error)
      })
  }
}
</script>
