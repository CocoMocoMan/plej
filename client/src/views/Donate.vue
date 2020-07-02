<template>
  <div class="columns is-centered section">
    <div class="column is-half">
      <p class="title tag is-primary is-4" style="margin-bottom:.5vh;">@{{ creator.alias }} </p>
      <paymentform :link="link"/>
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
        name: '',
        alias: ''
      },
      link: {
        link_token: '',
        link_content: ''
      }
    }
  },
  methods: {
    getCreatorData: function () {
      let self = this
      axios.get('/api/link/creator/' + this.$route.params.token)
        .then((response) => {
          self.$set(this, 'creator', response.data.creator)
          self.$set(this, 'link', response.data.link)
        })
        .catch((err) => {
          if (err.response && (err.response.status === 400 ||
                               err.response.status === 500)) {
            console.log(err.response.data.message)
          }
          router.push({
            name: 'InvalidLink'
          })
        })
    }
  },
  mounted () {
    this.getCreatorData()
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
    this.$emit('update:useExternalLinks', true)
  }
}
</script>
