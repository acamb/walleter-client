import WalletService from '@/services/walleter.service.js'
export const eventActions = {
    getEvents,
    addEvent,
    removeEvent
}

async function getEvents({ commit, state }, payload) {
    if (state.walletEventsMap === undefined || state.walletEventsMap[payload.walletId] === undefined ||
        state.walletEventsMap[payload.walletId].length === 0 ||
        state.wallets.find(w => w.id == payload.walletId).hasShares ||
        payload.force) {
        let eventiResponse = await WalletService.getEvents(payload.walletId)
        commit('getEvents', { walletId: payload.walletId, events: eventiResponse.data })
    }
}

async function addEvent({ dispatch, commit }, payload) {
    let wallet = await WalletService.addEvent(
        {
            walletId: payload.walletId,
            event: payload.event
        }
    )
    dispatch('getEvents', { walletId: payload.walletId, force: true })
    commit('updateWallet', { wallet: wallet.data })
}

async function removeEvent({ dispatch, commit }, payload) {
    let wallet = await WalletService.deleteEvent(payload.wallet.id, payload.event.id)
    dispatch('getEvents', { walletId: payload.wallet.id, force: true })
    commit('updateWallet', { wallet: wallet.data })
}