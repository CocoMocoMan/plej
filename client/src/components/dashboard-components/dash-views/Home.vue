<template>
  <div class="dash-container">
    <balance accountBalance="NA"></balance>
    <recentDono
      v-bind:lastDono="links[links.length - 1].donations[links[links.length - 1].donations.length - 1].from"
      v-bind:lastDonoAmount="links[links.length - 1].donations[links[links.length - 1].donations.length - 1].amount"
      v-bind:lastDonoMessage='links[links.length - 1].donations[links[links.length - 1].donations.length - 1].message'
      v-bind:lastDonoDate="links[links.length - 1].donations[links[links.length - 1].donations.length - 1].date"
    ></recentDono>
    <donoList
      v-bind:lastFiveDonos="[links[links.length - 1].donations[links[links.length -1].donations.length - 1].name,
      links[links.length - 2].donations[links[links.length -2].donations.length - 2].name,
      links[links.length - 3].donations[links[links.length -3].donations.length - 3].name,
      links[links.length - 4].donations[links[links.length -4].donations.length - 4].name,
      links[links.length - 5].donations[links[links.length -5].donations.length - 5].name]"
      v-bind:lastFiveDonoAmounts="[links[links.length - 1].donations[links[links.length -1].donations.length - 1].amount,
      links[links.length - 2].donations[links[links.length -2].donations.length - 2].amount,
      links[links.length - 3].donations[links[links.length -3].donations.length - 3].amount,
      links[links.length - 4].donations[links[links.length -4].donations.length - 4].amount,
      links[links.length - 5].donations[links[links.length -5].donations.length - 5].amount]"
    />
  </div>
</template>
<script>
import recentDono from "../components/recentDono";
import balance from "../components/balance";
import donoList from "../components/donoList"; 

export default {
  name: "Home",
  components: {
    recentDono,
    balance,
    donoList
  },

  data() {
    return {
      user: {
        name: '',
        email: '',
        alias: '',
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
}
</script>

<style>

</style>


