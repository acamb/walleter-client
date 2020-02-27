import Vue from 'vue'
export const walletActions = {
    createWallet,
    getWallets
}

async function createWallet({dispatch},payload){
    return new Promise((resolve,reject) =>{
        Vue.axios.post('/wallet',{
            description: payload.description,
            amount: payload.amount
        }).then(() => {dispatch('getWallets')}
                , error => {
                    reject(error)
                })
        .then(()=> resolve())
    })

}

async function getWallets({commit}){
    let response = await Vue.axios.get('/wallet')
    commit('getWallets',response.data)
}