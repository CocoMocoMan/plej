<template>
  <div class="columns is-centered is-multiline section">
    <div class="column is-one-third is-centered">
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
              <div class="control">
                <input
                  class="input button is-primary is-rounded is-strong has-text-white"
                  type="submit"
                  value="Log In"
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
  name: 'Login',
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
    login: function (e) {
      e.preventDefault()
      let self = this
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let login = () => {
        let data = {
          email: email,
          password: password
        }
        axios.post('/api/auth/login', data)
          .then((response) => {
            router.push('/dashboard')
          })
          .catch((err) => {
            if (err.response && err.response.status === 500) {
              self.handleError(err.response.data.info.message)
            }
          })
      }
      login()
    },
    checkUrls: function () {
      console.log(this)
      if (location.host !== 'localhost:8080') {
        this.oauthUrl = `https://${location.host}/api/auth/`
      }
    },
    checkError: function () {
      if (this.$route.params.error === 'error') {
        this.handleError('Something went wrong. Please try again later.')
      } else if (this.$route.params.error) {
        router.push('/invalidlink')
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
    this.checkError()
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>
