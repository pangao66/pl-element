<template>
  <el-slider v-bind="{...$attrs,...item.attrs}" v-on="$listeners" @change="handleChange">

  </el-slider>
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'

export default {
  name: 'p-slider',
  mixins: [pFormItemMixin]
}
</script>

<style scoped>

</style>
