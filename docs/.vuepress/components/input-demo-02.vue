<template>
  <div class="demo-input02-suffix">
    <div class="demo-input-suffix">
      属性方式：
      <pl-input
        placeholder="请选择日期"
        suffix-icon="el-icon-date"
        v-model="input1">
      </pl-input>
      <pl-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input2">
      </pl-input>
    </div>
    <div class="demo-input-suffix">
      slot 方式：
      <el-input
        placeholder="请选择日期"
        v-model="input3">
        <i slot="suffix" class="el-input__icon el-icon-date"></i>
      </el-input>
      <pl-input
        placeholder="请输入内容"
        v-model="input4">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </pl-input>
    </div>
  </div>
</template>
<script>
export default {
  name: 'input-demo-02',
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
<style >
  .demo-input02-suffix .el-input{
    width:210px;
    margin-right: 15px;
    margin-bottom: 10px;
  }
</style>
