<template>
  <div id="internal">
    <img src="../assets/logo.png">
    <div>
      <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
      <a href="#" v-on:click="logout">Logout</a>
    </div>
    <slot/>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
export default {
  name: 'Internal',
  methods: {
    logout: function (e) {
      axios.get('/api/logout')
        .then(() => {
          router.push('/')
        })
    }
  }
}
</script>

<style>
#internal {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
