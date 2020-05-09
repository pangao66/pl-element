<template>
  <div>
    <pl-table
        :data="tableData"
        :columns="columns"
    >
    </pl-table>
  </div>
</template>
<script>
export default {
  name: 'table-demo-01',
  data () {
    return {
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
        { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄' }
      ]
    }
  },
  computed: {
    columns () {
      return [
        { label: '日期', prop: 'date', attrs: { width: 180 } },
        { label: '姓名', prop: 'name', attrs: { width: 180 } },
        { label: '地址', prop: 'address' }
      ]
    }
  }
}
</script>

