export default {
    user: sessionStorage.getItem('user'),
    token: sessionStorage.getItem('token'),
    wallets: [],
    ownedShareRequests: [],
    shareRequests: [],
    walletEventsMap: {},
    error: undefined
}