import eventMutations from './event'
import shareMutations from './share'
import walletMutations from './wallet'
import walleterService from '@/services/walleter.service.js'
//import initialState from '@/store/state.js'
export default {
    login(state, payload) {
        state['user'] = payload.user
        sessionStorage.setItem('user', JSON.stringify(payload.user))
        state['token'] = payload.token
        sessionStorage.setItem('token', payload.token)
        walleterService.setHeaders('Bearer ' + sessionStorage.getItem('token'))
    },
    logout(state) {
        state['user'] = null,
            state['token'] = null
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        walleterService.setHeaders({})
        //Object.assign(state, { ...initialState })
    },
    error(state, payload) {
        state['error'] = payload
    },
    ...eventMutations,
    ...shareMutations,
    ...walletMutations
}