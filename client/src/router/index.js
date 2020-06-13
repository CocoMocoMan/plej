import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Dashboard from '@/views/Dashboard'
import Donate from '@/views/Donate'
import InvalidLink from '@/views/InvalidLink'
import PaymentSetup from '@/views/PaymentSetup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/paymentsetup',
      name: 'PaymentSetup',
      component: PaymentSetup
    },
    {
      path: '/donate/:token',
      name: 'Donate',
      component: Donate
    },
    {
      path: '/invalidlink',
      name: 'InvalidLink',
      component: InvalidLink
    }
  ]
})
