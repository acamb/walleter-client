<template>
    <div class="container">
        <b-row>
            <b-col md="12">
                <div v-if='error'>
                <b-alert variant="danger" >
                    {{error}}
                </b-alert>
                </div>
                <b-card title="New Event">
                    <b-form @submit.prevent="save">
                        <b-form-group label="Description">
                            <b-form-input
                                type="text"
                                name="description"
                                required
                                v-model="eventName"
                            />
                        </b-form-group>
                        <b-form-group label="Amount">
                            <b-form-input
                                type="number"
                                name="amount"
                                required
                                v-model="eventAmount"
                            />
                        </b-form-group>
                        <b-form-group label="Date">
                            <b-form-input
                                type="date"
                                name="date"
                                required
                                v-model="eventDate"
                            />
                        </b-form-group>
                        <b-btn type='submit' variant="success">Save</b-btn>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import {mapState} from 'vuex'
export default {
    props:['walletId'],
    data(){
        return {
            eventName:'',
            eventAmount:'',
            eventDate: '',
            ...mapState(['error'])
        }
    },
    methods: {
        ...mapActions(['addEvent','removeEvent']),
        save(){
            this.addEvent({walletId: this.walletId,event:{
                description: this.eventName,
                amount: this.eventAmount,
                date: this.eventDate
            }})
            this.$emit('onsave')
        },
        remove(id){
            this.removeEvent({
                wallet:{
                    id:this.walletId
                },
                event:{
                    id:id
                }
            })
        }
    }
}
</script>