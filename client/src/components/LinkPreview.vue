<template>
   <div class="columns is-centered">
    <div class="column is-half">
      <linkprevue :url="this.url">
        <template slot-scope="props">
          <div class="card" style="max-height:20rem">
            <img class="card-image" :src="props.img" :alt="props.title" style="max-height:10rem; width: 100%">
            <div class="card-content">
              <h1 class="title is-6 is-spaced">{{props.title}}</h1>
              <a v-bind:href="props.url" target="_blank" class="button is-primary has-text-white is-rounded is-strong">More</a>
            </div>
          </div>
        </template>
      </linkprevue>
    </div>
  </div>
</template>

<script>
import linkprevue from 'link-prevue'
export default {
  name: 'LinkPreview',
  components: {
    linkprevue
  },
  props: {
    url: ''
  }
}
</script>
