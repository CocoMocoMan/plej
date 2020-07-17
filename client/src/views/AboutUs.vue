<template>
  <div class="section">
    <div class="columns is-centered">
      <div class="column is-8">
        <h2 class="title is-2 pl-4">What is Plej?</h2>
        <div class="divider">
          <img src="../assets/logo.png" style="width:2rem; height: auto;" />
        </div>
        <div>
          <p class="subtitle is-5 is-muted has-text-left pt-2 is-full">
            Plej is the link between your creations and the support of your audience.
            By providing a Plej link for your audience, you give them a quick flexible way
            to help you fund your passions. Plej connects you with quick payment options
            that eliminate the hassle for your fans. Let your fans support you with the payment methods they use daily,
            such as Apple Pay, PayPal, and Venmo.
          </p>
          <h5 class="title is-5 pt-6 pb-4">Give your supporters ease of mind</h5>
          <p class="subtitle is-5 is-muted has-text-left is-full">
            Plej provides a secure place for your fans to quickly stop by and drop you a few dollars
            without having to worry about reoccurring fees or setting up an account.
          </p>
          <h5 class="title is-5 pt-6 pb-4">Learn what’s working best</h5>

          <p class="subtitle is-5 is-muted has-text-left">
            Find out what content your fans love most.
            Set up a Plej link for each piece of content you post and find out what your audience finds valuable.
            Compare the support you get and gain valuable insights on what’s working for you.
          </p>
          <h5 class="title is-5 pt-6 pb-4">Make it easy for yourself</h5>
          <p class="subtitle is-5 is-muted has-text-left">
            Making money off your content can be complicated.
            Whether running through the hoops of complicated monetization guidelines or
            setting up advertising with a sponsor, supporting yourself doing what you love can be hard work.
            Plej is designed to be simple and quick to get up and running.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExternalLayout from '../layouts/External'
import { Affix } from 'vue-affix'
export default {
  name: 'PrivacyPolicy',
  components: {
    Affix
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>
