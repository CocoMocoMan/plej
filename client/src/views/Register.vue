<template>
  <div class="columns is-centered is-multiline">
    <div class="column is-one-quarter">
      <form v-on:submit="register">
        <div class="field">
          <label class="label">Name</label>
          <div class="control has-icons-left">
            <input class ="input is-rounded" type="text" name="name" placeholder="Name" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Alias</label>
          <div class="control has-icons-left">
            <input class ="input is-rounded" type="text" name="alias" placeholder="Alias" />
            <span class="icon is-small is-left">
              <i class="fas fa-user-secret"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input class ="input is-rounded" type="text" name="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
            <input class ="input is-rounded" type="password" name="password" placeholder="Password"/>
             <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input button is-primary is-rounded is-strong" type="submit" value="Sign Up" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import ExternalLayout from '../layouts/External'
export default {
  name: 'Register',
  methods: {
    checkLogin: function () {
      axios.get('/api/user')
        .then((response) => {
          console.log('Logged in')
          router.push('/dashboard')
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    register: (e) => {
      console.log('jere')
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
        axios.post('/api/register', data)
          .then((response) => {
            console.log(response.success)
            router.push('/dashboard')
          })
          .catch((err) => {
            console.log(err.response.data.info.message)
          })
      }
      register()
    }
  },
  mounted () {
    this.checkLogin()
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>

<style>
  .is-strong {
    font-weight: bold
  }
</style>
