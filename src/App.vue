<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <a @click.prevent="logout" class='router-link'>Logout</a>
    </div>
    <router-view/>
  </div>
</template>
<script>
import {userService} from '@/services/user.service'
import router from '@/router'
export default {
  methods: {
    logout(){
        userService.logout();
        router.push('/')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
