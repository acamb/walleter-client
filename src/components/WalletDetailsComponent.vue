<template>
    <div class="container">
        <div class="row">
            <b-col md="12">
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
                                <b-button variant="success" @click="show = true"
                                    ><b>+</b></b-button
                                >
                            </b-col>
                            <b-col md="12" v-if="show">
                                <CreateEvent :walletId='id' @onsave='show=false'></CreateEvent>
                            </b-col>
                        </b-card-title>
                        <b-card-body>
                            <b-table>
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="event in walletEvents"
                                        :key="event.id"
                                    >
                                        <td>{{ event.description }}</td>
                                        <td>{{ event.date }}</td>
                                        <td>{{ event.amount }}</td>
                                        <td>
                                            <b-button variant="danger"
                                                ><b>X</b></b-button
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </b-table>
                        </b-card-body>
                    </b-card-header>
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
    data(){
        return{
            show:false
        }
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
        ...mapActions(['addEvent', 'deleteEvent', 'getEvents'])
    },
    created() {
        this.getEvents({ walletId: this.id });
    },
    components: {
        CreateEvent
    }
};
</script>
