<template>
  <p-dialog-form
      :title="isEdit?'编辑用户':'添加用户'"
      :form-items="formItems"
      width="500px"
      :rules="rules"
      v-model="formData"
      :originData="formData"
      @confirm="confirm"
      v-on="$listeners"
  >
    <template v-slot:describe="{form,item}">
      <el-form-item :label="item.label" :prop="item.prop">
        <el-input type="textarea" v-model="form[item.prop]"/>
      </el-form-item>
    </template>
  </p-dialog-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'edit-user',
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      formData: {}
    }
  },
  created () {
    if (this.isEdit) {
      this.formData = { ...this.info }
    }
  },
  methods: {
    async confirm (result, done) {
      let res = {}
      if (this.isEdit) {
        res = await axios.post('/update-user', { ...result })
      } else {
        // 通过出生年月计算年龄
        res = await axios.post('/add-user', { ...result })
      }
      if (res.status === 200) {
        res = res.data
        if (res.code === 1) {
          this.$message.success(this.isEdit ? '编辑用户成功' : '添加用户成功')
          this.$emit('refresh-table')
          this.$emit('close')
        }
      }
      done()
    }
  },
  computed: {
    formItems () {
      return [
        { type: 'input', label: '姓名', prop: 'name', trim: true, required: true },
        {
          type: 'radio', label: '性别', prop: 'sex',
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 0 }
          ],
          required: true
        },
        {
          type: 'input', label: '地址', prop: 'address',
        },
        {
          type: 'date',
          label: '出生日期',
          prop: 'birth',
          attrs: { 'value-format': 'timestamp' },
          required: true
        },
        { slot: 'describe', label: '描述', prop: 'describe' }
      ]
    },
    rules () {
      return {
        address: { required: true, message: '请输入地址', trigger: 'change' },
      }
    },
    isEdit () {
      return Object.keys(this.info).length
    }
  }
}
</script>

<style scoped>

</style>
