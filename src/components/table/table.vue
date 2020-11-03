<template>
  <div
    v-loading="loading"
    class="pl-table-container"
  >
    <el-table
      ref="table"
      :data="tableData"
      v-bind="attrs"
      :height=" autoHeight ? '300px' : $attrs.height"
      v-on="$listeners"
      @cell-dblclick="copy"
    >
      <el-table-column
        v-for="col in columns"
        :key="getRandomKey(col)"
        v-bind="col.attrs"
        :prop="col.prop"
        :label="col.label"
        :show-overflow-tooltip="!showSlot(col)"
        :class-name="getColumnClass(col)"
        :formatter="col.formatter||col.dict?(row,column,cellValue,index)=>formatCell(row,column,cellValue,index,col.formatter,col):undefined"
      >
        <!--自定义列header-->
        <template v-if="col.headerSlot || col.tip ||col.type==='selection'" v-slot:header="scope">
          <template v-if="col.tip">
            {{ col.label }}
            <el-tooltip class="item" effect="dark" :content="col.tip" placement="top">
              <i class="el-icon-question" />
            </el-tooltip>
          </template>
          <template v-if="col.type==='selection'">
            <el-checkbox :indeterminate="isIndeterminate" :checked="checkedItems.length"
                         @change="handleCheckAllChange"
            ></el-checkbox>
          </template>
          <slot v-if="col.headerSlot" :name="col.headerSlot" v-bind="scope"></slot>
        </template>
        <!--自定义列 -->
        <template v-if="showSlot(col)" v-slot="scope">
          <slot :name="col.slotName" v-bind="scope"></slot>
          <template v-if="col.tagMap">
            <template v-if="scope.row[col.prop]===undefined||scope.row[col.prop]==null||scope.row[col.prop]===''">-</template>
            <el-tag v-else :type="getTagType(scope,col)">
              {{ getTagText(scope, col) }}
            </el-tag>
          </template>
          <template v-if="col.type==='index'">
            <slot name="index" v-bind="{...scope,startIndex,virtualScroll}"></slot>
          </template>
          <template v-if="col.customerRenderText">
            {{ col.customerRenderText(scope) }}
          </template>
          <template v-if="col.actions&&col.actions.length">
            <template v-for="(item,index) in col.actions">
              <template v-if="!(item.hidden&&item.hidden(scope,item))">
                <pl-button
                  v-if="item.confirmType||item.confirm"
                  :key="index"
                  :confirm-type="item.confirmType||'pop'"
                  :confirm-config="item.confirmConfig&&item.confirmConfig(scope)"
                  :pop-config="item.popConfig&&item.popConfig(scope)"
                  fullscreen-loading
                  type="text"
                  @confirm="(done)=>item.confirm(scope,done,index)"
                >
                  {{ item.text || item.actionText(scope) }}
                </pl-button>
                <pl-button
                  v-else
                  :key="index"
                  type="text"
                  @click="item.onClick(scope)"
                >
                  {{ item.text || item.actionText(scope) }}
                </pl-button>
              </template>
            </template>
          </template>
          <VNodes
            v-if="col.customerRender"
            :vnodes="col.customerRender(scope)"
          />
          <template v-if="col.type==='selection'">
            <el-checkbox
              v-model="scope.row.selected"
              @change="handleItemCheckedChange"
            />
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from 'element-ui/lib/utils/date-util'
import NP from 'number-precision'
import { getRandomKey } from '../../utils'
// import './autoheight'
import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'
import { throttle } from 'throttle-debounce'

