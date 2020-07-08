<template>
  <div>
    <component :is="layout" :useExternalLinks="useExternalLinks">
      <router-view :layout.sync="layout" :useExternalLinks.sync="useExternalLinks" />
    </component>
    <footer class="footer is-vcentered site-footer">
      <div class="columns is-centered has-text-centered">
        <div class="column is-one-third">
          <router-link
            class="terms-text is-size-6 is-strong has-text-white"
            :to="{ name: 'TermsConditions'}"
            :target="useExternalLinks ? '_blank' : ''"
          >Terms and Conditions</router-link>
        </div>
        <div class="column is-one-third">
          <router-link
            class="privacy-text is-size-6 is-strong has-text-white"
            :to="{ name: 'PrivacyPolicy'}"
            :target="useExternalLinks ? '_blank' : ''"
          >Privacy Policy</router-link>
        </div>
        <div class="column is-one-third">
          <router-link
            class="is-size-6 is-strong has-text-white"
            :to="{ name: 'Landing', hash: '#contact_us'}"
            :target="useExternalLinks ? '_blank' : ''"
            @click.native="scrollFix('#contact_us')"
          >Contact Us</router-link>
        </div>
      </div>
      <div class="columns is-centered has-text-centered">
        <div class="column">
          <p class="copyright-text is-size-8 has-text-white">Copyright &copy; Plej.link</p>
          <p class="copyright-text is-size-8 has-text-white">2020 All Rights Reserved by Plej</p>
        </div>
      </div>
      <!--<a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
          <a class="instagram" href="#"><i class="fa fa-instagram"></i></a>
      <a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a>-->
    </footer>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Hind+Siliguri:400,600");

$salmon: #e87e7a;
$lightgreen: #75bac4;
$lightgrey: #f8f8f8;
$black: #686868;
$blue: #9299df;
$beige: #fdf1ec;
$link: #686868;

$primary: $salmon;
$info: $lightgreen;
$light: $lightgrey;
$family-primary: Hind Siliguri, sans-serif;
$input-border-color: #d1d1d1;

@import "./../node_modules/bulma/css/bulma.css";
@import "../node_modules/bulma/sass/utilities/_all.sass";
@import "../node_modules/bulma/sass/base/_all.sass";
@import "../node_modules/bulma/sass/helpers/_all.sass";
@import "../node_modules/bulma/sass/elements/button.sass";
@import "../node_modules/bulma/sass/elements/container.sass";
@import "../node_modules/bulma/sass/elements/_all.sass";
@import "../node_modules/bulma/sass/form/_all.sass";
@import "../node_modules/bulma/sass/components/navbar.sass";
@import "../node_modules/bulma/sass/layout/hero.sass";
@import "../node_modules/bulma/sass/layout/section.sass";
@import "../node_modules/bulma/sass/elements/title.sass";
@import "@creativebulma/bulma-divider";

html {
  background-color: $white;
}

.navbar {
  margin-bottom: 2vh;
}

.is-strong {
  font-weight: bold;
}

.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-footer {
  margin-top: 25vh;
  min-width: 100%;
  background-color: $primary;
}

.card {
  margin-top: 2vh;
  margin-bottom: 2vh;
  background-color: $white;
  border-radius: 5px;
  .has-text-centered {
    .card-header,
    .card-content,
    .card-footer {
      justify-content: center;
      align-items: center;
    }
  }
}

.card-grey {
  background-color: $light;
}

.card-header {
  border-radius: 5px;
}

.card-image {
  border-radius: 5px;
}
</style>

<script>
export default {
  name: 'App',
  data () {
    return {
      layout: 'div',
      useExternalLinks: false
    }
  },
  methods: {
    scrollFix: function (hashbang) {
      location.href = hashbang
    }
  },
  mounted () {
    if (this.$route.hash) {
      setTimeout(() => this.scrollFix(this.$route.hash), 1)
    }
  }
}
</script>
