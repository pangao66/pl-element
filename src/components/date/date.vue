<template>
  <el-date-picker
    v-model="date"
    :picker-options="calPickerOptions"
    v-bind="attrs"
    @change="handleChange"
    @focus="timeArrayFocus"
    v-on="events"
  />
</template>

<script>
export default {
  name: 'PlDate',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    value: { default: '', type: [Array, String, Object, Date] },
    labelWidth: {
      type: [String, Number],
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
    limit: {
      type: Object,
      default: () => ({})
    },
    pickerOptions: {
      type: Object,
      default: null
    },
    shortcuts: {
      type: Array,
      default: null
    },
    disableDate: {
      type: [String, Number],
      default: null
    },
    between: {
      type: [Number, String],
      default: null
    },
    dateRangeKeys: {
      type: Array,
      default: null
    },
    form: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      date: ''
    }
  },
  computed: {
    attrs () {
      return {
        clearable: true,
        ...this.$PlElement.dateConfig,
        ...this.$attrs.attrs
      }
    },
    calPickerOptions () {
      if (this.pickerOptions) {
        return this.pickerOptions
      }
      let shortcuts = this.shortcuts || []
      const list = []
      const today = new Date()
      const todayTime = today.getTime()
      const map = {
        today: {
          text: '今天',
          time: today
        },
        yesterday: {
          text: '昨天',
          time: todayTime - 3600 * 1000 * 24
        },
        weekAgo: {
          text: '一周前',
          time: todayTime - 3600 * 1000 * 24 * 7
        },
        recentWeek: {
          text: '最近一周',
          end: todayTime,
          start: todayTime - 3600 * 1000 * 24 * 7
        },
        recentMonth: {
          text: '最近一个月',
          end: todayTime,
          start: new Date().setMonth(new Date().getMonth() - 1)
        },
        recentThreeMonth: {
          text: '最近三个月',
          end: todayTime,
          start: new Date().setMonth(new Date().getMonth() - 3)
        }
      }
      if (this.$attrs.attrs && this.$attrs.attrs.type && this.$attrs.attrs.type === 'daterange') {
        shortcuts = ['recentWeek', 'recentMonth', 'recentThreeMonth']
      }
      if (shortcuts && shortcuts.length) {
        shortcuts.forEach((item) => {
          if (map[item]) {
            const { text, end, start, time } = map[item]
            list.push({
              text,
              onClick: (picker) => {
                if (time) {
                  picker.$emit('pick', new Date(time))
                } else {
                  picker.$emit('pick', [new Date(start), new Date(end)])
                }
              }
            })
          }
        })
      }
      const disableDate = this.disableDate
      return {
        shortcuts: list.length ? list : null,
        onPick: ({ maxDate, minDate }) => {
          this.maxDate = maxDate
          this.minDate = minDate
        },
        disabledDate: (time) => {
          let con1
          let con2
          let con3
          if (typeof disableDate === 'string') {
            switch (disableDate) {
              case 'beforeToday':
                con1 = time < todayTime
                break
              case 'afterToday':
                con1 = time > todayTime
                break
              case 'nextMonth':
                con1 = time > new Date().setMonth(new Date().getMonth() + 1)
                break
              case 'lastMonth':
                con1 = time < new Date().setMonth(new Date().getMonth() - 1)
                break
            }
          }
          if (typeof disableDate === 'number') {
            if (disableDate > 0) {
              con1 = time > todayTime + 3600 * 1000 * 24 * disableDate
            } else {
              con1 = time < todayTime + 3600 * 1000 * 24 * disableDate
            }
          }
          if (this.between) {
            const range = this.between * 24 * 3600 * 1000
            if (this.maxDate) {
              con2 = time < this.maxDate.getTime() - range || time > this.maxDate.getTime() + range
            }
            if (this.minDate) {
              con3 = time > this.minDate.getTime() + range || time < this.minDate.getTime() - range
            }
          }
          return con1 || con2 || con3
        }
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (val) {
        this.date = val
        this.handleChange(val)
      }
    }
  },
  methods: {
    handleChange (val) {
      // const valueFormat = this.$attrs.valueFormat || this.$attrs['value-format']
      // // console.log(valueFormat)
      // // 如果结果格式化为时间戳并且是范围选择,首日期应为当日0时,末日期应为当日23时59分59秒
      // if (valueFormat === 'timestamp' && this.date instanceof Array) {
      //   if (val.length) {
      //     val[1] = new Date(new Date(new Date(val[1]).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
      //   }
      // }
      this.$emit('change', val)
      this.$emit('input', val)
      if (this.dateRangeKeys && this.dateRangeKeys.length) {
        const [start, end] = this.dateRangeKeys
        const [startTime, endTime] = this.date || []
        if (this.form) {
          this.$set(this.form, end, endTime)
          this.$set(this.form, start, startTime)
        }
      }
    },
    timeArrayFocus () {
      this.minDate = ''
      this.maxDate = ''
      this.$emit('focus')
    }
  }
}
</script>
