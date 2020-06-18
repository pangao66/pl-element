<template>
  <pl-search-list
      :columns="columns"
      :form-items="formItems"
      @get-table-data="getTableData"
      v-model="formData"
  >
    <template #handle="{row}">
      <pl-button>fjoaj</pl-button>
    </template>
  </pl-search-list>
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
  name: 'search-list-demo-01',
  data () {
    return {
      formData: {
        id: '',
        name: '',
        birth: '',
        sex: '',
        job: ''
      }
    }
  },
  methods: {
    async getTableData ({ currentPage, pageSize, sex, ...val }, done) {
      let res = await axios.post('/search-table', filterNullValue({
        currentPage, pageSize,
        sex: sex ? parseInt(sex) : '',
        ...val
      }))
      if (res.status === 200) {
        res = res.data
        done({
          data: res.list,
          total: res.total
        })
      }
    }
  },
  computed: {
    columns () {
      return [
        { prop: 'index', label: '序号', type: 'index' },
        { prop: 'id', label: 'id', formType: 'input' },
        { prop: 'name', label: '姓名', attrs: { width: 60 }, formType: 'input' },
        { prop: 'address', label: '地址', attrs: { minWidth: 140 } },
        { prop: 'birth', label: '生日', formatter: 'date', formType: 'date' },
        {
          prop: 'job', label: '职位',
          dict: jobDict,
          formType: 'select',
          options: jobDict
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
              confirm: ({ row, col, index }) => {
                this.$message.success(`删除id为:${row.id}这一行`)
              }
            },
            {
              text: '查看',
              onClick: ({ row, col, index }) => {
                this.$message.success(JSON.stringify(row))
              }
            }
          ],
          label: '操作', attrs: { width: 170 }
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
