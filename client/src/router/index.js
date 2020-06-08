import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
import Donate from '@/views/Donate'
import InvalidLink from '@/views/InvalidLink'

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
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
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
