<template>
  <el-form :model="form" label-position="right" label-suffix="：" label-width="120px">
    <pl-radio label="性别" prop="sex" :options="options1" required v-model="form.sex"></pl-radio>
    <p>您选中的性别值是：{{form.sex}}</p>
    <pl-radio label="城市" prop="city" :options="options2" radio-button v-model="form.city"></pl-radio>
    <p>您选中城市的值是：{{form.city}}</p>
  </el-form>
</template>
<script>
export default {
  name: 'radio-demo-01',
  data () {
    return {
      form: {
        sex: '',
        city: ''
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
