<template>
  <div>
    <pl-select v-model="value" :options="options" multiple collapse-tags placeholder="请选择"></pl-select>
    <p>选定值为{{value}}</p>
  </div>
</template>

<script>
export default {
  name: 'select-demo-03',
  data () {
    return {
      value: ''
    }
  },
  computed: {
    options () {
      return [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ]
    }
  }
}
</script>
