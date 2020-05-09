<template>
  <pl-form
      :form-items="formItems"
      v-model="form"
      label-position="right" label-suffix="：" label-width="120px"
      @submit="submit"
      class="form-demo-01"
      ref="form"
      :rules="rules"
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
</template>

<script>
export default {
  name: 'form-demo-01',
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
      }
    }
  },
  methods: {
    submit (val) {
      console.log(val)
      this.$message.success(`表单数据为:${JSON.stringify(val)}`)
      console.log(this.$refs.form.$refs.name.resetField())
    }
  },
  computed: {
    formItems () {
      return [
        { comp: 'pl-input', label: '活动名称', prop: 'name' },
        { comp: 'pl-select', label: '活动区域', prop: 'region', options: this.regionOptions, required: true },
        { slot: 'date' },
        { comp: 'pl-switch', label: '即时配送', prop: 'delivery', required: true },
        {
          comp: 'pl-checkbox',
          label: '活动性质',
          prop: 'type',
          options: [ '美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光' ],
          required: true
        },
        { comp: 'pl-radio', label: '特殊资源', prop: 'resource', options: [ '线上品牌商赞助', '线下场地免费' ], required: true },
        { comp: 'pl-input', label: '说明', prop: 'desc', type: 'textarea', required: true }
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
  .form-demo-01 {
    width: 460px;
    .el-input {
      width: 100%;
    }
  }
</style>
