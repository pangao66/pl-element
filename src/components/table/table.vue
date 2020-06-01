<template>
  <div v-loading="loading" class="pl-table-container">
    <el-table
        :data="data"
        v-on="$listeners"
        v-bind="{...defaultTableAttrs,...tableConfig}"
        @cell-dblclick="copy"
    >
      <el-table-column
          v-for="(col,index) in columns"
          v-bind="col"
          :key="getRandomKey(col)"
          :prop="col.prop"
          :label="col.label"
          show-overflow-tooltip
          :formatter="col.formatter?(row,column,cellValue,index)=>formatCell(row,column,cellValue,index,col.formatter,col):undefined"
      >
        <template v-slot:header="scope" v-if="col.headerSlot || col.tip">
          <template v-if="col.tip">
            {{col.label}}
            <el-tooltip class="item" effect="dark" :content="col.tip" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
          <slot :name="col.headerSlot" v-bind="scope" v-if="col.headerSlot"></slot>
        </template>
        <template v-slot="scope" v-if="col.slotName||col.customerRender||col.customerRenderText">
          <slot :name="col.slotName" v-bind="scope" v-if="col.slotName"></slot>
          <template v-if="col.customerRenderText">
            {{col.customerRenderText(scope)}}
          </template>
          <VNodes v-if="col.customerRender" :vnodes="col.customerRender(scope)"></VNodes>
        </template>
        <template v-slot="scope" v-if="col.type==='index'">
          <slot name="index" v-bind="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from 'element-ui/lib/utils/date-util'
// import NP from 'number-precision'
import { getRandomKey } from '../../../utils'
import { Table } from 'element-ui'

const Item2UIDMap = new WeakMap()
export default {
  name: 'pl-table',
  props: {
    columns: {
      required: true,
      default: () => []
    },
    data: {
      required: true,
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
  created () {
    // if (this.autoLoad) {
    //   this.getTableData()
    // }
  },
  methods: {
    formatCell (row, column, cellValue, index, formatter, col) {
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
          // return NP.round(cellValue, 2).toFixed(2)
          case 'rmb': // 人民币分变成元
          // return NP.round(NP.divide(cellValue, 100), 2)
          case 'percent': // 小数转百分比
          // return NP.round(NP.times(cellValue, 100), 2)
          default :
            return cellValue
        }
      }
      if (type === 'object') {
        if (formatter.type && formatter.type === 'date') {
          return formatDate(cellValue, formatter.content)
        }
        if (formatter.type === 'dict') {

        }
      }
      return cellValue
    },
    copy (row, column, cell, event) {
      if (this.dbClickCopy && column.property) {
        const val = cell.querySelector('.cell').innerHTML
        this.copyToClipboard(val)
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
    }
  },
  computed: {},
  components: {
    VNodes: {
      functional: true,
      props: {
        vnodes: {
          type: Function,
          default: () => {}
        }
      },
      render: (h, ctx) => {
        return ctx.props.vnodes
      }
    }
  }
}
</script>

<style>
  .el-table .el-table__row td .cell:empty:before, .el-table .el-table__footer-wrapper td .cell:empty:before {
    content: "-"
  }

  .pl-table-container .el-pagination {
    padding: 10px;
    text-align: center;
  }
</style>
