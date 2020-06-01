<template>
  <pl-form
      :form-items="formItems"
      v-model="form"
      label-position="right" label-suffix="：" label-width="120px"
      @submit="submit"
      class="form-demo-01"
      ref="form"
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
    }
  },
  computed: {
    formItems () {
      return [
        { comp: 'input', label: '活动名称', prop: 'name' },
        { comp: 'select', label: '活动区域', prop: 'region', options: this.regionOptions },
        { slotName: 'date' },
        { comp: 'switch', label: '即时配送', prop: 'delivery' },
        {
          comp: 'checkbox',
          label: '活动性质',
          prop: 'type',
          options: [ '美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光' ],
          required: true
        },
        { comp: 'radio', label: '特殊资源', prop: 'resource', options: [ '线上品牌商赞助', '线下场地免费' ], required: true },
        { comp: 'input', label: '说明', prop: 'desc', type: 'textarea' }
      ]
    },
    regionOptions () {
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

<style lang="stylus">
  .form-demo-01 {
    width: 460px;
    .el-input {
      width: 100%;
    }
  }
</style>
