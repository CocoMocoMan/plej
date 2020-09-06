<template>
  <div>
    <div class="dash-container">
      <h2>Balance</h2>
      <h3>${{accountBalance}}</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "balance",
  props: {
    accountBalance: String
  }
};
</script>
<style scoped>
  
</style>


