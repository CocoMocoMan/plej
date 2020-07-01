<template>
  <div class="section">
    <a :href="'https://connect.stripe.com/express/oauth/authorize?client_id=ca_32D88BD1qLklliziD7gYQvctJIhWBSQ7&state={STATE_VALUE}&suggested_capabilities[]=transfers&stripe_user[email]=' + user.email "><img src="../assets/connectstripe.png"></a>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import InternalLayout from '../layouts/Internal'
export default {
  name: 'PaymentSetup',
  data () {
    return {
      stateValue: '',
      user: {
        email: '',
        name: ''
      }
    }
  },
  methods: {
    getUserData: function () {
      let self = this
      axios.get('/api/auth/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
          }
          router.push('/')
        })
    },
    getStripeStateValue: function () {

    }
  },
  mounted () {
    this.getUserData()
  },
  created () {
    this.$emit('update:layout', InternalLayout)
  }
}
</script>
