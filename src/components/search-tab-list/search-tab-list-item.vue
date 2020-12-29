<template>
  <div>
    <pl-table
      ref="table"
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :size="size"
      :table-config="tableConfig"
      :auto-height="true"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template
        v-for="slot in Object.keys($scopedSlots)"
        #[slot]="scope"
      >
        <slot
          :name="slot"
          v-bind="scope"
        />
      </template>
      <template v-slot:index="{row,$index,virtualScroll,startIndex}">
        <template v-if="virtualScroll">
          {{ (currentPage - 1) * pageSize + $index + 1 + startIndex }}
        </template>
        <template v-else>
          {{ (currentPage - 1) * pageSize + $index + 1 }}
        </template>
      </template>
    </pl-table>
    <el-pagination
      v-if="showPager"
      :total="total"
      v-bind="pageAttrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchTabListItem',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    showPager: {
      type: Boolean,
      default: true
    },
    pageConfig: {
      type: Object,
      default: null
    },
    form: {
      type: Object,
      default: () => ({})
    },
    tableConfig: {
      type: Object,
      default: null
    },
    tabInfo: {
      type: Object,
      default: () => ({})
    },
    size: {
      type: String,
      default: 'small'
    },
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableData: [],
      loading: false,
      pageSize: 10,
      pageSizes: [],
      currentPage: 1,
      total: 10
    }
  },
  computed: {
    pageAttrs () {
      return { ...this.$PlElement.pageConfig, ...this.pageConfig }
    }
  },
  activated () {
    if (!this.keepAlive) {
      this.getTableData()
    }
  },
  created () {
    const pageConfig = this.pageConfig || this.$PlElement.pageConfig
    if (pageConfig) {
      const pageSizes = pageConfig.pageSizes || pageConfig['page-sizes']
      const pageSize = pageConfig.pageSize || pageConfig['page-size']
      if (pageSizes) {
        this.pageSizes = pageSizes
      }
      if (pageSize) {
        this.pageSize = pageSize
      }
    }
    if (this.keepAlive) {
      this.getTableData()
    }
    // this.getTableData()
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTableData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getTableData()
    },
    getTableData () {
      this.loading = true
      this.$emit('get-table-data', {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        ...this.form,
        tabName: this.tabInfo.name
      }, ({ data, total }) => {
        this.tableData = data
        this.total = total
        this.$refs.table && this.$refs.table.toTop()
        this.loading = false
      })
    },
    setHeight () {
      this.$refs.table.setHeight()
    }
  }
}
</script>
