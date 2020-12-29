<template>
  <el-select
    v-model="selectedValue"
    value-key="id"
    v-bind="attrs"
    @change="handleChange"
    v-on="eventList"
  >
    <el-option
      v-for="(item,index) in optionsList"
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
    }
  },
  data () {
    return {
      selectedValue: ''
    }
  },
  computed: {
    attrs () {
      return {
        placeholder: this.$attrs.placeholder || `请选择${this.label}`,
        ...this.$PlElement.selectConfig,
        ...this.$attrs.attrs
      }
    },
    eventList () {
      return {
        ...this.events,
        ...this.$listeners
      }
    },
    optionsList () {
      if (isArray(this.options)) {
        if (this.valueKey) {
          return this.options.map((item) => {
            return {
              label: item[this.valueLabel],
              value: { ...item }
            }
          })
        }
        if (this.optionsAttr) {
          const [label, value] = this.optionsAttr.split(',')
          this.options.forEach((item) => {
            item.label = item[label]
            item.value = item[value]
          })
        }
        return this.options
      }
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
  watch: {
    value: {
      immediate: true,
      handler () {
        this.init()
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
  }
}
</script>
