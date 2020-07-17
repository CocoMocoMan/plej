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
          <div class="tabs pl-6 pb-2 is-medium is-boxed is-fullwidth">
            <ul>
              <li>
                <router-link class="is-size-5 is-strong navbar-item" :to="{ name: 'Landing'}">Home</router-link>
              </li>
              <li>
                <router-link
                  class="is-size-5 is-strong navbar-item"
                  :to="{ name: 'AboutUs'}"
                  :target="useExternalLinks ? '_blank' : ''"
                >About</router-link>
              </li>
              <!-- <li>
            <router-link
              class="is-size-5 is-strong"
              :to="{ name: 'Resources'}"
              :target="useExternalLinks ? '_blank' : ''"
            >Resources</router-link>
              </li>-->
              <li>
                <router-link
                  class="is-size-5 is-strong navbar-item"
                  :to="{ name: 'Landing', hash: '#contact_us'}"
                  @click.native="scrollFix('#contact_us')"
                  :target="useExternalLinks ? '_blank' : ''"
                >Contact Us</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item" style="padding-top:0;">
            <router-link
              class="button is-white is-rounded is-strong is-medium"
              :to="{ name: 'Login'}"
              :target="useExternalLinks ? '_blank' : ''"
              v-on:click.native="toggleActive"
            >Log In</router-link>

            <router-link
              class="button is-primary is-rounded is-strong is-medium"
              :to="{ name: 'Register'}"
              :target="useExternalLinks ? '_blank' : ''"
              v-on:click.native="toggleActive"
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
    scrollFix: function (hashbang) {
      location.href = hashbang
    }
  }
}
</script>
