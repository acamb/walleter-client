import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginComponent from '@/components/LoginComponent'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {

  const loggedIn = sessionStorage.getItem('auth') != undefined;
  const publicPaths = ['/login']
  if(! (publicPaths.includes(to.path) || loggedIn) ){
    return next('login')
  }
  next();
})

export default router
