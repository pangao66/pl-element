<template>
  <el-switch
    v-model="switchValue"
    v-bind="attrs"
    @change="valueChange"
    v-on="events"
  />
</template>

<script>
export default {
  name: 'PlSwitch',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { default: null, type: Boolean },
    labelWidth: {
      type: [String, Number],
      default: ''
    },
    formItemAttrs: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      switchValue: ''
    }
  },
  computed: {
    attrs() {
      return {
        // placeholder: this.$attrs.placeholder || `请选择${this.label}`,
        // ...this.$PlElement.selectConfig,
        ...this.$attrs.attrs
      }
    },
    rules() {
      let trigger = 'change'
      if (this.trigger) {
        trigger = this.trigger
      }
      const required = this.required ?? 'no-required'
      return required !== 'no-required'
        ? {
          required: this.required,
          message: `${this.label}不能为空`,
          trigger
        }
        : undefined
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.switchValue = val
      }
    }
  },
  methods: {
    valueChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>
