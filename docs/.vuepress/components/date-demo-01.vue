<template>
  <div>
    <h4>单个日期</h4>
    <pl-date v-model="date1"></pl-date>
    <h4>日期范围</h4>
    <pl-date
        v-model="date2"
        :attrs="attrs"
    >
    </pl-date>
  </div>
</template>

<script>
export default {
  name: 'date-demo-01',
  data() {
    return {
      date1: '',
      date2: [],
      attrs: {
        type: 'daterange',
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期'
      }
    }
  }
}
</script>

<style >

</style>
