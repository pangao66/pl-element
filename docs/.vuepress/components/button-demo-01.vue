<template>
  <pl-button
    type="primary"
    debounce
    @click="handleClick"
  >debounce
  </pl-button>
</template>

<script>
export default {
  name: 'button-demo-01',
  methods: {
    handleClick () {
      this.$message.success('你执行了点击事件, 500ms之内重复点击无效哦!')
    }
  }
}
</script>
<style>
  .a {
    background: red
  }
</style>
