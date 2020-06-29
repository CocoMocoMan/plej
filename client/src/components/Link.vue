 <template>
  <div class="card">
    <header class="card-header is-centered">
      <a type="text" class="link" name="link" :href= "donate_url + link.link_token" target="_blank">
        {{ donate_url + link.link_token }}
      </a>
    </header>
    <div class="card-body">
      <div v-if="link.link_content" class="card-header-title is-centered">
        <linkpreview :url="link.link_content" />
      </div>
      <div v-else class="card-header-title">
        <div class="field has-addons">
          <div class="control has-icons-left">
            <input class="input is-rounded is-small" type="text" name="title" placeholder="Link to Content" ref="linkContent"/>
            <span class="icon is-small is-left">
                <i class="fa fa-link"></i>
              </span>
          </div>
          <div class="control">
            <button class="button is-primary is-strong has-text-white is-rounded is-small" v-on:click="addLinkContent">
                Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-header-title">Donations raised: ${{ balance }}</p>
    </footer>
  </div>
</template>

<style scoped>
  a {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px
  }
</style>

<script>
import axios from 'axios'
import router from '../router'
import linkpreview from './LinkPreview'
export default {
  name: 'Link',
  components: {
    linkpreview
  },
  props: {
    iLink: {
      link_token: '',
      link_content: '',
      donations: []
    }
  },
  data () {
    return {
      donate_url: `http://${location.host}/donate/`,
      link: this.iLink,
      balance: ''
    }
  },
  methods: {
    addLinkContent: function () {
      let self = this
      let data = {
        link_content: self.$refs.linkContent.value
      }
      axios.post('/api/link/addcontent/' + self.link.link_token, data)
        .then(response => {
          console.log(response.data.link)
          self.$set(this, 'link', response.data.link)
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response.data.message)
            if (err.response.status === 401) {
              router.push('/')
            }
          }
        })
    },
    calculateBalance: function () {
      let balance = 0
      for (let donation of this.link.donations) {
        console.log(donation.amount)
        balance += parseInt(donation.amount)
      }
      return balance
    }
  },
  mounted () {
    this.balance = this.calculateBalance()
  }
}
</script>
