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
      <li>Analytics</li>
      <li>Billing</li>
    </ul>
  </div>
</template>
<script>
import DashHome from './DashHome'
import DashLinks from './DashLinks'
import DashDonos from './DashDonos'

export default {
  name: 'DashNav',
  components: {
    DashHome,
    DashLinks,
    DashDonos
  },
  data () {
    return {
      dashHome: DashHome,
      dashLinks: DashLinks,
      dashDonos: DashDonos
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
