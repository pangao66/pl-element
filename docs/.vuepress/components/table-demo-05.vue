<template>
  <pl-table :columns="[]">

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
    async getTableData ({}, done) {
      let res = await axios.post('/base-table')
      if (res.status === 200) {
        res = res.data
        done({
          data: res.data
        })
      }
      // done()
    }
  },
  computed: {
    columns () {
      return [
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
