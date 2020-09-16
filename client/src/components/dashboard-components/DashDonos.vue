<template>
    <!-- Tile holder -->
    <div class='tile is-ancestor'>
        <!-- Vertical Tile -->
        <div class="tile is-parent is-vertical dash-card">
            <!-- Title -->
            <div class="tile container">
                <p><span class="dash-title is-size-4 pl-2 pr-2">Donations</span></p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../../router'
export default {
  name: 'DashDonos',
  data () {
    return {
      user: {
        name: '',
        email: ''
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
    },
    mounted () {
      this.getUserData()
    }
  }
}
</script>
<style>

</style>
