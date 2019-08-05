<template lang="pug">
  div
    header-nav(id="navigationbar" ref="navigationbar")
    b-navbar(
      style="border-bottom: 2px solid #d1e0e0;"
      :class="{'affix': isActive}"
      toggleable="lg"
      type="light"
      ref="bnavbar")
        b-container
          // CIAT Logo
          //a(href="#" class="navbar-brand" style="vertical-align: top;")
          //img(class="logo-ciat" src="../../assets/logo_ciat_up.png" style="padding-top: 0; margin-top: 0;")
          // Collapsed Menu Button
          b-navbar-toggle(target="nav-collapse")
          // Menu Labels
          b-collapse(id="nav-collapse" is-nav style="margin: 8px 0px 8px 0px;")
            b-navbar-nav(class="ml-auto")
              div(v-for="item in mainMenuData")
                // Main Menu - Dropdown Links
                b-nav-item-dropdown(
                  v-if="item.link === '#'"
                  :key="item.title"
                  :text="item.title"
                )
                  div(v-for="subitem in item.children")
                    // SubItem - External Link
                    b-dropdown-item(
                      v-if="subitem.external === 'true'"
                      :key="subitem.title"
                      :href="subitem.link"
                    ) {{ subitem.title }}
                    // SubItem - Internal (Router) Link
                    router-link(
                      v-else
                      :key="subitem.title"
                      :to="subitem.link"
                      tag="b-dropdown-item"
                    ) {{ subitem.title }}
                // Main Menu - Normal Links
                div(
                  v-else
                )
                  b-nav-item(
                    v-if="item.external === 'true'"
                    :key="item.title"
                    :href="item.link"
                  ) {{ item.title }}
                  router-link(
                    v-else
                    :key="item.title"
                    :to="item.link"
                    tag="b-nav-item"
                  ) {{ item.title }}
</template>

<script>
import HeaderNav from '@/components/templates/HeaderNav'
import {menuData} from '@/defines/menumaps/links-mainmenu'

export default {
  name: 'NavigationBar',

  components: {
    HeaderNav
  },

  data () {
    return {
      isActive: false,
      currentClass: 'affix',
      lightBorder: '#d1e0e0',
      darkBorder: '#006622',
      mainMenuData: {}
    }
  },

  methods: {
    handleScroll () {
      const els = document.getElementById('navigationbar')
      const elBottom = els.getBoundingClientRect().bottom
      if (elBottom <= 0 && !this.isActive) {
        this.isActive = true
        this.$refs.bnavbar.style.borderBottom = '2px solid ' + this.darkBorder
      } else if (elBottom > 0 && this.isActive) {
        this.isActive = false
        this.$refs.bnavbar.style.borderBottom = '2px solid ' + this.lightBorder
      }
    }
  },

  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.mainMenuData = menuData
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
