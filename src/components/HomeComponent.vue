<template>
    <div>
        Home
        <br/><br/>
        <WalletList :wallets="wallets"></WalletList>
    </div>
</template>
<script>
import { mapActions} from 'vuex'
import { mapState } from 'vuex' 
import WalletList from './WalletListComponent.vue'
export default {
    data() {
        return {
            walletName: "",
            walletAmount: 0
        }
    },
    computed: {
        ...mapState(['wallets'])
    },
    methods: {
        createNewWallet(){
            this.createWallet({description: this.walletName,amount: this.walletAmount})  
        },
        ...mapActions(['createWallet'])
    },
    components:{
        WalletList
    },
    async beforeRouteEnter(to,from,next){
        await this.$store.dispatch('getWallets')
        next()
    }
}
</script>