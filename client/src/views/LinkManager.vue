<template>
    <div class="columns is-centered is-multiline has-text-centered section">
      <div class="column is-half">
        <h1 class="title">Plej.links</h1>
        <button class="button is-rounded is-white is-strong has-text-grey" v-on:click="generateLinkToken">Generate New Link</button>
        <ul>
          <li v-for="link in user.links" v-bind:key="link.link_token">
            <linkcomponent v-bind:iLink="link"/>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import InternalLayout from '../layouts/Internal'
import linkcomponent from '../components/Link'
export default {
  name: 'LinkManager',
  components: {
    linkcomponent
  },
  data () {
    return {
      user: {
        name: '',
        email: '',
        alias: '',
        links: []
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
    },
    generateLinkToken: function () {
      let self = this
      axios.get('/api/link/generatelinktoken')
        .then((response) => {
          self.getUserData()
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/')
            }
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
