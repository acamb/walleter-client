import WalletService from '@/services/walleter.service.js'
export const scheduledActions = {
    getScheduledEvents,
    addScheduledEvent,
    updateScheduledEvent,
    removeScheduledEvent
}

async function getScheduledEvents({ commit, state }, payload) {
    if (state.walletScheduledEventsMap === undefined || state.walletScheduledEventsMap[payload.walletId] === undefined ||
        state.walletScheduledEventsMap[payload.walletId].length === 0 ||
        state.wallets.find(w => w.id == payload.walletId).hasShares ||
        payload.force) {
        let eventiResponse = await WalletService.getScheduledEvents(payload.walletId)
        commit('getScheduledEvents', { walletId: payload.walletId, events: eventiResponse.data })
    }
}

async function addScheduledEvent({ commit }, payload) {
    let events = await WalletService.addScheduledEvent(
        {
            walletId: payload.walletId,
            event: payload.event
        }
    )
    commit('getScheduledEvents', { walletId: payload.walletId, events: events })
}

async function removeScheduledEvent({ dispatch, commit }, payload) {
    let wallet = await WalletService.deleteScheduledEvent(payload.wallet.id, payload.event.id)
    dispatch('getScheduledEvents', { walletId: payload.wallet.id, force: true })
    commit('updateWallet', { wallet: wallet.data })
}

async function updateScheduledEvent({ commit }, payload) {
    let event = await WalletService.updateScheduledEvent(payload.wallet.it, payload.event)
    commit('updateScheduledEvent', { walletId: payload.wallet.id, event: event })
}