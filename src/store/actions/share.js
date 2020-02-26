import Vue from 'vue'
export const shareActions = {
    createShare,
    acceptShare,
    rejectShare,
    deleteShare,
    getShares
}

async function getShares({commit}){
    let response = Vue.axios.get('/share')
    commit('getShares',response.data)
}

async function createShare({dispatch},walletId,usernameToShare){
    await Vue.axios.post('/share',{walletId: walletId,username: usernameToShare})
    dispatch('getShares')
}

async function acceptShare({dispatch},shareRequest){
    await Vue.axios.post('/share',{
        shareRequest: {
            id: shareRequest.id
        },
        status: 'ACCEPTED'})
    dispatch('getShares')
}

async function rejectShare({dispatch},shareRequest){
    await Vue.axios.post('/share',{
        shareRequest: {
            id: shareRequest.id
        },
        status: 'REJECTED'})
    dispatch('getShares')
}

async function deleteShare({dispatch},wallet,username){
    await Vue.axios.delete('/share',{
        wallet: {
            id: wallet.id
        },
        username: username})
    dispatch('getShares')
}