<template>
  <div class = "columns is-centered is-mutliline has-text-centered">
    <div class="column is-one-quarter">
      <p>Donate to <span class="tag is-rounded is-medium is-dark">{{ creator.name }}</span> </p>
      <br>
      <PaymentForm />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import ExternalLayout from '../layouts/External'
import PaymentForm from '../components/PaymentForm'
export default {
  name: 'Donate',
  components: {
    PaymentForm
  },
  data () {
    return {
      creator: {
        name: ''
      }
    }
  },
  methods: {
    getCreatorData: function () {
      let self = this
      axios.get('/api/creator/' + this.$route.params.token)
        .then((response) => {
          console.log(response)
          self.$set(this, 'creator', response.data.creator)
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/invalidlink')
        })
    }
  },
  mounted () {
    this.getCreatorData()
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>
