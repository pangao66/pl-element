<template>
  <el-form
    ref="plForm"
    :model="form"
    :rules="rules"
    v-bind="attrs"
  >
    <template v-for="(item,index) in formItems">
      <slot
        :name="item.slotName"
        v-bind="{form,item}"
      >
        <pl-form-item
          v-if="!item.cols"
          :key="index"
          v-bind="item"
          :form="form"
        />
        <form-item-grid
          v-else
          :item="item"
          :form="form"
        >
          <slot
            v-for="col in item.cols"
            :slot="col.slotName"
            :name="col.slotName"
            v-bind="{form,item:col}"
          />
        </form-item-grid>
      </slot>
    </template>
    <slot />
    <slot
      v-if="showSubmit"
      name="submit"
      v-bind="{form}"
    >
      <el-form-item style="margin-top: 20px;">
        <el-button
          type="primary"
          @click="submitForm"
        >
          提交
        </el-button>
        <el-button @click="resetForm">
          重置
        </el-button>
      </el-form-item>
    </slot>
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
  inheritAttrs: false,
  provide () {
    return {
      plForm: this
    }
  },
  props: {
    formItems: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: [Object, Array],
      default: null
    },
    showSubmit: {
      type: Boolean,
      default: true
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
    this.setKeyValue(this.formItems)
  },
  methods: {
    setKeyValue (list) {
      list.forEach((item) => {
        if (item.prop && typeof this.form[item.prop] === 'undefined') {
          if (item.attrs && item.attrs.multiple) {
            this.$set(this.form, item.prop, [])
          } else if (item.comp === 'date' && item.attrs && item.attrs.type === 'daterange') {
            this.$set(this.form, item.prop, [])
          } else {
            this.$set(this.form, item.prop, '')
          }
        }
      })
    },
    async submitForm () {
      try {
        await this.$refs.plForm.validate()
        this.$emit('submit', this.form)
        return Promise.resolve({ ...this.form })
      } catch (e) {
        return Promise.reject(e)
      }
    },
    resetForm () {
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
