<template>
  <pl-table :data="tableData" :columns="columns">
  </pl-table>
</template>

<script>
const sexMap = {
  1: '男',
  0: '女'
}
const jobDict = {
  designer: '设计',
  programmer: '程序员',
  testers: '测试',
  product: '产品'
}
const STATUS_TAG_MAP = {
  working: { text: '正式员工', type: 'success' },
  waiting: { text: '待入职', type: 'primary' },
  leaving: { text: '已离职', type: 'danger' }
}
export default {
  name: 'table-demo-03',
  data () {
    return {
      tableData: [
        { name: '姜超', birth: 770676926920, sex: '1', job: 'testers', status: 'leaving' },
        { name: '尹秀英', birth: 855852076659, sex: 1, job: 'testers', status: 'working' },
        { name: '阎刚', sex: 0, job: 'programmer', status: 'waiting' },
        { name: '崔超', birth: 924288347603, sex: 0, status: 'working' },
        { name: '潘新', birth: 846362675432, sex: 0, job: 'product', status: 'working' }
      ]
    }
  },
  methods: {
    getJob ({ cellValue }) {
      return jobDict[cellValue]
    }
  },
  computed: {
    columns () {
      return [
        { label: '姓名', prop: 'name' },
        { label: '性别', prop: 'sex', dict: sexMap },
        { label: '出生日期', prop: 'birth', formatter: 'date' },
        {
          label: '工作',
          prop: 'job',
          formatter: this.getJob
        },
        {
          label: '状态',
          prop: 'status',
          tagMap: STATUS_TAG_MAP
        }
      ]
    }
  }
}
</script>
