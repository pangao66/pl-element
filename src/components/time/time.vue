<template>
  <el-time-picker v-model="time" @change="valueChange"></el-time-picker>
</template>

<script>
export default {
  name: 'pl-time',
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: { default: '' },
  },
  data () {
    return {
      time: ''
    }
  },
  methods: {
    valueChange (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.time = val
      }
    }
  }
}
</script>

<style scoped>

</style>

