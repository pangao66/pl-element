<template>
  <el-form-item :label="label" :prop="prop" :label-width="labelWidth" v-bind="{...formItemAttrs}">
    <el-date-picker
        v-model="date"
        v-bind="$attrs"
        :picker-options="calPickerOptions"
        @change="handleChange"
        @focus="timeArrayFocus"
        clearable
    ></el-date-picker>
  </el-form-item>
</template>

<script>
export default {
  name: 'pl-date',
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
    limit: {
      type: Object,
      default: () => ({})
    },
    pickerOptions: {
      type: Object
    },
    shortcuts: {
      type: Array
    },
    disableDate: {
      type: [ String, Number ]
    },
    between: {
      type: [ Number, String ]
    }
  },
  data () {
    return {
      date: ''
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
      this.$emit('input', val)
    },
    timeArrayFocus () {
      this.minDate = ''
      this.maxDate = ''
    }
  },
  computed: {
    calPickerOptions () {
      if (this.pickerOptions) {
        return this.pickerOptions
      }
      const shortcuts = this.shortcuts
      let list = []
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
      if (shortcuts && shortcuts.length) {
        shortcuts.forEach((item) => {
          if (map[item]) {
            const { text, end, start, time } = map[item]
            list.push({
              text,
              onClick (picker) {
                picker.$emit('pick', time || [ start, end ])
              }
            })
          }
        })
      }
      const disableDate = this.disableDate
      return {
        shortcuts: list.length ? list : undefined,
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
            let range = this.between * 24 * 3600 * 1000
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
      }
    }
  }
}
</script>

<style scoped>

</style>
