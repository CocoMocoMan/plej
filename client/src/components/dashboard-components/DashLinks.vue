<template>
    <!-- Tile holder -->
    <div class='tile is-ancestor'>
        <!-- Vertical Tile -->
        <div class="tile is-parent is-vertical dash-card">
            <!-- Title -->
            <div class="tile container">
                <p><span class="dash-title is-size-4 pl-2 pr-2">Links</span></p>
            </div>
            <!-- Generate link button -->
            <div class="tile container mt-2">
                <div>
                    <button class="dash-button is-size-6">Generate New Link</button>
                </div>
            </div>
            <!-- Link section -->
            <div  class="tile is-child">
                <div class="level">
                    <div class="level-left">
                        <!-- Will be changing to title of content rather than link -->
                        <p class="is-size-4">Title of Content</p>
                    </div>
                    <div class="level-right">
                        <button class="dash-button is-size-5">Manage Link</button>
                    </div>
                </div>
                <div class="level">
                    <div class="level-left">
                        Amount raised:
                    </div>
                </div>
                <hr style="border: 1px solid grey">
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../../router'
export default {
  name: 'DashLinks',
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
