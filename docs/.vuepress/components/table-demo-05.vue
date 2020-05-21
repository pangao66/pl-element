<template>
  <pl-table
      :columns="columns"
      :fetch="getTableData"
      :auto-load="true"
      @get-table-data="getTableData"
      show-pager
  >
  </pl-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'table-demo-05',
  created () {
    this.getTableData({}, () => {})
  },
  methods: {
    async getTableData ({ currentPage, pageSize }, done) {
      let res = await axios.post('/page-table', {
        currentPage, pageSize
      })
      console.log(res)
      if (res.status === 200) {
        res = res.data
        console.log(res)
        done({
          data: res.list,
          total: res.total
        })
      }
      // done()
    }
  },
  computed: {
    columns () {
      return [
        { prop: 'index', label: '序号', type: 'index' },
        { prop: 'id', label: 'id' },
        { prop: 'name', label: '姓名', attrs: { width: 60 } },
        { prop: 'address', label: '地址', attrs: { minWidth: 140 } },
        { prop: 'birth', label: '生日', formatter: 'date' },
        { prop: 'job', label: '职位', formatter: this.getJob },
        { slot: 'sex', label: '性别' },
        { slot: 'handle', label: '操作', attrs: { width: 170 } }
      ]
    }
  }
}
</script>

<style scoped>

</style>
