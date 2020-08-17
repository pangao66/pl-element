<template>
  <div>
    <pl-input v-model="input1" :transfer="upperCase"></pl-input>
  </div>
</template>

<script>
export default {
  name: 'input-demo-06',
  data () {
    return {
      input1: '',
      input2: ''
    }
  },
  methods: {
    upperCase (val) {
      return val.toUpperCase()
    }
  }
}
</script>

<style scoped>

</style>
