<template>
    <div>
        <b-table
            stacked="md"
            :fields="fields"
            :items="events"
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
            :total-rows="events.length"
            :per-page="perPage"
        ></b-pagination>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    props: {
        events: Array
    },
    data() {
        return {
            fields: [
                {
                    key: 'description',
                    label: 'Description'
                },
                {
                    key: 'nextFire',
                    label: 'Next',
                    formatter: value => {
                        return moment(String(value)).format('DD/MM/YYYY');
                    }
                },
                { key: 'amount', label: 'Amount' },
                { key: 'frequency', label: 'Frequency' },
                { key: 'units', label: 'Units' },
                { key: 'actions', label: '' }
            ],
            perPage: 5,
            currentPage: 1
        };
    },
    methods: {
        deleteEvent(item) {
            this.$emit('delete-event', item);
        }
    }
};
</script>
