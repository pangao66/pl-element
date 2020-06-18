<template>
  <pl-button v-bind="config">{{config.text}}</pl-button>
</template>

<script>
export default {
  name: 'pl-action-button',
  props: {
    action: {
      type: String
    },
    btnAttrs: {
      type: Object
    }
  },
  computed: {
    type () {
      const action = this.action
      const typeMap = {
        del: 'danger'
      }
    },
    config () {
      const map = {
        del: { type: 'danger', text: '删除' },
        update: { type: 'primary', text: '编辑' }
      }
      return map[this.action] || {}
    }
  }
}
</script>

<style scoped>

</style>
