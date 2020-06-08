<template>
  <div>
    <h2>Dashboard</h2>
    <p>Name: {{ user.name }}</p>
    <p><router-link :to="{ name: 'PaymentSetup'}">Payment Setup</router-link></p>
    <br>
    <b>Plej.link:</b>
    <input type="text" name="link" :value= "'http://localhost:8080/donate/' + user.linkToken" disabled v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}">
    <button v-on:click="generateLinkToken">Generate New Link</button>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import InternalLayout from '../layouts/Internal'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        name: '',
        linkToken: ''
      }
    }
  },
  methods: {
    getUserData: function () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          console.log(response)
          self.$set(this, 'user', response.data.user)
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/')
        })
    },
    generateLinkToken: function () {
      axios.get('/api/generatelinktoken')
        .then((response) => {
          console.log(response)
          this.user.linkToken = response.data.linkToken
        })
        .catch((errors) => {
          console.log(errors)
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
