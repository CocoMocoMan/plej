<template>
  <div class="container section ml-0 mr-0 ml-6 pr-0 pl-6">
    <div class="title-wrapper has-text-centered pl-6">
      <h2 class="title is-2 pl-6">What is Plej?</h2>
      <div class="divider is-centered"></div>
    </div>
    <br />
    <div class="columns">
      <div class="column is-6">
        <figure class="image is-4by3 is-medium">
          <img src="../assets/aboutPlej.jpg" />
        </figure>
      </div>
      <div class="column is-8">
        <div class="card-text">
          <p class="subtitle is-5 is-muted has-text-left pt-2 is-full">Plej is a community powered donation service that provides a direct connection between</p>
          <p class="subtitle is-5 is-muted has-text-left is-full">the creator and their audience. With our no strings attached model of donating, giving</p>
          <p class="subtitle is-5 is-muted has-text-left">support to your favorite artist's individual content is made simple and easy. At Plej our</p>
          <p class="subtitle is-5 is-muted has-text-left">focus is to supply the necessary tools to succeed and thrive for all partnered creatives, big</p>
          <p class="subtitle is-5 is-muted has-text-left">and small. We also work to create an avenue for the voices of their fandoms to be heard</p>
          <p class="subtitle is-5 is-muted has-text-left">and acknowledged. Our mission is to lift up artists and give power back to the people that</p>
          <p class="subtitle is-5 is-muted has-text-left">deserve it by providing the ability for creators to achieve financial independence and</p>
          <p class="subtitle is-5 is-muted has-text-left">realize their true vision in its purest form. We understand the importance of creative</p>
          <p class="subtitle is-5 is-muted has-text-left">freedom and individual expression. Let's shape the internet and drive good content,</p>
          <p class="subtitle is-5 is-muted has-text-left">so do your part and...</p>
          <p class="subtitle is-3 is-muted has-text-centered pr-6">Become a Plej today!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExternalLayout from '../layouts/External'
import { Affix } from 'vue-affix'
export default {
  name: 'PrivacyPolicy',
  components: {
    Affix
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>
