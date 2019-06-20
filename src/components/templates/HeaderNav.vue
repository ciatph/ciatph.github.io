<template lang="pug">
  b-jumbotron(fluid)
    b-row(style="display: flex; flex-direction: row; justify-content: flex-start; flex-wrap: wrap;")
      div(class="logo-amia")
        img(src="../../assets/logo-amia.png")
      div(class="main-title")
        h1 AMIA-CIAT
        h2 Adaptation and Mitigation <br> Initiative in Agriculture
        h2(class="header-title") Knowledge Hub Portal
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>
