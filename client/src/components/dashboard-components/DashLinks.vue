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
                    <button v-on:click='generateLinkToken()' class="dash-button is-size-6">Generate New Link</button>
                </div>
            </div>
            <hr style="border: 1px solid grey">
            <!-- Link section -->
            <div v-for='link in user.links' :key='link.link_content' class="tile is-child">
                <div class="level">
                  <div v-if='link.link_content == null'>
                    <p class='is-size-5'>No content added to link</p>
                  </div>
                  <div class="level-left">
                      <linkprevue :url='link.link_content'>
                        <template slot-scope='props'>
                          <p class='is-size-5'>{{props.title}}</p>
                        </template>
                      </linkprevue>
                  </div>
                  <div class="level-right">
                      <button v-on:click='showModal(link.link_token)' class="dash-button is-size-5">Manage Link</button>
                  </div>
                </div>
                <div class="level">
                  <!-- Amount Raised -->
                    <div class="level-left">
                      <p v-if='sumDonations(link.donations) === 0'>$0</p>
                      <p v-else>Amount raised: {{sumDonations(link.donations)}}</p>
                    </div>
                </div>
                <div class='level'>
                  <!-- Amount of donations -->
                  <div class='level-left'>
                    <p>Donations: {{link.donations.length}}</p>
                  </div>
                  <div class='level-right'>
                    <p>Date: {{link.date.slice(0,10)}}</p>
                  </div>
                </div>
                <div :id='link.link_token' class='modal' style='background-color: rgba(0, 0, 0, 0.301);'>
                  <div class='modal-card'>
                    <linkcomponent v-bind:iLink='link'/>
                    <div class='level'>
                      <div class='level-item'>
                        <button v-on:click='closeModal(link.link_token)' class='dash-button is-size-5'>Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr style="border: 1px solid grey">
            </div>
        </div>
    </div>
</template>
<script>
import linkprevue from 'link-prevue'
import linkcomponent from '../Link'
import axios from 'axios'
import router from '../../router'
export default {
  name: 'DashLinks',
  components: {
    linkprevue,
    linkcomponent
  },
  props: {
    user: {
      name: '',
      links: []
    }
  },
  methods: {
    sumDonations: function (donations) {
      var total
      for (var i = 0; i < donations.length; i++) {
        total += donations[i]
      }
      console.log(total)
      return total
    },
    // Testing purposes
    displayUserName: function (user) {
      return user.name
    },
    closeModal: function (token) {
      var element = document.getElementById(token)
      element.classList.remove('is-active')
      console.log(element.classList)
    },
    showModal: function (token) {
      var element = document.getElementById(token)
      element.classList.add('is-active')
    },
    generateLinkToken: function () {
      let self = this
      axios.get('/api/link/generatelinktoken')
        .then((response) => {
          self.getUserData()
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/')
            }
          }
        })
    }
  }
}
</script>
<style>
  .plej-modal {
    width: 50%;
    margin-left: 25%;
    height: 50%;
    margin-top: 10%;
  }
</style>
