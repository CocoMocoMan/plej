<template>
  <div class="layout">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
        </a>
      </div>
      <div class="navbar-menu">
          <router-link class="title has-text-primary is-strong" style="font-size:3em; margin-top: 2vh;" :to="{ name: 'Landing'}" :target="useExternalLinks ? '_blank' : ''">plej</router-link>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-white is-rounded is-strong is-medium" :to="{ name: 'Login'}" :target="useExternalLinks ? '_blank' : ''">Log In</router-link>
              <router-link class="button is-primary is-rounded is-strong is-medium" :to="{ name: 'Register'}" :target="useExternalLinks ? '_blank' : ''">Sign up</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <slot class="body" id="body"/>
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
