<template>
  <el-date-picker
    v-bind="{...$attrs,...item.attrs}" v-on="$listeners"
    clearable @change="handleChange"
  >
  </el-date-picker>
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'

export default {
  name: 'p-date-picker',
  mixins: [pFormItemMixin]
}
</script>

<style scoped>

</style>
