<template>
  <div>
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
    <footer class="footer is-vcentered" style="background-color:#9299DF">
      <div class="columns">
        <div class="column">
          <p class="copyright-text is-size-6 is-strong">Copyright &copy;  Plej.link</p>
          <p class="copyright-text is-size-6 is-strong">2020 All Rights Reserved by Plej</p>
        </div>
        <div class="column">
          <a class ="terms-text is-size-6 is-strong" href=""> Terms and Conditions</a>
        </div>
        <div class="column">
          <p class ="privacy-text is-size-6 is-strong"> Privacy Policy</p>
        </div>
        <div class="column">
          <a class="is-size-6 is-strong"> Contact Us </a>
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
  margin-bottom:20px;
  background-color: $lightgrey;
}

.is-strong {
  font-weight: bold;
}
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
footer {
  margin-top: 200px;
  min-width: 100%;
  background-color: $blue;
}
.card   {
  margin-top: 25px;
  margin-bottom: 25px;
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
      layout: 'div'
    }
  }
}
</script>
