import Vue from 'vue'
export const eventActions = {
    getEvents,
    addEvent,
    removeEvent
}

async function getEvents({ commit, state }, payload) {
    if (state.walletEventsMap === undefined || state.walletEventsMap[payload.walletId] === undefined ||
        state.walletEventsMap[payload.walletId].length === 0 ||
        payload.force) {
        let eventiResponse = await Vue.axios.get('/event?walletId=' + payload.walletId)
        commit('getEvents', { walletId: payload.walletId, events: eventiResponse.data })
    }
}

async function addEvent({ dispatch,commit }, payload) {
    let wallet=await Vue.axios.post('/event',
        {
            walletId: payload.walletId,
            event: payload.event
        }
    )
    dispatch('getEvents', { walletId: payload.walletId, force: true })
    commit('updateWallet', { wallet:wallet.data })
}

async function removeEvent({ dispatch,commit }, payload) {
    let wallet=await Vue.axios.delete('/event',
        {
            data: {

                wallet: { id: payload.wallet.id },
                event: { id: payload.event.id }
            }
        }
    )
    dispatch('getEvents', { walletId: payload.wallet.id, force: true })
    commit('updateWallet', { wallet:wallet.data })
}