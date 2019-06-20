<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 BlankThumbnailsTemplate
      h4 Downloadable documents of our outputs

      b-row(class="text-center thumbnail-container")
        div(
          class="col-lg-3 col-sm-6 mb-4"
          v-for="item in thumbnails"
          :key="item")
          b-card(
            title="BlankThumbnailsTemplate"
            img-src="http://placehold.it/500x325"
            img-alt="Image"
            img-top
            style="max-width: 20rem;"
            class="mb-2")
              b-card-text Draft CRVA factsheet
              b-button(href="#") Read More
</template>

<script>
export default {
  name: 'BlankThumbnailsTemplate',
  data () {
    return {
      thumbnails: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  }
}
</script>
