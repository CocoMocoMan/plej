<template>
  <!-- Tile holder -->
  <div class="tile is-ancestor">
    <!-- Vertical Tile -->
    <div class="tile is-parent is-vertical dash-card">
      <!-- Title -->
      <div class="tile container">
        <p>
          <span class="dash-title is-size-4 pl-2 pr-2">Donations</span>
        </p>
      </div>
      <div class='tile is-child'>
        <div v-if='getRecentDonations(user) == 0'>
          <!-- <p class='has-text-centered'>No donations yet</p> -->
          <!-- ONLY FOR TESTING -->
          <div class='level'>
            <div class='level-left'>
              <p>Max Noman: $5</p>
            </div>
            <div class='level-right'>
              <p>2020-10-01</p>
            </div>
          </div>
          <div class='level'>
            <div class='level-left'>
              <button v-on:click='showModal2()' class='dash-button'>View Message</button>
            </div>
          </div>
          <hr/>
          <div class='level'>
            <div class='level-left'>
              <p>Max Noman: $5</p>
            </div>
            <div class='level-right'>
              <p>2020-10-01</p>
            </div>
          </div>
          <div class='level'>
            <div class='level-left'>
              <button class='dash-button'>View Message</button>
            </div>
          </div>
          <hr/>
          <div id='lol' class='modal' style='background-color: rgba(0, 0, 0, 0.301);'>
            <div class='modal-card'>
              <div class='dash-card pl-6 pr-6 pt-6 pb-6'>Hey I really love your content</div>
              <div class='level'>
                  <div class='level-item'>
                      <button v-on:click='closeModal2()' class='dash-button is-size-5'>Close</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <!-- Loop through sorted donation array and display in levels -->
        <div v-else v-for='donation in getRecentDonations(user)' :key='donation.from'>
          <div class='level'>
            <div class='level-left'>
              <p class='is-size-5'>{{donation.from}}: <span>{{donation.amount}}</span></p>
            </div>
            <div class='level-right'>
              <p class='is-size-5'>{{donation.date.slice(0,10)}}</p>
            </div>
          </div>
          <div class='level'>
            <div class='level-left'>
              <button v-on:click='showModal(donation)' class='dash-button'>
                View Message
              </button>
            </div>
          </div>
          <div :id='donation' class='modal' style='background-color: rgba(0, 0, 0, 0.301);'>
            <div class='modal-card'>
              <div class='dash-card pl-6 pr-6 pt-6 pb-6'>{{dontaion.message}}}</div>
              <div class='level'>
                  <div class='level-item'>
                      <button v-on:click='closeModal()' class='dash-button is-size-5'>Close</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DashDonos',
  props: {
    user: {
      links: []
    }
  },
  methods: {
    getRecentDonations: function (user) {
      let donations = []
      for (let link of user.links) {
        donations = donations.concat(link.donations)
      }
      return donations.sort((a, b) => (new Date(b.date) - new Date(a.date)))
    },
    closeModal: function (dono) {
      var element = document.getElementById(dono)
      element.classList.remove('is-active')
      console.log(element.classList)
    },
    // for testing
    closeModal2: function () {
      var element = document.getElementById('lol')
      element.classList.remove('is-active')
      console.log(element.classList)
    },
    showModal: function (dono) {
      var element = document.getElementById(dono)
      element.classList.add('is-active')
    },
    // for testing
    showModal2: function () {
      var element = document.getElementById('lol')
      element.classList.add('is-active')
    }
  }
}
</script>
<style>
</style>
