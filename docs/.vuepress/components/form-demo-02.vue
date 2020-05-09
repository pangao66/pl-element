<template>
  <pl-form label-position="right" label-suffix="：" label-width="120px" v-model="form" :form-items="formItems"
           class="form-demo-02">
    <template v-slot:date="{form,item}">
      <el-form-item label="活动时间" class="form-demo-02-date-item">
        <el-col :span="11">
          <pl-date v-model="form.date1" prop="date1" value-format="timestamp"></pl-date>
        </el-col>
        <el-col class="line" :span="2" style="text-align:center;">-</el-col>
        <el-col :span="11">
          <pl-date v-model="form.date2" prop="date2"></pl-date>
        </el-col>
      </el-form-item>
    </template>
  </pl-form>
</template>

<script>
export default {
  name: 'form-demo-02',
  data () {
    return {
      form: {}
    }
  },
  computed: {
    formItems () {
      return [
        {
          comp: 'grid',
          cols: [
            { span: 12, comp: 'pl-input', label: '活动名称', prop: 'name' },
            { span: 12, comp: 'pl-select', label: '活动区域', prop: 'region', options: this.regionOptions, required: true }
          ]
        },
        {
          comp: 'grid',
          cols: [
            { span: 12, slot: 'date' },
            { span: 12, comp: 'pl-switch', label: '即时配送', prop: 'delivery', required: true }
          ]
        },
        {
          comp: 'pl-checkbox',
          label: '活动性质',
          prop: 'type',
          options: [ '美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光' ],
          required: true
        },
        { comp: 'pl-radio', label: '特殊资源', prop: 'resource', options: [ '线上品牌商赞助', '线下场地免费' ], required: true },
        {
          comp: 'grid',
          cols: [
            {
              span: 16, comp: 'pl-input', label: '说明', prop: 'desc', type: 'textarea',
              maxlength: 300,
              'show-word-limit': true,
              required: true,
              autosize: { minRows: 2, maxRows: 4 }
            }
          ]
        }
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
  .form-demo-02 {
    .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
  }
  .form-demo-02-date-item {
    .el-input {
      width: 100%;
    }
  }
</style>
