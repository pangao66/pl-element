<template>
  <el-time-picker
    v-model="time"
    @change="valueChange"
    v-on="events"
  />
</template>

<script>
export default {
  name: 'PlTime',
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: { default: '', type: [Array, Date, Object, String, Number] },
    events: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      time: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.time = val
      }
    }
  },
  methods: {
    valueChange (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>
