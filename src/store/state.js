export default {
    user: sessionStorage.getItem('user'),
    token: sessionStorage.getItem('token'),
    wallets: undefined,
    ownedShareRequests: undefined,
    shareRequests: undefined,
    walletEventsMap: undefined,
    error: undefined
}