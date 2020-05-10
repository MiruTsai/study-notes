import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import firebaseConfig from './firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue, IconsPlugin)
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(VueRouter)
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

firebase.initializeApp(firebaseConfig)



new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})