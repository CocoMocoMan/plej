<template>
  <section class="hero is-medium is-default is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-narrow landing-caption">
            <h1 class="title is-1 is-bold is-spaced">Thanks for your Plej!</h1>
            <p class="subtitle is-5 has-text-weight-light">
              A receipt has been emailed to you at
              <b>{{ email }}</b>
            </p>
            <a
              class="link is-size-6"
              :href="paymentIntent.charges.data[0].receipt_url"
              target="_blank"
            >
              <u>View Receipt</u>
            </a>
            <div class="divider">
              <img src="../assets/logo.png" style="width:2rem; height: auto;" />
            </div>
            <div class="level is-mobile" style="margin-bottom:2.5rem; margin-top:1.5rem;">
              <div class="level-item">
                <div class="title is-5">
                  <span class="tag is-primary">
                    <i class="fa fa-usd"></i>
                    &nbsp;Amount
                  </span>
                  ${{ donation.amount }}
                </div>
              </div>
              <div class="level-item">
                <div class="title is-5">
                  <span class="tag is-primary">
                    <i class="fa fa-paper-plane"></i>
                    &nbsp;From
                  </span>
                  <span v-if="!donation.from">None</span>
                  {{ donation.from }}
                </div>
              </div>
              <div class="level-item">
                <div class="title is-5">
                  <span class="tag is-primary">
                    <i class="fa fa-paper-plane"></i>
                    &nbsp;To
                  </span>
                  {{ creator.alias }}
                </div>
              </div>
            </div>
            <hr />
            <div class="columns is-centered is-mobile">
              <div class="column is-narrow">
                <router-link
                  class="button is-primary is-rounded is-strong is-centered"
                  style="margin-top:1rem;"
                  :to="{ path: '/donate/' + linkToken}"
                >Donate Again</router-link>
              </div>
              <!-- <div class="column is-narrow">
                <router-link
                  class="button is-primary is-rounded is-strong is-centered is-small"
                  style="margin-top:1rem;"
                  :to="{ name: 'Landing' }"
                >Learn More</router-link>
              </div>-->
            </div>
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
      amount: '',
      from: '',
      message: ''
    },
    creator: {
      alias: ''
    },
    email: '',
    paymentIntent: {
      charges: {
        data: {
          receipt_url: ''
        }
      }
    }
  },
  data () {
    return {
      donate_url: `http://${location.host}/donate/`
    }
  },
  methods: {
    checkValid () {
      if (!(this.linkToken && this.donation && this.email)) {
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
