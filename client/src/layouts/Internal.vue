<template>
  <div class="layout">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="title has-text-primary is-strong" style="font-size:3em; margin-top: .25vh;" :to="{ name: 'Dashboard'}">plej</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-white is-rounded is-strong is-medium" href="#" v-on:click="logout">
                <strong>Logout</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <slot class="body"/>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
  name: 'Internal',
  methods: {
    logout: function (e) {
      axios.get('/api/auth/logout')
        .then(() => {
          router.push('/')
        })
    }
  }
}
</script>
