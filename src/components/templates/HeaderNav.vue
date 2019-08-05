<template lang="pug">
  b-jumbotron(fluid)
    b-row(class="header-row" style="display: flex; flex-direction: row; justify-content: space-between; flex-wrap: wrap;")
      div
        div(class="logo-amia")
          img(src="../../assets/logo-amia.png")
        div(class="main-title")
          h1 AMIA-CIAT
          h2 Adaptation and Mitigation <br> Initiative in Agriculture
          h2(class="header-title") Knowledge Hub Portal
      div(style="float: right; margin-top: 1%;")
        img(src="../../assets/logos/logo-ciat-02.png" style="width: 110%;")
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>
