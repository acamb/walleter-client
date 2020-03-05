import Vue from 'vue'
export default {
    getEvents(state,payload){
        Vue.set(state.walletEventsMap,payload.walletId,payload.events)
    }
}