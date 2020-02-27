export default {
    getEvents(state,payload){
        state['walletEventsMap'][payload.walletId] = payload.events
    }
}