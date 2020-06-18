<template>
  <div class="pl-search-list">
    <el-form
        :model="form"
        v-on="$listeners"
        v-bind="{...defaultFormOptions,...formConfig}"
        class="pl-search-list-form"
        :class="[{advance:advanced},hasChildClass]"
        ref="plForm"
    >
      <el-row :gutter="10">
        <template v-for="(item,index) in formItems">
          <el-col :xl="6" :lg="8" :md="12" :sm="24" class="el-col-xll-6">
            <el-form-item :label="item.label" :prop="item.prop">
              <component
                  :is="getComp(item.comp)"
                  v-bind="item"
                  v-model="form[item.prop]"
                  :key="getRandomKey(item)"
                  :ref="item.prop"
              >
              </component>
            </el-form-item>
            <slot :name="item.slot" v-bind="{form,item}"></slot>
          </el-col>
        </template>
        <el-form-item style="float:right;" label-width="0">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <a @click="toggleAdvanced" style="margin-left: 8px;cursor:pointer;" class="advance-toggle-btn">
            {{ advanced ? '展开' : '收起' }}
            <i class="el-icon-arrow-down"/>
          </a>
        </el-form-item>
      </el-row>
    </el-form>
    <slot name="form-after">
      <div class="pl-search-list-menu">
        <div>

        </div>
        <div>
          <el-button icon="el-icon-refresh" circle @click="search"></el-button>
          <el-button icon="el-icon-menu" circle></el-button>
        </div>
      </div>
    </slot>
    <pl-table
        :columns="columns"
        :data="tableData"
        :table-config="tableConfig"
        :page-config="pageConfig"
        v-loading="loading"
        v-on="$listeners"
    >
      <template v-for="item in columns">
        <slot :name="item.slotName" :slot="item.slotName" v-bind="item"></slot>
      </template>
      <template v-slot:index="{row,$index}">
        {{(currentPage-1)*pageSize+$index+1}}
      </template>
    </pl-table>
    <el-pagination
        v-if="showPager"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        v-bind="{...defaultPageConfig,...pageConfig}"
    ></el-pagination>
  </div>
</template>

<script>
import { getRandomKey } from '../../../utils'

const Item2UIDMap = new WeakMap()
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
    },
    showPager: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: this.value,
      defaultFormOptions: {
        labelWidth: '90px',
        labelPosition: 'right',
        labelSuffix: '：'
      },
      advanced: false,
      defaultPageConfig: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [ 10, 20, 50, 100 ],
        background: true
      },
      pageSize: 10,
      currentPage: 1,
      total: 10,
      loading: false,
      tableData: []
    }
  },
  created () {
    this.search()
  },
  methods: {
    search () {
      this.getTableData()
    },
    resetForm () {
      this.$refs.plForm.resetFields()
      this.currentPage = 1
      this.search()
    },
    getRandomKey (item) {
      const persistedUID = Item2UIDMap.get(item)
      if (!persistedUID) {
        Item2UIDMap.set(item, getRandomKey())
        return getRandomKey()
      }
      return persistedUID
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    getComp (comp) {
      const map = {
        input: 'pl-input',
        select: 'pl-select',
        radio: 'pl-radio',
        checkbox: 'pl-checkbox',
        date: 'pl-date',
        time: 'pl-time',
        'switch': 'pl-switch'
      }
      return map[comp] || comp
    },
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
        ...this.form
      }, ({ data, total }) => {
        this.tableData = data
        this.total = total
        this.loading = false
      })
    }
  },
  computed: {
    hasChildClass () {
      let length = this.formItems.length
      if (length > 5) {
        length = 5
      }
      return `has-items-gt-${length}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .pl-search-list {
    >>> .el-pagination {
      padding: 15px
      text-align: center;
    }
  }
  .pl-search-list-form {
    >>> .el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    &.has-items-gt-1 {
      .advance-toggle-btn {
        display: none;
      }
    }
    @media only screen and (min-width: 1900px) {
      &.advance {
        .el-col:nth-child(n+4) {
          display: none;
        }
      }
      &.has-items-gt-2 {
        .advance-toggle-btn {
          display: none;
        }
      }
      &.has-items-gt-3 {
        .advance-toggle-btn {
          display: none;
        }
      }
    }
    @media only screen and (min-width: 1600px) and (max-width: 1900px) {
      &.advance {
        .el-col:nth-child(n+4) {
          display: none;
        }
      }
      &.has-items-gt-2 {
        .advance-toggle-btn {
          display: none;
        }
      }
      &.has-items-gt-3 {
        .advance-toggle-btn {
          display: none;
        }
      }
    }
    @media only screen and (min-width: 1200px) and (max-width: 1600px) {
      &.advance {
        .el-col:nth-child(n+3) {
          display: none;
        }
      }
      &.has-items-gt-2 {
        .advance-toggle-btn {
          display: none;
        }
      }
    }
    @media only screen and (min-width: 992px) and (max-width: 1200px) {
      &.advance {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
    }
    @media only screen and (min-width: 768px) and (max-width: 992px) {
      &.advance {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
    }
    @media only screen and  (max-width: 768px) {
      &.advance {
        .el-col:nth-child(n+2) {
          display: none;
        }
      }
    }
  }
  .pl-search-list-menu {
    margin-bottom: 5px
    display: flex;
    justify-content space-between;
  }
</style>
