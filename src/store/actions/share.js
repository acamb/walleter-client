import walleterService from '../../services/walleter.service'
export const shareActions = {
    createShare,
    acceptShare,
    rejectShare,
    deleteShare,
    getShares
}

async function getShares({commit,state},options){
    if(state.ownedShareRequests === undefined && state.shareRequests == undefined ||
        (options && options.force)){
        let response = walleterService.getShares()
        commit('getShares',response.data)
    }
}

async function createShare({dispatch},payload){
    await walleterService.createShare(payload.walletId,payload.usernameToShare)
    dispatch('getShares',{force:true})
}

async function acceptShare({dispatch},shareRequest){
    await walleterService.acceptShare(shareRequest.id)
        dispatch('getShares',{force:true})
}

async function rejectShare({dispatch},shareRequest){
    await walleterService.rejectShare(shareRequest.id)
        dispatch('getShares',{force:true})
}

async function deleteShare({dispatch},payload){
    await walleterService.deleteShare(payload.wallet.id,payload.username)
        dispatch('getShares',{force:true})
}
