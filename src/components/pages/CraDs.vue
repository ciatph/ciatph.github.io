<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Decision Support Platform for Climate-Resilient Agriculture Investment Prioritization (CRA-DS)
      h4(class="subtitle-normal") “To undertake program-wide intervention planning and resource targeting. Its key decision-makers, field implementation teams, and stakeholders would need to be equipped with readily accessible knowledge and user-friendly tools to support the rollout of CRA practices at scale.”

      loading-indicator(
        v-if="thumbnailData === null")

      thumbnails-gallery(
        v-else
        :thumbnailData="thumbnailData")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
import {iconData} from '@/defines/iconmaps/thumbnails-cra-ds'
export default {
  name: 'CraDs',
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
    this.thumbnailData = iconData
  }
}
</script>
