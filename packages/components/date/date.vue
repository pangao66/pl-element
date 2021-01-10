<template>
  <el-date-picker
    v-model="calDate"
    :picker-options="calPickerOptions"
    v-bind="attrs"
    @change="handleChange"
    @focus="timeArrayFocus"
    v-on="eventList"
  />
</template>

<script>
export default {
  name: 'PlDate',
  inheritAttrs: false,
  inject: ['plForm'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    value: {
      default: '',
      type: [Array, String, Object, Date]
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
    events: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    calDate: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    attrs() {
      return {
        ...this.$PlElement?.dateConfig,
        ...this.$attrs.attrs
      }
    },
    eventList() {
      return {
        ...this.events,
        ...this.$listeners
      }
    },
    calPickerOptions() {
      if (this.pickerOptions) {
        return this.pickerOptions
      }
      let shortcuts = this.shortcuts || []
      const list = []
      const today = new Date()
      const todayTime = today.setHours(0, 0, 0, 0)
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
        const between = this.between
        if (between >= 90 || !between) {
          shortcuts = ['recentWeek', 'recentMonth', 'recentThreeMonth']
        } else if (between >= 30) {
          shortcuts = ['recentWeek', 'recentMonth']
        }
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
  methods: {
    handleChange(val) {
      // 如果结果格式化为时间戳并且是范围选择,首日期应为当日0时,末日期应为当日23时59分59秒
      this.$emit('change', val)
      this.calDate = val
      if (this.dateRangeKeys && this.dateRangeKeys.length) {
        const [start, end] = this.dateRangeKeys
        let [startTime, endTime] = this.date || []
        //  如果需要时间戳类型,则设置开始时间为当日0点,结束时间为当日23:59:59
        const valueFormat = this.attrs['value-format'] || this.attrs.valueFormat
        if (valueFormat && valueFormat === 'timestamp') {
          startTime = startTime ? new Date(startTime).setHours(0, 0, 0) : null
          endTime = endTime
            ? new Date(endTime).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1
            : null
        }
        this.plForm.setForm(start, startTime || null)
        this.plForm.setForm(end, endTime || null)
      }
    },
    timeArrayFocus() {
      this.minDate = ''
      this.maxDate = ''
      this.$emit('focus')
    }
  }
}
</script>
