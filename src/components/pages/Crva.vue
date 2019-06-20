<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Climate Risk and Vulnerability Assessment (CRVA)
      i
        h4 This page is under maintenance

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
  name: 'Crva',
  components: {
    LoadingIndicator,
    ThumbnailsGallery
  },
  data () {
    return {
      thumbnailData: null
    }
  },

  created () {
    this.$http.get('/static/data/thumbnails-crva.json')
      .then((result) => {
        this.thumbnailData = result.data
      })
      .catch((error) => {
        console.log('error! ' + error)
      })
  }
}
</script>
