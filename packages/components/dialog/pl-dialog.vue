<template>
  <el-dialog
    :visible="true"
    :fullscreen="fullscreen"
    class="pl-dialog"
    v-bind="$attrs"
    :close-on-click-modal="false"
    center
    v-on="$listeners"
  >
    <template v-slot:title>
      <span style="font-size: 18px;">{{ $attrs.title }}</span>
      <pl-tip-button
        :content="fullscreen ? '退出全屏' : '全屏'"
        icon="el-icon-full-screen"
        class="el-dialog-header_full_btn"
        @click="fullscreen = !fullscreen"
      />
    </template>
    <slot />
    <slot
      slot="footer"
      name="footer"
    />
  </el-dialog>
</template>

<script>
export default {
  name: 'PlDialog',
  inheritAttrs: false,
  data() {
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
