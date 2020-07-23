<template>
  <div class="section">
    <router-link :to="{ name: 'UserManager' }" class="button is-rounded is-primary is-strong">Back</router-link>
    <div class="columns is-centered is-multiline has-text-centered">
      <div class="column is-half">
        <h1 class="title is-4">
          Plej.links for
          <span class="tag is-primary is-medium">{{ user.email }}</span>
        </h1>
        <button
          class="button is-rounded is-white is-strong has-text-grey"
          v-on:click="generateLinkToken"
        >Generate New Link</button>
        <ul>
          <li v-for="link in user.links" v-bind:key="link.link_token">
            <linkcomponent v-bind:iLink="link" />
            <button class="button is-warning is-strong" v-on:click="openModal(link)">Delete</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal" :class="modalActive ? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="model-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Are you sure you want to delete link?
            <span
              class="subtitle is-5 is-strong"
            >(This cannot be undone)</span>
          </p>
        </header>
        <footer class="modal-card-foot">
          <button class="button is-rounded is-white" v-on:click="closeModal">Cancel</button>
          <button class="button is-warning is-rounded is-strong" v-on:click="deleteLink">Delete</button>
        </footer>
        <p>hi</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import InternalLayout from '../../layouts/Internal'
import linkcomponent from '../../components/Link'
export default {
  name: 'LinkManager',
  props: {
    userID: ''
  },
  data () {
    return {
      user: {
        email: '',
        links: []
      },
      modalActive: false,
      modalLink: undefined
    }
  },
  components: {
    linkcomponent
  },
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
    },
    getUserData: function () {
      let self = this
      axios.get('/api/admin/user/' + this.userID)
        .then((response) => {
          self.$set(this, 'user', response.data.user)
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/admin/login')
            }
          }
        })
    },
    generateLinkToken: function () {
      let self = this
      axios.get('/api/admin/generatelinktoken/' + this.userID)
        .then((response) => {
          self.getUserData()
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/admin/login')
            }
          }
        })
    },
    openModal: function (link) {
      this.modalLink = link
      this.modalActive = true
    },
    closeModal: function () {
      this.modalLink = undefined
      this.modalActive = false
    },
    deleteLink: function () {
      axios.get('/api/admin/deletelink/' + this.modalLink.link_token)
        .then(() => {
          window.location.reload()
        })
    }
  },
  mounted () {
    if (!this.userID) router.push('/admin/usermanager')
    this.verifyAdmin()
    this.getUserData()
  },
  created () {
    this.$emit('update:layout', InternalLayout)
  }
}
</script>
