<template>
  <div>
    <pl-form
        v-on="$listeners"
        :form-items="formItems"
        is-search-form
        v-model="form"
    >
    </pl-form>
    <slot name="form-after"></slot>
    <pl-table :columns="columns" :table-config="tableConfig" :page-config="pageConfig" show-pager v-on="$listeners">
      <template v-for="item in columns">
        <slot :name="item.slotName" :slot="item.slotName" v-bind="item"></slot>
      </template>
    </pl-table>
  </div>
</template>

<script>
export default {
  name: 'pl-search-list',
  props: {
    formItems: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Object,
      default: () => ({})
    },
    tableConfig: {
      type: Object,
      default: () => ({})
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
  }
}
</script>

<style scoped>

</style>
