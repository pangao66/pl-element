<template>
  <el-select v-model="calValue" v-bind="attrs" @change="handleChange" v-on="eventList">
    <el-option
      v-for="(item, index) in optionsList"
      :key="index"
      :label="item.label"
      :value="item.value"
      v-bind="item.attrs"
    >
      <slot name="option-slot" v-bind="item"></slot>
    </el-option>
  </el-select>
</template>

<script>
import { isArray, isPlainObject } from '../../utils'

export default {
  name: 'PlSelect',
  inheritAttrs: false,
  props: {
    value: { default: '', type: [Array, Object, String, Number] },
    options: {
      type: [Array, Object],
      default: () => []
    },
    optionsAttr: {
      type: String,
      default: 'label,value'
    },
    valueKey: {
      type: [String, Number],
      default: ''
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueLabel: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    events: {
      type: Object,
      default: null
    },
    isBindObject: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedValue: ''
    }
  },
  computed: {
    calValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    attrs() {
      return {
        placeholder: this.$attrs.placeholder || `请选择${this.label}`,
        ...this.$PlElement?.selectConfig,
        ...this.$attrs.attrs
      }
    },
    eventList() {
      return {
        ...this.events,
        ...this.$listeners
      }
    },
    optionsList() {
      if (isArray(this.options)) {
        // 绑定对象
        if (this.valueKey && this.isBindObject) {
          return this.options.map((item) => {
            return {
              label: item[this.labelKey],
              value: { ...item }
            }
          })
        }
        // 配置别名
        if (this.optionsAttr) {
          const [label, value] = this.optionsAttr.split(',')
          this.options.forEach((item) => {
            item.label = item[label]
            item.value = item[value]
          })
        }
        return this.options
      }
      // 传入对象枚举key,value结构
      if (isPlainObject(this.options)) {
        const list = []
        Object.keys(this.options).forEach((key) => {
          list.push({
            label: this.options[key],
            value: key
          })
        })
        return list
      }
      return this.options
    }
  },
  methods: {
    handleChange(val) {
      this.calValue = val
      this.$emit('change')
    }
  }
}
</script>
