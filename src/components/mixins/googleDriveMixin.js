import {
  FILE_ACTION,
  GOOGLE_DRIVE_DOWNLOAD_URL,
  GOOGLE_DRIVE_PREVIEW_URL
} from '@/defines/constants'

export default {
  methods: {
    /**
     * Returns a valid Google Drive URL for file preview or download
     * @param {string} fileId - Google Drive unique file ID
     * @param {string} action - Action to do with the file, one of `FILE_ACTION`
     * @returns {string} Google drive download or preview URL
     */
    getGoogleDriveURL (fileId = '', action = FILE_ACTION.DOWONLOAD) {
      return (action === FILE_ACTION.DOWONLOAD)
        ? GOOGLE_DRIVE_DOWNLOAD_URL.replace('{FILE_ID}', fileId)
        : GOOGLE_DRIVE_PREVIEW_URL.replace('{FILE_ID}', fileId)
    },

    /**
     * Updates the downloadURLs with current Cloudinary download URLs
     * @param {object[]} original an array of Objects containing `iconmaps` document data
     *    eg., `{ title, description, img, link, external }`
     * @returns {object[]} Modified `original[]` data with `link` fields replaced by full Cloudinary downloadURL
     */
    mGoogleDriveUpdateDownloadLink (original = []) {
      original.forEach((item) => {
        if (!item.googleDriveId) return
        item.link = this.getGoogleDriveURL(item.googleDriveId, FILE_ACTION.VIEW)
        item.google = this.getGoogleDriveURL(item.googleDriveId, FILE_ACTION.DOWONLOAD)
      })

      return original
    }
  }
}
