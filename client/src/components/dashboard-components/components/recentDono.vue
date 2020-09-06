<template>
  <div>
    <div class="dash-container">
      <h2>Most Recent Donation</h2>
      <p>{{lastDono}}</p>
      <p>${{lastDonoAmount}}</p>
      <p>{{lastDonoMessage}}</p>
      <p>Date: {{ lastDonoDate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "recentDono",
  props: {
    lastDono: String,
    lastDonoAmount: String, Number,
    lastDonoMessage: String,
    lastDonoDate: String
  }
};
</script>

<style>
</style>

