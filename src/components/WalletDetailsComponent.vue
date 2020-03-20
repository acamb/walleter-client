<template>
    <div class="container">
        <b-row>
            <b-col md="2" class="text-left">
                Wallet: {{ currentWallet.description }}
            </b-col>

            <b-col offset="8" md="2" class="text-right">
                Balance: {{ currentWallet.balance }}
            </b-col>
        </b-row>
        <b-card>
            <b-card-header>
                <b-card-title>
                    <b-row>
                        <b-col md="2" class="text-left">
                            Events
                        </b-col>
                        <b-col offset="8" md="2" class="text-right">
                            <span>
                                <b-icon-plus
                                    font-scale="2"
                                    class="rounded bg-primary p-1"
                                    variant="light"
                                    @click="show = !show"
                                ></b-icon-plus>
                            </span>
                        </b-col>
                    </b-row>
                    <br />
                    <transition name="create">
                        <CreateEvent
                            :walletId="id"
                            v-if="show"
                            @onsave="show = false"
                        ></CreateEvent>
                    </transition>
                </b-card-title>
            </b-card-header>
            <b-card-body>
                <b-table
                    stacked="md"
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
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import store from '@/store';
import CreateEvent from '@/components/CreateEventComponent';
import moment from 'moment';
export default {
    props: ['id'],
    data() {
        return {
            fields: [
                {
                    key: 'description',
                    label: 'Description'
                },
                { key: 'amount', label: 'Amount' },
                {
                    key: 'date',
                    label: 'Date',
                    formatter: value => {
                        return moment(String(value)).format('DD/MM/YYYY');
                    }
                },
                { key: 'actions', label: '' }
            ],
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
