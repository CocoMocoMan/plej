<template>
  <section class="hero is-big is-default is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5 is-offset-1 landing-caption">
            <h1 class="title is-1 is-bold is-spaced">Thanks for your plej!</h1>
            <div class="columns">
              <div class="column">
                <p>Plej Amount: ${{ donation.amount }}</p>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <router-link
                  class="button is-primary is-strong"
                  :to="{ path: '/donate/' + linkToken}"
                >Donate Again</router-link>
              </div>
            </div>
          </div>
          <div class="column is-5">
            <figure class="image is-4by3">
              <img src="../assets/img-landing-1.jpg" alt="Description" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from '../router'
import ExternalLayout from '../layouts/External'
export default {
  name: 'PaymentForm',
  props: {
    linkToken: '',
    donation: {
      amount: ''
    }
  },
  data () {
    return {
      donate_url: `http://${location.host}/donate/`
    }
  },
  methods: {
    checkValid () {
      if (!(this.linkToken && this.donation)) {
        router.push({
          name: 'InvalidLink'
        })
      }
    }
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
    this.$emit('update:useExternalLinks', false)
  },
  mounted () {
    this.checkValid()
  }

}
</script>
