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
              <div v-if="user.links && user.links.length != 0">
                <linkprevue
                  v-if="user.links[0].link_content"
                  :url="user.links[0].link_content"
                >
                  <template slot-scope="props">
                    <p class="title is-4">{{ props.title }}</p>
                  </template>
                </linkprevue>
                <p v-else>{{ donate_url + user.links[0].link_token }}</p>
                <div>
                  <button
                    class="dash-button"
                    v-clipboard:copy="donate_url + user.links[0].link_token"
                  >
                    Copy Link
                  </button>
                </div>
                <p class="mt-2">
                  <u>Date</u>
                </p>
                <p class="subtitle" v-if="user.links && user.links.length != 0">
                  {{ prettifyDate(user.links[0].date) }}
                </p>
              </div>
              <p v-else>
                You haven't set up a link yet. Go to Link Manager to set up your
                first Plej link!
              </p>
            </div>
            <!-- Right lower section -->
            <div class="tile is-vertical has-text-right">
              <p class="is-size-4">
                Amount raised:
                <span class="plej-yellow">{{
                  "$" + getDonationsTotal(user.links[0])
                }}</span>
              </p>
              <p class="is-size-5">
                Donations: {{ getNumberOfDonations(user.links[0]) }}
              </p>
              <p class="is-size-5">
                Page visits: {{ getPageVisits(user.links[0]) }}
              </p>
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
          <div class="tile container mt-4">
            <p class="is-size-3" ref="balance">${{ getReadableBalance() }}</p>
          </div>
          <div class="tile container">
            <p class="subtitle is-7 mb-2">
              Available Soon: ${{ getPendingReadableBalance() }}
            </p>
          </div>
          <!-- Balance transfer button section -->
          <div class="tile container">
            <div>
              <button class="dash-button" v-on:click="transferBalance()">
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Lower row -->
      <div class="tile">
        <!-- Analytics card -->
        <div class="tile is-parent is-vertical dash-card is-8">
          <!-- Analytics title -->
          <div class="tile container">
            <p>
              <span class="dash-title is-size-5">Analytics</span>
            </p>
          </div>
          <div class="tile container is-parent">
            <img
              src="../../assets/construction.png"
              alt="Construction pig"
              style="height: 10rem"
            />
          </div>
          <div class="tile container">
            <p class="is-size-4">Under Construction</p>
          </div>
        </div>
        <!-- Last 5 donos card -->
        <div class="tile is-parent is-vertical dash-card">
          <div class="tile container">
            <p>
              <span class="dash-title is-size-5">Recent Donations</span>
            </p>
          </div>
          <!-- Last 5 donos -->
          <div class="tile container">
            <p v-if="!user.links || user.links.length == 0">
              No links yet. To get started, head to the Link Manager
            </p>
            <p v-else-if="getRecentDonations(user).length === 0">
              You haven't recieved any donations yet
            </p>
            <div v-else>
              <div class="level is-mobile">
                <div class="level-item has-text-centered mr-4">
                  <div>
                    <p class="heading has-text-primary has-text-weight-bold">
                      <i class="fa fa-usd"></i>
                      &nbsp;Amount
                    </p>
                    <p
                      v-for="donation in getRecentDonations(user)"
                      :key="donation.from"
                      class="title is-5"
                    >
                      ${{ donation.amount }}
                    </p>
                  </div>
                </div>
                <div class="level-item has-text-centered mr-4 ml-4">
                  <div>
                    <p class="heading has-text-primary has-text-weight-bold">
                      <i class="fa fa-paper-plane"></i>
                      &nbsp;From
                    </p>
                    <p
                      v-for="donation in getRecentDonations(user)"
                      :key="donation.from"
                      class="title is-5"
                    >
                      <span v-if="!donation.from">None</span>
                      {{ donation.from }}
                    </p>
                  </div>
                </div>
                <div class="level-item has-text-centered ml-4">
                  <div>
                    <p class="heading has-text-primary has-text-weight-bold">
                      <i class="fa fa-calendar"></i>
                      &nbsp;Date
                    </p>
                    <p
                      v-for="donation in getRecentDonations(user)"
                      :key="donation.from"
                      class="title is-5"
                    >
                      {{ prettifyDateShort(donation.date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tile container">
            <div v-if="!user.links || user.links.length == 0">
              <button
                class="dash-button mt-6"
                v-on:click="changeComponent(dashLinks)"
              >
                Go to Link Manager
              </button>
            </div>
            <div v-else>
              <button
                class="dash-button mt-6"
                v-on:click="changeComponent(dashDonos)"
              >
                Go to Donations
              </button>
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
import DashLinks from './DashLinks'
import DashDonos from './DashDonos'
export default {
  name: 'DashHome',
  components: {
    linkprevue,
    DashLinks,
    DashDonos
  },
  props: {
    user: {
      name: '',
      email: '',
      links: [],
      date: ''
    }
  },
  data () {
    return {
      donate_url: `http://${location.host}/donate/`,
      balance: undefined,
      dashLinks: DashLinks,
      dashDonos: DashDonos
    }
  },
  methods: {
    getStripeBalance: function () {
      let self = this
      axios.get('/api/payment/balance')
        .then((response) => {
          self.$set(this, 'balance', response.data.balance)
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    },
    transferBalance: function () {
      let self = this
      if (self.balance.available[0].amount === 0) { return }
      axios.get('/api/payment/payout')
        .then(response => {
          self.updateBalance()
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    },
    updateBalance: function () {
      this.$refs.balance = this.getReadableBalance()
    },
    getReadableBalance: function () {
      return this.balance.available[0].amount / 100.0
    },
    getPendingReadableBalance: function () {
      return this.balance.instant_available[0].amount / 100.0
    },
    getDonationsTotal: function (link) {
      let total = 0
      if (!link) return total
      for (let donation of link.donations) {
        total += donation.amount
      }
      return total
    },
    getNumberOfDonations: function (link) {
      if (!link) return 0
      return link.donations.length
    },
    getPageVisits: function (link) {
      if (!link) return 0
      return Math.round((link.page_visits) / 2) // FIX: divide by 2 since api doubles amount of page visits. Remove /2 when api fixed
    },
    prettifyDate: function (date) {
      return new Date(date).toDateString()
    },
    prettifyDateShort: function (date) {
      let dateObj = new Date(date)
      return (dateObj.getMonth() + 1) + '/' + dateObj.getDate()
    },
    getRecentDonations: function (user) {
      let donations = []
      for (let link of user.links) {
        donations = donations.concat(link.donations)
      }
      return donations.sort((a, b) => (new Date(b.date) - new Date(a.date))).splice(0, 3)
    },
    changeComponent: function (component) {
      this.$emit('update:currComponent', component)
    }
  },
  mounted () {
    this.getStripeBalance()
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
