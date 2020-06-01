<template>
  <el-form-item :label="item.label" :prop="item.prop" v-if="!item.cols">
    <component
        :is="getComp(item.comp)"
        v-bind="item"
        v-model="form[item.prop]"
        :ref="item.prop"
    >
    </component>
  </el-form-item>
</template>

<script>
import FormItemGrid from './form-item-grid'

export default {
  name: 'pl-form-item',
  components: { FormItemGrid },
  inject: [ 'plForm' ],
  props: {
    item: {},
    form: {
      type: Object
    }
  },
  methods: {
    getComp (comp) {
      const map = {
        input: 'pl-input',
        select: 'pl-select',
        radio: 'pl-radio',
        checkbox: 'pl-checkbox',
        date: 'pl-date',
        time: 'pl-time',
        'switch': 'pl-switch'
        // 'grid': 'FormItemGrid'
      }
      return map[comp] || comp
    }
  }
}
</script>

<style scoped>

</style>
