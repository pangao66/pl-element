<template>
  <el-input
    v-model="message"
    v-bind="{...attrs,...$scopedSlots}"
    :placeholder="$attrs.placeholder||`请输入${label}`"
    @change="handleChange"
    @input="handleInput"
    @blur="$emit('blur')"
  >
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
      type: Function,
      default: null
    },
    form: {
      type: Object,
      default: () => ({})
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
      return { ...this.$PlElement.inputConfig, ...this.$attrs }
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
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.init()
      }
    }
  },
  methods: {
    handleChange (val) {
      if (this.transfer) {
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
        if (this.transfer) {
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
      return this.transfer(this.message)
    }
  }
}
</script>
