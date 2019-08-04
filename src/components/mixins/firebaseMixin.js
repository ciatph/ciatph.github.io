export default {
  methods: {
    /**
     * Recursively list all firebase storage subdirectories and items (in the chrome console)
     * @param {Firebase Storage Reference} folderRef
     * @param {Array} stack
     * @param {Array} data
     */
    async mFirebaseListAll (folderRef, stack, data) {
      return new Promise((resolve, reject) => {
        folderRef.listAll().then((res) => {
          if (stack.indexOf(folderRef.fullPath) >= 0) {
            stack.splice(stack.indexOf(folderRef.fullPath), 1)
            console.log('--removing ' + folderRef.fullPath)
          }

          // items
          if (res.items.length > 0) {
            data[folderRef.fullPath] = {items: []}
            res.items.forEach((itemRef) => {
              data[folderRef.fullPath].items.push(itemRef.name)
            })
          }

          // sub folders
          res.prefixes.forEach((folder) => {
            stack.push(folder.fullPath)
            this.mFirebaseListAll(folder, stack, data)
          })

          if (stack.length === 0) {
            console.log('END')
            console.log(data)
            resolve(data)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },

    /**
     * Get the firebase storage download url for specified storage children
     * @param {Array} storageItems an Array of Objects that following the format {file: "", link:""}
     *    where file: firebase storage file's filename
     *    where link: full firebase storage path for the file
     * @returns {Object} {filename:[], dl:[]} an object that contains parallel maps of filenames and firebase download URLs
     */
    async mFirebaseGetDownloadLink (storageItems) {
      return new Promise((resolve, reject) => {
        let filename = []
        let dl = []
        storageItems.forEach((item) => {
          this.$firebaseStorageRef.child(item.link).getDownloadURL().then((url) => {
            filename.push(item.file)
            dl.push(url)
            if (filename.length === 10) {
              resolve({filename, dl})
            }
          }).catch((error) => {
            throw new Error('Error listing down load url: ' + error)
          })
        })
      })
    },

    /**
     * List all items under a firebase storage directory and find their current firebase storage download URLs
     * Works on a 1-level folder-items structure only; inner subdirectories and items won't be included
     * @param {Firebase Storage Reference} folderRef
     * @param {Array} data
     */
    async mFirebaseList (folderRef, data) {
      let a = await new Promise((resolve, reject) => {
        folderRef.listAll().then((res) => {
          // items
          if (res.items.length > 0) {
            data[folderRef.fullPath] = {items: []}
            res.items.forEach((itemRef) => {
              data.push({
                file: itemRef.name,
                link: folderRef.fullPath + '/' + itemRef.name
              })
            })
          }
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })

      return this.mFirebaseGetDownloadLink(a)
    },

    /**
     * Get the current download URLs of items from a specified firebase storage directory
     * @param {String} rootFolder firebase storage directory (or subdirectory)
     */
    async mFirebaseGetURLS (rootFolder) {
      // Root reference
      let listRef = this.$firebaseStorageRef.child(rootFolder)
      return this.mFirebaseList(listRef, [])
    },

    /**
     * Update the downloadURLs with current firebase storage download URLs
     * @param {Object} original a Javascript Object following the format {filename:[], dl:[]}
     *    where filename: an Array of filenames
     *    where dl
     * @param {Array} newLinks
     */
    async mFirebaseUpdateDownloadLink (original, newLinks) {
      original.forEach((item, index) => {
        if (newLinks.filename.indexOf(item.link) >= 0) {
          console.log('found! ' + item.link + ' at index ' + index)
          item.link = newLinks.dl[index]
        }
      })

      return original
    }
  }
}
