import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import firebaseConfig from './firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import VueRouter from 'vue-router'
import Routes from './route'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
//Vue.use(VueRouter)
Vue.config.productionTip = false

// const router = new VueRouter({
//   routes: Routes
// })

firebase.initializeApp(firebaseConfig)

new Vue({
  el: '#app',
  data:{    
  },
  render: h => h(App),
  // router:router
})
