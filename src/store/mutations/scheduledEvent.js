import Vue from 'vue'
export default {
    getScheduledEvents(state, payload) {
        Vue.set(state.walletScheduledEventsMap, payload.walletId, payload.events)
    },
    updateScheduledEvent(state, payload) {
        let events = state.walletScheduledEventsMap[payload.walletId]
        Object.assign(events.find(e => e.id == payload.event.id), ...payload.event)
    }
}