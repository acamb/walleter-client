import Vue from 'vue'
export const walletActions = {
    createWallet,
    getWallets
}

async function createWallet({dispatch},description,amount){
    await Vue.axios.post('/wallet',{
        description: description,
        amount: amount
    })
    dispatch('getWallets')
}

async function getWallets({commit}){
    let response = await Vue.axios.get('/wallet')
    commit('getWallets',response.data)
}