<template>
  <el-rate v-bind="{...$attrs,...item.attrs}" v-on="$listeners" @change="handleChange"></el-rate>
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'

export default {
  name: 'p-rate',
  mixins: [pFormItemMixin]
}
</script>

<style scoped>

</style>
