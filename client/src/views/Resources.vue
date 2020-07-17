<template>
  <div class="section columns">
    <div class="column is-offset-2">
      <h3 class="title is-centered is-strong">Resources</h3>
      <div class="content">
        <ul>
          <li><u><a href="https://pdfhost.io/v/Z6XxWqcYx_Resourcespdf.pdf" target="_blank">Promoting your Plej</a></u></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ExternalLayout from '../layouts/External'
import pdf from 'vue-pdf'

export default {
  name: 'Resources',
  components: {
    pdf
  },
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>
