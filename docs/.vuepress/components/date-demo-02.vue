<template>
  <el-form :model="form" label-width="90px" label-position="right" label-suffix="：">
    <pl-date v-model="form.date1" label="日期1" prop="date1" :shortcuts="['today','yesterday','weekAgo']"></pl-date>
    <pl-date v-model="form.date2" label="日期2" prop="date2" type="daterange"
             range-separator="至"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
             :shortcuts="shortcutsDate2"
    ></pl-date>
    <pl-date v-model="form.date3" type="daterange" label="日期3" value="date3" disable-date="beforeToday"></pl-date>
    <pl-date v-model="form.date4" type="daterange" label="日期4" value="date4" disable-date="nextMonth"></pl-date>
    <pl-date v-model="form.date5" type="daterange" label="日期5" value="date5" :disable-date="60"></pl-date>
    <pl-date v-model="form.date6" type="daterange" label="日期6" value="date6" :disable-date="-90"></pl-date>
  </el-form>
</template>

<script>
export default {
  name: 'date-demo-02',
  data () {
    return {
      form: {
        date1: '',
        date2: [],
        date3: [],
        date4: [],
        date5: [],
        date6: []
      }
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
