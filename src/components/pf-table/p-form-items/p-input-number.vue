<template>
  <el-input-number v-bind="{...$attrs,...item.attrs}" v-on="$listeners" @change="handleChange"></el-input-number>
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'
export default {
  name: 'p-input-number',
  mixins: [pFormItemMixin],
}
</script>

<style scoped>

</style>
