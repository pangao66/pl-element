<template>
  <el-form-item
    v-if="!cols"
    :label="label"
    :prop="prop"
    :rules="calRules"
  >
    <component
      :is="currentComp"
      :ref="prop"
      v-model="form[prop]"
      :label="label"
      :prop="prop"
      v-bind="$attrs"
    >
    </component>
  </el-form-item>
  <form-item-grid v-else/>
</template>

<script>
import FormItemGrid from './form-item-grid'
import { carNumReg, idCardReg, integerNumberReg, percentReg, priceReg, telReg, towPointReg } from '../../utils/regs'

export default {
  name: 'PlFormItem',
  components: { FormItemGrid },
  inject: ['plForm'],
  props: {
    // item: {
    //   type: Object,
    //   default: () => ({})
    // },
    // form: {
    //   type: Object
    // },
    comp: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    cols: {
      type: Array,
      default: null
    },
    rules: {
      type: [Array, Object],
      default: null
    },
    required: {
      type: Boolean,
      default: null
    },
    trigger: {
      type: String,
      default: null
    },
    validation: {
      type: String,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    }
  },
  methods: {},
  computed: {
    currentComp () {
      const comp = this.comp
      const map = {
        input: 'pl-input',
        select: 'pl-select',
        radio: 'pl-radio',
        checkbox: 'pl-checkbox',
        date: 'pl-date',
        time: 'pl-time',
        switch: 'pl-switch'
        // 'grid': 'FormItemGrid'
      }
      // console.log(map[comp])
      return map[comp] || comp
    },
    calRules () {
      let handleWayText = ''
      const { comp } = this
      const attrs = this.$attrs
      if (comp === 'input') {
        if (attrs.attrs && attrs.attrs.type === 'textarea') {
          handleWayText = '请填写'
        } else {
          handleWayText = '请输入'
        }
      } else {
        handleWayText = '请选择'
      }
      const trigger = this.trigger || 'blur'
      const required = this.required ?? 'no-required'
      const validation = this.validation
      const map = {
        idCard: {
          pattern: idCardReg,
          message: '请输入正确的身份证号',
          trigger
        },
        carNumber: {
          pattern: carNumReg,
          message: '请输入正确的车牌号',
          trigger
        },
        integer: {
          pattern: integerNumberReg,
          message: '请输入正整数',
          trigger
        },
        tel: {
          pattern: telReg,
          message: '请输入正确的手机号码',
          trigger
        },
        price: {
          pattern: priceReg,
          message: '请输入正确的金额',
          trigger
        },
        towPointReg: {
          pattern: towPointReg,
          message: '请输入正确的两位小数',
          trigger
        },
        percentReg: {
          pattern: percentReg,
          message: '请输入正确的百分比',
          trigger
        }
      }
      let rules = [
        required !== 'no-required' ? {
          required: this.required,
          message: `${handleWayText}${this.label}`,
          trigger
        } : undefined,
        map[validation],
        this.max || this.min ? {
          max: this.max,
          min: this.min,
          message: this.lengthMessage,
          trigger
        } : undefined
      ]
      if (this.rules && this.rules instanceof Array) {
        rules = [...rules, ...this.rules]
      } else {
        rules = [...rules, this.rules]
      }
      rules = rules.filter(v => v)
      return rules.length ? rules : undefined
    },
    form () {
      return this.plForm.form
    },
    lengthMessage () {
      const { max, min } = this
      if (this.max && this.min) {
        return `长度在${min}到${max}字符`
      }
      if (this.min) {
        return `至少输入${min}个字符`
      }
      if (this.max) {
        return `最多输入${max}个字符`
      }
    }
  }
}
</script>

<style scoped>

</style>
