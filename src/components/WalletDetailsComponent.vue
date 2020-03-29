<template>
    <div class="container">
        <b-row>
            <b-col md="4" sm="5" xs="5" class="text-left">
                <h2>Wallet: {{ currentWallet.description }}</h2>
            </b-col>
            <b-col md="4" sm="1" xs="1"></b-col>
            <b-col md="4" sm="6" xs="6" class="text-right">
                <h2>Balance: {{ currentWallet.balance }}</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col offset="4" md="4" xs="4" sm="4">
                <router-link :to="{ path: '/details/' + id + '/events' }"
                    >Events</router-link
                >
                |
                <router-link :to="{ path: '/scheduled/' + id + '/scheduled' }"
                    >Scheduled</router-link
                >
            </b-col>
        </b-row>
        <br />
        <router-view></router-view>
    </div>
</template>
<script>
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
    props: ['id'],

    async beforeRouteEnter(to, from, next) {
        await store.dispatch('getEvents', { walletId: to.params['id'] });
        await store.dispatch('getScheduledEvents', {
            walletId: to.params['id']
        });
        next();
    },
    computed: {
        ...mapGetters(['wallet']),
        currentWallet: function() {
            return this.wallet(this.id);
        }
    }
};
</script>
<style scoped>
.create-enter {
    opacity: 0;
    width: 0px;
}
.create-enter-active {
    transition: all 0.2s ease-out;
}
.create-leave-active {
    transition: all 0.2s ease-out;
    width: 0px;
    opacity: 0;
}
</style>
