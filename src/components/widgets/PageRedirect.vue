<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    loading-indicator

</template>
<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
import { GITHUB_PROJECTS, EXTERNAL_PROJ_URL } from '@/defines/constants'

export default {
  name: 'PageRedirect',
  components: {
    LoadingIndicator
  },

  mounted () {
    if (GITHUB_PROJECTS.indexOf(this.$route.path.replace('/', '')) >= 0) {
      window.location = EXTERNAL_PROJ_URL + this.$route.path
    }
  }
}
</script>
