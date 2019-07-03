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
export default {
  name: 'Strategy',
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

  created () {
    this.$http.get('/static/data/thumbnails-sub-me-strategy.json')
      .then((result) => {
        this.thumbnailData = result.data
      })
      .catch((error) => {
        console.log('error! ' + error)
      })
  }
}
</script>
