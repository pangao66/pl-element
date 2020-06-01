<template>
  <el-select :value-key="valueKey" v-bind="{...defaultAttrs,...$attrs}" v-model="selectedValue"
             @change="handleChange">
    <el-option v-for="item in optionsList" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { isArray, isPlainObject } from '../../../utils'

export default {
  name: 'pl-select',
  props: {
    value: { default: '' },
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
        for (let i in this.options) {
          console.log(i)
        }
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
  }
}
</script>

