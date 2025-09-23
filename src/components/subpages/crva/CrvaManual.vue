<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Climate Risk and Vulnerability Assessment (CRVA) - Manual
      b-breadcrumb(:items="items")
      br
      h4(class="subtitle-normal")  “Climate risks pose a major threat to sustaining the productivity of the agri-fisheries sector. CRVA aims to support regional targeting and planning for AMIA. This also addresses the inherent spatial and temporal variabilities within and across AMIA sites.”

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
import {iconData} from '@/defines/iconmaps/thumbnails-sub-crva-manual'
export default {
  name: 'CrvaManual',
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
          text: 'CRVA',
          to: { name: 'crva' }
        },
        {
          text: 'CRVA Manual',
          href: '/crva/manual',
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
