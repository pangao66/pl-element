<template>
  <div>
    <p-table :data="tableData" :columns="columns" v-bind="$attrs" v-on="$listeners" v-loading="loading">
      <template v-for="item in columnSlots" v-slot:[item]="scope">
        <slot :name="item" v-bind="{...scope}"></slot>
      </template>
    </p-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        v-bind="pageInfo"
        style="text-align:center;"
        v-if="pagination"
    >
      <slot name="pagination-slot"></slot>
    </el-pagination>
  </div>
</template>
<script>
import PTable from 'components/pf-table/src/components/pf-table/p-table'

export default {
  name: 'tab-table-item',
  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    },
    info: {
      type: Object,
      default: () => ({})
    },
    formQuery: {
      type: Object,
      default: () => ({})
    },
    KeepAlive: {
      type: Boolean,
      default: false
    },
    autoLoading: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    searchedTabs: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      pageInfo: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSize: 10,
        currentPage: 1,
        pageSizes: [ 10, 20, 50, 100 ],
        background: true
      },
      tableData: [],
      total: 0,
      loading: false,
      isFirst: true
    }
  },
  created () {
    if (!this.keepAlive) {
      this.getTableData()
    }
  },
  activated () {
    if (this.keepAlive) {
      this.getTableData()
    }
  },
  methods: {
    search () {
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      this.getTableData()
    },
    handleSizeChange (val) {
      this.pageInfo.pageSize = val
      this.pageInfo.currentPage = 1
      this.getTableData()
    },
    getTableData () {
      if (this.autoLoading) {
        this.loading = true
      }
      this.$emit('get-table-data',
        {
          ...this.currentPageInfo,
          tabName: this.name,
          ...this.formQuery
        },
        ({ tableData, total }) => {
          if (tableData) {
            this.tableData = tableData
            this.total = total
          }
          this.loading = false
        })
    }
  },
  computed: {
    currentPageInfo () {
      const { pageSize, currentPage } = this.pageInfo
      return {
        pageSize, currentPage
      }
    },
    name () {
      return this.info.name
    },
    columnSlots () {
      return this.columns.filter((c) => c.slot).map((c) => c.slot)
    }
  },
  components: { PTable }
}
</script>
<style>

</style>
