<template>
  <el-switch v-model="calValue" v-bind="attrs" @change="valueChange" v-on="events" />
</template>

<script>
export default {
  name: 'PlSwitch',
  props: {
    value: {
      default: null,
      type: Boolean
    },
    events: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    attrs() {
      return {
        // placeholder: this.$attrs.placeholder || `请选择${this.label}`,
        // ...this.$PlElement.selectConfig,
        ...this.$attrs.attrs
      }
    },
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
