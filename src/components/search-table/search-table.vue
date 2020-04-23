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
      <pe-table :data="data" :columns="tableColumns">
        <slot></slot>
      </pe-table>
      <!--      <el-pagination></el-pagination>-->
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
      columnsShowList: []
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
    }
  },
  computed: {
    tableColumns () {
      return this.columnsCopy.map((item) => {
        return item
      }).filter((item) => this.columnsShowList.includes(item.label))
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
  .search-table-column-config-item  {
    .anticon{
      &:last-child{
        margin-left: 8px
      }
    }
  }
</style>
