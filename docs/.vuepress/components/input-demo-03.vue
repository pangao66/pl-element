<template>
  <el-form :model="form" labelWidth="100px">
    <pl-input label="打款金额" rule prop="amt" cent v-model="form.amt" @change="change">
      <i name="suffix">元</i>
    </pl-input>
    <p>传入后台金额：{{form.amt}}分</p>
    <p>实际金额：{{realMoney}}元</p>
  </el-form>
</template>

<script>
export default {
  name: 'input-demo-03',
  data () {
    return {
      form: {
        amt: '1231',
      },
      realMoney: '12.31',
    }
  },
  methods: {
    change (val) {
      this.realMoney = val
    }
  }
}
</script>
