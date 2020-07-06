<template>
  <div id="payment">
    <form>
      <div ref="prbutton">
        <!-- A Stripe Element will be inserted here. -->
      </div>
      <div class="card has-text-centered card-grey">
        <header class="card-header">
          <p class="card-header-title">Credit Card</p>
        </header>
        <div class="card-content">
          <div ref="card">
            <!-- A Stripe Element will be inserted here. -->
          </div>
        </div>
        <div class="card-footer">
          <div ref="carderrors">
            <!-- Used to display Element errors. -->
          </div>
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-item">
          <button
            class="button is-rounded is-primary is-strong has-text-white"
            :class="isLoading ? 'is-loading' : ''"
            :disabled="lockSubmit"
            v-on:click="purchase"
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
      prButton: undefined
    }
  },
  methods: {
    purchase: function (e) {
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
        .then((paymentMethod) => {
          const data = {
            data:
            {
              paymentMethod: paymentMethod.id,
              token: self.link.link_token,
              donation: self.donation
            }
          }
          return axios.post('/api/payment/confirm', data)
        })
        .then((response) => {
          return response.data.intent
        })
        .then((result) => {
          router.push(
            { name: 'PaymentConfirmation',
              params: {
                donation: self.donation,
                linkToken: self.link.link_token
              }
            }
          )
        })
        .catch((err) => {
          let errorElement = self.$refs.carderrors
          if (err.response) errorElement.textContent = err.response.data.message
          else errorElement.textContent = err.message
          self.lockSubmit = false
          self.isLoading = false
        })
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
        if (result) self.prButton.mount(self.$refs.prbutton)
      })
    }
  },
  mounted () {
    this.createStripeAndElements()
      .then(() => {
        this.createPaymentCard()
        this.createPaymentRequestButton()
      })
  }
}
</script>
