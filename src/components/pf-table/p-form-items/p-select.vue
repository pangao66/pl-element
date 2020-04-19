<template>
  <el-select v-bind="{...defaultAttrs,...$attrs,...item.attrs}" v-on="$listeners" @change="handleChange">
    <el-option v-for="opt in item.options" :label="opt.label" :value="opt.value" :key="opt.value"></el-option>
  </el-select>
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'

export default {
  name: 'p-select',
  mixins: [pFormItemMixin],
  data () {
    return {
      defaultAttrs: {
        clearable: true,
        filterable: true,
        defaultFirstOption: true
      }
    }
  }
}
</script>

<style scoped>

</style>
