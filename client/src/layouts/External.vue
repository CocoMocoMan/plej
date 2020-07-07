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
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item" style="padding-top:0;">
            <div class="buttons">
              <router-link
                class="button is-white is-rounded is-strong is-medium navbar-item"
                :to="{ name: 'Login'}"
                :target="useExternalLinks ? '_blank' : ''"
              >Log In</router-link>
              <router-link
                class="button is-primary is-rounded is-strong is-medium navbar-item"
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
  }
}
</script>
