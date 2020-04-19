<template>
  <el-form
      :model="form"
      v-bind="{...defaultFormOptions,...$attrs,...formOptions}"
      :rules="rules"
      v-on="$listeners"
      ref="form"
      :class="formClass"
  >
    <template v-for="item in formItems">
      <template v-if="item.slot">
        <template>
          <slot
              :name="item.slot"
              v-bind="{form,item}"
          />
        </template>
      </template>
      <template v-else>
        <template v-if="item.type&&item.type!=='grid'">
          <el-form-item
              :label="item.label"
              :prop="item.prop"
              v-bind="{...item.formItemAttrs}"
              :rules="getRules(item)"
          >
            <component
                :is="getType(item.type)"
                v-model.trim="form[item.prop]"
                :item="item"
                v-if="item.type==='input'&&item.trim"
            >
            </component>
            <component
                v-else
                :is="getType(item.type)"
                v-model="form[item.prop]"
                :item="item"
            >
            </component>
          </el-form-item>
        </template>
        <el-row v-else>
          <el-col v-for="(col,index) in item.columns" :key="index" :span="col.span">
            <el-form-item
                v-if="!col.slot"
                :label="col.label"
                :prop="col.prop"
                v-bind="{...col.formItemAttrs}"
                :rules="getRules(col)"
            >
              <component
                  :is="getType(col.type)"
                  v-model.trim="form[col.prop]"
                  :item="col"
                  v-if="item.type==='input'&&item.trim"
              >
              </component>
              <component
                  v-else
                  :is="getType(col.type)"
                  v-model="form[col.prop]"
                  :item="col"
              >
              </component>
            </el-form-item>
            <template v-else>
              <template>
                <slot
                    :name="col.slot"
                    v-bind="{form,col}"
                />
              </template>
            </template>
          </el-col>
        </el-row>
      </template>
    </template>
    <slot name="submit">
      <el-form-item v-if="isSearchForm">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <slot name="handle-area"></slot>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script>

import PFormItem from './p-form-items/p-form-item'
import PInput from './p-form-items/p-input'
import PSelect from './p-form-items/p-select'
import PCheckboxGroup from './p-form-items/p-checkbox-group'
import PDatePicker from './p-form-items/p-date-picker'
import PInputNumber from './p-form-items/p-input-number'
import PRadioGroup from './p-form-items/p-radio-group'
import PRate from './p-form-items/p-rate'
import PSlider from './p-form-items/p-slider'
import PTimePicker from './p-form-items/p-time-picker'
import PSwitch from './p-form-items/p-switch'

