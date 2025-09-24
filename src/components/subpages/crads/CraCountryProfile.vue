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
        :thumbnailData="thumbnailData")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
import cloudinaryMixin from '@/components/mixins/cloudinaryMixin'
import {iconData} from '@/defines/iconmaps/thumbnails-sub-craprofile'

export default {
  name: 'CraCountryProfile',
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

  async created () {
    try {
      // const links = await this.mFirebaseGetURLS('googledocs/key_insights')
      this.thumbnailData = this.mCloudinaryUpdateDownloadLink(iconData)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
