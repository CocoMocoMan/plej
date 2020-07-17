<template>
  <div id="payment">
    <form>
      <div ref="prbutton" disabled>
        <!-- A Stripe Element will be inserted here. -->
      </div>
      <div v-if="hasPR" class="divider">OR</div>
      <div class="card has-text-centered card-grey">
        <header class="card-header">
          <p class="card-header-title">Credit Card</p>
        </header>
        <div class="card-content">
          <div ref="card">
            <!-- A Stripe Element will be inserted here. -->
          </div>
        </div>
      </div>
      <div ref="carderrors" class="has-text-danger subtitle is-6">
        <!-- Used to display Element errors. -->
      </div>
      <p class="subtitle is-6 has-text-weight-light is-italic">
        By continuing, you accept the
        <router-link class="link" :to="{ name: 'TermsConditions' }" target="_blank">
          <u>Terms</u>
        </router-link>&nbsp;&
        <router-link class="link" :to="{ name: 'PrivacyPolicy' }" target="_blank">
          <u>Privacy Policy</u>
        </router-link>&nbsp;
      </p>
      <div class="level is-mobile">
        <div class="level-item">
          <button
            class="button is-rounded is-primary is-strong has-text-white"
            :class="isLoading ? 'is-loading' : ''"
            :disabled="lockSubmit"
            v-on:click="handleCardPayment"
          >
            Donate
            <div v-if="donation.amount">&nbsp;${{ donation.amount }}</div>
          </button>
        </div>
        <!-- <div class="level-item">
          <button class="button is-rounded is-primary is-strong has-text-white"
            :class="isLoading ? 'is-loading' : ''"  v-on:click="purchase"><i class="fa fa-dice"></i></button>
        </div>-->
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
/* eslint-disable no-undef */
export default {
  name: 'PaymentForm',
  props: {
    link: {
      link_token: '',
      link_content: ''
    },
    donation: {
      amount: '',
      from: '',
      message: ''
    },
    email: {
      value: ''
    },
    creator: {
      alias: ''
    }
  },
  data () {
    return {
      isLoading: false,
      lockSubmit: false,
      cardStyle: {
        iconStyle: 'solid',
        style: {
          base: {
            color: '#32325D',
            fontWeight: 500,
            fontFamily: 'Inter UI, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',

            '::placeholder': {
              color: 'grey'
            }
          },
          invalid: {
            color: '#E25950'
          }
        }
      },
      stripe: undefined,
      elements: undefined,
      card: undefined,
      paymentRequest: undefined,
      prButton: undefined,
      hasPR: false
    }
  },
  methods: {
    purchase: function (paymentMethod) {
      const data = {
        data:
        {
          paymentMethod: paymentMethod.id,
          token: this.link.link_token,
          donation: this.donation,
          email: this.email.value
        }
      }
      return axios.post('/api/payment/confirm', data)
        .then((response) => {
          return response.data.intent
        })
    },
    handleCardPayment: function (e) {
      e.preventDefault()
      let self = this
      self.lockSubmit = true
      self.isLoading = true
      self.stripe.createPaymentMethod({
        type: 'card',
        card: self.card
      })
        .then((result) => {
          if (result.error) {
            throw result.error
          } else if (result.paymentMethod) {
            return result.paymentMethod
          }
        })
        .then(paymentMethod => self.purchase(paymentMethod))
        .then((intent) => self.handleSuccess(intent))
        .catch(err => self.handleError(err))
    },
    handlePRPayment: function () {
      let self = this
      self.paymentRequest.on('paymentmethod',
        ev => self.purchase(ev.paymentMethod)
          .then((intent) => {
            ev.complete('success')
            self.handleSuccess(intent)
          })
          .catch((err) => {
            ev.complete('fail')
            self.handleError(err)
          })
      )
    },
    getStripeConfig () { // use this declaration syntax to access in other component methods
      return axios.get('/api/payment/config')
        .then(response => {
          return response.data
        })
    },
    createStripeAndElements: function () {
      let self = this
      return this.getStripeConfig()
        .then(stripeConfig => {
          self.stripe = Stripe(stripeConfig.publicKey, stripeConfig.options)
          self.elements = this.stripe.elements({
            fonts:
              [{
                cssSrc: 'https://fonts.googleapis.com/css?family=Roboto'
              }],
            locale: 'auto'
          })
        })
    },
    createPaymentCard: function () {
      this.card = this.elements.create('card', this.cardStyle)
      this.card.mount(this.$refs.card)
    },
    createPaymentRequestButton: function () {
      this.paymentRequest = this.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          amount: this.donation.amount * 100,
          label: 'Total'
        }
      })
      this.prButton = this.elements.create('paymentRequestButton', { paymentRequest: this.paymentRequest })
      const self = this
      this.paymentRequest.canMakePayment().then(function (result) {
        if (result) {
          self.prButton.mount(self.$refs.prbutton)
          self.hasPR = true
        }
      })
    },
    handleSuccess: function (intent) {
      router.push(
        { name: 'PaymentConfirmation',
          params: {
            donation: this.donation,
            linkToken: this.link.link_token,
            creator: this.creator,
            email: this.email.value,
            paymentIntent: intent
          }
        }
      )
    },
    handleError: function (err) {
      let errorElement = this.$refs.carderrors
      if (err.response) errorElement.textContent = '* ' + err.response.data.message
      else errorElement.textContent = '* ' + err.message
      this.lockSubmit = false
      this.isLoading = false
    }
  },
  mounted () {
    this.createStripeAndElements()
      .then(() => {
        this.createPaymentCard()
        this.createPaymentRequestButton()
      })
      .then(() => this.handlePRPayment())
  }
}
</script>
