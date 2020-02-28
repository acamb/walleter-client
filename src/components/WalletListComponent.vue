<template>
    <div class="panel panel-default">
        <h3>Wallets</h3>
        <b-row>
            <b-col offset="2" md="8">
                <table class="table table-striped">
                    <thead class="thead-light">
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
            </b-col></b-row
        >
    </div>
</template>
<script>
import router from '@/router';
import { mapActions } from 'vuex';
export default {
    props: ['wallets'],
    methods: {
        ...mapActions(['deleteWallet']),
        details(id) {
            router.push('/details/' + id);
        },
        deleteW(id) {
            this.deleteWallet({ id: id });
        }
    }
};
</script>
