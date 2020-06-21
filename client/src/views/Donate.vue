<template>
  <div class="columns is-centered has-text-centered">
    <div class="column is-half">
      <div class="card">
        <header class="card-header">
          <p class="label card-header-title is-centered">Donate to {{ creator.name }} </p>
        </header>
        <div class="card-body">
          <!-- Link Preview will go here -->
        </div>
      </div>
      <paymentform />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import ExternalLayout from '../layouts/External'
import paymentform from '../components/PaymentForm'
export default {
  name: 'Donate',
  components: {
    paymentform
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
      axios.get('/api/link/creator/' + this.$route.params.token)
        .then((response) => {
          console.log(response.data.creator)
          self.$set(this, 'creator', response.data.creator)
        })
        .catch((err) => {
          if (err.response && (err.response.status === 400 ||
                               err.response.status === 500)) {
            console.log(err.response.data.message)
          }
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
