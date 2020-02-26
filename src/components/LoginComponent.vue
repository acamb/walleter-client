<template>
<b-container>
    <div v-if="error" class='alert alert-danger'>Login errata</div>
    <b-form @submit.prevent='doLogin'>
        <b-row>
            <b-col offset='3' md='6'>    
            <b-form-group label='Username' label-for='username'>
                <b-form-input id='username' type='text' v-model="username" required/>
            </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col offset='3' md='6'>    
                <b-form-group label='Password' label-for='password'>
                    <b-form-input id='password' type='text' v-model="password" required/>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col offset='5' md='2'>
                <b-button type='submit' variant='primary'>Login</b-button>
            </b-col>
        </b-row>
    </b-form>
</b-container>
</template>
<script>
import { mapActions} from 'vuex'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    computed: {
        ...mapState(['error'])
    },
    methods: {
        ...mapActions(['login']),
        doLogin(){
            this.login({username:this.username,password:this.password})
        }
    }
}
</script>