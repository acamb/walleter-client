import walleterService from '../../services/walleter.service'
export const walletActions = {
    createWallet,
    getWallets,
    deleteWallet
}

async function createWallet({ dispatch }, payload) {
    await walleterService.createWallet(payload.description, payload.amount)
    await dispatch('getWallets', { force: true })
}

async function deleteWallet({ dispatch }, payload) {
    await walleterService.deleteWallet(payload.id)
    await dispatch('getWallets', { force: true })
}

async function getWallets({ commit, state }, options) {
    if (state.wallets.length === 0 || (options && options.force)) {
        let response = await walleterService.getWallets()
        commit('getWallets', response.data)
    }
}