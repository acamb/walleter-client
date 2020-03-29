
const wallet = state => id => state.wallets.find(w => w.id === parseInt(id))

const events = state => id => state.walletEventsMap[parseInt(id)]

const scheduledEvents = state => id => state.walletScheduledEventsMap[parseInt(id)]

export default {
    wallet,
    events,
    scheduledEvents
}

