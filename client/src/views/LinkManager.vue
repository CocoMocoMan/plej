<template>
  <div class="columns is-centered is-multiline has-text-centered">
    <div class="column is-one-quarter">
      <h1 class="title">Plej.links</h1>
      <button class="button is-rounded is-small is-light" v-on:click="generateLinkToken">Generate New Link</button>
      <ul>
        <li v-for="link in user.links" v-bind:key="link.link_token">
          <input type="text" name="link" :value= "donate_url + link.link_token" disabled v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import InternalLayout from '../layouts/Internal'
export default {
  name: 'LinkManager',
  data () {
    return {
      donate_url: 'http://localhost:8080/donate/',
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
