export default{
    getShares(state,payload){
        state['ownedShareRequests'] = payload.owned
        state['shareRequests'] = payload.received
    }
}