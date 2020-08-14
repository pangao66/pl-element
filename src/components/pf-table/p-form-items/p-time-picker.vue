<template>
  <el-time-select
    v-bind="{...$attrs,...item.attrs}" v-on="$listeners" @change="handleChange"
  >
  </el-time-select>
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'

export default {
  name: 'p-time-picker',
  mixins: [pFormItemMixin]
}
</script>

<style scoped>

</style>
