import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import WalletDetailsComponent from '@/components/WalletDetailsComponent'
import WalletEventsComponent from '@/components/WalletDetails/WalletEventsComponent'
import WalletScheduledComponent from '@/components/WalletDetails/WalletScheduledComponent'
import LoginComponent from '@/components/LoginComponent'
import store from '@/store'
import nProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
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
    props: true,
    children: [
      {
        path: 'events',
        component: WalletEventsComponent,
        props: true
      },
      {
        path: 'scheduled',
        component: WalletScheduledComponent,
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  const loggedIn = store.state.user !== undefined;
  const publicPaths = ['/login']
  if (!(publicPaths.includes(to.path) || loggedIn)) {
    return next('/login')
  }
  nProgress.start()
  next();
})

router.afterEach(() => {
  nProgress.done()
})

export default router
