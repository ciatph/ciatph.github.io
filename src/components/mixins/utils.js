export default {
  methods: {
    isInternetExplorer () {
      if (navigator !== undefined && navigator.userAgent !== undefined) {
        let uaString = navigator.userAgent
        const match = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(uaString)
        return match
      }
    }
  }
}
