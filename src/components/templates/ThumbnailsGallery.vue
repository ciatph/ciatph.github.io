<template lang="pug">
  b-row(class="text-center thumbnail-container")
    b-col(
      v-if="thumbnailData.length < 4"
      :sm="spacerCount" class="spacer")
    div(
      class="col-lg-3 col-sm-6 mb-4"
      v-for="item, index in thumbnailData")
      div(class="card h-100 thumbnail")
        img(v-lazy="require(`@/assets/thumbnails/${item.img}`)"
        class="card-img-top" style="min-height: 100px;" alt="Image")
        div(class="card-body")
          h4(class="card-title") {{ item.title }}
          p(class="card-text") {{ item.description }}
        div(class="card-footer"
          :ref="index")
          // Internal route to sub-directories
          router-link(
            v-if="item.external === 'false'"
            :to="item.link" tag="b-button") View Documents
          // External links to documents - View + Download options
          div(v-else)
            b-button(
              v-if="isPDF(item.link)"
              :href="item.link" variant="outline-info" size="sm") View
            span &nbsp
            b-button(
              href="#"
              variant="outline-info"
              size="sm"
              @click="downloadFILE(item.link, index)"
              :ref="item.title") Download
              span &nbsp
              b-spinner(
                small
                class="spinner-download")
</template>

<script>
import axios from 'axios'
export default {
  name: 'ThumbnailsGallery',

  props: {
    thumbnailData: {
      type: Array,
      required: true
    }
  },

  computed: {
    spacerCount () {
      let spacer = 0
      if (this.thumbnailData.length === 2) {
        spacer = 3
      }

      if (this.thumbnailData.length === 3) {
        spacer = 2
      }

      return spacer
    }
  },

  methods: {
    forceFileDownload (response, documentName) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', documentName)
      document.body.appendChild(link)
      link.click()
    },

    resetButton (refId) {
      let btn = this.$refs[refId][0].getElementsByClassName('disabled')[0]
      btn.classList.remove('disabled')
      btn.classList.remove('btn-outline-secondary')
      btn.classList.add('btn-success')
      btn.getElementsByClassName('spinner-border')[0].classList.add('spinner-download')
    },

    downloadFILE (url, reference) {
      if (url.search('http') === -1) {
        return
      }

      let btnDownload = this.$refs[reference][0].getElementsByClassName('spinner-download')[0]
      btnDownload.classList.remove('spinner-download')
      btnDownload.parentElement.classList.remove('btn-success')
      btnDownload.parentElement.classList.remove('btn-outline-info')
      btnDownload.parentElement.classList.add('btn-outline-secondary')
      btnDownload.parentElement.classList.add('disabled')
      axios.get(url, {
        responseType: 'blob'
      }).then((response) => {
        let normalUrl = decodeURIComponent(url)
        this.resetButton(reference)
        this.forceFileDownload(response,
          normalUrl.substring(normalUrl.lastIndexOf('/') + 1, normalUrl.indexOf('?')))
      })
        .catch((error) => {
          this.resetButton(reference)
          alert('There was an error downloading the PDF file.\n' + error)
        })
    },

    isPDF (url) {
      return ((url.match(/\.pdf/g) !== undefined) || url[0] === '#')
    }
  },

  mounted () {
    while (document.getElementsByClassName('btn-secondary').length > 0) {
      document.getElementsByClassName('btn-secondary')[0].classList.replace('btn-secondary', 'btn-outline-secondary')
    }
  }
}
</script>
