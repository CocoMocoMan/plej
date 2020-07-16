<template>
  <div class="section">
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="has-text-centered">
          <h3 class="title tag is-primary is-4">{{ creator.alias }}</h3>
        </div>
        <div class="card-header-title is-centered">
          <LinkPreview :url="link.link_content" style="margin-bottom:0vh;" />
        </div>
        <div v-if="stage.id===3" style="margin-bottom:5vh">
          <div class="card card-grey" style="margin-top:0vh;">
            <header class="card-header">
              <p class="card-header-title title is-centered is-5">Plej Summary</p>
            </header>
            <ul
              style="padding-top:2rem; padding-left:2rem; padding-right:2rem; padding-bottom:2rem;"
            >
              <li class="title is-5">
                <span class="tag is-primary">
                  <i class="fa fa-usd"></i>
                  &nbsp;Amount
                </span>
                ${{ donation.amount }}
                <a v-on:click="setStage(0)" class="linky">
                  <i class="fa fa-pencil-square-o"></i>
                </a>
              </li>
              <li class="title is-5">
                <span class="tag is-primary">
                  <i class="fa fa-envelope"></i>
                  &nbsp;Email
                </span>
                {{ email.value }}
                <a v-on:click="setStage(2)" class="linky">
                  <i class="fa fa-pencil-square-o"></i>
                </a>
              </li>
              <li class="title is-5">
                <span class="tag is-primary">
                  <i class="fa fa-paper-plane"></i>
                  &nbsp;From
                </span>
                <span v-if="!donation.from">None</span>
                {{ donation.from }}
                <a v-on:click="setStage(1)" class="linky">
                  <i class="fa fa-pencil-square-o"></i>
                </a>
              </li>
              <li class="title is-5">
                <span class="tag is-primary">
                  <i class="fa fa-commenting"></i>
                  &nbsp;Message
                </span>
                <span v-if="!donation.message">None</span>
                {{ donation.message }}
                <a v-on:click="setStage(1)" class="linky">
                  <i class="fa fa-pencil-square-o"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a id="main"></a>
        <component
          style="margin-top:0vh;"
          :is="stage.component"
          :donation.sync="donation"
          :email.sync="email"
          :lockNext.sync="lockNext"
          :link="link"
          :creator="creator"
        />
        <div class="level is-mobile">
          <div class="level-item">
            <button
              v-if="!(stage.id==0 || stage.id==3)"
              class="button is-small is-primary is-rounded is-strong"
              v-on:click="previousStage()"
            >Back</button>
          </div>
          <div class="level-item">
            <button
              v-if="stage.id!==3"
              class="button is-small is-primary is-rounded is-strong"
              :disabled="lockNext"
              v-on:click="nextStage()"
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import ExternalLayout from '../layouts/External'
import LinkPreview from '../components/LinkPreview'
import DonationAmount from '../components/DonationAmount.vue'
import DonationPersonalization from '../components/DonationPersonalization.vue'
import PaymentEmail from '../components/PaymentEmail.vue'
import PaymentForm from '../components/PaymentForm.vue'
import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

const stages = [
  { id: 0, component: DonationAmount },
  { id: 1, component: DonationPersonalization },
  { id: 2, component: PaymentEmail },
  { id: 3, component: PaymentForm }
]
export default {
  name: 'Donate',
  components: {
    LinkPreview,
    DonationAmount,
    DonationPersonalization,
    PaymentEmail,
    PaymentForm
  },
  data () {
    return {
      stage: stages[0],
      lockNext: true,
      isLoading: false,
      creator: {
        alias: ''
      },
      link: {
        link_token: '',
        link_content: ''
      },
      donation: {
        amount: '',
        from: '',
        message: ''
      },
      email: {
        value: ''
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
    },
    nextStage: function () {
      this.stage = stages[this.stage.id + 1]
    },
    previousStage: function () {
      this.stage = stages[this.stage.id - 1]
    },
    setStage: function (stage) {
      this.stage = stages[stage]
    }
  },
  watch: {
    lockNext: function (newVal) {
      if (!newVal) {
        let main = this.$el.querySelector('#main')
        main.scrollIntoView({ behavior: 'smooth' })
      }
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
