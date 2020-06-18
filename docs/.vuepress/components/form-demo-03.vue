<template>
  <pl-form label-width="120px" label-position="right" label-suffix="：" :form-items="formItems" v-model="form" ref="form"
           @submit="submit"></pl-form>
</template>

<script>
export default {
  name: 'form-demo-03',
  data () {
    return {
      form: {
        name: '',
        tel: '',
        email: '',
        pass: '',
        checkPass: ''
      }
    }
  },
  methods: {
    submit (val) {
      this.$message.success(`表单数据为:${JSON.stringify(val)}`)
    },
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    },
    validatePass2 (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
  },
  computed: {
    formItems () {
      return [
        { comp: 'input', label: '姓名', prop: 'name', required: true },
        { comp: 'input', label: '手机号', prop: 'tel', required: true, validation: 'tel' },
        {
          comp: 'input', label: '邮箱', prop: 'email',
          required: true,
          rules: { type: 'email', message: '请输入正确的邮箱地址', trigger: [ 'blur', 'change' ] }
        },
        {
          comp: 'input',
          label: '密码',
          prop: 'pass',
          required: true,
          rules: { validator: this.validatePass, trigger: 'blur' }
        },
        {
          comp: 'input',
          label: '确认密码',
          prop: 'checkPass',
          required: true,
          rules: { validator: this.validatePass2, trigger: 'blur' }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
