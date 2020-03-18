import { walletActions } from './wallet'
import { eventActions } from './event'
import { shareActions } from './share'
import router from '@/router'
import walleterService from '../../services/walleter.service'
export default {
    async login({ dispatch, commit }, payload) {
        try {
            const response = await walleterService.login(payload.username, payload.password)
            dispatch('_login', response.data)
            router.push('/')
        }
        catch (error) {
            commit('error', 'Wrong username or password')
        }
    },
    _login({ commit }, payload) {
        commit('login', payload)
    },
    logout({ commit }) {
        commit('logout')
        router.push('/')
    },
    ...walletActions,
    ...eventActions,
    ...shareActions
}