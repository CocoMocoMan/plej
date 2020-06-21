<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="http://localhost:8080">
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-white is-rounded is-strong has-text-grey" :to="{ name: 'Login'}">Log In</router-link>
              <router-link class="button is-primary is-rounded has-text-white is-strong" :to="{ name: 'Register'}">
                <strong>Sign up</strong>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <slot/>
  </div>
</template>
