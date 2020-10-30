<template>
  <pl-dialog
    :close-on-press-escape="false"
    v-bind="attrs"
    v-on="$listeners"
    v-loading.fullscreen.lock="fullscreenLoadingStatus"
  >
    <pl-form
      v-bind="formConfig"
      :form-items="formItems"
      :show-submit="false"
      v-model="form"
      ref="form"
    >
      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"/>
      </template>
    </pl-form>
    <template #footer>
      <el-button @click="$emit('close')">取消</el-button>
      <pl-button type="primary" @click="submit">确定</pl-button>
    </template>
  </pl-dialog>
</template>

<script>
export default {
  name: 'pl-form-dialog',
  props: {
    formItems: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: this.value,
      fullscreenLoadingStatus: false
    }
  },
  methods: {
    async submit () {
      try {
        const res = await this.$refs.form.submitForm()
        this.fullscreenLoadingStatus = true
        this.$emit('submit', res, () => {
          this.fullscreenLoadingStatus = false
        })
      } catch (e) {
      }
    }
  },
  computed: {
    attrs () {
      return {
        'element-loading-text': '数据处理中',
        'element-loading-spinner': 'el-icon-loading',
        'element-loading-background': 'rgba(0, 0, 0, 0.8)',
        center: true,
        ...this.$attrs
      }
    }
  }
}
</script>

<style scoped>

</style>
