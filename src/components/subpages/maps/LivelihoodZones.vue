<template lang="pug">
  div
    // map GUI
    notification-internet-explorer(v-if="isIE")
    livelihood-zones-map(v-else)

    // Content - CRVA maps overview
    b-container#crvamaps(fluid class="container-fluid-custom text-center content-area-text")
      b-row
        b-col(sm="3")
        b-col(sm="6" class="content-area-text")
          h2 Livelihood Zones Web Map
        b-col(sm="3")
</template>

<script>
import LivelihoodZonesMap from '@/components/widgets/LivelihoodZonesMap'
import NotificationInternetExplorer from '@/components/templates/NotificationInternetExplorer'
import utils from '@/components/mixins/utils'

export default {
  name: 'LivelihoodZones',

  data () {
    return {
      isIE: false
    }
  },

  components: {
    LivelihoodZonesMap,
    NotificationInternetExplorer
  },

  mixins: [utils],

  mounted () {
    this.isIE = this.isInternetExplorer()
  }
}
</script>
