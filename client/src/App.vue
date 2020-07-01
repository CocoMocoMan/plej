<template>
  <div>
    <component :is="layout" :useExternalLinks="useExternalLinks">
      <router-view :layout.sync="layout" :useExternalLinks.sync="useExternalLinks"/>
    </component>
    <footer class="footer is-vcentered site-footer" style="background-color:#9299DF">
      <div class="columns">
        <div class="column">
          <p class="copyright-text is-size-6 is-strong">Copyright &copy;  Plej.link</p>
          <p class="copyright-text is-size-6 is-strong">2020 All Rights Reserved by Plej</p>
        </div>
        <div class="column">
          <a class ="terms-text is-size-6 is-strong" href="/termsconditions" :target="useExternalLinks ? '_blank' : ''"> Terms and Conditions</a>
        </div>
        <div class="column">
          <a class ="privacy-text is-size-6 is-strong" href="/privacypolicy" :target="useExternalLinks ? '_blank' : ''"> Privacy Policy</a>
        </div>
        <div class="column">
          <a class="is-size-6 is-strong" href="/landing#contact_us" :target="useExternalLinks ? '_blank' : ''"> Contact Us </a>
        </div>
      </div>
          <!--<a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
          <a class="instagram" href="#"><i class="fa fa-instagram"></i></a>
          <a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a>-->
    </footer>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Hind+Siliguri:400,600');

$lightgrey: #f8f8f8;
$black: #686868;
$blue: #9299DF;
$beige: #fdf1ec;
$link: #686868;
$primary: $blue;
$family-primary: Hind Siliguri, sans-serif;
$input-border-color: $lightgrey;

@import './../node_modules/bulma/css/bulma.css';
@import "../node_modules/bulma/sass/utilities/_all.sass";
@import "../node_modules/bulma/sass/base/_all.sass";
@import "../node_modules/bulma/sass/elements/button.sass";
@import "../node_modules/bulma/sass/elements/container.sass";
@import "../node_modules/bulma/sass/elements/_all.sass";
@import "../node_modules/bulma/sass/form/_all.sass";
@import "../node_modules/bulma/sass/components/navbar.sass";
@import "../node_modules/bulma/sass/layout/hero.sass";
@import "../node_modules/bulma/sass/layout/section.sass";

html {
  background-color: $lightgrey;
}

.navbar {
  margin-bottom:2vh;
  background-color: $blue;
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
  background-color: $blue;
}

.card   {
  margin-top: 2vh;
  margin-bottom: 2vh;
  background-color: $light;
  .has-text-centered {
    .card-header,
    .card-content,
    .card-footer {
      justify-content: center;
      align-items: center;
    }
  }
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
  }
}
</script>
