<template>
    <b-card>
        <b-card-header>
            <b-card-title>
                <b-row>
                    <b-col md="6" sm="6" xs="6" class="text-left">
                        Events
                    </b-col>
                    <b-col md="4" sm="4" xs="4"></b-col>
                    <b-col md="2" class="text-right">
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
            <EventListComponent
                @delete-event="deleteEvent($event)"
                :events="walletEvents"
            ></EventListComponent>
        </b-card-body>
    </b-card>
</template>
<script>
import CreateEvent from '@/components/CreateEventComponent';
import EventListComponent from '@/components/EventListComponent';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    props: ['id'],
    data() {
        return {
            show: false
        };
    },
    computed: {
        ...mapGetters(['events']),
        walletEvents: function() {
            return this.events(this.id);
        }
    },
    methods: {
        ...mapActions(['removeEvent']),
        deleteEvent(event) {
            this.removeEvent({
                wallet: { id: this.id },
                event: { id: event.id }
            });
        }
    },
    components: {
        CreateEvent,
        EventListComponent
    }
};
</script>
