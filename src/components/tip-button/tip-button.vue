<template>
  <el-tooltip
    :content="content"
    v-bind="attrs"
  >
    <pl-button v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </pl-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'pl-tip-button',
  props: {
    content: {
      type: String,
      required: true
    },
    tipConfig: {
      type: Object
    }
  },
  computed: {
    attrs () {
      return {
        effect: 'dark',
        placement: 'top',
        ...this.tipConfig
      }
    }
  }
}
</script>

<style scoped>

</style>
