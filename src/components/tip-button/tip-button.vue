<template>
  <el-tooltip
    :content="content"
    v-bind="attrs"
  >
    <pl-button
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </pl-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'PlTipButton',
  props: {
    content: {
      type: String,
      required: true
    },
    tipConfig: {
      type: Object,
      default: null
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
