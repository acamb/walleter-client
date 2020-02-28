import Vue from 'vue'
export const eventActions = {
    getEvents,
    addEvent,
    removeEvent
}

async function getEvents({commit,state},payload){
    if(state.walletEventMap === undefined || state.walletEventMap[payload.id] === undefined ||
        payload.force){
        let eventiResponse = await Vue.axios.get('/event',{params: {walletId: payload.walletId}})
        commit('getEvents',{walletId:payload.walletId,events:eventiResponse.data})
    }
}

async function addEvent({dispatch},payload){
    await Vue.axios.post('/event',
    {
        walletId: payload.walletId,
        event: {
            description:event.description,
            amount: event.amount
        }
    }
    )
    dispatch('getEvents',{walletId:payload.walletId,force:true})
}

async function removeEvent({dispatch},payload){
    await Vue.axios.delete('/event',
    {
        wallet: { id: payload.wallet.id },
        event: { id: payload.event.id }
    }
    )
    dispatch('getEvents',{walletId:payload.walletId,force:true})
}