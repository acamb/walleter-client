import Vue from 'vue'
export default {
    getWallets(state, payload) {
        state['wallets'] = payload ? payload : []
    },
    updateWallet(state, payload) {
        let key = state.wallets.map(w => w.id).indexOf(payload.wallet.id)
        Vue.set(state.wallets, key, payload.wallet)
    }
}