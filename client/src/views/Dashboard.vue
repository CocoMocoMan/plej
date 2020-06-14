<template>
  <div class = "columns is-centered is-multiline has-text-centered">
    <div class = "column is-one-quarter">
      <h1 class="title">Dashboard</h1>
      <p>Name <span class="tag is-rounded is-medium is-dark"> {{ user.name }}</span></p>
      <br>
      <div>
        <router-link class="button is-info is-rounded" :to="{ name: 'PaymentSetup'}">Payment Setup</router-link>
        <router-link class="button is-warning is-rounded" :to="{ name: 'LinkManager'}">Manage Links</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import InternalLayout from '../layouts/Internal'
export default {
  name: 'Dashboard',
  data () {
    return {
      donate_url: 'http://localhost:8080/donate/',
      user: {
        name: '',
        email: '',
        alias: ''
      }
    }
  },
  methods: {
    getUserData: function () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
        })
        .catch((err) => {
          console.log(err)
          router.push('/')
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
