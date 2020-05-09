<template>
  <el-form :model="form">
    <pl-input v-model="form.textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></pl-input>
  </el-form>
</template>

<script>
export default {
  name: 'input-demo-04',
  data () {
    return {
      form: {
        textarea: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
