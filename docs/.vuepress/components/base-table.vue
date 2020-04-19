<template>
  <div>
    <pe-table
        :data="tableData"
        :columns="columns"
        :stripe="true"
        @row-dblclick="rowDblClick"
    >
      <template v-slot:sex="{row}">
        <el-tag :type="row.sex?'success':'danger'">{{getSex(row.sex)}}</el-tag>
      </template>
    </pe-table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'base-table',
  data () {
    return {
      tableData: [{ id: 11, email: 'p.ldx@ljrprqgz.cn', name: '段军', address: '湖北省 襄阳市 南漳县' }]
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    async getTableData () {
      let res = await axios.post('/base-table')
      if (res.status === 200) {
        res = res.data
        this.tableData = res
        console.log(res)
      }
    },
    rowDblClick (row) {
      this.$message.success(`您双击了姓名为${row.name}这一行`)
    },
    getSex (sex) {
      const map = {
        1: '男',
        0: '女'
      }
      return map[sex] || '-'
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
    columns () {
      return [
        { prop: 'id', label: 'id', attrs: { width: 260 } },
        { prop: 'name', label: '姓名', attrs: { width: 60 } },
        { prop: 'address', label: '地址', attrs: { minWidth: 160 } },
        { prop: 'birth', label: '生日', formatter: 'date' },
        { prop: 'job', label: '职位', formatter: this.getJob },
        { slot: 'sex', label: '性别' }
      ]
    }
  }
}
</script>

