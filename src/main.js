import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue,BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import config from './config'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
import Axios from "axios";
//Vue.use(VueAxios, axios)
//Vue.axios.defaults.baseURL=config.apiUrl

new Vue({
  router,
  store,
  created(){
    if(sessionStorage.getItem('token')){
      this.$store.commit('login',{user: sessionStorage.getItem('user'),token: sessionStorage.getItem()})
    }
    Axios.interceptors.response.use(
      response => response,
      error => {
          if(error.response.status === 401){
              this.$store.commit('logout')
          }
          return Promise.reject(error)
      }
  )
  },
  render: h => h(App)
}).$mount('#app')
