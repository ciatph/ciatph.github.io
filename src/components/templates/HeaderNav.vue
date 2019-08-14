<template lang="pug">
  b-jumbotron(fluid)
    b-row(class="header-row")
      div(class="logo-amia")
        img(src="../../assets/logo-amia.png" class="mainlogo-amia")
        br
        img(class="mainlogo-ciat" src="../../assets/logos/logo-ciat-02.png")
      div(class="main-title" style="padding-left: 40px;")
        h1 AMIA-CIAT
        h2 Adaptation and Mitigation <br> Initiative in Agriculture
        h2(class="header-title") Knowledge Hub Portal
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>
