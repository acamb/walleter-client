import {walletActions} from './wallet'
import {eventActions} from './event'
import {shareActions} from './share'
import router from '@/router'
import walleterService from '../../services/walleter.service'
export default {
    async login({commit},payload){
        try{
            const response = await walleterService.login(payload.username,payload.password)
            commit('login',response.data)
            router.push('/')
        }
        catch(error){
            commit('error','Wrong username or password')
        }
    },
    logout({commit}){
        commit('logout')
        walleterService.setHeaders({})
        router.push('/')
    },
    ...walletActions,
    ...eventActions,
    ...shareActions
}