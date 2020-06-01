<template>
  <div>
    <h4>options</h4>
    <p>传入el-select标准的options,label-value结构</p>
    <pl-select label="商品名" :options="options1" v-model="value1"></pl-select>
    <p>options配置别名</p>
    <pl-select label="职位" :options="options2" options-attr="jobName,jobCode"
               v-model="value2"></pl-select>
    <p>传入对象结构</p>
    <pl-select label="礼品类型" :options="options3" v-model="value3"></pl-select>
  </div>
</template>

<script>
export default {
  name: 'select-demo-01',
  data () {
    return {
      value1: '',
      value2: '',
      value3: ''
    }
  },
  computed: {
    options1 () {
      return [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ]
    },
    options2 () {
      return [
        { jobName: '设计', jobCode: 'designer' },
        { jobName: '程序员', jobCode: 'programmer' },
        { jobName: '测试', jobCode: 'testers' },
        { jobName: '产品', jobCode: 'product' }
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
