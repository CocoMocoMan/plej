<template>
  <div class="section">
    <h1 class="title">Manage Users</h1>
    <hr />
    <h3 class="title is-5">Create User</h3>
    <form v-on:submit="createUser">
      <div class="columns is-multiline is-centered">
        <div class="column is-3">
          <div class="field">
            <label class="label">Name</label>
            <div class="control has-icons-left">
              <input class="input" type="text" name="name" placeholder="Name" />
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Alias</label>
            <div class="control has-icons-left">
              <input class="input" type="text" name="alias" placeholder="Alias" />
              <span class="icon is-small is-left">
                <i class="fa fa-user-secret"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input class="input" type="text" name="email" placeholder="Email" />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input class="input" type="password" name="password" placeholder="Password" />
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <div class="control">
              <input
                class="input button is-primary is-rounded is-strong has-text-white"
                type="submit"
                value="Create User"
              />
            </div>
          </div>
        </div>
      </div>
      <div ref="errors" class="has-text-danger"></div>
    </form>
    <hr />
    <div class="table-container">
      <table class="table is-striped is-bordered is-hoverable is-fullwidth is-narrow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Alias</th>
            <th>Email</th>
            <th>Links</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in viewUsers" v-bind:key="user.email">
            <th>{{ user.name }}</th>
            <th>{{ user.alias }}</th>
            <th>{{ user.email }}</th>
            <th>
              <router-link
                :to="{ name: 'AdminLinkManager', params: { userID: user._id }}"
                class="button is-primary is-rounded is-small"
              >Manage</router-link>
            </th>
            <th>
              <button
                class="button is-warning is-rounded is-small is-strong"
                v-on:click="openModal(user)"
              >Delete</button>
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Alias</th>
            <th>Email</th>
            <th>Links</th>
          </tr>
        </tfoot>
      </table>
      <div class="is-size-7 is-italics">
        Showing {{ (currentPage - 1) * pageSize + 1}} -
        {{ currentPage * pageSize > users.length ? users.length: currentPage * pageSize }} of
        {{ users.length }} Results
        <div>
          <a href="#" v-on:click="changePageSize(10)">
            <u>10</u>
          </a>
          <a href="#" v-on:click="changePageSize(25)">
            <u>25</u>
          </a>
          <a href="#" v-on:click="changePageSize(users.length)">
            <u>All</u>
          </a>
        </div>
      </div>
    </div>
    <div class="modal" :class="modalActive ? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="model-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Are you sure you want to delete account for
            <br />
            <span class="tag is-primary is-large">{{ modalUser ? modalUser.email: '' }}</span>
            <span class="subtitle is-5 is-strong">(This cannot be undone)</span>
          </p>
        </header>
        <footer class="modal-card-foot">
          <button class="button is-rounded is-white" v-on:click="closeModal">Cancel</button>
          <button class="button is-warning is-rounded is-strong" v-on:click="deleteUser">Delete</button>
        </footer>
        <p>hi</p>
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
  name: 'UserManager',
  data () {
    return {
      users: [],
      viewUsers: [],
      pageSize: 10,
      currentPage: 1,
      modalActive: false,
      modalUser: undefined
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
    getUsers: function () {
      let self = this
      axios.get('/api/admin/users')
        .then(response => {
          self.$set(this, 'users', response.data.users)
          this.viewUsers = this.sortUsers()
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
    createUser: function (e) {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let name = e.target.elements.name.value
      let alias = e.target.elements.alias.value
      let register = () => {
        let data = {
          email: email,
          password: password,
          name: name,
          alias: alias
        }
        axios.post('/api/auth/register', data)
          .then((response) => {
            window.location.reload()
          })
          .catch((err) => {
            if (err.response && err.response.status === 500) {
              this.$refs.errors.textContent = '*' + err.response.data.info.message
            }
          })
      }
      register()
    },
    nextPage: function () {
      if ((this.currentPage * this.pageSize) < this.users.length) this.currentPage++
      this.viewUsers = this.sortUsers()
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--
      this.viewUsers = this.sortUsers()
    },
    changePageSize: function (pageSize) {
      this.pageSize = pageSize
      this.viewUsers = this.sortUsers()
    },
    sortUsers: function () {
      return this.users.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize
        let end = this.currentPage * this.pageSize
        if (index >= start && index < end) return true
      })
    },
    openModal: function (user) {
      this.modalUser = user
      this.modalActive = true
    },
    closeModal: function () {
      this.modalUser = undefined
      this.modalActive = false
    },
    deleteUser: function () {
      axios.get('/api/admin/deleteuser/' + this.modalUser._id)
        .then(() => {
          window.location.reload()
        })
    }
  },
  mounted () {
    this.verifyAdmin()
    this.getUsers()
  },
  created () {
    this.$emit('update:layout', InternalLayout)
  }
}
</script>
