<template>
  <div class="section">
    <div class="columns is-centered">
      <div class="column is-8">
        <p class="title is-3 has-text-centered" style="margin-bottom:.3vh;">
          <span class="title tag is-primary is-3">{{ creator.alias }}</span>
        </p>
        <div class="card-header-title is-centered">
          <LinkPreview :url="link.link_content" style="margin-bottom:0vh;" />
        </div>
        <div v-if="stage.id===3">
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
                <a v-on:click="setStage(1)">
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
                <a v-on:click="setStage(2)">
                  <i class="fa fa-pencil-square-o"></i>
                </a>
              </li>
              <li class="title is-5">
                <span class="tag is-primary">
                  <i class="fa fa-envelope"></i>
                  &nbsp;Message
                </span>
                <span v-if="!donation.message">None</span>
                {{ donation.message }}
                <a v-on:click="setStage(2)">
                  <i class="fa fa-pencil-square-o"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <component
          style="margin-top:0vh;"
          :is="stage.component"
          :donation.sync="donation"
          :lockNext.sync="lockNext"
          :link="link"
        />
        <div class="level is-mobile">
          <div class="level-item">
            <button
              v-if="stage.id===2"
              class="button is-small is-primary is-rounded is-strong"
              v-on:click="previousStage()"
            >Back</button>
          </div>
          <div class="level-item">
            <button
              v-if="stage.id===1 || stage.id===2"
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
import PaymentForm from '../components/PaymentForm.vue'
export default {
  name: 'Donate',
  components: {
    LinkPreview,
    DonationAmount,
    DonationPersonalization,
    PaymentForm
  },
  data () {
    return {
      stage: {
        id: 1,
        component: DonationAmount
      },
      lockNext: true,
      isLoading: false,
      creator: {
        name: '',
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
      if (this.stage.id === 1) {
        this.stage.id++
        this.stage.component = DonationPersonalization
      } else if (this.stage.id === 2) {
        this.stage.id++
        this.stage.component = PaymentForm
      }
    },
    previousStage: function () {
      if (this.stage.id === 2) {
        this.stage.id--
        this.stage.component = DonationAmount
      } else if (this.stage.id === 3) {
        this.stage.id--
        this.stage.component = DonationPersonalization
      }
    },
    setStage: function (stage) {
      this.stage.id = stage
      if (stage === 1) this.stage.component = DonationAmount
      else if (stage === 2) this.stage.component = DonationPersonalization
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
