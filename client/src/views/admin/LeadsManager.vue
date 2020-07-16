<template>
  <div class="table-container section">
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
        <tr v-for="lead in leads" v-bind:key="lead._id">
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
      currentSort: 'resolved',
      currentSortDir: 'desc'
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
      this.sortLeads()
    },
    sortLeads: function () {
      console.log('triggered')
      return this.leads.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    }
  },
  mounted () {
    this.verifyAdmin()
    this.getLeads()
    this.sortLeads()
  },
  created () {
    this.$emit('update:layout', InternalLayout)
  }
}
</script>
