<template>
  <el-input
    v-model="message"
    v-bind="attrs"
    v-on="eventList"
  >
    <svg-icon
      v-if="icon"
      :slot="iconPosition"
      :class-name="icon"
    />
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
  </el-input>
</template>

<script>
import NP from 'number-precision'

export default {
  name: 'PlInput',
  inheritAttrs: false,
  props: {
    rules: {
      type: [Object, Array],
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    value: { default: '', type: [String, Number] },
    required: {
      type: Boolean,
      default: null
    },
    validation: {
      type: String,
      default: ''
    },
    cent: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: [Function, String],
      default: null
    },
    form: {
      type: Object,
      default: () => ({})
    },
    icon: {
      type: String,
      default: null
    },
    iconPosition: {
      type: String,
      default: 'prefix'
    },
    events: {
      type: [Object],
      default: null
    }
  },
  data() {
    return {
      message: '',
      defaultAttrs: {
        clearable: true
      }
    }
  },
  computed: {
    attrs() {
      return {
        placeholder: this.$attrs.placeholder || `请输入${this.label}`,
        ...this.$PlElement?.inputConfig,
        ...this.$attrs.attrs
      }
    },
    eventList() {
      return {
        ...this.events,
        ...this.$listeners,
        change: this.handleChange,
        input: this.handleInput
      }
    },
    calValue: {
      set(val) {
        if (this.cent) {
          this.message = NP.round(val, 2)
        } else {
          this.message = val
        }
      },
      get() {
        if (this.transfer) {
          return this.transferMessage()
        }
        if (this.cent) {
          this.message = NP.round(this.message, 2) || 0
          return NP.round(NP.times(this.message, 100), 0) || 0
        } else {
          return this.message
        }
      }
    },
    trim() {
      if (this.cent) {
        return false
      }
      return !!this.attrs.trim
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.init()
      }
    }
  },
  methods: {
    handleChange() {
      if (this.transfer || this.trim) {
        this.$emit('input', this.transferMessage())
      } else {
        this.$emit('input', this.calValue)
      }
      this.$nextTick(() => {
        this.$emit('change', this.message)
      })
      if (this.events && this.events.change) {
        this.events.change(this.message)
      }
    },
    handleInput(val) {
      if (!this.cent) {
        if (this.transfer || this.trim) {
          this.$emit('input', this.transferMessage())
        } else {
          this.$emit('input', val)
        }
      }
      if (this.events && this.events.input) {
        this.events.input(val)
      }
    },
    init() {
      if (this.cent) {
        this.$nextTick(() => {
          this.calValue = NP.divide(this.value, 100) || 0
        })
      } else {
        this.message = this.value
      }
      // this.message = this.value
    },
    transferMessage() {
      let message = this.message
      if (this.trim) {
        message = message.trim()
      }
      if (typeof this.transfer === 'string') {
        const type = this.transfer
        if (type === 'upperCase') {
          message = message.toUpperCase()
        }
      }
      if (typeof this.transfer === 'function') {
        message = this.transfer(message)
      }
      this.message = message
      return message
    }
  }
}
</script>
