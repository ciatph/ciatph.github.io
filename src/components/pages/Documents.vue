<template lang="pug">
  b-container(fluid class="container-fluid-custom bg-greylight")
    b-container(class="text-center")
      h2 Documents
      h4 Downloadable documents of our outputs

      loading-indicator(
        v-if="thumbnailData === null")

      b-row(class="text-center thumbnail-container")
        div(
          class="col-lg-3 col-sm-6 mb-4"
          v-for="item in thumbnailData")
          div(class="card h-100 thumbnail")
            img(v-lazy="require(`@/assets/thumbnails/${item.img}.png`)"
            class="card-img-top" alt="Image")
            div(class="card-body")
              h4(class="card-title") {{ item.title }}
              p(class="card-text") {{ item.description }}
            div(class="card-footer")
              b-button(:href="item.link") Read More
</template>

<script>
import LoadingIndicator from '@/components/templates/LoadingIndicator'
export default {
  name: 'Documents',
  components: {
    LoadingIndicator
  },
  data () {
    return {
      thumbnailData: null
    }
  },

  created () {
    this.$http.get('/static/data/thumbnails-documents.json')
      .then((result) => {
        this.thumbnailData = result.data
      })
      .catch((error) => {
        console.log('error! ' + error)
      })
  }
}
</script>
