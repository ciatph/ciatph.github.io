// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import firebase from 'firebase'
import VueLazyload from 'vue-lazyload'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/main.css'
import {firebaseSettings} from '@/defines/constants'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueLazyload, {
  preload: 1.0,
  loading: 'static/loading.gif',
  attempt: 1
})

// axios
Vue.prototype.$http = axios

// firebase (storage only)
Vue.prototype.$firebaseStorageRef = firebase.initializeApp(firebaseSettings).storage().ref()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
