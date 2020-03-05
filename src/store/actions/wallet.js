import Vue from 'vue'
export const walletActions = {
    createWallet,
    getWallets,
    deleteWallet
}

async function createWallet({dispatch},payload){
    return new Promise((resolve,reject) =>{
        Vue.axios.post('/wallet',{
            description: payload.description,
            amount: payload.amount
        }).then(() => {dispatch('getWallets',{force:true})}
                , error => {
                    reject(error)
                })
        .then(()=> resolve())
    })

}

async function deleteWallet({dispatch},payload){
    return new Promise((resolve,reject) =>{
        Vue.axios.delete('/wallet',{
            id: payload.description
        }).then(() => {dispatch('getWallets',{force:true})}
                , error => {
                    reject(error)
                })
        .then(()=> resolve())
    })

}

async function getWallets({commit,state},options){
    if(state.wallets.length === 0 || (options && options.force)){
        let response = await Vue.axios.get('/wallet')
        commit('getWallets',response.data)
    }
}