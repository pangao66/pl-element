<template>
  <el-input
    v-model="message"
    v-bind="attrs"
    :placeholder="$attrs.placeholder||`请输入${label}`"
    @change="handleChange"
    @input="handleInput"
    @blur="$emit('blur')"
  >
    <slot slot="suffix"/>
  </el-input>
</template>

<script>
import { idCardReg, telReg, integerNumberReg, carNumReg, priceReg, towPointReg, percentReg } from '../../utils/regs'
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
    mergedRules () {
      // const triggerMessage = item.type === 'input' ? '请输入' : '请选择'
      let trigger = 'blur'
      if (this.trigger) {
        trigger = this.trigger
      }
      const required = this.required ?? 'no-required'
      const validation = this.validation
      const map = {
        idCard: { pattern: idCardReg, message: '请输入正确的身份证号', trigger },
        carNumber: { pattern: carNumReg, message: '请输入正确的车牌号', trigger },
        integer: { pattern: integerNumberReg, message: '请输入正整数', trigger },
        tel: { pattern: telReg, message: '请输入正确的手机号码', trigger },
        price: { pattern: priceReg, message: '请输入正确的金额', trigger },
        towPointReg: { pattern: towPointReg, message: '请输入正确的两位小数', trigger },
        percentReg: { pattern: percentReg, message: '请输入正确的百分比', trigger }
      }
      let rules = [
        required !== 'no-required' ? {
          required: this.required,
          message: `${this.label}不能为空`,
          trigger
        } : undefined,
        map[validation]
      ]
      if (this.rules && this.rules instanceof Array) {
        rules = [...rules, ...this.rules]
      } else {
        rules = [...rules, this.rules]
      }
      rules = rules.filter(v => v)
      return rules.length ? rules : undefined
    },
    calValue: {
      set (val) {
        this.message = val.toFixed(2)
        console.log(this.message)
      },
      get () {
        if (this.cent) {
          return NP.round(NP.times(this.message, 100), 0)
        }
        return this.message
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
    isNaN (num) {
      return Number.isNaN(parseFloat(num))
    },
    handleChange (val) {
      this.$emit('input', this.calValue)
      this.$nextTick(() => {
        this.$emit('change', this.message)
      })
    },
    handleInput (val) {
      if (!this.cent) {
        this.$emit('input', val)
      }
    },
    init () {
      if (this.cent) {
        this.calValue = NP.divide(this.value, 100) || 0
      } else {
        this.message = this.value
      }
    }
  }
}
</script>
