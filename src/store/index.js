import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
//import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  //getters
  getters: {
    wallet: state => id => state.wallets.find(w => w.id === parseInt(id)),
    events: state=> id =>state.walletEventsMap[parseInt(id)]
  }
})
