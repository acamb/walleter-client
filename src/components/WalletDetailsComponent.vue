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
                                <b-button
                                    variant="success"
                                    @click="show = !show"
                                    ><b>+</b></b-button
                                >
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
                                <b-btn
                                    variant="danger"
                                    @click="deleteEvent(row.item)"
                                    class="rounded"
                                    >X</b-btn
                                >
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
        ...mapActions(['addEvent', 'removeEvent', 'getEvents']),
        deleteEvent(event) {
            this.removeEvent({
                wallet: { id: this.id },
                event: { id: event.id }
            });
        }
    },
    async beforeRouteEnter(to,from,next){
        await this.getEvents({ walletId: this.id });
        next()
    },
    components: {
        CreateEvent
    }
};
</script>

