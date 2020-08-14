<template>
  <pl-search-tab-list
    :tabs="tabs"
    v-model="formData"
    :form-items="formItems"
    :columns="columns"
    :active-tab.sync="activeTab"
    @get-table-data="getTableData"
    ref="plTabTable"
  >
  </pl-search-tab-list>
</template>

<script>
import axios from 'axios'
import { filterNullValue } from '../../../utils'

const jobDict = {
  designer: '设计',
  programmer: '程序员',
  testers: '测试',
  product: '产品'
}
const sexDict = {
  0: '女',
  1: '男'
}
export default {
  name: 'tab-search-list-demo-01',
  data () {
    return {
      formData: {},
      activeTab: 'designer'
    }
  },
  methods: {
    async getTableData ({ currentPage, pageSize, sex, tabName, ...val }, done) {
      const query = {
        ...val,
        currentPage, pageSize,
        job: tabName,
        sex: sex ? parseInt(sex) : ''
      }
      let res = await axios.post('/search-table', filterNullValue(query))
      if (res.status === 200) {
        res = res.data
        done({
          data: res.list,
          total: res.total
        })
      }
    },
    async deleteData (row) {
      let res = await axios.post('/delete-user', { id: row.id })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.$refs.plTabTable.search()
      }
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
        { prop: 'index', label: '序号', type: 'index' },
        { prop: 'id', label: 'id', formType: 'input' },
        { prop: 'name', label: '姓名', attrs: { width: 60 }, formType: 'input' },
        { prop: 'address', label: '地址', attrs: { minWidth: 140 } },
        { prop: 'birth', label: '生日', formatter: 'date', formType: 'date' },
        {
          prop: 'job', label: '职位',
          dict: jobDict
        },
        {
          prop: 'sex',
          label: '性别',
          formType: 'select',
          options: sexDict,
          tagMap: {
            1: { text: '男', type: 'primary' },
            0: { text: '女', type: 'success' }
          }
        },
        {
          actions: [
            {
              action: 'del',
              text: '删除',
              btnConfig: { type: 'danger' },
              confirm: ({ row, col, index }) => {
                this.deleteData(row)
              }
            },
            {
              text: '查看',
              onClick: ({ row, col, index }) => {
                this.$message.success(JSON.stringify(row))
              }
            },
            {
              text: '编辑',
              onClick: ({ row, col, index }) => {

              }
            }
          ],
          label: '操作', attrs: { minWidth: 180 }
        }
      ]
    },
    formItems () {
      let list = []
      this.columns.forEach((item) => {
        if (item.formType || item.formSlotName) {
          const { formType: comp, label, prop, formSlotName: slotName, options, formAttrs: attrs } = item
          list.push({
            label, prop, slotName, options, attrs, comp
          })
        }
      })
      return list
    }
  }
}
</script>

<style scoped>

</style>
