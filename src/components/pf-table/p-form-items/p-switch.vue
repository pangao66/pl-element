<template>
  <el-switch v-bind="{...$attrs,...item.attrs}" v-on="$listeners"></el-switch>
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'
export default {
  name: 'p-switch',
  mixins: [pFormItemMixin],
}
</script>

<style scoped>

</style>
