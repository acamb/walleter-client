import Vue from 'vue'
import Vuex from 'vuex'
import State from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//import getters from './getters'
Vue.use(Vuex)
const state = State.initialState()
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
