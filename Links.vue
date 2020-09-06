<template>
  <div class="container is-rounded">
    <div v-for="links in user.links" :key="links">
      <div>Token: {{links.link_token}}</div>
      <div>Content: {{links.link_content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Links",
  data() {
    return {
      linkJson: json,
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
