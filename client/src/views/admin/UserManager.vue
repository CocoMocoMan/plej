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
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.email">
            <th>{{ user.name }}</th>
            <th>{{ user.alias }}</th>
            <th>{{ user.email }}</th>
            <th>
              <router-link
                :to="{ name: 'AdminLinkManager', params: { userID: user._id }}"
                class="button is-primary is-rounded is-small is-centered"
              >Manage</router-link>
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//  import router from '../../router'
//  import InternalLayout from '../../layouts/Internal'
export default {
  name: 'UserManager',
  data () {
    return {
      users: []
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
<<<<<<< HEAD
      let self = this
      axios.get('/api/admin/users')
        .then(response => {
          self.$set(this, 'users', response.data.users)
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
            console.log('here')
            window.location.reload()
          })
          .catch((err) => {
            if (err.response && err.response.status === 500) {
              this.$refs.errors.textContent = '*' + err.response.data.info.message
            }
          })
      }
      register()
=======
      //  let self = this
      axios.get('/api/auth/user')
>>>>>>> 1eb5764233f98fbd3d2b0be5e897e3d1fb57a979
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
