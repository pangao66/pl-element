<template>
  <el-form ref="plForm" :model="form" v-bind="attrs">
    <template v-for="(item,index) in formItems">
      <slot :name="item.slotName" v-bind="{form,item}">
        <pl-form-item v-if="!item.cols" :key="index" :item="item" :form="form" />
        <form-item-grid :item="item" :form="form">
          <slot v-for="col in item.cols" :slot="col.slotName" :name="col.slotName" v-bind="{form,item:col}" />
        </form-item-grid>
      </slot>
    </template>
    <slot name="submit" v-bind="{form}">
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </slot>
    <slot />
  </el-form>
</template>

<script>
import { getRandomKey } from '../../utils'
import FormItemGrid from './form-item-grid'
import PlFormItem from './pl-form-item'

const Item2UIDMap = new WeakMap()
export default {
  name: 'PlForm',
  components: { PlFormItem, FormItemGrid },
  provide () {
    return {
      plForm: this
    }
  },
  // model: {
  //   prop: 'defaultValue',
  //   event: 'form-change'
  // },
  props: {
    formItems: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: this.value
    }
  },
  computed: {
    attrs () {
      return { ...this.$PlElement.formConfig, ...this.$attrs }
    }
  },
  watch: {},
  created () {
    this.formItems.forEach((item) => {

    })
  },
  methods: {
    submitForm () {
      this.$refs.plForm.validate().then(() => {
        this.$emit('submit', { ...this.form })
        Promise.resolve(this.form)
      }).catch(() => {
        Promise.reject()
      })
    },
    resetForm () {
      // console.log(this.$refs.plForm)
      this.$refs.plForm.resetFields()
    },
    getRandomKey (item) {
      const persistedUID = Item2UIDMap.get(item)
      if (!persistedUID) {
        Item2UIDMap.set(item, getRandomKey())
        return getRandomKey()
      }
      return persistedUID
    },
    getComp (comp) {
      const map = {
        input: 'pl-input',
        select: 'pl-select',
        radio: 'pl-radio',
        checkbox: 'pl-checkbox',
        date: 'pl-date',
        time: 'pl-time',
        switch: 'pl-switch'
      }
      return map[comp] || comp
    },
    validate (...args) {
      return this.$refs.plForm.validate()
    },
    validateField (...args) {
      this.$refs.plForm.validateField()
    },
    resetFields (...args) {
      this.$refs.plForm.resetFields()
    },
    clearValidate (...args) {
      this.$refs.plForm.clearValidate(...args)
    }
  }
}
</script>

<style lang="stylus">
</style>
