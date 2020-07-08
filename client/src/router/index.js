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
import PrivacyPolicy from '@/views/PrivacyPolicy'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/login',
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
      component: PaymentConfirmation,
      props: true
    },
    {
      path: '/donate/:token',
      name: 'Donate',
      component: Donate
    },
    {
      path: '/termsconditions',
      name: 'TermsConditions',
      component: TermsConditions
    },
    {
      path: '/privacypolicy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '*',
      name: 'InvalidLink',
      component: InvalidLink
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})
