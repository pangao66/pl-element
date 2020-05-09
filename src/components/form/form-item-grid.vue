<template>
  <el-row>
    <el-col v-for="(col,index) in cols" :key="index" :span="col.span">
      <slot v-bind="{col}"></slot>
    </el-col>
    <slot v-if="!cols.length" v-bind="{item}"></slot>
  </el-row>
</template>

<script>
export default {
  name: 'form-item-grid',
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
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
