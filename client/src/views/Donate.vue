<template>
  <div class="columns is-centered has-text-centered">
    <div class="column is-half">
      <div class="card">
        <header class="card-header">
            <p class="label card-header-title">Donate to {{ creator.name }} </p>
        </header>
      </div>
      <linkpreview :url="link.link_content"/>
      <paymentform />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import ExternalLayout from '../layouts/External'
import paymentform from '../components/PaymentForm'
import linkpreview from '../components/LinkPreview'
export default {
  name: 'Donate',
  components: {
    paymentform,
    linkpreview
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
