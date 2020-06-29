<template>
  <section class="hero is-fullheight is-default is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-5 is-offset-1 landing-caption">
            <h1 class="title is-1 is-bold is-spaced">
              Thanks for your plej!
            </h1>
            <div class="columns">
              <div class="column">
                 <p>Plej Amount: ${{ donation.amount }}</p>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <a class="button is-primary is-strong" :href= "donate_url + linkToken">Donate Again</a>
              </div>
            </div>          </div>
          <div class="column is-5">
            <figure class="image is-4by3">
              <img src="../assets/img-landing-1.jpg" alt="Description">
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from '../router'
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
      donate_url: 'http://localhost:8080/donate/'
    }
  },
  methods: {
    checkValid () {
      if (!(this.linkToken && this.donation)) {
        router.push('/invalidlink')
      }
    }
  },
  mounted () {
    this.checkValid()
  }

}
</script>
