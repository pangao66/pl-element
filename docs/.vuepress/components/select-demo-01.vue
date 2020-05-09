<template>
  <el-form :model="form" label-position="right" label-suffix="：" label-width="120px">
    <pl-select label="职位" prop="value1" :options="options1" options-attr="jobName,jobCode"
               v-model="form.value1"></pl-select>
    <pl-select label="商品名" prop="value2" :options="options2" v-model="form.value2"></pl-select>
    <pl-select label="礼品类型" prop="value3" :options="options3" v-model="form.value3"></pl-select>
  </el-form>
</template>

<script>
export default {
  name: 'select-demo-01',
  data () {
    return {
      form: {
        value1: '',
        value2: '',
        value3: ''
      }
    }
  },
  computed: {
    options1 () {
      return [
        { jobName: '设计', jobCode: 'designer' },
        { jobName: '程序员', jobCode: 'programmer' },
        { jobName: '测试', jobCode: 'testers' },
        { jobName: '产品', jobCode: 'product' }
      ]
    },
    options2 () {
      return [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ]
    },
    options3 () {
      return {
        'cash': '现金',
        'prepaid_card': '预付卡',
        'entity': '实物',
        'maintenance': '保养',
        'cosmetology': '美容',
        'car_wash': '洗车'
      }
    }
  }
}
</script>
