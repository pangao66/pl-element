<template>
  <pl-search-list
      :columns="columns"
      :form-items="formItems"
      @get-table-data="getTableData"
      v-model="formData"
  >
  </pl-search-list>
</template>

<script>
import axios from 'axios'

const jobDict = {
  designer: '设计',
  programmer: '程序员',
  testers: '测试',
  product: '产品'
}
export default {
  name: 'search-list-demo-01',
  data () {
    return {
      formData: {
        id: '',
        name: '',
        birth: ''
      }
    }
  },
  methods: {
    async getTableData ({ currentPage, pageSize, ...val }, done) {
      console.log(val)
      let res = await axios.post('/page-table', {
        currentPage, pageSize,
        ...val
      })
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
          formatter: {
            type: 'dict',
            dict: jobDict
          },
          formType: 'select',
          options: jobDict
        },
        { prop: 'sex', label: '性别', formType: 'select', options: { 1: '男', 0: '女' } },
        { slot: 'handle', label: '操作', attrs: { width: 170 } }
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
