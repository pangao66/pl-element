<template>
  <pf-tab-table
      :tabs="tabs"
      :columns="columns"
      :form-items="formItems"
      @get-table-data="getTableData"
      ref="pf-tab-table"
  >
    <template v-slot:sex="{row}">
      <el-tag :type="row.sex?'success':'danger'">{{getSex(row.sex)}}</el-tag>
    </template>
    <template v-slot:handle="{row}">
      <el-popconfirm
          title="请确认是否删除"
          width="200"
          placement="top-end"
          @onConfirm="deleteUser(row)"
      >
        <template v-slot:reference>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </pf-tab-table>
</template>

<script>
import axios from 'axios'

export default {
  name: '',
  data () {
    return {
      tableData: [],
      total: 0
    }
  },
  created () {
  },
  methods: {
    async getTableData (query, done) {
      const { tabName, ...other } = query
      let res = await axios.post('/search-table', { job: tabName, ...other })
      if (res.status === 200) {
        res = res.data
        this.tableData = res.list
        this.total = res.total
        done({
          tableData: res.list,
          total: res.total
        })
      } else {
        done()
      }
    },
    async deleteUser (row) {
      let res = await axios.post('/delete-user', { id: row.id })
      if (res.status === 200) {
        res = res.data
        if (res.code === 1) {
          this.$message.success('删除用户成功')
          this.refreshTable()
        }
      }
    },
    refreshTable () {
      this.$refs['pf-tab-table'].search()
    },
    getSex (value) {
      const map = {
        1: '男',
        0: '女'
      }
      return map[value]
    },
    getJob ({ cellValue }) {
      const map = {
        designer: '设计',
        programmer: '程序员',
        testers: '测试',
        product: '产品'
      }
      return map[cellValue]
    }
  },
  computed: {
    tabs () {
      return [
        { label: '设计', name: 'designer' },
        { label: '程序员', name: 'programmer' },
        { label: '测试', name: 'testers' },
        { label: '产品', name: 'product' }
      ]
    },
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
