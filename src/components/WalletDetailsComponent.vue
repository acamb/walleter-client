<template>
    <div class="container">
        <div class="row">
            <b-col md="12">
                <div class="text-left">
                    Wallet: {{ currentWallet.description }}
                </div>
                <div class="text-right">
                    Balance: {{ currentWallet.balance }}
                </div>
                <b-card>
                    <b-card-header>
                        <b-card-title class="row">
                            <b-col md="2" class="text-left">
                                Events
                            </b-col>
                            <b-col offset="8" md="2" class="text-right">
                                <span>
                                    <b-icon-plus
                                        font-scale=""
                                        class="rounded bg-primary p-1"
                                        variant="light"
                                        @click="show = !show"
                                    ></b-icon-plus>
                                </span>
                            </b-col>
                            <b-col md="12" v-if="show">
                                <CreateEvent
                                    :walletId="id"
                                    @onsave="show = false"
                                ></CreateEvent>
                            </b-col>
                        </b-card-title>
                    </b-card-header>
                    <b-card-body>
                        <b-table
                            :fields="fields"
                            :items="walletEvents"
                            striped
                            :per-page="perPage"
                            :current-page="currentPage"
                        >
                            <template v-slot:cell(actions)="row">
                                <b-icon-x-circle
                                    variant="light"
                                    font-scale="2"
                                    @click="deleteEvent(row.item)"
                                    class="rounded bg-danger"
                                ></b-icon-x-circle>
                            </template>
                        </b-table>
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="walletEvents.length"
                            :per-page="perPage"
                        ></b-pagination>
                    </b-card-body>
                </b-card>
            </b-col>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import store from '@/store';
import CreateEvent from '@/components/CreateEventComponent';
export default {
    props: ['id'],
    data() {
        return {
            fields: ['description', 'amount', 'date', 'actions'],
            perPage: 5,
            currentPage: 1,
            show: false
        };
    },
    computed: {
        ...mapGetters(['events', 'wallet']),
        walletEvents: function() {
            return this.events(this.id);
        },
        currentWallet: function() {
            return this.wallet(this.id);
        }
    },
    methods: {
        ...mapActions(['addEvent', 'removeEvent']),
        deleteEvent(event) {
            this.removeEvent({
                wallet: { id: this.id },
                event: { id: event.id }
            });
        }
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('getEvents', { walletId: to.params['id'] });
        next();
    },
    components: {
        CreateEvent
    }
};
</script>
