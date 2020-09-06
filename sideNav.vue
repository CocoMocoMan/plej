<template>
  <div>
    <div class="dash-container">
      <ul>
        <li>
          <router-link to="/dashboard/home">
            <h3>Home</h3>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/links">
            <h3>Links</h3>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/donations">
            <h3>Donations</h3>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/analytics">
            <h3>Analytics</h3>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "sideNav",
  props: {}
};
</script>
<style>
a {
  text-decoration: none;
  color: white;
}
a:hover {
  color: rgb(184, 184, 184);
}
ul {
  list-style-type: none;
}
</style>


