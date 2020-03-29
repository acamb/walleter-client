<template>
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
        //TODO[AC] undefined?
        walletEvents: function() {
            return this.events(this.id);
        },
        walletScheduledEvents: function() {
            return this.scheduledEvents(this.id);
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
    components: {
        CreateEvent,
        EventListComponent
    }
};
</script>
