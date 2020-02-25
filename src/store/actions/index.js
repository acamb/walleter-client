import {walletActions} from './wallet'
import {eventActions} from './event'
import {shareActions} from './share'
export default {
    login({commit},user){
        commit('login',user)
    },
    logout({commit}){
        commit('logout')
    },
    walletActions,
    eventActions,
    shareActions
}