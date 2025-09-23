import { CLOUDINARY_ASSETS_URL } from '@/defines/constants'

const CLOUDINARY_RAW_FILES = ['xlsx']

export default {
  methods: {
    /**
     * Returns the full Cloudinary download URL of a file
     * @param {string} fileName File name to download
     * @param {boolean} isRawFile - Flag indicating raw file type: uploaded to the Cloudinary `/raw/upload` path
     * @returns
     */
    getCloudinaryDownloadURL (fileName, isRawFile = false) {
      let ASSETS_URL = isRawFile
        ? CLOUDINARY_ASSETS_URL.replace('image', 'raw')
        : CLOUDINARY_ASSETS_URL

      return ASSETS_URL + '/' + fileName
    },

    /**
     * Get the extension name of a file
     * @param {string} fileName - File name
     * @returns {string} extension name of a file
     */
    getFileExtension (fileName) {
      return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)
    },

    /**
     * Updates the downloadURLs with current Cloudinary download URLs
     * @param {object[]} original an array of Objects containing `iconmaps` document data
     *    eg., `{ title, description, img, link, external }`
     * @returns {object[]} Modified `original[]` data with `link` fields replaced by full Cloudinary downloadURL
     */
    mCloudinaryUpdateDownloadLink (original) {
      original.forEach((item) => {
        if (!item.link) return

        // Do not append Cloudinary URL to full URLs
        if (item.link.startsWith('https://')) return

        // Do not append Cloudinary URL if no filename is present
        if (item.link === '#') return

        // Do not append Cloudinary URL to internal links (sub routes)
        if (item.external === 'false') return

        const extension = this.getFileExtension(item.link)
        const isFileRaw = CLOUDINARY_RAW_FILES.includes(extension)

        // Append Cloudinary URL to file name
        item.link = this.getCloudinaryDownloadURL(item.link, isFileRaw)
      })

      return original
    }
  }
}
