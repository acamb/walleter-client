<template>
    <div class="container">
        <b-row>
            <b-col md="12">
                <div v-if="error">
                    <b-alert variant="danger">
                        {{ error }}
                    </b-alert>
                </div>
                <b-card title="New Event">
                    <b-form @submit.prevent="save">
                        <b-form-group label="Description">
                            <b-form-input
                                type="text"
                                name="description"
                                required
                                v-model="event.description"
                            />
                        </b-form-group>
                        <b-form-group label="Amount">
                            <b-form-input
                                type="number"
                                name="amount"
                                required
                                v-model="event.amount"
                            />
                        </b-form-group>
                        <b-form-group label="Frequency">
                            <b-form-select
                                name="eventFrequency"
                                required
                                v-model="event.frequency"
                            >
                                <b-form-select-option
                                    v-for="frequency in frequencies"
                                    :key="frequency"
                                    :value="frequency"
                                    >{{ frequency }}</b-form-select-option
                                >
                            </b-form-select>
                        </b-form-group>
                        <b-form-group label="Units">
                            <b-form-input
                                name="eventUnits"
                                required
                                v-model="event.units"
                            />
                        </b-form-group>
                        <b-form-group label="Start date">
                            <b-form-input
                                type="date"
                                name="date"
                                required
                                v-model="event.nextFire"
                            />
                        </b-form-group>
                        <b-btn type="submit" variant="success">Save</b-btn>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
import { Frequency } from '@/model/Frequency';
export default {
    props: {
        walletId: String
    },
    data() {
        return {
            event: {
                description: '',
                amount: '',
                frequency: undefined,
                unit: 0,
                nextFire: 0
            },
            frequencies: [...Frequency],
            ...mapState(['error'])
        };
    },
    methods: {
        ...mapActions(['addScheduledEvent', 'removeScheduledEvent']),
        save() {
            this.addScheduledEvent({
                walletId: this.walletId,
                event: this.event
            });
            this.$emit('onsave');
        },
        remove(id) {
            this.removeScheduledEvent({
                wallet: {
                    id: this.walletId
                },
                event: {
                    id: id
                }
            });
        }
    }
};
</script>
