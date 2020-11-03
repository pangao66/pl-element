<template>
  <el-select
    v-model="selectedValue"
    value-key="id"
    v-bind="attrs"
    :placeholder="`请选择${label}`"
    @change="handleChange"
  >
    <el-option
      v-for="(item,index) in optionsList"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { isArray, isPlainObject } from '../../utils'

export default {
  name: 'PlSelect',
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
  computed: {
    attrs () {
      return {
        ...this.$PlElement.selectConfig,
        ...this.$attrs.attrs
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
