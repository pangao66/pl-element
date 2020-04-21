<template>
  <pe-table
      :data="tableData"
      :columns="columns"
      @selection-change="handleSelectionChange"
  >
  </pe-table>
</template>

<script>
export default {
  name: 'table-complex-demo',
  data () {
    return {
      tableData: [
        {
          date: '2019-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200333,
          tag: '家',
          status: 0
        },
        {
          date: '2019-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1517 弄',
          zip: 200333,
          tag: '公司',
          status: 1
        },
        {
          date: '2019-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1519 弄',
          zip: 200333,
          tag: '家',
          status: 0
        },
        {
          date: '2019-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1516 弄',
          zip: 200333,
          tag: '公司',
          status: 0
        },
        {
          date: '2019-05-05',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1515 弄',
          zip: 200333,
          tag: '公司',
          status: 0
        }
      ]
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
    }
  },
  computed: {
    columns () {
      return [
        { attrs: { type: 'selection' } },
        { label: '行序号', attrs: { type: 'index', width: 100 }, rowSpan: [ [ 0, 1 ], [ 2, 4 ] ] },
        { label: '日期', prop: 'date' },
        { label: '名称', prop: 'name', rowSpan: 'all' },
        {
          label: '地址',
          customerRender: ({ row, index }) => {
            const { province, city, address } = row
            return province + city + address
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
