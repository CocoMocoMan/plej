<template>
  <!-- Overall tile container -->
  <div class="tile is-ancestor">
    <!-- Vertical tile container for two rows -->
    <div class="tile is-vertical">
      <!-- Upper row -->
      <div class="tile">
        <!-- Payment Setup Card -->
        <div class="tile is-parent is-vertical dash-card is-10">
          <!-- Payment Setup upper section -->
          <div class="tile container">
            <p>
              <span class="dash-title is-size-5">Payment Settings</span>
            </p>
          </div>
          <!-- Payment Setup lower section -->
          <div class="tile">
            <!-- Left lower section -->
            <div class="tile is-vertical has-text-centered">
              <div v-if="!account.details_submitted">
                <p class="title is-6 mb-2">
                  Click the link below to connect your bank account and start
                  using Plej!
                </p>
                <a :href="accountLink">
                  <img src="../../assets/connectstripe.png" />
                </a>
              </div>
              <div v-else>
                <p class="title is-5">
                  Your account is ready to recieve payments!
                </p>
                <p class="title is-7 mb-1">
                  To edit your payment settings, click the link below
                </p>
                <a :href="loginLink" target="_blank">
                  <img src="../../assets/connectstripe.png" />
                </a>
              </div>
            </div>
          </div>
        </div>
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
            <p class="subtitle is-7 mb-4">
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
        <!-- Transactions card -->
        <div class="tile is-parent is-vertical dash-card is-12">
          <!-- Transactions title -->
          <div class="tile container">
            <span class="dash-title is-size-5">Transaction History</span>
          </div>
          <div class="tile container is-parent"></div>
          <div class="tile container">
            <table class="table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th v-on:click="sort('date')">
                    Date
                    <span
                      v-if="currentSortDir === 'desc'"
                      :class="currentSort === 'date' ? 'has-text-primary' : ''"
                      >▼</span
                    >
                    <span
                      v-if="currentSortDir === 'asc'"
                      :class="currentSort === 'date' ? 'has-text-primary' : ''"
                      >▲</span
                    >
                  </th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="transaction in transactions"
                  v-bind:key="transaction.id"
                >
                  <th>{{ transaction.type }}</th>
                  <th>${{ transaction.amount / 100 }}</th>
                  <th>{{ transaction.status }}</th>
                  <th>{{ formatDate(transaction.created) }}</th>
                  <th></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
export default {
  name: 'DashBilling',
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
      account: {
        details_submitted: undefined
      },
      accountLink: '',
      loginLink: '',
      balance: undefined,
      transactions: []
    }
  },
  methods: {
    getAccount: function () {
      let self = this
      axios.get('/api/payment/account')
        .then((response) => {
          self.$set(this, 'account', response.data.account)
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    },
    getAccountLink: function () {
      let self = this
      axios.get('/api/payment/accountlink')
        .then((response) => {
          self.accountLink = response.data.accountLink
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    },
    getLoginLink: function () {
      let self = this
      axios.get('/api/payment/loginlink')
        .then((response) => {
          self.loginLink = response.data.loginLink
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    },
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
    formatDate: function (date) {
      let fDate = new Date(date)
      return fDate.toLocaleString()
    },
    getTransactions: function () {
      let self = this
      axios.get('/api/payment/transactions')
        .then((response) => {
          self.$set(this, 'transactions', response.data.transactions)
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
    this.getAccount()
    this.getAccountLink()
    this.getLoginLink()
    this.getStripeBalance()
    this.getTransactions()
  }
}
</script>
