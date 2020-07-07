<template>
  <div class="columns is-centered is-multiline section">
    <div class="column is-one-quarter">
      <form v-on:submit="login">
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left">
            <input class="input is-rounded" type="text" name="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left">
            <input class="input is-rounded" type="password" name="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input
              class="input button is-primary is-rounded is-strong has-text-white"
              type="submit"
              value="Log In"
            />
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
  name: 'Login',
  methods: {
    checkLogin: function () {
      axios.get('/api/auth/user')
        .then((response) => {
          console.log('Logged in')
          router.push('/dashboard')
        })
        .catch((err) => {
          console.log(err.response)
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
          }
        })
    },
    login: (e) => {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let login = () => {
        let data = {
          email: email,
          password: password
        }
        axios.post('/api/auth/login', data)
          .then((response) => {
            console.log(response.data.success)
            router.push('/dashboard')
          })
          .catch((err) => {
            if (err.response && err.response.status === 500) {
              console.log(err.response.data.info.message)
            }
          })
      }
      login()
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
