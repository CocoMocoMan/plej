<template>
  <section class="hero is-medium is-default is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5 is-offset-1 landing-caption">
            <h1 class="title is-1 is-bold is-spaced">Oops....</h1>
            <h2 class="subtitle is-1 is-bold is-spaced">You're not supposed to be here.</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ExternalLayout from '../layouts/External'
export default {
  name: 'InvalidLink',
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>
