<template>
  <div>
    <pf-table
        :columns="columns"
        :data="tableData"
        :total="total"
        :form-items="formItems"
        @get-table-data="getTableData"
        ref="pfTable"
    >
      <template v-slot:form-after>
        <el-button icon="el-icon-plus" type="primary" @click="addUser" style="margin-bottom: 20px;">添加
        </el-button>
      </template>
      <template v-slot:sex="{row}">
        <el-tag :type="row.sex?'success':'danger'">{{getSex(row.sex)}}</el-tag>
      </template>
      <template v-slot:handle="{row}">
        <el-button size="mini" type="primary" @click="editUser(row)">编辑</el-button>
        <el-popconfirm
            title="请确认是否删除"
            width="200"
            placement="top-end"
            @onConfirm="deleteUser(row)"
        >
          <el-button size="mini" type="danger" slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </pf-table>
    <edit-user
        v-if="editDialogShow"
        :info="currentInfo"
        @close="editDialogShow=false"
        @refresh-table="refreshTable"
    />
  </div>
</template>

<script>
import axios from 'axios'
import editUser from './edit-user'

export default {
  name: 'complex-table',
  data () {
    return {
      tableData: [],
      total: 10,
      editDialogShow: false,
      currentInfo: {}
    }
  },
  methods: {
    async getTableData ({ ...query }, done) {
      let res = await axios.post('/search-table', { ...query })
      if (res.status === 200) {
        res = res.data
        this.tableData = res.list
        this.total = res.total
      }
      done()
    },
    addUser () {
      this.currentInfo = {}
      this.editDialogShow = true
    },
    editUser (row) {
      this.currentInfo = row
      this.editDialogShow = true
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
      this.$refs.pfTable.search()
    },
    getSex (cellValue) {
      const map = {
        1: '男',
        0: '女'
      }
      return map[cellValue] || '-'
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
  },
  components: {
    editUser
  }
}
</script>

<style scoped>

</style>
