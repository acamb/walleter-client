<template>
    <b-row>
        <b-col offset="3" md="6">
            <div class="card">
                <b-card-header>
                    <div class="card-title row">
                        <b-col md="3">
                            <h2 class="text-left">
                                Wallets
                            </h2>
                        </b-col>
                        <b-col offset="6" md="3" class="text-right">
                            <span
                                ><b-btn variant="success" @click="show = true"
                                    ><b>+</b></b-btn
                                ></span
                            >
                        </b-col>
                    </div>

                    <CreateWallet v-if="show" @onsave='show=false'></CreateWallet>
                </b-card-header>
                <div class="card-body">
                    <b-col md="12">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Balance</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="wallet in wallets" :key="wallet.id">
                                    <td>{{ wallet.description }}</td>
                                    <td>{{ wallet.balance }}</td>
                                    <td>
                                        <b-btn-group>
                                            <b-btn
                                                variant="primary"
                                                @click="details(wallet.id)"
                                                >Details</b-btn
                                            >
                                            <b-btn
                                                variant="danger"
                                                @click="deleteW(wallet.id)"
                                                >Delete</b-btn
                                            >
                                        </b-btn-group>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                </div>
            </div>
        </b-col>
    </b-row>
</template>
<script>
import router from '@/router';
import { mapActions } from 'vuex';
import CreateWallet from './CreateWalletComponent';
export default {
    props: ['wallets'],
    methods: {
        ...mapActions(['deleteWallet']),
        details(id) {
            router.push('/details/' + id);
        },
        deleteW(id) {
            this.deleteWallet({ id: id });
        },
        onsave() {
            this.show = false;
        }
    },
    data() {
        return {
            show: false
        };
    },
    components: {
        CreateWallet
    }
};
</script>
