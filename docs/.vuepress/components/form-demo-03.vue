<template>
  <div class="form-demo-03" :class="{isFull:isFull}">
    <pl-form
        :form-items="formItems"
        v-model="form"
        label-position="right" label-suffix="：" label-width="120px"
        @submit="submit"
        class="form-demo-03"
        ref="form"
        :rules="rules"
        :is-search-form="true"
    >
      <template v-slot:date="{form,item}">
        <el-form-item label="活动时间">
          <el-col :span="11">
            <pl-date v-model="form.date1" prop="date1" value-format="timestamp"></pl-date>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center;">-</el-col>
          <el-col :span="11">
            <pl-date v-model="form.date2" prop="date2" style="width: 100%;"></pl-date>
          </el-col>
        </el-form-item>
      </template>
    </pl-form>
    <el-alert title="此例请点击全屏查看演示" type="warning"  :closable="false" ></el-alert>
    <el-button @click="fullScreen">{{isFull?'退出全屏':'全屏'}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'form-demo-03',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      isFull: false
    }
  },
  methods: {
    submit (val) {
      console.log(val)
      this.$message.success(`表单数据为:${JSON.stringify(val)}`)
      console.log(this.$refs.form.$refs.name.resetField())
    },
    fullScreen () {
      this.isFull = !this.isFull
    }
  },
  computed: {
    formItems () {
      return [
        { comp: 'pl-input', label: '规则名称', prop: 'name' },
        { comp: 'pl-input', label: '描述', prop: 'desc' },
        { comp: 'pl-input', label: '调用服务次数', prop: 'times' },
        { comp: 'pl-input', label: '调用服务次数', prop: 'times' },
        { comp: 'pl-input', label: '调用服务次数', prop: 'times' },
        { comp: 'pl-input', label: '调用服务次数', prop: 'times' },
        { comp: 'pl-input', label: '调用服务次数', prop: 'times' },
        { comp: 'pl-date', label: '上次调度时间', prop: 'lastUseTime' }
      ]
    },
    regionOptions () {
      return [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' }
      ]
    },
    rules () {
      return {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="stylus">
  .form-demo-03 {
    &.isFull {
      position: fixed;
      top: 0
      bottom: 0
      left: 0
      right: 0
      background: #fff;
      z-index 50000
    }
  }
</style>