import {
  carNumReg,
  idCardReg,
  integerNumberReg,
  priceReg,
  telReg,
  towPointReg,
  percentReg
} from 'components/pf-table/src/utils/regs'
// import { debounce } from 'throttle-debounce'
import NP from 'number-precision'
export default {
  name: 'p-form',
  components: {
    PSwitch,
    PTimePicker,
    PSlider,
    PRate,
    PRadioGroup,
    PInputNumber,
    PDatePicker,
    PCheckboxGroup,
    PSelect,
    PInput,
    PFormItem
  },
  model: {
    prop: 'originData',
    event: 'change'
  },
  props: {
    formOptions: {
      type: Object,
      default: ()=>({})
    },
    originData: {
      type: [Object, Array],
      default: ()=>({})
    },
    isSearchForm: {
      type: Boolean,
      default: false
    },
    showSubmit: {
      type: Boolean,
      default: false
    },
    formItems: {
      type: Array,
      required: true
    },
    formClass: {
      type: [String,Array,Object,Function]
    },
    rules: {
      type: [Object, Array],
      default: ()=>({})
    },
    autoFormatPrice: {
      type: Boolean,
      default: true
    },
    autoFormatPercent: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {},
      defaultFormOptions: {
        labelWidth: '120px',
        labelPosition: 'right',
        labelSuffix: '：'
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      if (this.originData && Object.keys(this.originData).length) {
        const form = { ...this.originData }
        if (this.autoFormatPrice || this.autoFormatPercent) {
          this.formItems.forEach((item) => {
            if (item.price) {
              form[item.prop] = this.transformPrice(form[item.prop])
            }
            if (item.percent) {
              form[item.prop] = this.transformPercent(form[item.prop])
            }
          })
        }
        this.form = { ...form }
      }
    },
    transformPrice (price) {
      if (price !== undefined && price != null) {
        return NP.divide(price, 100)
      }
      return ''
    },
    transformPercent (percent) {
      if (percent !== undefined && percent != null) {
        return NP.times(percent, 100)
      }
      return ''
    },
    recoverPrice (price) {
      if (price !== undefined && price != null) {
        return NP.times(price, 100)
      }
      return ''
    },
    revocerPercent (percent) {
      if (percent !== undefined && percent != null) {
        return NP.divide(percent, 100)
      }
      return ''
    },
    search () {
      this.$emit('search', this.form)
    },
    reset () {
      this.$refs.form.resetFields()
      this.initData()
      this.$nextTick(() => {
        this.$emit('reset', this.form)
      })
    },
    clearValidate () {
      this.$refs.form.clearValidate()
    },
    async validate () {
      try {
        await this.$refs.form.validate()
        return new Promise((resolve) => {
          const result = this.getResult()
          resolve({ ...result })
        })
      } catch (e) {
        return new Promise((resolve) => {
          resolve(false)
        })
      }
    },
    async submit () {
      let valid = await this.validate()
      return new Promise((resolve, reject) => {
        if (valid) {
          const result = this.getResult()
          resolve({ ...result })
        } else {
          reject('表单校验不通过')
        }
      })
    },
    getType (type) {
      const map = {
        'input': 'p-input',
        'select': 'p-select',
        'checkbox': 'p-checkbox-group',
        'date': 'p-date-picker',
        'radio': 'p-radio-group',
        'rate': 'p-rate',
        'slider': 'p-slider',
        'switch': 'p-switch',
        'time': 'p-time-picker',
        'input-number': 'p-input-number'
      }
      return map[type]
    },
    getRules (item) {
      if (!item.type) {
        return undefined
      }
      const triggerMessage = item.type === 'input' ? '请输入' : '请选择'
      let trigger = item.type === 'input' ? 'blur' : 'change'
      if (item.trigger) {
        trigger = item.trigger
      }
      const required = item.required ?? 'no-required'
      let rules = [
        required !== 'no-required' ? {
          required: item.required,
          message: `${triggerMessage}${item.label}`,
          trigger
        } : undefined,
        item.idCard ? {
          pattern: idCardReg, message: '请输入正确的身份证号', trigger
        } : undefined,
        item.carNumber ? {
          pattern: carNumReg, message: '请输入正确的车牌号', trigger
        } : undefined,
        item.integer ? { pattern: integerNumberReg, message: '请输入正整数', trigger } : undefined,
        item.tel ? { pattern: telReg, message: '请输入正确的手机号码', trigger } : undefined,
        item.price ? { pattern: priceReg, message: '请输入正确的金额', trigger } : undefined,
        item.towPoint ? { pattern: towPointReg, message: '请输入正确的两位小数', trigger } : undefined,
        item.percent ? { pattern: percentReg, message: '请输入正确的百分比', trigger } : undefined
      ]
      if (item.rules && item.rules instanceof Array) {
        rules = [...rules, ...item.rules]
      } else {
        rules = [...rules, item.rules]
      }
      rules = rules.filter(v => v)
      return rules.length ? rules : undefined
    },
    getResult () {
      const result = { ...this.form }
      if (this.autoFormatPrice || this.autoFormatPercent) {
        this.formItems.forEach((item) => {
          if (item.price) {
            result[item.prop] = this.recoverPrice(result[item.prop])
          }
          if (item.percent) {
            result[item.prop] = this.revocerPercent(result[item.prop])
          }
        })
      }
      return result
    }
  },
  watch: {
    form: {
      deep: true,
      handler (val) {
        this.$nextTick(() => {
          this.$emit('form-change', val)
          this.$emit('change', val)
        })
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
