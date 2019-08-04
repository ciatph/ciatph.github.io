<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Climate Risk Profiles
      b-breadcrumb(:items="items")
      br
      h4(class="subtitle-normal") “Climate Risk Profiles define value chains, farming systems and geographic areas which are highly sensitive and exposed to climate factors, and then assess the programmatic interventions and institutional capacity to deliver adaptation options to help farmers cope with climate risks and vulnerabilities.”

      loading-indicator(
        v-if="thumbnailData === null")

      thumbnails-gallery(
        v-else
        :thumbnailData="thumbnailData")
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import ThumbnailsGallery from '@/components/templates/ThumbnailsGallery'
import firebaseMixin from '@/components/mixins/firebaseMixin'
import {iconData} from '@/defines/iconmaps/thumbnails-sub-crariskprofile'
export default {
  name: 'ClimateRiskProfiles',
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
          text: 'CRA-DS',
          to: { name: 'crads' }
        },
        {
          text: 'Climate Risk Profiles',
          href: '/crp',
          active: true
        }
      ]
    }
  },

  async created () {
    try {
      let links = await this.mFirebaseGetURLS('yula/CRP Poster')
      this.thumbnailData = await this.mFirebaseUpdateDownloadLink(iconData, links)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
