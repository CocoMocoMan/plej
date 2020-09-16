<template>
    <div>
        <ul>
            <li><router-link to='/dashboard/'>Home</router-link></li>
            <li><router-link to='/dashboard/dash-links'>Links</router-link></li>
            <li><router-link to='/dashboard/dash-donos'>Donations</router-link></li>
            <li>Analytics</li>
            <li>Billing</li>
        </ul>
    </div>
</template>
<script>

export default {
  name: 'DashNav'

}
</script>
<style>
.dash-card {
        background-color: #f8f8f8;
        box-shadow: 2px 2px rgba(136, 136, 136, 0.3);
        border-radius: 0.5rem;
    }
</style>
