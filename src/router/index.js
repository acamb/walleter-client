import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WalletDetailsComponent from '@/components/WalletDetailsComponent'
import LoginComponent from '@/components/LoginComponent'
import store from '@/store'
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
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: WalletDetailsComponent,
    props: true
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {

  const loggedIn = store.state.user != undefined;
  const publicPaths = ['/login']
  if(! (publicPaths.includes(to.path) || loggedIn) ){
    return next('/login')
  }
  next();
})

export default router
