export default {
    login(state,payload){
        state['user'] = payload.user
        state['token'] = payload.token
    },
    logout(state){
        state['user'] = null,
        state['token'] = null
    }
}