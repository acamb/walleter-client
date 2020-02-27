<template>
    <div class='container'>
        <b-row>
            <b-col md="2">
                <b-btn variant="success" @click="showForm()">
                    Add wallet
                </b-btn>
            </b-col>
        </b-row>
        <b-row v-if="show">
            aaa
        </b-row>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            show:false,
            walletName:"",
            walletAmount:""
        }
    },
    methods: {
        ...mapActions(['addWallet']),
        showForm(){
            this.show = !this.show
        },
        save(){
            this.createWallet({description:this.walletName,amount: this.walletAmount})
                .then(()=>{this.walletName="",this.walletAmount=""})
            
        }
    }
}
</script>