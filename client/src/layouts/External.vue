<template>
  <div class="layout">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
        </a>
      </div>
      <div class="navbar-menu">
          <router-link class="title is-primary is-strong" style="color:#f8f8f8; font-size:3em; margin-top: 2vh;" :to="{ name: 'Landing'}">plej</router-link>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-white is-rounded is-strong is-medium" :to="{ name: 'Login'}">Log In</router-link>
              <router-link class="button is-white is-rounded is-strong is-medium" :to="{ name: 'Register'}">Sign up</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <slot class="body" id="body"/>
  </div>
</template>
