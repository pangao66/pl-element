<template>
  <el-switch v-model="switchValue" @change="valueChange"></el-switch>
</template>

<script>
export default {
  name: 'pl-switch',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { default: '' },
    labelWidth: {
      type: [ String, Number ],
      default: ''
    },
    formItemAttrs: {
      type: Object,
      default: () => ({})
    },
  },
  data () {
    return {
      switchValue: ''
    }
  },
  methods: {
    valueChange (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  computed: {
    rules () {
      let trigger = 'change'
      if (this.trigger) {
        trigger = this.trigger
      }
      const required = this.required ?? 'no-required'
      return required !== 'no-required' ? {
        required: this.required,
        message: `${this.label}不能为空`,
        trigger
      } : undefined
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.switchValue = val
      }
    }
  }
}
</script>

<style scoped>

</style>
