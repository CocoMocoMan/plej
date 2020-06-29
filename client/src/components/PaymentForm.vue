<template>
  <div id="payment">
    <form>
      <div class="columns is-centered">
        <div class="column is-one-third">
          <div class="field">
            <div class="control has-icons-left">
              <input class ="input is-rounded" type="text" placeholder="From" v-model="donation.from" :disabled="isLoading"/>
              <span class="icon is-small is-left">
                <i class="fa fa-paper-plane"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
     <div class="columns is-centered">
        <div class="column is-half">
          <div class="field">
            <div class="control">
              <input class="input button  is-primary is-rounded is-strong has-text-white" v-on:click="updatePaymentAmount(1, $event)" type="submit" value="$1" :disabled="isLoading"/>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <div class="control">
              <input class="input button is-primary is-rounded is-strong has-text-white" v-on:click="updatePaymentAmount(5, $event)" type="submit" value="$5" :disabled="isLoading"/>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="field">
            <div class="control">
              <input class="input button is-primary is-rounded is-strong has-text-white" v-on:click="updatePaymentAmount(10, $event)" type="submit" value="$10" :disabled="isLoading"/>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <div class="control">
              <input class="input button is-primary is-rounded is-strong has-text-white" v-on:click="updatePaymentAmount(20, $event)" type="submit" value="$20" :disabled="isLoading"/>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column">
          <div class="field">
            <div class="control has-icons-left">
              <input class ="input is-rounded" v-on:input="updatePaymentAmount('custom', $event)" @paste.prevent
                v-on:keypress="numericOnly" type="number" ref="custom" placeholder="Custom Donation" :disabled="isLoading"/>
              <span class="icon is-small is-left">
                <i class="fa fa-usd"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="card has-text-centered">
        <header class="card-header">
          <p class="card-header-title">
            Credit Card
          </p>
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
      <button class="button is-rounded is-primary is-strong has-text-white"
              :class="isLoading ? 'is-loading' : ''"  :disabled="lockSubmit" v-on:click="purchase">Donate<div v-if="donation.amount">&nbsp;${{ donation.amount }}</div></button>
    </form>
  </div>
</template>
<style>
.donation-info {
  margin-top:40px
}
</style>
<script>
import { stripeKey, stripeOptions } from '../stripeConfig.js'
import axios from 'axios'
import router from '../router'
/* eslint-disable no-undef */
export default {
  name: 'PaymentForm',
  props: {
    linkToken: ''
  },
  data () {
    return {
      spk: stripeKey,
      options: stripeOptions,
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
      card: undefined,
      lockSubmit: true,
      isLoading: false,
      donation: {
        amount: '',
        from: '',
        message: ''
      }
    }
  },
  methods: {
    purchase: function (e) {
      e.preventDefault()
      let self = this
      self.lockSubmit = true
      self.isLoading = true
      // axios.get('/api/payment/secret')
      //   .then((response) => {
      //     return response.data.intent.client_secret
      //   })
      //   .then((clientSecret) => {
      //     return self.stripe.confirmCardSetup(clientSecret, {
      //       payment_method: {
      //         card: self.card
      //       }
      //     })
      //   })
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
              token: self.linkToken,
              donation: self.donation
            }
          }
          console.log(data)
          return axios.post('/api/payment/confirm', data)
        })
        .then((response) => {
          return response.data.intent
        })
        .then((result) => {
          console.log(result)
          router.push('/donate/confirmation')
        })
        .catch((err) => {
          let errorElement = self.$refs.carderrors
          errorElement.textContent = err.message
          self.lockSubmit = false
          self.isLoading = false
        })
    },
    updatePaymentAmount: function (value, e) {
      e.preventDefault()
      if (value === 'custom') {
        if (e.target.value) {
          this.donation.amount = e.target.value
          this.lockSubmit = false
        } else {
          this.donation.amount = ''
          this.lockSubmit = true
        }
      } else {
        this.donation.amount = value
        this.$refs.custom.value = value
        this.lockSubmit = false
      }
    },
    numericOnly: function (e) {
      const charCode = e.charCode
      if (!(charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43)) return true
      else e.preventDefault()
    }
  },
  mounted () {
    this.stripe = Stripe(this.spk, this.options)
    const elements = this.stripe.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      ],
      locale: 'auto'
    })
    this.card = elements.create('card', this.cardStyle)
    this.card.mount(this.$refs.card)
  }
}
</script>
