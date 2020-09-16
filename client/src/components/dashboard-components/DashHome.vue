<template>
  <!-- Overall tile container -->
  <div class="tile is-ancestor">
    <!-- Vertical tile container for two rows -->
    <div class="tile is-vertical">
      <!-- Upper row -->
      <div class="tile">
        <!-- Latest link card -->
        <div class="tile is-parent is-vertical dash-card is-10">
          <!-- Latest link upper section -->
          <div class="tile container">
            <p>
              <span class="dash-title is-size-5">Latest Link</span>
            </p>
          </div>
          <!-- Latest link lower section -->
          <div class="tile">
            <!-- Left lower section -->
            <div class="tile is-vertical">
              <p class="is-size-4">Title of Content</p>
              <div>
                <button class="dash-button">Copy Link</button>
              </div>
              <p class="mt-2">Date</p>
            </div>
            <!-- Right lower section -->
            <div class="tile is-vertical has-text-right">
              <p class="is-size-4">
                Amount raised:
                <span class="plej-yellow">$420</span>
              </p>
              <p class="is-size-5">Donations</p>
              <p class="is-size-5">Page visits</p>
            </div>
          </div>
        </div>
        <!-- Balance card -->
        <div class="tile is-parent is-vertical dash-card">
          <!-- Balance title -->
          <div class="tile container">
            <p>
              <span class="dash-title is-size-5">Balance</span>
            </p>
          </div>
          <!-- Balance amount -->
          <div class="tile container mt-4 mb-4">
            <p class="is-size-3">$120</p>
          </div>
          <!-- Balance transfer button section -->
          <div class="tile container">
            <div>
              <button class="dash-button">Transfer</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Lower row -->
      <div class="tile">
        <!-- Analytics card -->
        <div class="tile is-parent is-vertical dash-card is-10">
          <!-- Analytics title -->
          <div class="tile container">
            <p>
              <span class="dash-title is-size-5">Analytics</span>
            </p>
          </div>
          <div class="tile container is-parent">
            <img src="../../assets/construction.png" alt="Construction pig" style="height: 10rem;" />
          </div>
          <div class="tile container">
            <p class="is-size-4">Under Construction</p>
          </div>
        </div>
        <!-- Last 5 donos card -->
        <div class="tile is-parent is-vertical dash-card">
          <div class="tile container">
            <p>
              <span class="dash-title is-size-5">Last 5 Donations</span>
            </p>
          </div>
          <!-- Last 5 donos -->
          <div class="tile container">
            <p>No links yet. To get started, head to the Link Manager</p>
          </div>
          <div class="tile container">
            <div>
              <button class="dash-button mt-6">Go to Link Manager</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../../router'
import linkprevue from 'link-prevue'
export default {
  name: 'DashHome',
  components: {
    linkprevue
  },
  props: {
    user: {
      name: '',
      email: '',
      links: [],
      date: ''
    }
  },
  methods: {
    getUserData: function () {
      console.log('here')
      let self = this
      axios.get('/api/auth/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
          console.log(response.data.user)
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
    },
    copyLink () {
      alert('This does not work yet.')
    },
    transfer () {
      alert('This does not work yet')
    }
  }
}
</script>
<style>
.plej-yellow {
  background-color: #efc318;
  padding: 0 4px 0 4px;
  box-shadow: 2px 2px rgba(136, 136, 136, 0.3);
}
.dash-card {
  background-color: #f8f8f8;
  box-shadow: 2px 2px rgba(136, 136, 136, 0.3);
  border-radius: 0.5rem;
  margin: 0.3rem;
}
.dash-title {
  background-color: #e87e7a;
  color: white;
  box-shadow: 2px 2px rgba(136, 136, 136, 0.3);
  padding: 0 4px 0 4px;
}
.dash-button {
  background-color: #e87e7a;
  color: white;
  box-shadow: 2px 2px rgba(136, 136, 136, 0.3);
  border-radius: 0.3rem;
  border: none;
}
.dash-button:hover {
  cursor: pointer;
}

.level-is-shrinkable .level-left,
.level-is-shrinkable .level-right,
.level-is-shrinkable .level-item {
  flex-shrink: 1;
}
</style>
