<template>
  <div v-loading="loading" class="pl-table-container">
    <el-table
      :data="data"
      v-bind="attrs"
      v-on="$listeners"
      @cell-dblclick="copy"
      :height=" autoHeight ? '300px' : $attrs.height"
      ref="multipleTable"
    >
      <el-table-column
        v-for="(col,index) in columns"
        :key="getRandomKey(col)"
        v-bind="col.attrs"
        :prop="col.prop"
        :label="col.label"
        show-overflow-tooltip
        :formatter="col.formatter||col.dict?(row,column,cellValue,index)=>formatCell(row,column,cellValue,index,col.formatter,col):undefined"
      >
        <!--自定义列header-->
        <template v-if="col.headerSlot || col.tip" v-slot:header="scope">
          <template v-if="col.tip">
            {{ col.label }}
            <el-tooltip class="item" effect="dark" :content="col.tip" placement="top">
              <i class="el-icon-question"/>
            </el-tooltip>
          </template>
          <slot v-if="col.headerSlot" :name="col.headerSlot" v-bind="scope"/>
        </template>
        <!--自定义列 -->
        <template v-if="showSlot(col)" v-slot="scope">
          <slot :name="col.slotName" v-bind="scope"/>
          <template v-if="col.tagMap">
            <template v-if="scope.row[col.prop]===undefined||scope.row[col.prop]==null">-</template>
            <el-tag v-else :type="col.tagMap[scope.row[col.prop]].type">
              {{ col.tagMap[scope.row[col.prop]].text }}
            </el-tag>
          </template>
          <template v-if="col.type==='index'">
            <slot name="index" v-bind="scope"/>
          </template>
          <template v-if="col.customerRenderText">
            {{ col.customerRenderText(scope) }}
          </template>
          <template v-if="col.actions&&col.actions.length">
            <template v-for="item in col.actions">
              <pl-button
                v-if="item.confirmType||item.confirm"
                :confirm-type="item.confirmType||'confirm'"
                v-bind="item.btnConfig"
                @confirm="item.confirm({row:scope.row,col,index})"
              >
                {{ item.text }}
              </pl-button>
              <pl-button v-else @click="item.onClick({row:scope.row,col,index})">{{ item.text }}</pl-button>
            </template>
          </template>
          <VNodes v-if="col.customerRender" :vnodes="col.customerRender(scope)"/>
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
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

const Item2UIDMap = new WeakMap()
export default {
  name: 'PlTable',
  components: {
    VNodes: {
      functional: true,
      props: {
        vnodes: {
          type: Function,
          default: () => {
          }
        }
      },
      render: (h, ctx) => {
        return ctx.props.vnodes
      }
    }
  },
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
      default: 100
    }
  },
  data () {
    return {
      defaultTableAttrs: {
        border: true,
        stripe: true,
        'highlight-current-row': true
      },
      tableData: [],
      loading: false
    }
  },
  computed: {
    attrs () {
      return { ...this.$PlElement.tableConfig, ...this.tableConfig }
    }
  },
  created () {
    // if (this.autoLoad) {
    //   this.getTableData()
    // }
  },
  mounted () {
    if (this.keepPosition) {
      this.listScroll()
    }
    this.$nextTick(() => {
      if (this.autoHeight) {
        // this.setHeight()
        addResizeListener(window.document.body, this.setHeight)
        addResizeListener(this.$refs.multipleTable.$el, this.setHeight)
      }
    })
  },
  activated () {
    if (this.keepPosition) {
      const table = this.$refs.multipleTable
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
          case 'money': // 金额三位分割
            return cellValue.toLocaleString()
          case 'point2': // 保留两位小数
            return NP.round(cellValue, 2).toFixed(2)
          case 'rmb': // 人民币分变成元
            return NP.round(NP.divide(cellValue, 100), 2)
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
      return col.slotName || col.customerRender || col.customerRenderText || col.tagMap || col.type === 'index' || col.actions
    },
    listScroll () {
      this.$nextTick(() => {
        this.dom = this.$refs.multipleTable.bodyWrapper
        this.dom.addEventListener('scroll', (e) => {
          // 滚动距离
          this.scrollTop = e.target.scrollTop
        })
      })
    },
    setHeight () {
      const $table = this.$refs.multipleTable
      const bottomOffset = (this.bottomOffset) || 30
      if (!$table) return
      // 计算列表高度并设置
      const height = window.innerHeight - $table.$el.getBoundingClientRect().top - bottomOffset
      $table.layout.setHeight(height)
      $table.doLayout()
    }
  },
  beforeDestroy () {
    removeResizeListener(this.$refs.multipleTable.$el, this.setHeight())
  }
}
</script>

<style lang="stylus">
  .el-table .el-table__row td .cell:empty:before, .el-table .el-table__footer-wrapper td .cell:empty:before {
    content: "-"
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
