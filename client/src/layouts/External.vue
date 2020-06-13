<template>
  <div id="external">
    <img src="../assets/logo.png">
    <div>
      <router-link :to="{ name: 'Login'}">Log In</router-link>
      <router-link :to="{ name: 'Register'}">Register</router-link>
    </div>
    <slot/>
  </div>
</template>

<style>
#external {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
