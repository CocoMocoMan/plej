<template>
  <div class="dash-conatiner">
    <div v-for="links in user.links" :key="links">
      <div v-for="donations in links.donations" :key="donations">
        <div>{{donations.from}}: {{donations.amount}} ({{donations.date}})</div>
        <div>{{donations.message}}</div>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: "fullDonoList",

  data() {
    return {
      user: {
        links: []
      }
    };
  },
  methods: {
    getUserData: function () {
      let self = this
      axios.get('/api/auth/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log(err.response.data.message)
            router.push('/login')
          }
        })
    }
  },
  mounted () {
    this.getUserData()
  }
};
</script>
<style>
</style>
