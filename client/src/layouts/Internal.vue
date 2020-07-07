<template>
  <div class="layout">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link
          class="title has-text-primary is-strong navbar-item"
          style="font-size:3em;"
          :to="{ name: 'Landing'}"
          :target="useExternalLinks ? '_blank' : ''"
        >plej</router-link>
        <a
          role="button"
          class="navbar-burger"
          :class="isActive ? 'is-active' : ''"
          data-target="navMenu"
          aria-label="menu"
          aria-expanded="false"
          v-on:click="toggleActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navMenu" :class="isActive ? 'is-active' : ''">
        <div class="navbar-end">
          <div class="navbar-item" style="padding-top:0;">
            <div class="buttons">
              <a
                class="button is-white is-rounded is-strong is-medium"
                href="#"
                v-on:click="logout"
              >
                <strong>Logout</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <slot class="body" />
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
  name: 'Internal',
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    logout: function (e) {
      axios.get('/api/auth/logout')
        .then(() => {
          router.push('/')
        })
    },
    toggleActive: function () {
      this.isActive = !this.isActive
    }
  }
}
</script>
