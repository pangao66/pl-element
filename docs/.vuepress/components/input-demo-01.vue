<template>
  <el-form :model="form" label-position="right" label-suffix="：">
    <pl-input v-model="form.text" label="产品名称" @change="handleChange" label-width="120px"></pl-input>
  </el-form>
</template>

<script>
export default {
  name: 'input-demo-01',
  data () {
    return {
      form: { text: '' }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>
