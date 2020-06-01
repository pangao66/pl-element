<template>
  <pl-input v-model="text" @change="handleChange"></pl-input>
</template>

<script>
export default {
  name: 'input-demo-01',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>
