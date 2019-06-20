<template lang="pug">
  // Use this as a template for styled content inside <router-view>, placed between 
  // <header-navbar> and <footer-view> from App.vue
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-row
      b-col(sm="3")
      b-col(sm="6" class="content-area-text")
        h2 Documents
        h4 Downloadable documents of our outputs

        div
          b-card
            title="Document"
      b-col(sm="3")
</template>

<script>
export default {
  name: 'BlankContentTemplate'
}
</script>
