export default {
    wallet,
    events
}

const wallet = state => id => state.wallets.find(w => w.id === parseInt(id))

const events= state=> id =>state.walletEventsMap[parseInt(id)]
