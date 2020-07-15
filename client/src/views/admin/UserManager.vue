<template>
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Alias</th>
      <th>Email</th>
      <th>Links</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th>Name</th>
      <th>Alias</th>
      <th>Email</th>
      <th>Links</th>
    </tr>
  </tfoot>
  </table>
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
    getUsers: function () {
      //  let self = this
      axios.get('/api/auth/user')
    }

  }
}
</script>
