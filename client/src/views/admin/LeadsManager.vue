<template>
  <div class="section">
    <h1 class="title">Manage Leads</h1>
    <hr />
    <div class="table-container">
      <table class="table is-striped is-bordered is-hoverable is-fullwidth is-narrow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th v-on:click="sort('date')">
              Date
              <span
                v-if="currentSortDir==='desc'"
                :class="currentSort === 'date' ? 'has-text-primary': ''"
              >▼</span>
              <span
                v-if="currentSortDir==='asc'"
                :class="currentSort === 'date' ? 'has-text-primary': ''"
              >▲</span>
            </th>
            <th v-on:click="sort('resolved')">
              Status
              <span
                v-if="currentSortDir==='desc'"
                :class="currentSort === 'resolved' ? 'has-text-primary': ''"
              >▼</span>
              <span
                v-if="currentSortDir==='asc'"
                :class="currentSort === 'resolved' ? 'has-text-primary': ''"
              >▲</span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in viewLeads" v-bind:key="lead._id">
            <th>{{ lead.fName + ' ' + lead.lName }}</th>
            <th>{{ lead.email }}</th>
            <th>{{ lead.message }}</th>
            <th>{{ formatDate(lead.date) }}</th>
            <th>
              <div v-if="lead.resolved" class="has-text-info">Resolved</div>
              <div v-else class="has-text-danger">Needs Attention</div>
            </th>
            <th>
              <button
                v-if="lead.resolved"
                v-on:click="markUnresolved(lead)"
                class="button is-rounded is-danger is-small"
              >Mark Unresolved</button>
              <button
                v-else
                v-on:click="markResolved(lead)"
                class="button is-rounded is-info is-small"
              >Mark Resolved</button>
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div class="is-size-7 is-italics">
        Showing {{ (this.currentPage - 1) * this.pageSize + 1}} -
        {{ this.currentPage * this.pageSize > this.leads.length ? this.leads.length: this.currentPage * this.pageSize }} of
        {{ this.leads.length }} Results
        <div>
          <a href="#" v-on:click="changePageSize(10)">
            <u>10</u>
          </a>
          <a href="#" v-on:click="changePageSize(25)">
            <u>25</u>
          </a>
          <a href="#" v-on:click="changePageSize(this.leads.length)">
            <u>All</u>
          </a>
        </div>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-narrow">
        <button
          v-on:click="prevPage"
          class="button is-rounded is-primary is-strong is-small"
        >Previous</button>
      </div>
      <div class="column is-narrow">
        <button v-on:click="nextPage" class="button is-rounded is-primary is-strong is-small">Next</button>
      </div>
    </div>
    <router-link
      :to="{ name: 'AdminDashboard' }"
      class="button is-rounded is-primary is-strong"
    >Back</router-link>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import InternalLayout from '../../layouts/Internal'
export default {
  name: 'LeadsManager',
  data () {
    return {
      leads: [],
      viewLeads: [],
      currentSort: 'date',
      currentSortDir: 'desc',
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    verifyAdmin: function () {
      axios.get('/api/admin/auth')
        .then()
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/admin/login')
          }
        })
    },
    getLeads: function () {
      let self = this
      axios.get('/api/admin/leads')
        .then(response => {
          self.$set(this, 'leads', response.data.leads)
          this.viewLeads = this.sortLeads()
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/admin/login')
            }
          }
        })
    },
    markResolved: function (lead) {
      axios.get('/api/admin/resolvelead/' + lead._id)
        .then(lead.resolved = true)
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/admin/login')
            }
          }
        })
    },
    markUnresolved: function (lead) {
      axios.get('/api/admin/unresolvelead/' + lead._id)
        .then(lead.resolved = false)
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/admin/login')
            }
          }
        })
    },
    formatDate: function (date) {
      let fDate = new Date(date)
      return fDate.toLocaleString()
    },
    sort: function (s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
      this.viewLeads = this.sortLeads()
    },
    nextPage: function () {
      if ((this.currentPage * this.pageSize) < this.leads.length) this.currentPage++
      this.viewLeads = this.sortLeads()
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--
      this.viewLeads = this.sortLeads()
    },
    changePageSize: function (pageSize) {
      this.pageSize = pageSize
      this.viewLeads = this.sortLeads()
    },
    sortLeads: function () {
      return this.leads.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize
        let end = this.currentPage * this.pageSize
        if (index >= start && index < end) return true
      })
    }
  },
  mounted () {
    this.verifyAdmin()
    this.getLeads()
  },
  created () {
    this.$emit('update:layout', InternalLayout)
  }
}
</script>
