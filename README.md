# vue-version

> A Vue.js project


## Build Setup

1. install dependencies: <br> `npm install`

2. serve with hot reload at localhost:8080 <br> 
`npm run dev` 

3. build for production with minification. <br> 
`npm run build` <br>
(static build files will be generated in the **/dist** directory)

4. build for production and view the bundle analyzer report <br>
`npm run build --report`


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Deployment to GitHub Pages

1. Checkout a new branch from `master`. <br>
`git checkout -b <NEW_BRANCH_NAME>`

2. Copy the static contents of the **/dist** directory into `<NEW_BRANCH_NAME>`.

3. Depending on the updated static files, you may need to delete  some `.js`, `.map` and `.css` files from **/static/css** or **/static/js**. Make sure that only the contents of */dist* will exist in `<NEW_BRANCH_NAME>`.  

4. Push the new branch `<NEW_BRANCH_NAME>` and create a pull request.

5. Approve the pull request if there are no conflicts.


## Deployment to Firebase Hosting

For testing purposes, the static build files can be optionally uploaded to Firebase hosting prior to deploying on GitHub pages.

1. Login to the firebase cli as `ciat.ph06`.

2. Run `firebase init`.
	-  *Are you ready to proceed?* - choose **Y**
	- *Which Firebase CLI features do you want to set up for this folder?* - choose **_Hosting_**.
	- *What do you want to use as your public directory?* - type **/dist**
	- *Configure as a single-page app (rewrite all urls to /index.html)?* - choose **Y**
	- *File dist/index.html already exists. Overwrite?* - choose **N**

3. Run `firebase deploy`
