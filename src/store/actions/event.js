import Vue from 'vue'
export const eventActions = {
    getEvents,
    addEvent,
    removeEvent
}

async function getEvents({commit},walletId){
    let eventiResponse = await Vue.axios.get('/event',{params: {walletId: walletId}})
    commit('getEvents',eventiResponse.data)
}

async function addEvent({dispatch},event,walletId){
    await Vue.axios.post('/event',
    {
        walletId: walletId,
        event: {
            description:event.description,
            amount: event.amount
        }
    }
    )
    dispatch('getEvents')
}

async function removeEvent({dispatch},event,wallet){
    await Vue.axios.delete('/event',
    {
        wallet: { id: wallet.id },
        event: { id: event.id }
    }
    )
    dispatch('getEvents')
}