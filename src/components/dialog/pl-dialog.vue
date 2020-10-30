<template>
  <el-dialog
    :visible="true"
    :fullscreen="fullscreen"
    custom-class="pl-dialog"
    v-bind="$attrs"
    v-on="$listeners"
    :close-on-click-modal="false"
    center
  >
    <template v-slot:title>
      <span style="font-size: 18px;">{{ $attrs.title }}</span>
      <pl-tip-button
        :content="fullscreen?'退出全屏':'全屏'"
        icon="el-icon-full-screen"
        class="el-dialog-header_full_btn"
        @click="fullscreen=!fullscreen"
      ></pl-tip-button>
    </template>
    <el-scrollbar>
      <slot></slot>
    </el-scrollbar>
    <slot name="footer" slot="footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'pl-dialog',
  data () {
    return {
      fullscreen: false
    }
  }
}
</script>

<style lang="stylus">
  .el-dialog-header_full_btn {
    position: absolute;
    top: 20px
    right: 50px
    background: 0 0;
    outline: none;
    border: none;
    padding: 0;
    font-size: 16px
  }

</style>
