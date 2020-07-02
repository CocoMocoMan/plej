<template>
  <div id="payment">
    <form>
      <div class="card card-grey" style="padding-left:1rem; padding-right:1rem; padding-top:.3rem; padding-bottom:.3rem;">
        <div class="card_content">
          <div class="card">
            <div class="card-content">
              <div class="columns has-text-centered">
                <div class="column">
                  <linkpreview style="margin-top:3rem" :url="link.link_content"/>
                </div>
                <div class="column">
                  <p class="title tag is-info is-5" style="margin-bottom:.1vh;"> Optional </p>
                  <div class="card card-grey">
                  <header class="card-header">
                    <p class="card-header-title title is-centered is-5">
                      Personalize Your Plej
                    </p>
                  </header>
                    <div clas="card-content">
                      <div class="field" style="padding:2rem">
                        <div class="control has-icons-left">
                          <input class ="input is-rounded" type="text" placeholder="From" v-model="donation.from" :disabled="isLoading"/>
                          <span class="icon is-small is-left">
                            <i class="fa fa-paper-plane"></i>
                          </span>
                        </div>
                      </div>
                      <div class="field" style="padding-left:2rem; padding-right:2rem; padding-top:.3rem; padding-bottom:2rem;">
                        <div class="control has-icons-left">
                          <textarea class ="textarea" style="border-radius: 25px;" type="text" placeholder="Message" v-model="donation.message" :disabled="isLoading"/>
                          <span class="icon is-small is-left">
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-one-quarter">
          <div class="field">
            <div class="control">
              <input class="input button is-rounded is-primary is-strong has-text-white" v-on:click="updatePaymentAmount(1, $event)" type="submit" value="$1" :disabled="isLoading"/>
            </div>
          </div>
        </div>
        <div class="column is-one-quarter">
          <div class="field">
            <div class="control">
              <input class="input button is-rounded is-primary is-strong has-text-white" v-on:click="updatePaymentAmount(5, $event)" type="submit" value="$5" :disabled="isLoading"/>
            </div>
          </div>
        </div>
        <div class="column is-one-quarter">
          <div class="field">
            <div class="control">
              <input class="input button is-primary is-rounded is-strong has-text-white" v-on:click="updatePaymentAmount(10, $event)" type="submit" value="$10" :disabled="isLoading"/>
            </div>
          </div>
        </div>
        <div class="column is-one-quarter">
          <div class="field">
            <div class="control">
              <input class="input button is-primary is-rounded is-strong has-text-white" v-on:click="updatePaymentAmount(20, $event)" type="submit" value="$20" :disabled="isLoading"/>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-one-quarter">
          <div class="field">
            <div class="control has-icons-left">
              <input class ="input is-rounded" style="border-color:#d1d1d1" v-on:input="updatePaymentAmount('custom', $event)" @paste.prevent
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
       <div class="columns is-centered">
        <div class="column is-one-quarter">
             <div class="columns is-centered">
        <div class="column">
          <button class="button is-rounded is-primary is-strong has-text-white"
            :class="isLoading ? 'is-loading' : ''"  :disabled="lockSubmit" v-on:click="purchase">Donate<div v-if="donation.amount">&nbsp;${{ donation.amount }}</div></button>
        </div>
        <div class="column">
          <button class="button is-rounded is-primary is-strong has-text-white"
            :class="isLoading ? 'is-loading' : ''"  v-on:click="purchase"><i class="fa fa-dice"></i></button>
        </div>
      </div>
        </div>
      </div>
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
import linkpreview from './LinkPreview'
/* eslint-disable no-undef */
export default {
  name: 'PaymentForm',
  components: {
    linkpreview
  },
  props: {
    link: {
      link_token: '',
      link_content: ''
    }
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
      paymentRequest: undefined,
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
    // setup stripe elements
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
    // setup stripe paymentrequest (apply pay, google pay)
    // this.paymentRequest = this.stripe.paymentRequest({
    //   country: 'US',
    //   currency: 'usd',
    //   total: {
    //     amount: this.donation.amount,
    //     label: 'Total'
    //   }
    // })
  }
}
</script>
