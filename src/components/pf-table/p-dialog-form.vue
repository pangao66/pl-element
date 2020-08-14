<template>
  <el-dialog
    :title="title"
    visible
    center
    v-on="$listeners"
    v-bind="dialogConfig"
    :close-on-click-modal="false"
    :append-to-body="$attrs['append-to-body']"
    :close-on-press-escape="false"
    :custom-class="customClass"
    :width="width"
  >
    <p-form v-bind="$attrs" v-on="$listeners" :form-options="formOptions" :form-items="formItems" :rules="rules"
            ref="form"
            :origin-data="originData">
      <template v-for="item in formSlots" v-slot:[item]="scope">
        <slot :name="item" v-bind="scope"></slot>
      </template>
    </p-form>
    <slot name="footer" slot="footer">
      <div class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </slot>
    <slot></slot>
  </el-dialog>
</template>

<script>
import PForm from 'components/pf-table/src/components/pf-table/p-form'
import { Loading } from 'element-ui'

export default {
  name: 'p-dialog-form',
  model: {
    prop: 'originData',
    event: 'change'
  },
  props: {
    title: {
      type: String
    },
    dialogConfig: {
      type: Object,
      default: () => {
      }
    },
    formItems: {
      type: Array,
      default: () => []
    },
    customClass: {
      type: String
    },
    autoLoading: {
      type: Boolean,
      default: true
    },
    formOptions: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: [Object, Array],
      default: () => ({})
    },
    originData: {
      type: [Object, Array],
      default: () => ({})
    },
    width: {
      type: String
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async confirm () {
      const res = await this.$refs.form.validate()
      if (res) {
        let loadingInstance = null
        if (this.autoLoading) {
          loadingInstance = Loading.service({
            fullscreen: true,
            text: '加载中'
          })
        }
        this.$emit('confirm', res, () => {
          loadingInstance && loadingInstance.close()
        })
      }
    },
    clearValidate () {
      this.$refs.form.clearValidate()
    }
  },
  computed: {
    formSlots () {
      const list = []
      this.formItems.forEach((item) => {
        if (item.slot) {
          list.push(item.slot)
        }
        if (item.type === 'grid') {
          item.columns.forEach((col) => {
            if (col.slot) {
              list.push(col.slot)
            }
          })
        }
      })
      return list
    }
  },
  components: { PForm }
}
</script>

<style scoped>

</style>
