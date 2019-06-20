<template lang="pug">
  div(id="app")
    header-navbar
    <router-view/>
    footer-view
</template>

<script>
import HeaderNavbar from '@/components/templates/NavigationBar'
import FooterView from '@/components/templates/Footer'
import { GITHUB_PROJECTS, EXTERNAL_PROJ_URL } from '@/defines/constants'

export default {
  name: 'App',

  components: {
    HeaderNavbar,
    FooterView
  },

  mounted () {
    if (GITHUB_PROJECTS.indexOf(window.location.pathname.replace('/', '')) >= 0) {
      window.location = EXTERNAL_PROJ_URL + window.location.pathname
    }
  }
}
</script>

<style>
  #app {
    background-color: #fff;
    width: 100%;
  }
</style>
