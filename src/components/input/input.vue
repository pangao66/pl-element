<template>
  <el-input
    v-model="message"
    v-bind="{...attrs,...$scopedSlots}"
    :placeholder="$attrs.placeholder||`请输入${label}`"
    @change="handleChange"
    @input="handleInput"
    @blur="$emit('blur')"
  >
    <svg-icon v-if="icon" :class-name="icon" :slot="iconPosition"></svg-icon>
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>
  </el-input>
</template>

<script>
import NP from 'number-precision'

export default {
  name: 'PlInput',
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
      type: String
    },
    iconPosition: {
      type: String,
      default: 'prefix'
    }
  },
  data () {
    return {
      message: '',
      defaultAttrs: {
        clearable: true
      }
    }
  },
  computed: {
    attrs () {
      return {
        ...this.$PlElement.inputConfig,
        ...this.$attrs.attrs
      }
    },
    calValue: {
      set (val) {
        if (this.cent) {
          this.message = NP.round(val, 2)
        } else {
          this.message = val
        }
      },
      get () {
        if (this.transfer) {
          return this.transferMessage()
        }
        if (this.cent) {
          this.message = NP.round(this.message, 2)
          return NP.round(NP.times(this.message, 100), 0)
        } else {
          return this.message
        }
      }
    },
    trim () {
      return !!this.attrs.trim
    }
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.init()
      }
    }
  },
  methods: {
    handleChange () {
      if (this.transfer || this.trim) {
        this.$emit('input', this.transferMessage())
      } else {
        this.$emit('input', this.calValue)
      }
      this.$nextTick(() => {
        this.$emit('change', this.message)
      })
    },
    handleInput (val) {
      if (!this.cent) {
        if (this.transfer || this.trim) {
          this.$emit('input', this.transferMessage())
        } else {
          this.$emit('input', val)
        }
      }
    },
    init () {
      if (this.cent) {
        this.$nextTick(() => {
          this.calValue = NP.divide(this.value, 100) || 0
        })
      } else {
        this.message = this.value
      }
    },
    transferMessage () {
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
