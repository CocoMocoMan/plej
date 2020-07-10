<template>
  <div class="card card-grey" style="padding-bottom:2rem;">
    <header class="card-header">
      <p class="card-header-title title is-centered is-5">Plej Reciept Email</p>
    </header>
    <div class="columns is-centered is-vcentered is-mobile" style="padding:2rem;">
      <div class="column is-11">
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Email"
              :class="{ 'is-success' : valid, 'is-danger': invalid }"
              v-debounce:300ms="validateEmail"
              v-model="email.value"
            />
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span v-if="valid" class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
            <span v-else-if="invalid" class="icon is-small is-right">
              <i class="fas fa-warning"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="column">
        <span
          class="has-tooltip-arrow has-tooltip-info has-text-info has-tooltip-left-mobile has-tooltip-multiline"
          data-tooltip="Email is required to send a receipt for your Plej. Plej does not store or share your email with anybody."
        >
          <i class="fa fa-info-circle"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import EmailValidator from 'email-validator'
export default {
  name: 'PaymentEmail',
  props: {
    email: {
      value: ''
    }
  },
  data () {
    return {
      valid: false,
      invalid: false
    }
  },
  methods: {
    validateEmail () {
      const isValid = EmailValidator.validate(this.email.value)
      this.valid = isValid
      this.invalid = !isValid && this.email.value
      this.$emit('update:lockNext', !isValid)
    }
  },
  mounted () {
    this.validateEmail()
  }
}
</script>
