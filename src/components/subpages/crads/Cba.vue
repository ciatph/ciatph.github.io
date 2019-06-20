<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Cost-Benefit Analysis (CBA) of CRA Practices
      b-breadcrumb(:items="items")
      br
      h4(class="subtitle-normal") “CBA to help analyze and recommend prioritized CRA options for evidence-informed investment planning and decision-making by key stakeholders.”

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
  name: 'Cba',
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
          text: 'Cost-Benefit Analysis (CBA) of CRA Practices',
          href: '/crads/cba',
          active: true
        }
      ]
    }
  },

  created () {
    this.$http.get('/static/data/thumbnails-sub-cracba.json')
      .then((result) => {
        this.thumbnailData = result.data
      })
      .catch((error) => {
        console.log('error! ' + error)
      })
  }
}
</script>
