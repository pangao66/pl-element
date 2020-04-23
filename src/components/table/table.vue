<template>
  <el-table
      :data="data"
      v-on="$listeners"
      v-bind="{...defaultTableAttrs,...tableConfig}"
      @cell-dblclick="copy"
  >
    <el-table-column
        v-for="(col,index) in columns"
        :key="col.key||getRandomKey()"
        :prop="col.prop"
        :label="col.label"
        v-bind="col.attrs||{}"
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
      <template v-slot="scope" v-if="col.slot||col.customerRender">
        <slot :name="col.slot" v-bind="{...scope}" v-if="col.slot"></slot>
        <template v-if="col.customerRender">
          {{col.customerRender(scope)}}
        </template>
        <!--        <VNodes :vnodes="col.customerRender(scope)"></VNodes>-->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from 'element-ui/lib/utils/date-util'
// import NP from 'number-precision'
import { getRandomKey } from '../../utils'

export default {
  name: 'pe-table',
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
    }
  },
  data () {
    return {
      defaultTableAttrs: {
        border: true,
        stripe: true,
        'highlight-current-row': true
      }
    }
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
          return formatter.dict[cellValue]
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
    getRandomKey () {
      return getRandomKey()
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
</style>
