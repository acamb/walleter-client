import eventMutations from './event'
import shareMutations from './share'
import walletMutations from './wallet'

export default {
    login(state,payload){
        state['user'] = payload.user
        sessionStorage.setItem('user',payload.user)
        state['token'] = payload.token
        sessionStorage.setItem('token',payload.token)
    },
    logout(state){
        state['user'] = null,
        state['token'] = null
        sessionStorage.setItem('user',null)
        sessionStorage.setItem('token',null)
    },
    error(state,payload){
        state['error']=payload
    },
    ...eventMutations,
    ...shareMutations,
    ...walletMutations
}