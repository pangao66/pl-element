<template>
  <div>
    <p-form
      v-if="formItems.length"
      v-bind="formOptions"
      :form-items="formItems"
      :is-search-form="true"
      :origin-data="originData"
      v-on="$listeners"
      @form-change="formChange"
      @search="search"
      @reset="reset"
      :rules="rules"
      :form-options="{inline:true}"
    >
      <template v-for="slot in formSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
      <template #handle-area>
        <slot name="handle-area"></slot>
      </template>
    </p-form>
    <slot name="form-after"></slot>
    <el-row class="pf-tab-table-container">
      <slot name="tab-header"></slot>
      <el-tabs
        :value="activeName"
        v-bind="tabConfig"
        type="border-card"
        @input="val=>$emit('input',val)"
      >
        <el-tab-pane
          v-for="item in tabs"
          :label="item.label"
          :name="item.name"
          :key="`${item.name}${keyDate}`"
        >
          <template v-slot:label>
            <span>{{ item.label }}</span>
            <span v-if="tabNum">({{ item.num }})</span>
            <slot name="tab-label" v-bind="{...item}"></slot>
          </template>
          <template>
            <keep-alive :max="1">
              <tab-table-item
                v-if="activeName===item.name"
                :activeName="activeName"
                :info="item"
                :keep-alive="keepAlive"
                :columns="item.columns||columns"
                :data="dataObject[item.name]?dataObject[item.name].data:[]"
                :total="dataObject[item.name]?dataObject[item.name].total:10"
                v-on="$listeners"
                v-bind="$attrs"
                ref="tab-table-item"
                :searched-tabs="searchedTabs"
                :form-query="formQuery"
              >
                <template v-for="item in columnSlots" v-slot:[item]="scope">
                  <slot :name="item" v-bind="{...scope}"></slot>
                </template>
                <template v-slot:pagination-slot>
                  <slot name="pagination-slot"></slot>
                </template>
              </tab-table-item>
            </keep-alive>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import PForm from 'components/pf-table/src/components/pf-table/p-form'
import TabTableItem from 'components/pf-table/src/components/pf-table/tab-table-item'

export default {
  name: 'pf-tab-table',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableClass: {
      type: [String, Array, Object, Function]
    },
    tableStyle: {
      type: [String, Array, Object, Function]
    },
    formItems: {
      type: Array,
      default: () => []
    },
    formOptions: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: [Object, Array],
      default: () => ({})
    },
    pagination: {
      type: Boolean,
      default: true
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    },
    total: {
      type: Number,
      default: 10
    },
    initGetData: {
      type: Boolean,
      default: true
    },
    syncFormQuery: {
      type: Boolean,
      default: true
    },
    autoLoading: {
      type: Boolean,
      default: true
    },
    tabs: {
      type: Array,
      default: () => []
    },
    tabConfig: {
      type: Object,
      default: () => ({})
    },
    activeName: {
      type: String
    },
    keepAlive: {
      type: Boolean,
      default: false
    },
    tabNum: {
      type: Boolean,
      default: false
    },
    originData: {
      type: Object,
      default: () => ({})
    }
  },
  model: {
    prop: 'activeName',
    event: 'input'
  },
  data () {
    return {
      pageInfo: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSize: 10,
        currentPage: 1,
        pageSizes: [10, 20, 50, 100],
        background: true
      },
      searchQuery: {},
      formData: {},
      loading: false,
      dataObject: {},
      searchedTabs: [],
      keyDate: ''
    }
  },
  created () {
    this.keyDate = new Date().getTime()
  },
  methods: {
    search () {
      this.keyDate = new Date().getTime()
    },
    reset () {
      this.$emit('reset')
      this.formData = {}
      this.$nextTick(() => {
        this.search()
      })
    },
    formChange (val) {
      this.formData = { ...val }
    }
  },
  computed: {
    formQuery () {
      return this.syncFormQuery ? this.formData : this.searchQuery
    },
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
    },
    columnSlots () {
      if (!this.columns.length) {
        return this.tabs.forEach((item) => {
          return item.columns.filter((c) => c.slot).map((c) => c.slot)
        })
      }
      return this.columns.filter((c) => c.slot).map((c) => c.slot)
    }
  },
  watch: {},
  components: {
    TabTableItem,
    PForm,
    VNodes: {
      functional: true,
      render: (h, ctx) => {
        return ctx.props.vnodes()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .pf-tab-table-container {
    position: relative;
  }
</style>
