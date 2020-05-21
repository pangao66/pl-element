<template>
  <pl-table :data="tableData" :columns="columns">
    <template #date="{row}">
      <i class="el-icon-time"></i>
      <span style="margin-left: 10px">{{row.date}}</span>
    </template>
    <template #name="{row}">
      <el-popover trigger="hover" placement="top">
        <p>姓名: {{ row.name }}</p>
        <p>住址: {{ row.address }}</p>
        <div class="name-wrapper" slot="reference">
          <el-tag size="medium">{{ row.name }}</el-tag>
        </div>
      </el-popover>
    </template>
  </pl-table>
</template>
<script>
export default {
  name: 'table-demo-02',
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
        { label: '日期', attrs: { width: 180 }, slotName: 'date' },
        { label: '姓名', attrs: { width: 180 }, slotName: 'name' },
        { label: '地址', prop: 'address' }
      ]
    }
  }
}
</script>

