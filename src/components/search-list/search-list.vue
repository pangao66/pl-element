<template>
  <div class="pl-search-list">
    <div v-for="slot in Object.keys($slots)">{{ slot }}1</div>
    <el-form
      ref="plForm"
      :model="form"
      v-bind="formAttrs"
      class="pl-search-list-form"
      :class="[{advance:advanced},hasChildClass]"
      v-on="$listeners"
    >
      <el-row :gutter="10">
        <template v-for="(item,index) in formItems">
          <el-col :key="index" :xl="6" :lg="8" :md="12" :sm="24" class="el-col-xll-6">
            <el-form-item v-if="!item.slotName" :label="item.label" :prop="item.prop">
              <component
                :is="getComp(item.comp)"
                :key="getRandomKey(item)"
                :ref="item.prop"
                v-model="form[item.prop]"
                v-bind="item"
              />
            </el-form-item>
            <slot v-if="item.slotName" :name="item.slotName" v-bind="{form,item}"/>
          </el-col>
        </template>
        <el-form-item style="float:right;" label-width="0">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <a style="margin-left: 8px;cursor:pointer;" class="advance-toggle-btn" @click="toggleAdvanced">
            {{ advanced ? '展开' : '收起' }}
            <i class="el-icon-arrow-down"/>
          </a>
        </el-form-item>
      </el-row>
    </el-form>
    <slot name="form-after">
      <div class="pl-search-list-menu">
        <div/>
        <div>
          <pl-tip-button content="刷新" debounce icon="el-icon-refresh" circle @click="search"/>
          <el-dropdown @command="toggleSize" :hide-on-click="false" style="margin-left: 6px;margin-right: 6px;">
            <pl-tip-button content="密度" circle>
              <svg-icon class-name="full-screen" icon-class="midu"></svg-icon>
            </pl-tip-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in sizeList"
                :command="item.value"
                :class="{active:size===item.value}"
              >{{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <pl-tip-button :content="isFullscreen?'退出全屏':'全屏'" circle @click="toggleFullScreen">
            <svg-icon class-name="full-screen" :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"></svg-icon>
          </pl-tip-button>
        </div>
      </div>
    </slot>
    <pl-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :table-config="tableConfig"
      :page-config="pageConfig"
      :auto-height="autoHeight"
      v-on="$listeners"
      ref="table"
    >
      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"/>
      </template>
      <template v-slot:index="{row,$index}">
        {{ (currentPage - 1) * pageSize + $index + 1 }}
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
import { getRandomKey } from '../../utils'
import searchListMixin from '../../mixins/search-list'

const Item2UIDMap = new WeakMap()
export default {
  name: 'PlSearchList',
  mixins: [searchListMixin],
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
      default: null
    },
    formConfig: {
      type: Object,
      default: null
    },
    tableConfig: {
      type: Object,
      default: null
    },
    value: {
      type: Object,
      default: () => ({})
    },
    showPager: {
      type: Boolean,
      default: true
    },
    autoHeight: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: this.value,
      advanced: false,
      pageSize: 10,
      currentPage: 1,
      total: 10,
      loading: false,
      tableData: []
    }
  },
  computed: {
    formAttrs () {
      return { ...this.$PlElement.formConfig, ...this.formConfig }
    },
    pageAttrs () {
      return { ...this.$PlElement.pageConfig, ...this.pageConfig }
    },
    hasChildClass () {
      let length = this.formItems.length
      if (length > 5) {
        length = 5
      }
      return `has-items-gt-${length}`
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
    this.setKeyValue(this.formItems)
    this.search()
  },
  methods: {
    search () {
      this.getTableData()
    },
    setKeyValue (list) {
      list.forEach((item) => {
        if (item.prop && typeof this.form[item.prop] === 'undefined') {
          if (item.type === 'daterange') {
            this.$set(this.form, item.prop, [])
          } else {
            this.$set(this.form, item.prop, '')
          }
        }
      })
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
      this.$nextTick(() => {
        this.$refs.table.setHeight()
      })
    },
    getComp (comp) {
      const map = {
        input: 'pl-input',
        select: 'pl-select',
        radio: 'pl-radio',
        checkbox: 'pl-checkbox',
        date: 'pl-date',
        time: 'pl-time',
        switch: 'pl-switch'
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
  }
}
</script>
