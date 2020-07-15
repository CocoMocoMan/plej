<template>
  <div class="columns is-centered is-multiline has-text-centered section">
    <div class="column is-one-third"></div>
    <div class="column is-one-third">
      <h1 class="title">Admin Dashboard</h1>
      <br />
      <div>
        <router-link
          class="button is-primary is-rounded has-text-white is-strong"
          :to="{ name: 'UserManager'}"
        >Manage Users</router-link>
      </div>
    </div>
    <div class="column is-one-third"></div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import InternalLayout from '../../layouts/Internal'
export default {
  name: 'AdminDashboard',
  data () {
    return {
      user: {
        email: ''
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
            router.push('/login')
          }
        })
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
