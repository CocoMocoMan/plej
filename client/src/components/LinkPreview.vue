<template>
  <div class="columns is-centered has-text-centered">
    <div class="column is-two-thirds">
      <linkprevue :url="this.url">
        <template slot-scope="props">
          <a v-bind:href="props.url" target="_blank">
            <div class="card card-grey" style>
              <img class="card-image" :src="props.img" :alt="props.title" style="width:100%" />
              <div class="card-content">
                <h1 class="title is-6 is-spaced">{{props.title}}</h1>
              </div>
            </div>
          </a>
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
