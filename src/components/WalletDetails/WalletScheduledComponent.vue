<template>
    <b-card>
        <b-card-header>
            <b-card-title>
                <b-row>
                    <b-col md="6" sm="6" xs="6" class="text-left">
                        Scheduled events
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
                    <CreateScheduledEvent
                        :walletId="id"
                        v-if="show"
                        @onsave="show = false"
                    ></CreateScheduledEvent>
                </transition>
            </b-card-title>
        </b-card-header>
        <b-card-body>
            <ScheduledEventListComponent
                @delete-event="deleteEvent($event)"
                :events="walletScheduledEvents"
            ></ScheduledEventListComponent>
        </b-card-body>
    </b-card>
</template>
<script>
import CreateScheduledEvent from '@/components/CreateScheduledEventComponent';
import ScheduledEventListComponent from '@/components/ScheduledListComponent';
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
        ...mapGetters(['scheduledEvents']),
        walletScheduledEvents: function() {
            return this.scheduledEvents(this.id);
        }
    },
    methods: {
        ...mapActions(['removeScheduledEvent']),
        deleteEvent(event) {
            this.removeScheduledEvent({
                wallet: { id: this.id },
                event: { id: event.id }
            });
        }
    },
    components: {
        CreateScheduledEvent,
        ScheduledEventListComponent
    }
};
</script>
