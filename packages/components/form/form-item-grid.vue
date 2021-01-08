<template>
  <el-row v-bind="item.attrs">
    <el-col
      v-for="(col, index) in item.cols"
      :key="index"
      :span="col.span"
    >
      <slot
        v-if="col.slotName"
        :name="col.slotName"
        v-bind="{ form, item: col }"
      />
      <pl-form-item
        v-else
        v-bind="col"
        :form="form"
      />
    </el-col>
  </el-row>
</template>

<script>
import PlFormItem from './pl-form-item'

export default {
  name: 'FormItemGrid',
  components: { PlFormItem },
  props: {
    cols: {
      default: () => [],
      type: Array
    },
    item: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      default: null
    }
  }
}
</script>
