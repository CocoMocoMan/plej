<template>
  <div id="payment">
    <form>
      <div class="form-row">
        <label for="card">
          Credit or debit card
        </label>
        <div ref="card">
        <!-- A Stripe Element will be inserted here. -->
        </div>
        <!-- Used to display Element errors. -->
        <div ref="carderrors"></div>
      </div>
      <button :disabled="lockSubmit" v-on:click="purchase">Donate</button>
    </form>
  </div>
</template>

<script>
import { stripeKey, stripeOptions } from '../stripeConfig.js'
import axios from 'axios'
/* eslint-disable no-undef */
export default {
  name: 'PaymentForm',
  data () {
    return {
      spk: stripeKey,
      options: stripeOptions,
      cardStyle: {
        iconStyle: 'solid',
        style: {
          base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
              color: '#fce883'
            },
            '::placeholder': {
              color: '#87BBFD'
            }
          },
          invalid: {
            iconColor: '#FFC7EE',
            color: '#FFC7EE'
          }
        }
      },
      stripe: undefined,
      card: undefined,
      lockSubmit: false
    }
  },
  methods: {
    purchase: function (e) {
      e.preventDefault()

      let self = this
      self.lockSubmit = true

      self.stripe.createToken(self.card)
        .then(function (result) {
          if (result.error) {
            console.log(result.error)
            let errorElement = self.$refs.carderrors
            errorElement.textContent = result.error.message
            self.lockSubmit = false
          } else {
            self.processTransaction(result.token.id)
          }
        })
        .catch((err) => {
          console.log(err.message)
          self.lockSubmit = false
        })
    },
    processTransaction: function (token) {
      let data = {
        stripeToken: token
      }
      axios.post('/api/charge', data)
        .then((response) => {
          console.log('Payment complete')
        })
        .catch((errors) => {
          console.log('Error Handling Payment')
        })
    }
  },
  mounted () {
    this.stripe = Stripe(stripeKey, stripeOptions)
    const elements = stripe.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      ],
      locale: auto
    })
    this.card = elements.create('card', this.cardStyle)
    this.card.mount(this.$refs.card)
  }
  // beforeDestroy () {
  //   this.card.unmount()
  //   this.card.destroy()
  // }
}
</script>
