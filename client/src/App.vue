<template>
  <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>
</template>

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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Hind+Siliguri:400,600');

$pink: #ffa9be;
$black: #686868;
$beige: #fdf1ec;
$link: #686868;
$primary: #;
$family-primary: Hind Siliguri, sans-serif;
$input-border-color: $beige; //check with team

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
  background-color: $beige;
}

.navbar {
  margin-bottom:50px;
  background-color: $beige;
}

.is-strong {
  font-weight: bold;
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
