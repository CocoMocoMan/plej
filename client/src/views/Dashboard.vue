<template>
  <div>
    <h2>Dashboard</h2>
    <p>Name: {{ user.name }}</p>
    <p><router-link :to="{ name: 'PaymentSetup'}">Payment Setup</router-link></p>
    <br>
    <b>Plej.link:</b>
    <input type="text" name="link" :value= "'http://localhost:8080/donate/' + this.user.links[0].linkToken" disabled v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}">
    <button v-on:click="generateLinkToken">Generate New Link</button>
    <ul>
      <li v-for="link in user.links" v-bind:key="link.link_token">
        {{ link.link_token }}
      </li>
    </ul>
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
      user: {
        name: '',
        email: '',
        alias: '',
        links: [
          {
            link_token: '',
            link_content: ''
          }
        ]
      }
    }
  },
  methods: {
    getUserData: function () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          console.log(response.data.user)
          self.$set(this, 'user', response.data.user)
        })
        .catch((err) => {
          console.log(err)
          router.push('/')
        })
    },
    generateLinkToken: function () {
      let self = this
      axios.get('/api/generatelinktoken')
        .then((response) => {
          console.log(response.data.linkToken)
          self.getUserData()
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
