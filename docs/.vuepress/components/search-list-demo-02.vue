<template>
  <pl-search-list></pl-search-list>
</template>

<script>
const jobDict = {
  designer: '设计',
  programmer: '程序员',
  testers: '测试',
  product: '产品'
}
export default {
  name: 'search-list-demo-02',
  computed: {
    columns () {
      return [
        { prop: 'index', label: '序号', type: 'index', formType: 'input' },
        { prop: 'id', label: 'id', formType: 'input' },
        { prop: 'name', label: '姓名', attrs: { width: 60 }, formType: 'input' },
        { prop: 'address', label: '地址', attrs: { minWidth: 140 } },
        { prop: 'birth', label: '生日', formatter: 'date' },
        {
          prop: 'job', label: '职位',
          formatter: {
            type: 'dict',
            dict: jobDict
          }
        },
        { slot: 'sex', label: '性别' },
        { slot: 'handle', label: '操作', attrs: { width: 170 } }
      ]
    }
  }
}
</script>

<style scoped>

</style>
