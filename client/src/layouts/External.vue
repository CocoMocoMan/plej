<template>
  <div class="layout">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link
          :to="{ name: 'Landing'}"
          :target="useExternalLinks ? '_blank' : ''"
          style="margin:1.2rem"
        >
          <div class="level is-vcentered is-centered">
            <img src="../assets/logo.png" style="width:2rem; height: auto; margin-right:.5rem" />
            <h3 class="title has-text-primary" style="font-size:2rem">plej</h3>
          </div>
        </router-link>
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
              <router-link
                class="button is-white is-rounded is-strong navbar-item"
                :to="{ name: 'Login'}"
                :target="useExternalLinks ? '_blank' : ''"
              >Log In</router-link>
              <router-link
                class="button is-primary is-rounded is-strong navbar-item"
                :to="{ name: 'Register'}"
                :target="useExternalLinks ? '_blank' : ''"
              >Sign up</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <slot class="body" id="body" />
  </div>
</template>

<script>
export default {
  name: 'External',
  props: {
    useExternalLinks: false
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    toggleActive: function () {
      this.isActive = !this.isActive
    }
  }
}
</script>
