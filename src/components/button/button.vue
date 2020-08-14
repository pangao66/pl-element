<template>
  <!--popConfirm形式-->
  <el-popconfirm
    v-if="confirmType==='pop'"
    v-loading.fullscreen.lock="fullscreenLoadingStatus"
    v-bind="popConfig"
    @onConfirm="confirm"
    @onCancel="$emit('cancel')"
  >
    <el-button slot="reference" v-bind="$attrs">
      <slot/>
    </el-button>
  </el-popconfirm>
  <el-button
    v-else
    v-loading.fullscreen.lock="fullscreenLoadingStatus"
    v-bind="$attrs"
    :loading="loadingStatus"
    @click="handleClick"
  >
    <slot/>
  </el-button>
</template>

<script>
import { debounce } from '../../utils'
// import { Loading } from 'element-ui'

// eslint-disable-next-line no-unused-vars
// const loadingInstance = null
export default {
  name: 'PlButton',
  props: {
    debounce: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    fullscreenLoading: {
      type: Boolean,
      default: false
    },
    confirmType: {
      type: String,
      default: ''
    },
    popConfig: {
      type: Object,
      default: () => ({ title: '确定删除吗？' })
    },
    confirmConfig: {
      type: Object,
      default: () => ({
        message: '此操作将永久删除该数据, 是否继续?',
        title: '提示',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    }
  },
  data () {
    return {
      loadingStatus: false,
      fullscreenLoadingStatus: false
    }
  },
  methods: {
    handleClick () {
      if (this.confirmType && this.confirmType === 'confirm') {
        this.messageConfirm()
        return
      }
      if (!this.debounce) {
        if (this.loading) {
          this.loadingStatus = true
        }
        if (this.fullscreenLoading) {
          this.fullscreenLoadingStatus = true
        }
        this.$emit('click', () => {
          this.loadingStatus = false
          this.fullscreenLoadingStatus = false
        })
        return
      }
      this.debounceClick()
    },
    messageConfirm () {
      const { message, title, confirmButtonText, cancelButtonText } = this.confirmConfig
      this.$confirm(message, title, {
        confirmButtonText,
        cancelButtonText,
        type: 'warning'
      }).then(() => {
        this.confirm()
      }).catch(() => {
        this.$emit('cancel')
      })
    },
    confirm () {
      if (this.fullscreenLoading) {
        this.fullscreenLoadingStatus = true
      }
      this.$emit('confirm', () => {
        this.fullscreenLoadingStatus = false
      })
    },
    debounceClick: debounce(function () {
      this.$emit('click')
    }, 500)
  }
}
</script>
