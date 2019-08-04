<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 CRA Country Profile
      b-breadcrumb(:items="items")
      br
      h4(class="subtitle-normal") “Country-wide status of CRA approaches and initiatives, including potential entry points for CRA out-scaling in target agri-fisheries communities.”

      loading-indicator(
        v-if="thumbnailData === null")

      thumbnails-gallery(
        v-else
        :thumbnailData="thumbnailData"
        :firebaseStoragePath="storagePath")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
import {iconData} from '@/defines/iconmaps/thumbnails-sub-craprofile'

export default {
  name: 'CraCountryProfile',
  components: {
    LoadingIndicator,
    ThumbnailsGallery
  },
  data () {
    return {
      thumbnailData: null,
      storagePath: 'yula/CRA Investment Briefs',
      items: [
        {
          text: 'CRA-DS',
          to: { name: 'crads' }
        },
        {
          text: 'CRA Country Profile',
          href: '/crads/cra',
          active: true
        }
      ]
    }
  },

  created () {
    this.thumbnailData = iconData
  },

  methods: {

  }
}
</script>
