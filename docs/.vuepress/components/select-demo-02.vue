<template>
  <el-form :model="form" label-position="right" label-suffix="：" label-width="120px">
    <pl-select label="商品名称" prop="value" :options="options" v-model="form.value" required ></pl-select>
  </el-form>
</template>

<script>
export default {
  name: 'select-demo-02',
  data () {
    return {
      form: {
        value: ''
      }
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
