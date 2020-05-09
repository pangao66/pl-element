<template>
  <el-form-item :label="label" :prop="prop" :label-width="labelWidth" v-bind="{...formItemAttrs}">
    <el-date-picker v-model="date" v-bind="$attrs" @change="handleChange"></el-date-picker>
  </el-form-item>
</template>

<script>
export default {
  name: 'pl-date',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    value: { default: '' },
    labelWidth: {
      type: [ String, Number ],
      default: ''
    },
    formItemAttrs: {
      type: Object,
      default: () => ({})
    },
    required: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      date: ''
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
      this.$emit('input', val)
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (val) {
        this.date = val
      }
    }
  }
}
</script>

<style scoped>

</style>
