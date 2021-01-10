<template>
  <el-form-item v-if="!cols" ref="plFormItem" :label="label" :prop="prop" :rules="calRules">
    <component
      :is="currentComp"
      :ref="prop"
      :value="value"
      :label="label"
      :prop="prop"
      :events="events"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]>
        <slot :name="slot" />
      </template>
    </component>
    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-form-item>
  <el-row v-else>
    <el-col v-for="(col, index) in cols" :key="index" :span="col.span">
      <slot v-if="col.slotName" :name="col.slotName" v-bind="{ form, item: col }" />
      <pl-form-item v-else v-bind="col" />
    </el-col>
  </el-row>
</template>

<script>
import FormItemGrid from './form-item-grid'
import {
  carNumReg,
  idCardReg,
  integerNumberReg,
  percentReg,
  priceReg,
  telReg,
  towPointReg,
  urlReg
} from '../../utils/regs'
import emitter from 'element-ui/lib/mixins/emitter'

export default {
  name: 'PlFormItem',
  components: { FormItemGrid },
  inject: ['plForm'],
  mixins: [emitter],
  inheritAttrs: false,
  props: {
    // item: {
    //   type: Object,
    //   default: () => ({})
    // },
    // form: {
    //   type: Object
    // },
    value: {
      type: [Array, String, Object, Number, Boolean, Date],
      default: null
    },
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
    },
    length: {
      type: Number,
      default: null
    },
    events: {
      type: Object,
      default: null
    }
  },
  computed: {
    currentComp() {
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
    calRules() {
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
      // const trigger = this.trigger || 'blur'
      let trigger
      if (this.trigger) {
        trigger = this.trigger
      }
      if (this.comp === 'input') {
        trigger = 'blur'
      } else {
        trigger = 'change'
      }
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
        towPoint: {
          pattern: towPointReg,
          message: '请输入正确的两位小数',
          trigger
        },
        percent: {
          pattern: percentReg,
          message: '请输入正确的百分比',
          trigger
        },
        url: {
          pattern: urlReg,
          message: '请输入正确的url',
          trigger
        }
      }
      let rules = [
        required !== 'no-required'
          ? {
            required: this.required,
            message: `${handleWayText}${this.label}`,
            trigger
          }
          : undefined,
        map[validation],
        this.max || this.min || this.length
          ? {
            max: this.max,
            min: this.min,
            message: this.lengthMessage,
            trigger
          }
          : undefined
      ]
      if (this.rules && this.rules instanceof Array) {
        rules = [...rules, ...this.rules]
      } else {
        rules = [...rules, this.rules]
      }
      rules = rules.filter((v) => v)
      return rules.length ? rules : undefined
    },
    form() {
      return this.plForm.form
    },
    lengthMessage() {
      const { max, min, length } = this
      if (this.max && this.min) {
        return `长度在${min}到${max}字符`
      }
      if (this.min) {
        return `至少输入${min}个字符`
      }
      if (this.max) {
        return `最多输入${max}个字符`
      }
      if (this.length) {
        return `请输入${length}个字符`
      }
      return ''
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('PlForm', 'pl.form.addField', {
        formItem: this.$refs.plFormItem,
        formItemFiled: this.$refs[this.prop],
        plFormItem: this,
        prop: this.prop
      })
    }
  },
  beforeDestroy() {
    this.dispatch('PlForm', 'pl.form.removeField', {
      prop: this.prop
    })
  },
  methods: {}
}
</script>
