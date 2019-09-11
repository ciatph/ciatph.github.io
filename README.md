# ciatph.github.io

> AMIA-CIAT demo output website (version 2.0) <br>
> A Vue.js project <br>
> ### version 2.0.0
> Static build files from the latest vue project at branch [vue-version](https://github.com/ciatph/ciatph.github.io/tree/vue-version)). <br>
Contains updated content with new AMIA Phase 2 information and documents.

<br>


## Build Setup

1. Clone the project. <br>
`git clone https://github.com/ciatph/ciatph.github.io.git`

2. Checkout branch **vue-version**<br>
`git checkout vue-version`

1. Install dependencies: <br> `npm install`

2. Serve with hot reload at localhost:8080 <br>
`npm run dev` 

3. Build for production with minification. <br>
`npm run build` <br>
(static build files will be generated in the **/dist** directory)

4. Build for production and view the bundle analyzer report <br>
`npm run build --report`


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Deployment to GitHub Pages

The website, accessible from [https://ciatph.github.io](https://ciatph.github.io) serves static build files pushed into the `master` branch.

This can be manually done by (a) pushing static build files directly into the `master` branch, or (b) automatically by pushing vue project code updates into the `vue-version` branch. Please follow the instructions below to trigger the automatic [Travis](https://travis-ci.com/) CI/CD.

Read on this [reference](https://trello.com/c/0A36NOdS) for more information on setting up Travis CI for GitHub pages.



### Automatic CI/CD to GitHub Pages Using Travis

1. Create a branch from `vue-version`. <br>
`git checkout -b my-updates-branch`

2. Edit and push updates to `my-updates-branch`.

2. Create a pull request for branch `vue-version` from the new `my-updates-branch` that you've created.

3. Approve the pull request.

4. View the travis CI status from [https://travis-ci.com/ciatph/ciatph.github.io](https://travis-ci.com/ciatph/ciatph.github.io). <br>
New GitHub pages website updates can be viewed from [https://ciatph.github.io](https://ciatph.github.io) if the build passed.



### Manual Deployment to GitHub Pages

Please take note, the steps mentioned in  **_Automatic CI/CD to GitHub Pages Using Travis_** is the recommended way for publishing updates to the GitHub pages website.

1. Follow the steps from the local **Build Setup** section. Keep the contents of the **/dist** directory.

2. Checkout a new branch from the `master` branch. <br>
`git checkout -b <NEW_BRANCH_NAME>`

3. Copy the static contents of the local **/dist** directory (from `# 1`) into `<NEW_BRANCH_NAME>`.

4. Depending on the updated static files, you may need to delete  some `.js`, `.map` and `.css` files from **/static/css** or **/static/js**. Make sure that only the contents of */dist* will exist in `<NEW_BRANCH_NAME>`.

5. Push the new branch `<NEW_BRANCH_NAME>` and create a pull request.

6. Approve the pull request if there are no conflicts.



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
