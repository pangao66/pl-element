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
export default {
  name: 'table-demo-03',
  data () {
    return {
      tableData: [
        { name: '姜超', birth: 770676926920, job: 'testers' },
        { name: '尹秀英', birth: 855852076659, sex: 1, job: 'testers' },
        { name: '阎刚', sex: 0, job: 'programmer' },
        { name: '崔超', birth: 924288347603, sex: 0 },
        { name: '潘新', birth: 846362675432, sex: '', job: 'product' }
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
        { label: '性别', prop: 'sex', formatter: { type: 'dict', dict: sexMap } },
        { label: '出生日期', prop: 'birth', formatter: 'date' },
        {
          label: '工作',
          prop: 'job',
          formatter: this.getJob
        }
      ]
    }
  }
}
</script>
