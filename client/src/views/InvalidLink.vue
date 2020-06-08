<template>
  <div>
    <b> Invalid Link</b>
  </div>
</template>

<script>
import ExternalLayout from '../layouts/External'
export default {
  name: 'InvalidLink',
  created () {
    this.$emit('update:layout', ExternalLayout)
  }
}
</script>
