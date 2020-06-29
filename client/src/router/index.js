import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Dashboard from '@/views/Dashboard'
import Donate from '@/views/Donate'
import InvalidLink from '@/views/InvalidLink'
import PaymentSetup from '@/views/PaymentSetup'
import LinkManager from '@/views/LinkManager'
import Landing from '@/views/Landing'
import PaymentConfirmation from '@/views/PaymentConfirmation'
import TermsConditions from '@/views/TermsConditions'

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
      path: '/linkmanager',
      name: 'LinkManager',
      component: LinkManager
    },
    {
      path: '/donate/confirmation',
      name: 'PaymentConfirmation',
      component: PaymentConfirmation
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
    },
    {
      path: '/landing',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/termsconditions',
      name: 'TermsConditions',
      component: TermsConditions
    }
  ]
})
