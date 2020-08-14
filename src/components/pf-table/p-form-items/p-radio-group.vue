<template>
  <el-radio-group v-bind="{...$attrs,...item.attrs}" v-on="$listeners" @change="handleChange">
    <template v-if="item.attrs&&item.attrs.type&&(item.attrs.type='btn')">
      <el-radio-button
        v-for="opt in  item.options"
        :label="opt.value"
        :key="opt.value"
      >{{ opt.label }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio v-for="opt in  item.options" :label="opt.value" :key="opt.value">{{ opt.label }}</el-radio>
    </template>
  </el-radio-group>
</template>

<script>
import pFormItemMixin from 'components/pf-table/src/components/pf-table/p-form-items/p-form-item-mixin'

export default {
  name: 'p-radio-group',
  mixins: [pFormItemMixin]
}
</script>

<style scoped>

</style>
