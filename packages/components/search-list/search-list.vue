<template>
  <div class="pl-search-list">
    <div v-if="formItems && formItems.length" class="pl-search-list-form-container">
      <pl-form
        ref="plForm"
        v-model="form"
        label-position="right"
        v-bind="formAttrs"
        class="pl-search-list-form"
        :class="[{ advance: advanced }, hasChildClass]"
        v-on="$listeners"
      >
        <el-row :gutter="10">
          <template v-for="(item, index) in formItems">
            <el-col :key="index" :xl="6" :lg="8" :md="12" :sm="24" class="el-col-xll-6">
              <!--              <el-form-item v-if="!item.slotName" :label="item.label" :prop="item.prop">-->
              <!--                <component-->
              <!--                  :is="getComp(item.comp)"-->
              <!--                  :key="index"-->
              <!--                  :ref="item.prop"-->
              <!--                  v-model="form[item.prop]"-->
              <!--                  v-bind="item"-->
              <!--                  :form="form"-->
              <!--                />-->
              <!--              </el-form-item>-->
              <pl-form-item
                v-if="!item.slotName"
                v-model="form[item.prop]"
                v-bind="item"
              ></pl-form-item>
              <slot v-if="item.slotName" :name="item.slotName" v-bind="{ form, item }" />
            </el-col>
          </template>
          <el-form-item style="float:right;" label-width="0">
            <pl-button loading type="primary" @click="search">
              查询
            </pl-button>
            <pl-button loading @click="resetForm">
              重置
            </pl-button>
            <a
              style="margin-left: 8px;cursor:pointer;"
              class="advance-toggle-btn"
              @click="toggleAdvanced"
            >
              {{ advanced ? '展开' : '收起' }}
              <i class="el-icon-arrow-up" :class="{ advanced }"></i>
            </a>
          </el-form-item>
        </el-row>
      </pl-form>
    </div>
    <div class="search-list-table-container">
      <slot name="form-after">
        <div class="pl-search-list-menu">
          <div>
            <slot name="handle-area" />
          </div>
          <div v-if="showTools" class="pl-search-list-tools-bar">
            <pl-tip-button content="刷新" debounce icon="el-icon-refresh" circle @click="search" />
            <el-dropdown
              :hide-on-click="false"
              style="margin-left: 6px;margin-right: 6px;"
              @command="toggleSize"
            >
              <pl-tip-button content="密度" circle>
                <pl-icon type="midu"></pl-icon>
              </pl-tip-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in sizeList"
                  :key="item.value"
                  :command="item.value"
                  :class="{ active: size === item.value }"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <pl-tip-button
              :content="isFullscreen ? '退出全屏' : '全屏'"
              circle
              @click="toggleFullScreen"
            >
              <pl-icon :type="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"></pl-icon>
            </pl-tip-button>
            <el-popover placement="bottom-start" trigger="click">
              <fix-table
                :cal-columns="calColumns"
                @init-columns="initColumns"
                @column-change="columnsChange"
                @reset-columns="resetColumns"
              ></fix-table>
              <pl-tip-button
                slot="reference"
                content="列设置"
                circle
                icon="el-icon-s-tools
"
              ></pl-tip-button>
            </el-popover>
          </div>
        </div>
      </slot>
      <pl-table
        ref="table"
        :key="currentTableKey"
        v-loading="loading"
        :columns="resultColumns"
        :data="tableData"
        :table-config="tableConfig"
        :page-config="pageConfig"
        :auto-height="autoHeight"
        :size="size"
        v-on="$listeners"
      >
        <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
        <template v-slot:index="{ row, $index, startIndex, virtualScroll }">
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
  </div>
</template>

<script>
import { getRandomKey, filterObject } from '../../utils'
import searchListMixin from '../../mixins/search-list'
import FixTable from './fix-table'
import PlIcon from '../../components/pl-icon/pl-icon'
import PlFormItem from '../../components/form/pl-form-item'

const Item2UIDMap = new WeakMap()
export default {
  name: 'PlSearchList',
  components: {
    PlFormItem,
    PlIcon,
    FixTable
  },
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
    showTools: {
      type: Boolean,
      default: true
    },
    autoHeight: {
      type: Boolean,
      default: true
    },
    // 查询之前的钩子,用于判断查询条件是否合法,比如某些字段必选
    beforeSearch: {
      type: Function,
      default: null
    },
    syncFormData: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: this.value,
      advanced: false,
      pageSize: 10,
      currentPage: 1,
      total: 10,
      loading: false,
      tableData: [],
      currentTableKey: Date.now(),
      searchData: {}
    }
  },
  computed: {
    formAttrs() {
      return {
        'label-width': '120px',
        ...this.$PlElement?.formConfig,
        ...this.formConfig
      }
    },
    pageAttrs() {
      return { ...this.$PlElement?.pageConfig, ...this.pageConfig }
    },
    hasChildClass() {
      let length = this.formItems.length
      if (length > 5) {
        length = 5
      }
      return `has-items-gt-${length}`
    },
    queryData() {
      let data = this.syncFormData ? this.form : this.searchData
      data = JSON.parse(JSON.stringify(data))
      this.formItems.forEach((item) => {
        if (item.comp === 'date' && item.attrs?.type === 'daterange') {
          delete data[item.prop]
        }
      })
      return filterObject(data)
    }
  },
  created() {
    const pageConfig = this.pageConfig || this.$PlElement?.pageConfig
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
    search() {
      /** 查询之前校验规则
       *如果没有beforeSearch则直接查询,
       * 若返回promise则.then之后查询,.catch不操作
       * 若返回 boolean, 则不为false则查询
       */
      if (!this.beforeSearch) {
        this.searchData = JSON.parse(JSON.stringify(this.form))
        this.getTableData()
        return
      }
      const before = this.beforeSearch()
      if (before && before.then) {
        before
          .then(() => {
            this.searchData = JSON.parse(JSON.stringify(this.form))
            this.getTableData()
          })
          .catch(() => {
            console.log('已取消查询')
          })
      } else if (before !== false) {
        this.searchData = JSON.parse(JSON.stringify(this.form))
        this.getTableData()
      }
    },
    setKeyValue(list) {
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
    resetForm(done) {
      this.$refs.plForm.resetFields()
      this.currentPage = 1
      this.search(done)
    },
    getRandomKey(item) {
      const persistedUID = Item2UIDMap.get(item)
      if (!persistedUID) {
        Item2UIDMap.set(item, getRandomKey())
        return getRandomKey()
      }
      return persistedUID
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
      this.$nextTick(() => {
        this.$refs.table.setHeight()
      })
    },
    getComp(comp) {
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
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getTableData()
    },
    getTableData() {
      this.loading = true
      const query = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        ...this.queryData
      }
      this.$emit('get-table-data', query, ({ data, total }) => {
        this.tableData = data
        this.total = total
        this.loading = false
        this.$refs.table && this.$refs.table.toTop()
      })
    },
    resetTableKey() {
      this.currentTableKey = Date.now()
    },
    handleTable(...args) {
      this.$refs.table.handleTable(...args)
    }
  }
}
</script>
<style lang="stylus"></style>
