<template>
  <div>
    <el-dialog :visible="visible" @close="visible=false" fullscreen>
      <pl-search-list
        :columns="columns"
        :form-items="formItems"
        :show-pager="false"
        @get-table-data="getTableData"
        v-model="formData"
        ref="plSearchList"
        :table-config="{virtualScroll:true}"
      >
      </pl-search-list>
    </el-dialog>
    <el-alert type="warning" :closable="false" center>此例请全屏查看</el-alert>
    <el-button @click="visible=true">全屏展示</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import { filterNullValue } from '../../../src/utils'

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
  name: 'search-list-demo-02',
  data () {
    return {
      formData: {
        id: '',
        name: '',
        birth: '',
        sex: '',
        job: '',
        testValue: []
      },
      visible: false
    }
  },
  methods: {
    async getTableData ({ sex, ...val }, done) {
      let list = []
      for (let i = 0; i < 10000; i++) {
        list.push({
          id: i,
          address: `地址${i}`,
          fixedRight: i
        })
      }
      done({
        data: list,
        total: 100
      })
    },
    async deleteData (row) {
      let res = await axios.post('/delete-user', { id: row.id })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.$refs.plSearchList.search()
      }
    },
    handleChange () {

    }
  },
  computed: {
    columns () {
      return [
        { prop: 'id', label: 'id' },
        { prop: 'address', label: '地址', attrs: { minWidth: 140 } },
        { prop: 'birth', label: '生日', formatter: 'date' },
        { prop: 'job', label: '职位', dict: jobDict, options: jobDict },
        {
          prop: 'sex',
          label: '性别',
          tagMap: {
            1: { text: '男', type: 'primary' },
            0: { text: '女', type: 'success' }
          }
        },
        {

          label: '固定右边列', prop: 'fixedRight', attrs: { minWidth: 180, fixed: 'right' }
        }
      ]
    },
    formItems () {
      return [
        { comp: 'input', prop: 'id', label: 'id' },
        { comp: 'input', prop: 'name', label: '姓名' },
        { comp: 'date', prop: 'birth', label: '生日' },
        { comp: 'select', prop: 'job', label: '职位', options: jobDict },
        { comp: 'select', prop: 'sex', label: '性别', options: sexDict }
      ]
    }
  }
}
</script>

<style scoped>

</style>

