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

$lightgrey: #f8f8f8;
$black: #686868;
$blue: #9299DF;
$link: #686868;
<<<<<<< HEAD
$primary: $pink;
=======
$primary: $blue;
>>>>>>> a7360071e9958d0e1f71239aed6197c1b970c3c1
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
  margin-bottom:50px;
  background-color: $lightgrey;
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
