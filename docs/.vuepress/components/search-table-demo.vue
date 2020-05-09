<template>
  <p-search-table :data="tableData" :columns="columns">
    <template #handle="{row}">
      <div>
        <el-button type="primary">buttonCont</el-button>
      </div>
    </template>
  </p-search-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'search-table-demo',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      axios.get('https://proapi.azurewebsites.net/api/rule?current=1&pageSize=50').then((res) => {
        res = res.data
        this.tableData = res.data
      })
    }
  },
  computed: {
    columns () {
      return [
        { label: '', attrs: { type: 'selection' } },
        { label: '规则名称', prop: 'name' },
        { label: '描述', prop: 'desc' },
        { label: '调用服务次数', prop: 'callNo' },
        { label: '状态', prop: 'status' },
        { label: '上次调度时间', prop: 'updatedAt' },
        { label: '操作', slot: 'handle' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
