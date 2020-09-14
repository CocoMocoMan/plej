<template>
  <div class="section">
    <div v-if="!account.details_submitted">
      <a :href="accountLink">
        <img src="../assets/connectstripe.png" />
      </a>
    </div>
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
      account: {
        details_submitted: undefined
      },
      user: {
        email: '',
        name: ''
      },
      accountLink: ''
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
            router.push('/login')
          }
        })
    },
    getAccount: function () {
      let self = this
      axios.get('/api/payment/account')
        .then((response) => {
          self.$set(this, 'account', response.data.account)
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    },
    getAccountLink: function () {
      let self = this
      axios.get('/api/payment/accountlink')
        .then((response) => {
          self.accountLink = response.data.accountLink
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    }
  },
  mounted () {
    this.getUserData()
    this.getAccount()
    this.getAccountLink()
  },
  created () {
    this.$emit('update:layout', InternalLayout)
  }
}
</script>
