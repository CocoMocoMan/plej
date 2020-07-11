<template>
  <div class="card card-grey">
    <header class="card-header">
      <p class="card-header-title title is-centered is-5">Plej Amount</p>
    </header>
    <div
      class="columns is-centered"
      style="padding-left:2rem; padding-right:2rem; padding-top:2rem;"
    >
      <div class="column is-one-half">
        <div class="field">
          <div class="control">
            <input
              class="input button is-rounded is-primary is-strong has-text-white"
              v-on:click="updatePaymentAmount(1, $event)"
              type="submit"
              value="$1"
            />
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <div class="control">
            <input
              class="input button is-rounded is-primary is-strong has-text-white"
              v-on:click="updatePaymentAmount(5, $event)"
              type="submit"
              value="$5"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-centered" style="padding-left:2rem; padding-right:2rem;">
      <div class="column is-half">
        <div class="field">
          <div class="control">
            <input
              class="input button is-primary is-rounded is-strong has-text-white"
              v-on:click="updatePaymentAmount(10, $event)"
              type="submit"
              value="$10"
            />
          </div>
        </div>
      </div>
      <div class="column is-one-half">
        <div class="field">
          <div class="control">
            <input
              class="input button is-primary is-rounded is-strong has-text-white"
              v-on:click="updatePaymentAmount(20, $event)"
              type="submit"
              value="$20"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="field"
      style="padding-left:2rem; padding-right:2rem; padding-top:.3rem; padding-bottom:2rem;"
    >
      <div class="control has-icons-left">
        <input
          class="input is-rounded"
          v-on:input="updatePaymentAmount('custom', $event)"
          @paste.prevent
          v-on:keypress="numericOnly"
          type="number"
          ref="custom"
          v-model="donation.amount"
          placeholder="Custom Donation"
        />
        <span class="icon is-small is-left">
          <i class="fa fa-usd"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationAmount',
  props: {
    donation: {
      amount: '',
      from: '',
      message: ''
    }
  },
  methods: {
    updatePaymentAmount: function (value, e) {
      e.preventDefault()
      if (value === 'custom') {
        if (e.target.value) {
          this.donation.amount = e.target.value
          this.$emit('update:lockNext', false)
        } else {
          this.donation.amount = ''
          this.$emit('update:lockNext', true)
        }
      } else {
        this.donation.amount = value
        this.$refs.custom.value = value
        this.$emit('update:lockNext', false)
      }
    },
    numericOnly: function (e) {
      const charCode = e.charCode
      if (!(charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43)) return true
      else e.preventDefault()
    }
  }
}
</script>
