<template>
  <div>
    <div>
      <div class="pe-search-table-tools">
        <el-popover
            placement="top-start"
            title="标题"
            width="500"
            trigger="click"
        >
          <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;">
              <el-checkbox-group v-model="columnsShowList" @change="columnsShowChange">
                <div v-for="item in columns" class="search-table-column-config-item">
                  <el-checkbox :label="item.label" :key="item.label">{{item.label}}</el-checkbox>
                  <fix-btn direction="left"></fix-btn>
                  <fix-btn direction="right"></fix-btn>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <el-icon class="el-icon-setting" slot="reference"></el-icon>
        </el-popover>
      </div>
      <pl-table :data="data" :columns="tableColumns">
        <template v-for="item in columnSlots" v-slot:[item]="scope">
          <slot :name="item" v-bind="{...scope}"></slot>
        </template>
      </pl-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-bind="{...defaultPageConfig,...pageConfig}"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import {getRandomKey} from '../../utils'

import FixBtn from './fix-btn'

export default {
  name: 'search-table',
  components: { FixBtn },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      columnsCopy: [],
      isIndeterminate: true,
      checkAll: true,
      columnsShowList: [],
      defaultPageConfig: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [ 10, 20, 50, 100 ],
        background: true
      },
      pageSize: 10,
      currentPage: 1
    }
  },
  mounted () {
    this.columnsShowList = this.columns.map((item) => item.label)
  },
  methods: {
    initColumnsCopy () {
      const list = JSON.parse(JSON.stringify(this.columns))
      list.forEach((item) => {
        item.attrs = item.attrs || {}
        item.key = this.getRandomKey()
      })
      this.columnsCopy = list
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.columns.map((item) => item.label) : []
      this.isIndeterminate = false
    },
    columnsShowChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.columns.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length
    },
    fixItem (val, direction) {
      const index = this.columnsCopy.findIndex((item) => item.label === val)
      if (this.columnsCopy[index].attrs) {
        this.$set(this.columnsCopy[index].attrs, 'fixed', direction)
      }
    },
    getRandomKey () {
      let list = []
      for (let i = 0; i < 5; i++) {
        list.push(Math.ceil(Math.random() * 10000))
      }
      return list.join('-')
    },
    handleCurrentChange (val) {
      this.currentPage = val
      // this.getTableData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      // this.getTableData()
    }
  },
  computed: {
    tableColumns () {
      return this.columnsCopy.map((item) => {
        return item
      }).filter((item) => this.columnsShowList.includes(item.label))
    },
    columnSlots () {
      return this.columns.filter((c) => c.slot).map((c) => c.slot)
    }
  },
  watch: {
    columns: {
      deep: true,
      immediate: true,
      handler () {
        this.initColumnsCopy()
      }
    }
  }
}
</script>

<style lang="stylus">
  .search-table-column-config-item {
    .anticon {
      font-size: 12px
      &:last-child {
        margin-left: 8px
      }
    }
  }
</style>
