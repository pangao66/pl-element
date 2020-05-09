<template>
  <pl-table
      :columns="columns"
      :data="tableData"
      :total="total"
      :form-items="formItems"
      @get-table-data="getTableData"
  >
  </pl-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'search-table',
  data () {
    return {
      tableData: [],
      total: 10
    }
  },
  methods: {
    async getTableData ({ ...query }, done) {
      let res = await axios.post('/search-table', { ...query })
      if (res.status === 200) {
        res = res.data
        this.tableData = res.list
        this.total = res.total
        console.log(res.list)
      }
      done()
    },
    getSex ({ cellValue }) {
      const map = {
        1: '男',
        0: '女'
      }
      return map[cellValue] || '-'
    }
  },
  computed: {
    columns () {
      return [
        { prop: 'id', label: 'id', attrs: { width: 260 } },
        { prop: 'name', label: '姓名', attrs: { width: 60 } },
        { prop: 'address', label: '地址', attrs: { minWidth: 160 } },
        { prop: 'age', label: '年龄', attrs: { width: 60 } },
        { prop: 'birth', label: '生日' },
        { prop: 'sex', label: '性别', formatter: this.getSex }
      ]
    },
    formItems () {
      return [
        { type: 'input', prop: 'name', label: '姓名' },
        {
          type: 'select', prop: 'sex', label: '性别', options: [
            { label: '男', value: 1 },
            { label: '女', value: 0 }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
