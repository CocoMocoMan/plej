<template>
  <div class="columns is-centered is-multiline">
  <div lass="column is-one-quarter">
    <p><span class="label">Donate to {{ creator.name }}  </span></p>
    <div class="field">
          <div class="control">
            <input class="input button  is-primary is-rounded is-strong" type="submit" value="$1"/>
            <input class="input button  is-primary is-rounded is-strong" type="submit" value="$5" />
            <input class="input button  is-primary is-rounded is-strong" type="submit" value="$10" />
            <input class="input button  is-primary is-rounded is-strong" type="submit" value="$20" />
            <input class ="input is-rounded" type="text" name="Custom_Tip" placeholder="Custom Tip" />
          </div>
        </div>
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
