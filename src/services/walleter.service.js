import Axios from "axios";



const apiClient = Axios.create({
    baseURL:'http://localhost:8081',
    withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
   
})

export default {

    setHeaders(headers){
        apiClient.defaults.headers.common['Authorization'] =headers
    },
    
    getEvent(walletId){
        return apiClient.get('/event?walletId=' + walletId)
    },

    addEvent(event){
        return apiClient.post('/event',event)
    },

    deleteEvent(walletId,eventId){
        return apiClient.delete('/event',
            {
                data: {

                    wallet: { id: walletId },
                    event: { id: eventId }
                }
            }
        )
    },

    getShares(){
        return apiClient.get('/share')
    },

    createShare(walletId,usernameToShare){
        return apiClient.post('/share',{walletId: walletId,username: usernameToShare})
    },

    acceptShare(id){
        return apiClient.post('/share',{
            shareRequest: {
                id: id
            },
            status: 'ACCEPTED'})
    },

    rejectShare(id){
        return apiClient.post('/share',{
            shareRequest: {
                id: id
            },
            status: 'REJECTED'})
    },

    deleteShare(walletId,username){
        return apiClient.delete('/share',{
            wallet: {
                id: walletId
            },
            username: username})
    },

    getWallets(){
        return apiClient.get('/wallet')
    },

    createWallet(description,amount){
        return apiClient.post('/wallet',{
            description: description,
            amount: amount
        })
    },

    deleteWallet(id){
        return apiClient.delete('/wallet',{id:id})
    },

    login(username,password){
        return apiClient.post('/auth',{username:username,password:password})
    }

}