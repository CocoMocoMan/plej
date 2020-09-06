<template>
  <div>
    <div class="dash-container is-rounded">
      <h2>Last 5 Donations</h2>
      <ul>
        <li>
          <p>{{lastFiveDonos[0]}}: ${{lastFiveDonoAmounts[0]}}</p>
          <p>{{lastFiveDonos[1]}}: ${{lastFiveDonoAmounts[1]}}</p>
          <p>{{lastFiveDonos[2]}}: ${{lastFiveDonoAmounts[2]}}</p>
          <p>{{lastFiveDonos[3]}}: ${{lastFiveDonoAmounts[3]}}</p>
          <p>{{lastFiveDonos[4]}}: ${{lastFiveDonoAmounts[4]}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "donoList",
  props: {
    lastFiveDonos: Array,
    lastFiveDonoAmounts: Array
  }
};
</script>
<style>
</style>
