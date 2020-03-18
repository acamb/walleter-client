export default {
    initialState: () => {
        return {
            user: undefined,
            token: undefined,
            wallets: [],
            ownedShareRequests: [],
            shareRequests: [],
            walletEventsMap: {},
            error: undefined
        }
    }
}