<template>
  <div>
    <ul>
      <li>
        <a v-on:click="changeComponent(dashHome)" class="linky">Home</a>
      </li>
      <li>
        <a v-on:click="changeComponent(dashLinks)" class="linky">Links</a>
      </li>
      <li>
        <a v-on:click="changeComponent(dashDonos)" class="linky">Donations</a>
      </li>
<<<<<<< HEAD
      <li>Analytics</li>
      <li>
        <a v-on:click="changeComponent(DashBilling)" class="linky">Billing</a>
      </li>
=======
      <li><a v-on:click="changeComponent(dashAnalytics)" class='linky'>Analytics</a></li>
      <li>Billing</li>
>>>>>>> 485f5f4b9356a3cb53e5aa13257f3188a301b849
    </ul>
  </div>
</template>
<script>
import DashHome from './DashHome'
import DashLinks from './DashLinks'
import DashDonos from './DashDonos'
<<<<<<< HEAD
import DashBilling from './DashBilling'
=======
import DashAnalytics from './DashAnalytics'
>>>>>>> 485f5f4b9356a3cb53e5aa13257f3188a301b849

export default {
  name: 'DashNav',
  components: {
    DashHome,
    DashLinks,
    DashDonos,
<<<<<<< HEAD
    DashBilling
=======
    DashAnalytics
>>>>>>> 485f5f4b9356a3cb53e5aa13257f3188a301b849
  },
  data () {
    return {
      dashHome: DashHome,
      dashLinks: DashLinks,
      dashDonos: DashDonos,
<<<<<<< HEAD
      DashBilling: DashBilling
=======
      dashAnalytics: DashAnalytics
>>>>>>> 485f5f4b9356a3cb53e5aa13257f3188a301b849
    }
  },
  props: {
    currComponent: DashHome
  },
  methods: {
    changeComponent: function (component) {
      this.$emit('update:currComponent', component)
    }
  }
}
</script>

<style>
.dash-card {
  background-color: #f8f8f8;
  box-shadow: 2px 2px rgba(136, 136, 136, 0.3);
  border-radius: 0.5rem;
}
</style>
