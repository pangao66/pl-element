<template>
  <el-dialog :visible="true" :fullscreen="fullscreen">
    <template v-slot:title>
      <el-button icon="el-icon-full-screen" class="el-dialog-header_full_btn"
                 @click="fullscreen=!fullscreen"></el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
    name: 'pl-dialog',
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
