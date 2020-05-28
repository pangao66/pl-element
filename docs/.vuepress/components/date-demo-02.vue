<template>
  <el-form :model="form" label-width="90px" label-position="right" label-suffix="：">
    <pl-date v-model="form.date1" label="日期1" prop="date1"></pl-date>
    <pl-date v-model="form.date2" label="日期2" prop="date2" type="daterange"
             range-separator="至"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
    ></pl-date>
  </el-form>
</template>

<script>
export default {
  name: 'date-demo-02',
  data () {
    return {
      form: {
        date1: '',
        date2: []
      }
    }
  }
}
</script>

<style scoped>

</style>
