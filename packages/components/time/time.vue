<template>
  <el-time-picker v-model="calValue" @change="valueChange" v-on="events" />
</template>

<script>
export default {
  name: 'PlTime',
  props: {
    value: {
      default: '',
      type: [Array, Date, Object, String, Number]
    },
    events: {
      type: Object,
      default: null
    }
  },
  computed: {
    calValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    valueChange(val) {
      this.calValue = val
      this.$emit('change', val)
    }
  }
}
</script>
