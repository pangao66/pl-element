<template>
  <el-form-item :label="label" :prop="prop" :label-width="labelWidth" :rules="rules" v-bind="{...formItemAttrs}">
    <el-radio-group v-model="selectedValue" v-on="$listeners">
      <template v-for="item in optionsList">
        <el-radio-button v-if="radioButton" :label="item.value" :key="item.value">{{item.label}}</el-radio-button>
        <el-radio v-else :label="item.value" :key="item.value">{{item.label}}</el-radio>
      </template>
    </el-radio-group>
  </el-form-item>
</template>

<script>
import { isArray, isPlainObject } from '../../utils'

export default {
  name: 'pl-radio',
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
    },
    radioButton: {
      type: Boolean,
      default: false
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
      // 数组类型
      if (isArray(this.options)) {
        let [ label, value ] = this.optionsAttr.split(',')
        let list = []
        this.options.map((item) => {
          // 如果每项是对象形式
          if (isPlainObject(item)) {
            list.push({ label: item[label], value: item[value] })
          } else {
            list.push({ label: item, value: item })
          }
        })
        return list
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

