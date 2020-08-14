<template>
  <el-form-item :label="item.label" :prop="item.prop" v-bind="item.formItemAttrs">
    <el-input v-if="item.type==='input'" v-model="form[item.prop]" v-bind="item.attrs" clearable/>
    <el-select v-if="item.type==='select'" v-model="form[item.prop]" v-bind="item.attrs" clearable filterable
               default-first-option>
      <el-option v-for="opt in item.options" :label="opt.label" :value="opt.value" :key="opt.value"/>
    </el-select>
    <el-date-picker
      v-if="item.type==='date'"
      v-model="form[item.prop]"
      v-bind="item.attrs"
      :type="item.dateType"
      clearable
    >
    </el-date-picker>
    <el-time-select
      v-if="item.type==='time'"
      v-model="form[item.prop]"
      v-bind="item.attrs"/>
  </el-form-item>
</template>

<script>
export default {
  name: 'p-form-item',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    form: Object
  }
}
</script>

<style scoped>

</style>
