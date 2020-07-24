<template>
  <div class="layout">
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link
          :to="{ name: 'Landing'}"
          :target="useExternalLinks ? '_blank' : ''"
          style="margin:1.2rem"
        >
          <div class="level is-vcentered is-centered">
            <img src="../assets/logo.png" style="width:3rem; height: auto; margin-right:.5rem" />
            <h3 class="title has-text-primary is-hidden-touch" style="font-size:3rem;">plej</h3>
          </div>
        </router-link>
        <a
          role="button"
          class="navbar-burger burger"
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
        <div class="navbar-start">
          <router-link
            class="is-size-5 is-strong navbar-item"
            :to="{ name: 'Landing'}"
            v-on:click.native="inactivate"
            :target="useExternalLinks ? '_blank' : ''"
          >Home</router-link>
          <router-link
            class="is-size-5 is-strong navbar-item"
            :to="{ name: 'AboutUs'}"
            v-on:click.native="inactivate"
            :target="useExternalLinks ? '_blank' : ''"
          >About</router-link>
          <!-- <li>
            <router-link
              class="is-size-5 is-strong"
              :to="{ name: 'Resources'}"
              :target="useExternalLinks ? '_blank' : ''"
            >Resources</router-link>
          </li>-->
          <router-link
            class="is-size-5 is-strong navbar-item"
            :to="{ name: 'Landing', hash: '#contact_us'}"
            v-on:click.native="scrollFix('#contact_us');"
            :target="useExternalLinks ? '_blank' : ''"
          >Contact Us</router-link>
        </div>
        <div class="navbar-end">
          <router-link
            class="is-size-5 is-strong navbar-item"
            :to="{ name: 'Login'}"
            :target="useExternalLinks ? '_blank' : ''"
            v-on:click.native="inactivate"
          >Log In</router-link>
          <div class="navbar-item">
            <router-link
              class="button is-primary is-strong is-medium"
              :class="isActive ? '': 'is-rounded'"
              :to="{ name: 'Register'}"
              :target="useExternalLinks ? '_blank' : ''"
              v-on:click.native="inactivate"
            >Sign up</router-link>
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
    },
    inactivate: function () {
      this.isActive = false
    },
    scrollFix: function (hashbang) {
      this.inactivate()
      location.href = hashbang
    }
  }
}
</script>
