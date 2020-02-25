<template>
<b-container>
    <div v-if="error" class='alert alert-danger'>Login errata</div>
    <b-form @submit.prevent='login'>
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
                    <b-form-input id='password' type='password' v-model="password" required/>
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
import {userService} from '@/services/user.service'
import router from '@/router'
export default {
    data() {
        return {
            username: "",
            password: "",
            error: false
        }
    },
    methods: {
        login(){
            console.log('login: ' + this.username)
            userService.login(this.username,this.password)
            .then(() =>{
                router.push('home')
            },
            res =>{
                this.error=true
                console.log(res)
            })
            
        }
    }
}
</script>