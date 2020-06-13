<template>
  <div>
    <h2>Register</h2>
    <form v-on:submit="register">
      <input type="text" name="email" /><br>
      <input type="password" name="password" /><br>
      <input type="submit" value="Register" />
    </form>
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
      let register = () => {
        let data = {
          email: email,
          password: password
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
