import eventMutations from './event'
import shareMutations from './share'
import walletMutations from './wallet'
import scheduledMutations from './scheduledEvent'
import walleterService from '@/services/walleter.service.js'
import storeState from '@/store/state.js'
export default {
    login(state, payload) {
        state['user'] = payload.user
        sessionStorage.setItem('user', JSON.stringify(payload.user))
        state['token'] = payload.token
        sessionStorage.setItem('token', payload.token)
        walleterService.setHeaders('Bearer ' + sessionStorage.getItem('token'))
    },
    logout(state) {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        walleterService.setHeaders({})
        const newState = storeState.initialState()
        Object.assign(state, newState)
    },
    error(state, payload) {
        state['error'] = payload
    },
    ...eventMutations,
    ...shareMutations,
    ...walletMutations,
    ...scheduledMutations
}