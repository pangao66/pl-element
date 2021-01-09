<template>
  <div class="pl-table-container">
    <el-table
      ref="table"
      :data="tableData"
      v-bind="attrs"
      :height="autoHeight ? '500px' : $attrs.height"
      v-on="{ ...$listeners, ...events }"
      @cell-dblclick="copy"
    >
      <pl-table-column
        v-for="col in columns"
        :key="getRandomKey(col)"
        :col="col"
        :start-index="startIndex"
        :virtual-scroll="virtualScroll"
      >
        <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </pl-table-column>
    </el-table>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'
import { throttle } from 'throttle-debounce'
import PlTableColumn from './table-column'
import { getRandomKey } from '../../utils'

const Item2UIDMap = new WeakMap()
export default {
  name: 'PlTable',
  components: {
    PlTableColumn
  },
  inheritAttrs: false,
  props: {
    columns: {
      required: true,
      type: Array,
      default: () => []
    },
    data: {
      required: true,
      type: Array,
      default: () => []
    },
    dbClickCopy: {
      type: Boolean,
      default: true
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    },
    showPager: {
      type: Boolean,
      default: false
    },
    autoLoad: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    keepPosition: {
      type: Boolean,
      default: true
    },
    bottomOffset: {
      type: Number,
      default: 80
    },
    size: {
      type: String,
      default: 'small'
    },
    events: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      scrollTop: 0,
      selectedAllStatus: false,
      indeterminate: false,
      isIndeterminate: false,
      checkAll: false
    }
  },
  computed: {
    attrs() {
      return {
        ...this.$PlElement?.tableConfig,
        ...this.tableConfig,
        size: this.size
      }
    },
    startIndex() {
      const itemSize = this.itemSize
      let startIndex = ~~(this.scrollTop / itemSize)
      startIndex < 0 && (startIndex = 0)
      return startIndex
    },
    virtualRows() {
      return this.data.slice(this.startIndex, this.startIndex + this.bufferCount)
    },
    checkedItems() {
      return this.data.filter((item) => {
        return !!item.selected
      })
    },
    tableData() {
      return this.virtualScroll ? this.virtualRows : this.data
    },
    virtualScroll() {
      const tableConfig = this.tableConfig || {}
      return tableConfig.virtualScroll || false
    },
    bufferCount() {
      const tableConfig = this.tableConfig || {}
      return tableConfig.bufferCount || 20
    },
    itemSize() {
      const map = {
        mini: 36,
        small: 40,
        medium: 44,
        default: 48
      }
      return map[this.size]
    }
  },
  watch: {
    size() {
      // 解决fixed列切换size之后不对齐的问题, nextTick不生效
      setTimeout(() => {
        this.setHeight()
      }, 0)
      if (this.virtualScroll) {
        this.initHeight()
      }
    },
    columns: {
      deep: true,
      handler() {
        // 解决fixed列切换size之后不对齐的问题, nextTick不生效
        setTimeout(() => {
          this.setHeight()
        }, 0)
        // if (this.virtualScroll) {
        //   this.initHeight()
        // }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.autoHeight) {
        addResizeListener(window.document.body, this.setHeight)
        addResizeListener(this.$refs.table.$el, this.setHeight)
      }
      if (this.keepPosition || this.virtualScroll) {
        this.addListeners()
      }
    })
  },
  activated() {
    if (this.keepPosition) {
      const table = this.$refs.table
      const rowKey = this.rowKey
      if (table) {
        const isTree = this.$attrs.treeProps || this.$attrs['tree-props']
        const currentRow = table.store.states.currentRow
        setTimeout(() => {
          // 自动恢复滚动高度
          table.bodyWrapper.scrollTop = this.scrollTop
          if (!isTree && currentRow && currentRow[rowKey]) {
            // 恢复高亮行
            const row = this.data.find((item) => {
              return item[rowKey] === currentRow[rowKey]
            })
            table.setCurrentRow(row)
          }
        }, 0)
      }
    }
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.table.$el, this.setHeight())
    removeResizeListener(window.document.body, this.setHeight())
  },
  methods: {
    getRandomKey(item) {
      const persistedUID = Item2UIDMap.get(item)
      if (!persistedUID) {
        Item2UIDMap.set(item, getRandomKey())
        return getRandomKey()
      }
      return persistedUID
    },
    copy(row, column, cell) {
      if (this.tableConfig && this.tableConfig.dbClickCopy === false) {
        return
      }
      if (this.$PlElement.tableConfig.dbClickCopy) {
        if (column.property) {
          const val = cell.querySelector('.cell').innerText
          this.copyToClipboard(val)
        }
      }
    },
    copyToClipboard(textToCopy) {
      if (!textToCopy || textToCopy === '-') {
        return
      }
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.value = textToCopy
      input.select()
      document.execCommand('Copy')
      input.remove()
      this.$message.success('复制成功：' + textToCopy)
    },
    listenScroll: throttle(20, true, function(e) {
      this.scrollTop = e.target.scrollTop
      if (this.virtualScroll) {
        const bufferCount = this.bufferCount
        const count = this.data.length
        const itemSize = this.itemSize
        const height = count * itemSize
        const scrollTop = this.scrollTop
        if (this.startIndex + bufferCount >= count) {
          // 由于el-table 在滚动到最后时，会出现抖动，因此增加判断，单独设置属性
          this.tables.forEach((item) => {
            const table = item.querySelector('.el-table__body')
            // table.style.paddingTop = scrollTop - itemSize + 'px'
            table.style.paddingTop = this.startIndex * itemSize + 'px'
            table.style.paddingBottom = 0
          })
        } else {
          this.tables.forEach((item) => {
            const table = item.querySelector('.el-table__body')
            table.style.paddingTop = scrollTop + 'px'
            table.style.paddingBottom = height - scrollTop - bufferCount * itemSize + 'px'
          })
        }
      }
    }),
    setHeight() {
      if (!this.autoHeight) {
        return
      }
      const $table = this.$refs.table
      const bottomOffset = this.bottomOffset || 30
      if (!$table) return
      // 计算列表高度并设置
      const height = window.innerHeight - $table.$el.getBoundingClientRect().top - bottomOffset
      $table.layout.setHeight(height)
      $table.doLayout()
    },
    toTop() {
      const table = this.$refs.table
      table.bodyWrapper.scrollTop = 0
    },
    addListeners() {
      this.bodyWrapper = this.$refs.table.bodyWrapper
      if (!this.bodyWrapper) {
        return
      }
      if (this.virtualScroll) {
        this.initHeight()
      }
      this.bodyWrapper.addEventListener('scroll', this.listenScroll)
    },
    removeListeners() {
      if (!this.bodyWrapper) {
        return
      }
      this.bodyWrapper.removeEventListener('scroll', this.listenScroll)
    },
    handleCheckAllChange(val) {
      this.selectedAllStatus = val
      for (let i = 0; i < this.data.length; i++) {
        this.$set(this.data[i], 'selected', val)
      }
      this.isIndeterminate = false
    },
    handleItemCheckedChange() {
      this.$nextTick(() => {
        if (this.checkedItems.length) {
          this.isIndeterminate = this.checkedItems.length !== this.data.length
        } else {
          this.isIndeterminate = false
        }
      })
    },
    initHeight() {
      // 初始化高度
      if (this.virtualScroll) {
        this.scrollTop = 0
        this.bodyWrapper.scrollTop = this.scrollTop
        const bufferCount = this.bufferCount
        const count = this.data.length
        const itemSize = this.itemSize
        const height = count * itemSize
        const tables = [
          this.$refs.table.bodyWrapper,
          this.$refs.table.$refs.fixedBodyWrapper,
          this.$refs.table.$refs.rightFixedBodyWrapper
        ].filter((item) => !!item)
        this.tables = tables
        tables.forEach((item) => {
          const table = item.querySelector('.el-table__body')
          table.style.height = height + 'px'
          table.style.paddingTop = this.scrollTop + 'px'
          table.style.paddingBottom = height - this.scrollTop - bufferCount * itemSize + 'px'
        })
      }
    },
    handleTable(event, ...args) {
      if (this[event] && typeof this[event] === 'function') {
        return this[event](...args)
      }
      const tableRef = this.$refs.table
      if (tableRef[event] && typeof tableRef[event] === 'function') {
        return tableRef[event](...args)
      }
    }
  }
}
</script>

<style lang="stylus">
.el-table .el-table__row td .cell:empty:before, .el-table .el-table__footer-wrapper td .cell:empty:before {
  content: "-";
  user-select: none;
}
.pl-table-container .el-pagination {
  padding: 10px;
  text-align: center;
}
/* 滚动条 */
.el-table__body-wrapper::-webkit-scrollbar {
  /* 纵向 */
  width: 8px;
  /* 横向 */
  height: 8px;
  background-color: #ededed;
}
/* 滚动条上的按钮(上下箭头) */
.el-table__body-wrapper::-webkit-scrollbar-button {
  display: none;
}
/* 滚动条轨道 */
.el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #ededed;
}
/* 滚动条轨道，没有滑块 */
.el-table__body-wrapper::-webkit-scrollbar-track-piece {
  background-color: #ededed;
}
/* 垂直滚动条和水平滚动条交汇的部分 */
.el-table__body-wrapper::-webkit-scrollbar-corner {
  background-color: #ededed;
}
/* 滚动条上的滚动滑块 */
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #d6d6d6;
}
/* 右下角拖动块 */
.el-table__body-wrapper::-webkit-resizer {
  display: none;
}
</style>
