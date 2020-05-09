<template>
  <el-form :model="form" label-position="right" label-suffix="：" label-width="120px">
    <pl-checkbox label="城市" prop="city" :options="options2" radio-button v-model="form.city"></pl-checkbox>
    <p>您选中城市的值是：{{form.city}}</p>
  </el-form>
</template>

<script>
export default {
  name: 'checkbox-demo-01',
  data () {
    return {
      form: {
        city: []
      }
    }
  },
  computed: {
    options1 () {
      return [
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ]
    },
    options2 () {
      return [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
