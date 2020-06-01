<template>
  <div>
    <h4>快捷方式</h4>
    <pl-date v-model="date1" :shortcuts="['today','yesterday','weekAgo']"></pl-date>
    <pl-date v-model="date2" type="daterange"
             range-separator="至"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
             :shortcuts="shortcutsDate2"
    ></pl-date>
    <h4>不可选时间</h4>
    <p>不可选时间今天之前,同时日期范围间隔不能超过60天</p>
    <pl-date v-model="date3" type="daterange" disable-date="beforeToday"
             :between="60"></pl-date>
    <p>不可选时间为下个月之后,日期范围间隔不能超过30天</p>
    <pl-date v-model="date4" type="daterange" disable-date="nextMonth"
             :between="30"></pl-date>
    <p>不可选时间为60天之后</p>
    <pl-date v-model="date5" type="daterange" :disable-date="60"></pl-date>
    <p>不可选时间为90天之前</p>
    <pl-date v-model="date6" type="daterange" :disable-date="-90"
    ></pl-date>
    <p>结果格式化,与el-date-picker属性一致</p>
    <pl-date v-model="date7" type="daterange"
             :date-range-keys="['startTime','endTime']" value-format="yyyy-MM-dd"></pl-date>
    <p>选择时间戳格式化,首日期为当日0时,末日期为当日23时59分59秒,这与el-date-picker有所不同,更符合业务逻辑</p>

    <pl-date v-model="date8" type="daterange"
             value-format="timestamp"></pl-date>
  </div>
</template>

<script>
export default {
  name: 'date-demo-02',
  data () {
    return {
      date1: '',
      date2: [],
      date3: [],
      date4: [],
      date5: [],
      date6: [],
      date7: [],
      date8: []
    }
  },
  computed: {
    shortcutsDate2 () {
      return [ 'recentWeek', 'recentMonth', 'recentThreeMonth' ]
    }
  }
}
</script>

<style scoped>

</style>
