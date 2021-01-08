<template>
  <el-checkbox-group
    v-model="selectedValue"
    v-on="eventList"
  >
    <template v-for="item in optionsList">
      <el-checkbox-button
        v-if="radioButton"
        :key="item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-checkbox-button>
      <el-checkbox
        v-else
        :key="item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>
<script>
import { isArray, isPlainObject } from '../../utils'

export default {
  name: 'PlCheckbox',
  props: {
    value: { default: '', type: [String, Number] },
    options: {
      type: [Array, Object],
      default: () => []
    },
    optionsAttr: {
      type: String,
      default: 'label,value'
    },
    valueLabel: {
      type: [String, Number],
      default: null
    },
    radioButton: {
      type: Boolean,
      default: false
    },
    events: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      selectedValue: [],
      defaultAttrs: {
        clearable: true,
        filterable: true,
        defaultFirstOption: true
      }
    }
  },
  computed: {
    optionsList() {
      // 数组类型
      if (isArray(this.options)) {
        const [label, value] = this.optionsAttr.split(',')
        const list = []
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
    },
    eventList() {
      return {
        ...this.events,
        ...this.$listeners
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.init()
      }
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val)
      this.$emit('input', val)
    },
    init() {
      this.selectedValue = this.value || []
    }
  }
}
</script>
