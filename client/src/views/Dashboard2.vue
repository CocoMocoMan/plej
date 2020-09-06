<template>
  <div>
    <div>
      <h1>Welcome, {{user.name}}!</h1>
      <router-link to="/"><h3>Home</h3></router-link>
    </div>
    <div>
      <sideNav/>
    </div>
    <div>
      <router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import InternalLayout from '../layouts/Internal'
import sideNav from '../components/dashboard-components/components/sideNav'

export default {
  name: 'Dashboard2',
  components: {
    sideNav
  },
  data () {
    return {
      user: {
        name: '',
        email: '',
        alias: '',
        links: []
      }
    }
  },
  methods: {
    getUserData: function () {
      let self = this
      axios.get('/api/auth/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    }
  },
  mounted () {
    this.getUserData()
  },
  created () {
    this.$emit('update:layout', InternalLayout)
  }
}
</script>

<style>
.dash-container {
  background-color: #e87e7a;
  color: white;
  border-radius: 10px;
}
</style>
