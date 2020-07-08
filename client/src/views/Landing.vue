<template>
  <div>
    <section class="hero is-fullheight is-default is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5 is-offset-1 landing-caption">
              <h1 class="title is-1 is-bold is-spaced">
                Plej your love,
                <br />Fund your passion.
              </h1>
              <h2
                class="subtitle is-5 is-muted"
              >Providing the link between your supporters and the content they love.</h2>
              <div class="button-wrap">
                <a
                  class="button is-primary is-rounded has-text-white is-strong"
                  href="#contact_us"
                >Get Started</a>
              </div>
            </div>
            <div class="column is-5">
              <figure class="image is-4by3">
                <img src="../assets/img-landing-1.jpg" alt="Description" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-feature-grey is-medium">
      <div class="container">
        <div class="title-wrapper has-text-centered">
          <h2 class="title is-2">Drive your content</h2>
          <h3 class="subtitle is-5 is-muted">Through community support</h3>
          <div class="divider is-centered"></div>
        </div>
        <div class="content-wrapper">
          <div class="columns">
            <div class="column is-one-third">
              <div class="feature-card is-bordered has-text-centered is-feature-reveal">
                <div class="card-title">
                  <h4 class="title is-5">Empower your creations</h4>
                </div>
                <div class="card-icon">
                  <figure class="image is-4by3">
                    <img src="../assets/Empower_Creation.png" />
                  </figure>
                </div>
                <div class="card-text">
                  <p
                    class="subtitle is-6"
                  >Plej provides a customized link to the individual content you post, allowing your audience to support the content they enjoy the most.</p>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="feature-card is-bordered has-text-centered is-feature-reveal">
                <div class="card-title">
                  <h4 class="title is-5">Simplify support</h4>
                </div>
                <div class="card-icon">
                  <figure class="image is-4by3">
                    <img src="../assets/Simplify_Support.jpg" />
                  </figure>
                </div>
                <div class="card-text">
                  <p
                    class="subtitle is-6"
                  >Plej connects all major forms of payment into one single donation page. By clicking your link, your audience can easily provide support to the content they love without committing to recurring subscriptions.</p>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="feature-card is-bordered has-text-centered is-feature-reveal">
                <div class="card-title">
                  <h4 class="title is-5">Uncover your worth</h4>
                </div>
                <div class="card-icon">
                  <figure class="image is-4by3">
                    <img src="../assets/Uncoveryourworth.jpg" />
                  </figure>
                </div>
                <div class="card-text">
                  <p
                    class="subtitle is-6"
                  >Plej reveals what content is meaningful to your supporters. Stay up to date with what your viewers enjoy the most by tracking the total donations that each piece of content is bringing to your account.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--<section
      class="section is-medium has-background-image"
      data-background="https://source.unsplash.com/g30P1zcOzXo/1600x900"
      data-color="#4FC1EA"
      data-color-opacity=".6"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="title-wrapper has-text-centered">
          <h2 class="title is-2 light-text is-spaced">Our clients love us</h2>
          <h3 class="subtitle is-5 light-text">Look at what they say about us</h3>
        </div>
        <div class="content-wrapper">
          <div class="columns is-vcentered">
            <div class="column is-4">
              <figure class="testimonial">
                <blockquote>Lorem ipsum dolor sit amet, elit deleniti dissentias quo eu, hinc minim appetere te usu, ea case duis scribentur has. Duo te consequat elaboraret, has quando suavitate at.</blockquote>
                <div class="author">
                  <img src="assets/img/illustrations/faces/1.png" alt />
                  <h5>Irma Walters</h5>
                  <span>Accountant</span>
                </div>
              </figure>
            </div>
            <div class="column is-4">
              <figure class="testimonial">
                <blockquote>Lorem ipsum dolor sit amet, elit deleniti dissentias quo eu, hinc minim appetere te usu, ea case duis scribentur has. Duo te consequat elaboraret, has quando suavitate at.</blockquote>
                <div class="author">
                  <img src="assets/img/illustrations/faces/2.png" alt />
                  <h5>John Bradley</h5>
                  <span>Financial Analyst</span>
                </div>
              </figure>
            </div>
            <div class="column is-4">
              <figure class="testimonial">
                <blockquote>Lorem ipsum dolor sit amet, elit deleniti dissentias quo eu, hinc minim appetere te usu, ea case duis scribentur has. Duo te consequat elaboraret, has quando suavitate at.</blockquote>
                <div class="author">
                  <img src="assets/img/illustrations/faces/3.png" alt />
                  <h5>Gary Blackman</h5>
                  <span>HR Manager</span>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>-->
    <a id="contact_us">
      <section class="section section-light-grey is-medium">
        <div class="container">
          <div class="title-wrapper has-text-centered">
            <h2 class="title is-2 is-spaced">Start using Plej today</h2>
            <h3 class="subtitle is-5 is-muted">We'll get in touch with you</h3>
            <div class="divider is-centered"></div>
          </div>
          <div class="content-wrapper">
            <div class="columns">
              <div class="column is-6 is-offset-3">
                <form v-on:submit="sendMessage">
                  <div class="columns is-multiline">
                    <div class="column is-6">
                      <input
                        class="input is-medium"
                        :class="errors.fName ? 'is-danger' : ''"
                        name="fName"
                        type="text"
                        placeholder="First Name *"
                      />
                    </div>
                    <div class="column is-6">
                      <input
                        class="input is-medium"
                        :class="errors.lName ? 'is-danger' : ''"
                        name="lName"
                        type="text"
                        placeholder="Last Name *"
                      />
                    </div>
                    <div class="column is-6">
                      <input
                        class="input is-medium"
                        :class="errors.email ? 'is-danger' : ''"
                        name="email"
                        type="text"
                        placeholder="Email *"
                      />
                    </div>
                    <div class="column is-12">
                      <textarea class="textarea" name="message" rows="6" placeholder="Message"></textarea>
                    </div>
                    <div ref="success" class="has-text-success subtitle is-6"></div>
                    <div ref="errors" class="has-text-danger subtitle is-6"></div>
                    <div class="column is-12">
                      <div class="form-footer has-text-right mt-10">
                        <input
                          class="button is-primary is-large is-strong"
                          type="submit"
                          value="Send Message"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </a>
  </div>
