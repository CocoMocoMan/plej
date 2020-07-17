<template>
  <div class="columns is-centered is-multiline has-text-centered section">
    <div class="column is-one-third">
      <h1 class="title">Admin Dashboard</h1>
      <div class="columns is-centered">
        <div class="column">
          <router-link
            class="button is-primary is-rounded has-text-white is-strong"
            :to="{ name: 'UserManager'}"
          >Manage Users</router-link>
        </div>
        <div class="column">
          <router-link
            class="button is-primary is-rounded has-text-white is-strong"
            :to="{ name: 'LeadsManager'}"
          >Manage Leads</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import InternalLayout from '../../layouts/Internal'
export default {
  name: 'AdminDashboard',
  methods: {
    verifyAdmin: function () {
      axios.get('/api/admin/auth')
        .then()
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/admin/login')
          }
        })
    }
  },
  mounted () {
    this.verifyAdmin()
  },
  created () {
    this.$emit('update:layout', InternalLayout)
  }
}
</script>
