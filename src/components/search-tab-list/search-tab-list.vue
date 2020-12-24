<template>
  <div class="pl-search-list">
    <div class="pl-search-list-form-container">
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
            <el-col
              :key="index"
              :xl="6"
              :lg="8"
              :md="12"
              :sm="24"
              class="el-col-xll-6"
            >
              <el-form-item
                v-if="!item.slotName"
                :label="item.label"
                :prop="item.prop"
              >
                <component
                  :is="getComp(item.comp)"
                  :key="index"
                  :ref="item.prop"
                  v-model="form[item.prop]"
                  :form="form"
                  v-bind="item"
                />
              </el-form-item>
              <slot
                v-if="item.slotName"
                :name="item.slotName"
                v-bind="{form,item}"
              />
            </el-col>
          </template>
          <el-form-item
            style="float:right;"
            label-width="0"
          >
            <pl-button
              debounce
              type="primary"
              @click="search"
            >
              查询
            </pl-button>
            <pl-button debounce @click="resetForm">
              重置
            </pl-button>
            <a
              style="margin-left: 8px;cursor:pointer;"
              class="advance-toggle-btn"
              @click="toggleAdvanced"
            >
              {{ advanced ? '展开' : '收起' }}
              <i :class="advanced?'el-icon-arrow-down':'el-icon-arrow-up'"/>
            </a>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="search-list-tab-container">
      <div class="pl-search-list-menu">
        <div>
          <slot name="menu-handle"/>
          <pl-tip-button
            content="刷新"
            debounce
            icon="el-icon-refresh"
            circle
            @click="search"
          />
          <el-dropdown
            :hide-on-click="false"
            style="margin-left: 6px;margin-right: 6px;"
            @command="toggleSize"
          >
            <pl-tip-button
              content="密度"
              circle
            >
              <svg-icon
                class-name="full-screen"
                icon-class="midu"
              />
            </pl-tip-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in sizeList"
                :key="item.value"
                :command="item.value"
                :class="{active:size===item.value}"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <pl-tip-button
            :content="isFullscreen?'退出全屏':'全屏'"
            circle
            @click="toggleFullScreen"
          >
            <svg-icon
              class-name="full-screen"
              :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"
            />
          </pl-tip-button>
          <!--          <el-button icon="el-icon-menu" circle/>-->
        </div>
      </div>
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="tabClick"
      >
        <el-tab-pane
          v-for="item in tabs"
          :key="`${item.name}${keyDate}`"
          :label="item.label"
          :name="item.name"
        >
          <template v-slot:label>
            <span>{{ item.label }}</span>
            <span v-if="typeof item.num!=='undefined'">({{ item.num }})</span>
            <slot
              name="tab-label"
              v-bind="{...item}"
            />
          </template>
          <keep-alive>
            <tab-table-item
              v-if="activeName===item.name"
              ref="tab-table-item"
              :tab-info="item"
              :columns="item.columns||columns"
              v-bind="$attrs"
              :table-config="tableConfig"
              :page-config="pageConfig"
              :keep-alive="keepAlive"
              :form="form"
              :size="size"
              v-on="$listeners"
            >
              <template
                v-for="slot in Object.keys($scopedSlots)"
                v-slot:[slot]="scope"
              >
                <slot
                  :name="slot"
                  v-bind="scope"
                />
              </template>
              <template v-slot:pagination-slot>
                <slot name="pagination-slot"/>
              </template>
            </tab-table-item>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getRandomKey } from '../../utils'
import TabTableItem from './search-tab-list-item'
import searchListMixin from '../../mixins/search-list'

const Item2UIDMap = new WeakMap()
export default {
  name: 'PlSearchTabList',
  components: {
    TabTableItem
  },
  mixins: [searchListMixin],
  props: {
    formItems: {
      type: Array,
      default: null
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
    tabs: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String,
      default: ''
    },
    tabConfig: {
      type: Object,
      default: () => ({})
    },
    // 查询之前的钩子,用于判断查询条件是否合法,比如某些字段必选
    beforeSearch: {
      type: Function,
      default: null
    },
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: this.value,
      advanced: false,
      activeName: '',
      keyDate: ''
    }
  },
  computed: {
    formAttrs () {
      return { ...this.$PlElement.formConfig, ...this.formConfig }
    },
    hasChildClass () {
      let length = this.formItems.length
      if (length > 5) {
        length = 5
      }
      return `has-items-gt-${length}`
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
  watch: {
    activeTab: {
      immediate: true,
      handler (val) {
        this.activeName = val || this.tabs[0].name
      }
    }
  },
  created () {
    this.keyDate = new Date().getTime()
    this.setKeyValue(this.formItems)
  },
  methods: {
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
    search () {
      /** 查询之前校验规则
       *如果没有beforeSearch则直接查询,
       * 若返回promise则.then之后查询,.catch不操作
       * 若返回 boolean, 则不为false则查询
       */
      if (!this.beforeSearch) {
        this.keyDate = new Date().getTime()
        return
      }
      const before = this.beforeSearch()
      if (before && before.then) {
        before.then(() => {
          this.keyDate = new Date().getTime()
        }).catch(() => {
          console.log('已取消查询')
        })
      } else if (before !== false) {
        this.keyDate = new Date().getTime()
      }
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
        this.$refs['tab-table-item'][0].setHeight()
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
    tabClick () {
      this.$emit('update:activeTab', this.activeName)
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

<style lang="stylus">
  .search-list-tab-container {
    position: relative;
    .pl-search-list-menu {
      position: absolute;
      z-index 2
      right: 24px
      > i {
      }
    }
  }
  .advance-toggle-btn {
    color: #409EFF;
  }
  .pl-search-list-form {
    .el-input__inner {
      width: 100%;
    }
  }
</style>
