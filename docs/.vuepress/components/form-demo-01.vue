<template>
  <pl-form
      :form-items="formItems"
      v-model="form"
      label-position="right" label-suffix="：" label-width="120px"
      :rules="rules"
      @submit="submit"
      class="form-demo-01"
      ref="form"
  >
    <template v-slot:date="{form,item}">
      <el-form-item label="活动时间" style="margin-bottom: 0;">
        <el-col :span="11">
          <el-form-item prop="date1">
            <pl-date v-model="form.date1" prop="date1" value-format="timestamp"></pl-date>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style="text-align:center;">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <pl-time v-model="form.date2" prop="date2" style="width: 100%;"></pl-time>
          </el-form-item>
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
    }
  },
  computed: {
    formItems () {
      return [
        { comp: 'input', label: '活动名称', prop: 'name', required: true, rules: this.nameRules },
        { comp: 'select', label: '活动区域', prop: 'region', options: this.regionOptions, required: true },
        { slotName: 'date' },
        { comp: 'switch', label: '即时配送', prop: 'delivery', required: true },
        {
          comp: 'checkbox',
          label: '活动性质',
          prop: 'type',
          options: [ '美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光' ],
          required: true
        },
        { comp: 'radio', label: '特殊资源', prop: 'resource', options: [ '线上品牌商赞助', '线下场地免费' ], required: true },
        { comp: 'input', label: '说明', prop: 'desc', type: 'textarea', required: true }
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
    nameRules () {
      return {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    },
    rules () {
      return {
        date1: { required: true, message: '请选择日期', trigger: 'blur' },
        date2: { required: true, message: '请选择时间', trigger: 'blur' }
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
