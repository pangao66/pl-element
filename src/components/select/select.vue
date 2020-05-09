<template>
  <el-form-item :label="label" :prop="prop" :label-width="labelWidth" :rules="rules" v-bind="{...formItemAttrs}">
    <el-select :value-key="valueKey" v-bind="{...defaultAttrs,...$attrs}" v-model="selectedValue"
               @change="handleChange">
      <el-option v-for="item in optionsList" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { isArray, isPlainObject } from '../../utils'

export default {
  name: 'pl-select',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    value: { default: '' },
    labelWidth: {
      type: [ String, Number ],
      default: ''
    },
    formItemAttrs: {
      type: Object,
      default: () => ({})
    },
    required: {
      type: Boolean,
      default: null
    },
    options: {
      type: [ Array, Object ],
      default: () => []
    },
    optionsAttr: {
      type: String,
      default: 'label,value'
    },
    valueKey: {
      type: [ String, Number ]
    },
    valueLabel: {
      type: [ String, Number ]
    }
  },
  data () {
    return {
      selectedValue: '',
      defaultAttrs: {
        clearable: true,
        filterable: true,
        defaultFirstOption: true
      }
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
      this.$emit('input', val)
    },
    init () {
      this.selectedValue = this.value
    }
  },
  computed: {
    optionsList () {
      if (isArray(this.options)) {
        if (this.valueKey) {
          const list = this.options.map((item) => {
            console.log({ ...item })
            return {
              label: item[this.valueLabel],
              value: { ...item }
            }
          })
          return list
        }
        if (this.optionsAttr) {
          let [ label, value ] = this.optionsAttr.split(',')
          this.options.forEach((item) => {
            item.label = item[label]
            item.value = item[value]
          })
        }
        return this.options
      }
      if (isPlainObject(this.options)) {
        let list = []
        Object.keys(this.options).forEach((key) => {
          list.push({
            label: this.options[key],
            value: key
          })
        })
        return list
      }
      return this.options
    },
    rules () {
      let trigger = 'change'
      if (this.trigger) {
        trigger = this.trigger
      }
      const required = this.required ?? 'no-required'
      return required !== 'no-required' ? {
        required: this.required,
        message: `${this.label}不能为空`,
        trigger
      } : undefined
    }
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.init()
      }
    }
  }
}
</script>

