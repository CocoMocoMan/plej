<template>
  <div class="columns is-centered is-multiline section">
    <div class="column is-one-third">
      <div class="card card-grey">
        <div style="padding: 3vh;">
          <div class="buttons is-centered">
            <a class="button is-youtube has-text-white linky is-large" :href="oauthUrl + 'google'">
              <span class="icon">
                <i class="fab fa-google"></i>
              </span>
              <span>Sign in with Google</span>
            </a>
            <a
              class="button is-facebook has-text-white linky is-large"
              :href="oauthUrl + 'facebook'"
            >
              <span class="icon">
                <i class="fab fa-facebook"></i>
              </span>
              <span>Sign in with Facebook</span>
            </a>
            <a class="button is-twitter has-text-white linky is-large" :href="oauthUrl + 'twitter'">
              <span class="icon">
                <i class="fab fa-twitter"></i>
              </span>
              <span>Sign in with Twitter</span>
            </a>
          </div>
          <div class="divider">OR</div>
          <form v-on:submit="register">
            <div class="field">
              <label class="label">Name</label>
              <div class="control has-icons-left">
                <input class="input is-rounded" type="text" name="name" placeholder="Name" />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Alias</label>
              <div class="control has-icons-left">
                <input class="input is-rounded" type="text" name="alias" placeholder="Alias" />
                <span class="icon is-small is-left">
                  <i class="fa fa-user-secret"></i>
                </span>
              </div>
            </div>
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
              <label class="label">
                Password
                <span
                  class="has-tooltip-arrow has-tooltip-info has-text-info"
                  data-tooltip="Password must be between 8-16 characters and contain at least one uppercase letter and one number."
                >
                  <i class="fa fa-info-circle"></i>
                </span>
              </label>
              <div class="control has-icons-left">
                <input
                  class="input is-rounded"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control has-icons-left">
                <input
                  class="input is-rounded"
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                />
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
                  value="Sign Up"
                />
              </div>
            </div>
          </form>
          <div ref="err" class="has-text-danger subtitle is-6 mt-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import ExternalLayout from '../layouts/External'
export default {
  name: 'Register',
  data () {
    return {
      oauthUrl: `http://localhost:3000/api/auth/`
    }
  },
  methods: {
    checkLogin: function () {
      axios.get('/api/auth/user')
        .then((response) => {
          console.log('Logged in')
          router.push('/dashboard')
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
          }
        })
    },
    register: function (e) {
      e.preventDefault()
      let self = this
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let confirmpassword = e.target.elements.confirmpassword.value
      let name = e.target.elements.name.value
      let alias = e.target.elements.alias.value
      if (password !== confirmpassword) {
        self.handleError('Passwords do not match')
        return
      }
      let register = () => {
        let data = {
          email: email,
          password: password,
          name: name,
          alias: alias
        }
        axios.post('/api/auth/register', data)
          .then((response) => {
            console.log(response.success)
            router.push('/dashboard')
          })
          .catch((err) => {
            if (err.response && err.response.status === 500) {
              self.handleError(err.response.data.info.message)
            }
          })
      }
      register()
    },
    checkUrls: function () {
      if (location.host !== 'localhost:8080') {
        this.oauthUrl = `https://${location.host}/api/auth/`
      }
    },
    handleError: function (errMsg) {
      let errorElement = this.$refs.err
      errorElement.textContent = errMsg
    }
  },
  mounted () {
    this.checkLogin()
    this.checkUrls()
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>

<style>
.is-strong {
  font-weight: bold;
}
</style>
