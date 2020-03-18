<template>
    <b-container>
        <div v-if="error" class="alert alert-danger">Login errata</div>
        <b-form @submit.prevent="doLogin">
            <b-row>
                <b-col offset="3" md="6">
                    <b-input-group label="Username" label-for="username">
                        <b-form-input
                            name="username"
                            type="text"
                            v-model="username"
                            required
                            placeholder="Username"
                        />
                        <b-input-group-append is-text>
                            <b-icon-person></b-icon-person>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col offset="3" md="6">
                    <b-input-group label="Password" label-for="password">
                        <b-form-input
                            name="password"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            required
                            placeholder="Password"
                        />
                        <b-input-group-append title="show password">
                            <b-input-group-text @click="togglePassword()">
                                <b-icon-eye-slash-fill
                                    v-if="showPassword"
                                ></b-icon-eye-slash-fill>
                                <b-icon-eye-fill
                                    v-if="!showPassword"
                                ></b-icon-eye-fill>
                            </b-input-group-text>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col offset="5" md="2">
                    <br />
                    <b-button type="submit" variant="primary">Login</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>
<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            username: '',
            password: '',
            showPassword: false
        };
    },
    computed: {
        ...mapState(['error'])
    },
    methods: {
        ...mapActions(['login']),
        doLogin() {
            this.login({ username: this.username, password: this.password });
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>
