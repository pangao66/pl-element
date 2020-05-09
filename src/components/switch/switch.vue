<template>
  <el-form-item :label="label" :prop="prop" :label-width="labelWidth" :rules="rules" v-bind="{...formItemAttrs}">
    <el-switch v-model="switchValue" @change="valueChange"></el-switch>
  </el-form-item>
</template>

<script>
export default {
  name: 'pl-switch',
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
      switchValue: true
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
        this.switchValue = !!val
      }
    }
  }
}
</script>

<style scoped>

</style>
