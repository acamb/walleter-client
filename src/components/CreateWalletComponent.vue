<template>
    <div class="container">
        <b-row>
            <b-col md="12">
                <div v-if='error'>
                <b-alert variant="danger" >
                    {{error}}
                </b-alert>
                </div>
                <b-card title="New Wallet">
                    <b-form @click.prevent="save">
                        <b-form-group label="Description">
                            <b-form-input
                                type="text"
                                name="description"
                                required
                                v-model="walletName"
                            />
                        </b-form-group>
                        <b-form-group label="Balance">
                            <b-form-input
                                type="number"
                                name="amount"
                                required
                                v-model="walletAmount"
                            />
                        </b-form-group>
                        <b-btn variant="success">Save</b-btn>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            walletName: '',
            walletAmount: '',
            error: undefined
        };
    },
    methods: {
        ...mapActions(['createWallet']),
        save() {
            if(isNaN(parseInt(this.walletAmount)) || parseInt(this.walletAmount)  < 0){
                this.error="Please enter a positive number for balance field"
            } else {
                this.error=undefined;
                this.createWallet({
                    description: this.walletName,
                    amount: this.walletAmount
                }).then(() => {
                    this.walletName = ''
                    this.walletAmount = '';
                    this.$emit('onsave')
                });
            }
        }
    }
};
</script>
