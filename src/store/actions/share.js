import Vue from 'vue'
export const shareActions = {
    createShare,
    acceptShare,
    rejectShare,
    deleteShare,
    getShares
}

async function getShares({commit,state},options){
    if(state.ownedShareRequests === undefined && state.shareRequests == undefined ||
        (options && options.force)){
        let response = Vue.axios.get('/share')
        commit('getShares',response.data)
    }
}

async function createShare({dispatch},payload){
    await Vue.axios.post('/share',{walletId: payload.walletId,username: payload.usernameToShare})
    dispatch('getShares',{force:true})
}

async function acceptShare({dispatch},shareRequest){
    await Vue.axios.post('/share',{
        shareRequest: {
            id: shareRequest.id
        },
        status: 'ACCEPTED'})
        dispatch('getShares',{force:true})
}

async function rejectShare({dispatch},shareRequest){
    await Vue.axios.post('/share',{
        shareRequest: {
            id: shareRequest.id
        },
        status: 'REJECTED'})
        dispatch('getShares',{force:true})
}

async function deleteShare({dispatch},payload){
    await Vue.axios.delete('/share',{
        wallet: {
            id: payload.wallet.id
        },
        username: payload.username})
        dispatch('getShares',{force:true})
}