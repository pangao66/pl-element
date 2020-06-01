<template>
  <pl-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></pl-input>
</template>

<script>
export default {
  name: 'input-demo-04',
  data () {
    return {
      textarea: ''
    }
  }
}
</script>

<style scoped>

</style>
