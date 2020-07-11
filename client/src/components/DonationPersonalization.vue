<template>
  <div class="card card-grey">
    <header class="card-header">
      <p class="card-header-title title is-centered is-5">Personalize Your Plej (Optional)</p>
    </header>
    <div class="columns">
      <div class="column is-5">
        <div
          class="field"
          style="padding-top:2rem; padding-left:2rem; padding-right:2rem; padding-bottom:.3rem;"
        >
          <div class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="From"
              v-model="donation.from"
              maxlength="25"
            />
            <span class="icon is-small is-left">
              <i class="fa fa-paper-plane"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="field"
      style="padding-left:2rem; padding-right:2rem; padding-top:.3rem; padding-bottom:2rem;"
    >
      <div class="control has-icons-left">
        <textarea
          class="textarea"
          style="border-radius: 5px;"
          type="text"
          placeholder="Message"
          v-model="donation.message"
          maxlength="288"
        />
        <span class="icon is-small is-left"></span>
      </div>
      <p class="subtitle is-7 has-text-weight-light is-italic">Maximum Characters: 288</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationPersonalization',
  props: {
    donation: {
      from: '',
      message: ''
    }
  },
  mounted () {
    this.$emit('update:lockNext', false)
  }
}
</script>
