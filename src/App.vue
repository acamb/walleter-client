<template>
    <div>
        <b-navbar variant="light" :sticky="true" align="center" id="nav">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-navbar-brand href="#">Walleter</b-navbar-brand>
                    <b-nav-item>
                        <router-link to="/">Home</router-link>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
            <b-navbar-nav class="ml-auto">
                <b-nav-item title="Logout">
                    <b-icon-box-arrow-right
                        font-scale="2"
                        @click.prevent="doLogout()"
                        class="router-link"
                        v-if="user"
                    >
                    </b-icon-box-arrow-right>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <b-container id="app">
            <br />
            <router-view />
        </b-container>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';
export default {
    methods: {
        ...mapActions(['logout']),
        doLogout() {
            this.logout();
        }
    },
    computed: {
        ...mapState(['user'])
    }
};
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
