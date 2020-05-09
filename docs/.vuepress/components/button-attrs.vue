<template>
  <pl-table columns="columns" :data="data"></pl-table>
</template>

<script>
export default {
  name: 'button-attrs',
  computed: {
    columns () {
      return [
        { label: '参数', prop: '参数' },
        { label: '说明', prop: '说明' },
        { label: '类型', prop: '类型' },
        { label: '可选值', prop: '可选值' },
        { label: '默认值', prop: '默认值' }
      ]
    },
    data () {
      return [
        // {c}
      ]
    }
  }
}
</script>

