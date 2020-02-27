<template>
    <div>
        Home
        <br/><br/>
        <WalletList :wallets="wallets" v-if="wallets != undefined && wallets.size > 0"></WalletList>
        <div v-else>
            You have no wallets, create one!
        </div>
        <CreateWallet></CreateWallet>
    </div>
</template>
<script>
import { mapActions} from 'vuex'
import { mapState } from 'vuex' 
import WalletList from './WalletListComponent.vue'
import CreateWallet from './CreateWalletComponent'
export default {
    data() {
        return {
            ...mapState(['wallets']),
            walletName: "",
            walletAmount: 0
        }
    },
    methods: {
        createNewWallet(){
            this.createWallet({description: this.walletName,amount: this.walletAmount})  
        },
        ...mapActions(['createWallet'])
    },
    components:{
        WalletList,
        CreateWallet
    }
}
</script>