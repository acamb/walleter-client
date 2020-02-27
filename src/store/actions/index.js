import {walletActions} from './wallet'
import {eventActions} from './event'
import {shareActions} from './share'
import router from '@/router'
import Vue from 'vue'
export default {
    login({commit,dispatch},payload){
        Vue.axios.post('/auth',{username:payload.username,password:payload.password})
            .then(response => {
                commit('login',response.data)
                Vue.axios.defaults.headers = {'Authorization': 'Bearer ' + response.data.token}
                dispatch('getWallets')
                router.push('/')
            }, () => {
                commit('error','Wrong username or password')
            })
            
    },
    logout({commit}){
        commit('logout')
        Vue.axios.defaults.headers = {}
        router.push('/')
    },
    ...walletActions,
    ...eventActions,
    ...shareActions
}