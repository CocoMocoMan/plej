<template>
  <div class='container is-fluid'>
    <div class='tile is-ancestor'>
      <div class='tile is-parent dash-card is-1' style='height: 30%;'>
        <dash-nav></dash-nav>
      </div>
      <div class='tile is-parent'>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import InternalLayout from '../layouts/Internal'
import DashHome from '../components/dashboard-components/DashHome.vue'
import DashNav from '../components/dashboard-components/DashNav.vue'
import DashLinks from '../components/dashboard-components/DashLinks'
export default {
  name: 'Dashboard',
  components: {
    DashHome,
    DashNav,
    DashLinks
  },
  data () {
    return {
      user: {
        name: '',
        email: '',
        alias: ''
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
