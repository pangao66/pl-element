<template>
  <div>
    <pl-tip-button content="设置" icon="el-icon-s-tools" circle></pl-tip-button>
    <pl-tip-button
      content="删除"
      type="primary"
      confirm-type="confirm"
      @confirm="confirm"
      fullscreen-loading
    >删除
    </pl-tip-button>
    <pl-tip-button content="删除"
                   type="primary"
                   confirm-type="confirm"
                   @confirm="confirm"
                   fullscreen-loading icon="el-icon-delete" circle></pl-tip-button>
  </div>
</template>

<script>
export default {
  name: 'button-demo-04',
  methods: {
    confirm (done) {
      setTimeout(() => {
        done()
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