</template>

<script>
import axios from 'axios'
import ExternalLayout from '../layouts/External'
export default {
  name: 'Landing',
  data () {
    return {
      errors: {
        fName: false,
        lName: false,
        email: false
      }
    }
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
  },
  methods: {
    clearContactForm: function (e, success) {
      this.errors.fName = false
      this.errors.lName = false
      this.errors.email = false
      this.$refs.errors.textContent = ''
      this.$refs.success.textContent = ''
      if (success) {
        e.target.elements.fName.value = ''
        e.target.elements.lName.value = ''
        e.target.elements.email.value = ''
        e.target.elements.message.value = ''
      }
    },
    sendMessage: function (e) {
      e.preventDefault()
      this.clearContactForm(e, false)
      let self = this
      let fName = e.target.elements.fName.value
      let lName = e.target.elements.lName.value
      let email = e.target.elements.email.value
      let message = e.target.elements.message.value
      if (!fName || !lName || !email) {
        self.errors.fName = !fName
        self.errors.lName = !lName
        self.errors.email = !email
        let errorElement = self.$refs.errors
        errorElement.textContent = '* Please enter required fields'
        return
      }
      let sendMessage = () => {
        let data = {
          fName: fName,
          lName: lName,
          email: email,
          message: message
        }
        axios.post('/api/notify/contactus', data)
          .then(() => {
            self.clearContactForm(e, true)
            let successElement = self.$refs.success
            successElement.textContent = 'Thanks! A member of the Plej Team will reach out to you soon!'
          })
          .catch(err => {
            let errorElement = self.$refs.errors
            errorElement.textContent = '* ' + err.response.data.message
          })
      }
      sendMessage()
    },
    scrollFix: function (hashbang) {
      location.href = hashbang
    }
  }
}
</script>
