<template>
  <!-- Tile holder -->
  <div class="tile is-ancestor">
    <!-- Vertical Tile -->
    <div class="tile is-parent is-vertical dash-card">
      <!-- Title -->
      <div class="tile container">
        <p>
          <span class="dash-title is-size-4 pl-2 pr-2">Analytics</span>
        </p>
      </div>
      <div class='tile container'>
          <img src="../../assets/construction.png" alt="Construction pig" style="height: 10rem;" />
      </div>
      <div class='tile container'>
          <p class='is-size-4'>Under Construction</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DashAnalytics',
  props: {
    user: {
      links: []
    }
  }
}
</script>
<style>
</style>
