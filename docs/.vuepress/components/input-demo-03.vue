<template>
  <div>
    <pl-input cent v-model="amt" @change="change">
      <template #append>元</template>
    </pl-input>
    <p>传入后台金额：{{ amt }}分</p>
    <p>实际金额：{{ realMoney }}元</p>
  </div>
</template>

<script>
export default {
  name: 'input-demo-03',
  data () {
    return {
      amt: '1231',
      realMoney: '12.31'
    }
  },
  methods: {
    change (val) {
      this.realMoney = val
    }
  }
}
</script>
