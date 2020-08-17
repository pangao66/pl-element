<template>
  <div>
    <div>
      <pl-input placeholder="请输入内容" v-model="input1">
        <template slot="prepend">Http://</template>
      </pl-input>
    </div>
    <div style="margin-top: 15px;">
      <pl-input placeholder="请输入内容" v-model="input2">
        <template slot="append">.com</template>
      </pl-input>
    </div>
    <div style="margin-top: 15px;">
      <pl-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <template slot="prepend">
          <el-select v-model="select" placeholder="请选择" style="width:100px">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
        </template>
        <pl-button slot="append" icon="el-icon-search"></pl-button>
      </pl-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-demo-05',
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: ''
    }
  }
}
</script>

<style scoped>

</style>
