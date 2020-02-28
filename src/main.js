import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from './config'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL=config.apiUrl
if(sessionStorage.getItem('token')){
  Vue.axios.defaults.headers = {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