const Item2UIDMap = new WeakMap()
export default {
  name: 'PlTable',
  components: {
    VNodes: {
      functional: true,
      props: {
        vnodes: {
          type: Function
        }
      },
      render: (h, ctx) => {
        return ctx.props.vnodes
      }
    }
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
    fetch: {
      type: Function,
      default: null
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
    }
  },
  data () {
    return {
      loading: false,
      scrollTop: 0,
      selectedAllStatus: false,
      indeterminate: false,
      isIndeterminate: false,
      checkAll: false
    }
  },
  computed: {
    attrs () {
      return {
        ...this.$PlElement.tableConfig,
        ...this.tableConfig,
        size: this.size
      }
    },
    startIndex () {
      const itemSize = this.itemSize
      let startIndex = ~~(this.scrollTop / itemSize)
      startIndex < 0 && (startIndex = 0)
      return startIndex
    },
    virtualRows () {
      return this.data.slice(this.startIndex, this.startIndex + this.bufferCount)
    },
    checkedItems () {
      return this.data.filter((item) => {
        return !!item.selected
      })
    },
    tableData () {
      return this.virtualScroll ? this.virtualRows : this.data
    },
    virtualScroll () {
      const tableConfig = this.tableConfig || {}
      return tableConfig.virtualScroll || false
    },
    bufferCount () {
      const tableConfig = this.tableConfig || {}
      return tableConfig.bufferCount || 20
    },
    itemSize () {
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
    size () {
      // 解决fixed列切换size之后不对齐的问题, nextTick不生效
      setTimeout(() => {
        this.setHeight()
      }, 0)
      if (this.virtualScroll) {
        this.initHeight()
      }
    }
  },
  mounted () {
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
  activated () {
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
  beforeDestroy () {
    removeResizeListener(this.$refs.table.$el, this.setHeight())
  },
  methods: {
    formatCell (row, column, cellValue, index, formatter, col) {
      if (col.dict) {
        return col.dict[cellValue]
      }
      const type = typeof formatter
      if (type === 'function') {
        return formatter({ row, column, cellValue, index })
      }
      if (type === 'string') {
        switch (formatter) {
          case 'date':
            return formatDate(cellValue, 'yyyy-MM-dd')
          case 'datetime':
            return formatDate(cellValue, 'yyyy-MM-dd HH:mm:ss')
          case 'time':
            return formatDate(cellValue, 'HH:mm:ss')
          case 'date-hm':
            return formatDate(cellValue, 'yyyy-MM-dd HH:mm')
          case 'money': // 金额三位分割
            return cellValue.toLocaleString()
          case 'point2': // 保留两位小数
            return NP.round(cellValue, 2).toFixed(2)
          case 'rmb': // 人民币分变成元
            return NP.round(NP.divide(cellValue, 100), 2)
          case 'yuan':
            return cellValue && `￥${cellValue}`
          case 'percent': // 小数转百分比
            return NP.round(NP.times(cellValue, 100), 2)
          default :
            return cellValue
        }
      }
      if (type === 'object') {
        if (formatter.type && formatter.type === 'date') {
          return formatDate(cellValue, formatter.content)
        }
      }
      return cellValue
    },
    copy (row, column, cell) {
      if (this.tableConfig && (this.tableConfig.dbClickCopy === false)) {
        return
      }
      if (this.$PlElement.tableConfig.dbClickCopy) {
        if (column.property) {
          const val = cell.querySelector('.cell').innerText
          this.copyToClipboard(val)
        }
      }
    },
    copyToClipboard (textToCopy) {
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
    getRandomKey (item) {
      const persistedUID = Item2UIDMap.get(item)
      if (!persistedUID) {
        Item2UIDMap.set(item, getRandomKey())
        return getRandomKey()
      }
      return persistedUID
    },
    showSlot (col) {
      return col.slotName || col.customerRender || col.customerRenderText || col.tagMap || col.type === 'index' || col.actions || col.type === 'selection'
    },
    listenScroll: throttle(20, true, function (e) {
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
    setHeight () {
      const $table = this.$refs.table
      const bottomOffset = (this.bottomOffset) || 30
      if (!$table) return
      // 计算列表高度并设置
      const height = window.innerHeight - $table.$el.getBoundingClientRect().top - bottomOffset
      $table.layout.setHeight(height)
      $table.doLayout()
    },
    toTop () {
      const table = this.$refs.table
      table.bodyWrapper.scrollTop = 0
    },
    addListeners () {
      this.bodyWrapper = this.$refs.table.bodyWrapper
      if (!this.bodyWrapper) {
        return
      }
      if (this.virtualScroll) {
        this.initHeight()
      }
      this.bodyWrapper.addEventListener('scroll', this.listenScroll)
    },
    removeListeners () {
      if (!this.bodyWrapper) {
        return
      }
      this.bodyWrapper.removeEventListener('scroll', this.listenScroll)
    },
    handleCheckAllChange (val) {
      this.selectedAllStatus = val
      for (let i = 0; i < this.data.length; i++) {
        this.$set(this.data[i], 'selected', val)
      }
      this.isIndeterminate = false
    },
    handleItemCheckedChange () {
      this.$nextTick(() => {
        if (this.checkedItems.length) {
          this.isIndeterminate = this.checkedItems.length !== this.data.length
        } else {
          this.isIndeterminate = false
        }
      })
    },
    initHeight () {
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
    getColumnClass (col) {
      const map = {
        orderNumber: 'order-number-cell',
        carNumber: 'car-number-cell',
        negativeAmount: 'negative-amount',
        positiveAmount: 'positive-amount'
      }
      let classStr = ''
      if (col.attrs) {
        const colClass = col.attrs['class-name'] || col.attrs.className
        if (colClass) {
          classStr += colClass
        }
      }
      if (map[col.type]) {
        classStr += ` ${map[col.type] || ''}`
      }
      if (col.actions && col.actions.length) {
        return 'handle-column'
      }
      return classStr
    },
    getTagType (scope, col) {
      const value = scope.row[col.prop]
      return col.tagMap[value] ? col.tagMap[value].type : ''
    },
    getTagText (scope, col) {
      const value = scope.row[col.prop]
      return col.tagMap[value] ? col.tagMap[value].text : ''
    },
    // getConfirmConfig (item, col) {
    //   const { text, actionRowLabel, actionRowProp } = item
    //   return {
    //     message: `此操作将删除${actionRowLabel}为${col[actionRowProp]}的数据,是否继续?`
    //   }
    // },
    getActionText ({ col, row }) {
      const { actionType } = col
      const status = row.status
      if (actionType === 'forbid') {
        return status ? '禁用' : '启用'
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
