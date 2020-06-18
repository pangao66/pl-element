<template>
  <el-form-item
      :label="item.label"
      :prop="item.prop"
      v-if="!item.cols"
      :rules="getRules(item)"
  >
    <component
        :is="getComp(item.comp)"
        v-bind="item"
        v-model="form[item.prop]"
        :ref="item.prop"
    >
    </component>
  </el-form-item>
  <form-item-grid v-else></form-item-grid>
</template>

<script>
import FormItemGrid from './form-item-grid'
import { carNumReg, idCardReg, integerNumberReg, percentReg, priceReg, telReg, towPointReg } from '../../../utils/regs'

export default {
  name: 'pl-form-item',
  components: { FormItemGrid },
  inject: [ 'plForm' ],
  props: {
    item: {},
    form: {
      type: Object
    }
  },
  created () {
    if (!(this.item.prop in this.form)) {
      // this.$set(this.form, this.prop, '')
    }
  },
  methods: {
    getComp (comp) {
      const map = {
        input: 'pl-input',
        select: 'pl-select',
        radio: 'pl-radio',
        checkbox: 'pl-checkbox',
        date: 'pl-date',
        time: 'pl-time',
        'switch': 'pl-switch'
        // 'grid': 'FormItemGrid'
      }
      return map[comp] || comp
    },
    getRules (item) {
      let handleWayText = ''
      const { comp } = item
      if (comp === 'input') {
        if (item.type === 'textarea') {
          handleWayText = '请填写'
        } else {
          handleWayText = '请输入'
        }
      } else {
        handleWayText = '请选择'
      }
      let trigger = item.trigger || 'blur'
      const required = item.required ?? 'no-required'
      const validation = item.validation
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
          required: item.required,
          message: `${handleWayText}${item.label}`,
          trigger
        } : undefined,
        map[validation]
      ]
      if (item.rules && item.rules instanceof Array) {
        rules = [ ...rules, ...item.rules ]
      } else {
        rules = [ ...rules, item.rules ]
      }
      rules = rules.filter(v => v)
      return rules.length ? rules : undefined
    }
  }
}
</script>

<style scoped>

</style>
