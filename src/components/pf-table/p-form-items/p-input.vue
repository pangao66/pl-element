<template>
  <el-input
      v-bind="{...defaultAttrs,...$attrs,...item.attrs}"
      v-on="$listeners"
      @change="handleChange"
  />
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'

export default {
  name: 'p-input',
  mixins: [pFormItemMixin],
  data () {
    return {
      defaultAttrs: {
        clearable: true
      }
    }
  }
}
</script>

<style scoped>

</style>
