<template>
  <div class="container is-fluid">
    <div class="tile is-ancestor">
      <div class="tile is-parent dash-card is-1" style="height: 30%;">
        <dash-nav :currComponent.sync="currComponent"></dash-nav>
      </div>
      <div class="tile is-parent">
        <component :is="currComponent" :user="user"></component>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import InternalLayout from '../layouts/Internal'
import DashHome from '../components/dashboard-components/DashHome'
import DashNav from '../components/dashboard-components/DashNav'
export default {
  name: 'Dashboard',
  components: {
    DashNav,
    DashHome
  },
  data () {
    return {
      user: {
        name: '',
        email: '',
        alias: ''
      },
      currComponent: DashHome
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
