<template>
  <el-form :model="form" v-bind="$attrs" ref="plForm">
    <template v-for="(item,index) in formItems">
      <template>
        <form-item-grid
            :key="index"
            :cols="item.cols"
            :item="item"
        >
          <template v-slot="{col,item}">
            <component
                :is="col?col.comp:item.comp"
                v-bind="col||item"
                v-model="form[col?col.prop:item.prop]"
                :key="index"
                :ref="col?col.prop:item.prop"
            >
            </component>
            <slot :name="col?col.slot:item.slot" v-bind="{form,item}"></slot>
          </template>
        </form-item-grid>
      </template>
    </template>
    <slot name="submit" v-bind="{form}">
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script>
// import { getRandomKey } from '../../utils'
import FormItemGrid from './form-item-grid'

export default {
  name: 'pl-form',
  components: { FormItemGrid },
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
  created () {
    this.formItems.forEach((item) => {

    })
  },
  methods: {
    submitForm () {
      this.$refs.plForm.validate().then(() => {
        this.$emit('submit', this.form)
        Promise.resolve(this.form)
      }).catch(() => {
        Promise.reject()
      })
    },
    resetForm () {
      this.$refs.plForm.resetFields()
      // this.form = this.$options.data().form
    }
    // getRandomKey () {
    //   return getRandomKey()
    // }
  },
  computed: {
    // getRandomKey () {
    //   return getRandomKey()
    // }
  },
  watch: {
    // value: {
    //   immediate: true,
    //   deep: true,
    //   handler (val) {
    //     this.form = { ...this.form, ...val }
    //   }
    // },
    // form: {
    //   deep: true,
    //   handler (val) {
    //     // this.$emit('input', val)
    //     this.$emit('change', val)
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
