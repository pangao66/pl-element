<template>
  <pf-table
      :form-items="formItems"
      :data="tableData"
      :columns="columns"
      :total="total"
      @get-table-data="getTableData"
      @row-dblclick="getDetail"
      v-loading="loading"
      ref="tpTable"
      class="test-pf-table"
  >
    <div style="margin-bottom: 10px;" slot="form-after">
      <el-button type="primary" icon="el-icon-plus" @click="addGift">
        添加礼品
      </el-button>
    </div>
    <template slot="status" slot-scope="{scope}">
      <el-tag :type="getGiftStatusType(scope.row.giftStatus)">
        {{getGiftStatusText(scope.row.giftStatus)}}
      </el-tag>
    </template>
    <template slot="giftArea" slot-scope="{scope}">
      <el-tooltip width="400" placement="top" v-if="scope.row.giftArea">
        <div slot="content" style="width:auto;max-width:300px;">{{scope.row.giftArea}}</div>
        <span class="cellOverflow">{{scope.row.giftArea}}</span>
      </el-tooltip>
    </template>
    <template slot="handle" slot-scope="{scope}">
            <span
                class="operatespan"
                v-if="scope.row.giftStatus === 'USING'"
                @click="configGift(scope.row)"
            >配置</span>
    </template>
  </pf-table>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        'id': 1104,
        'giftName': '测试礼品',
        'giftType': 'prepaid_card',
        'giftGiveWay': 'entity',
        'giftDescribe': '昂封账煎炸',
        'giftStatus': 'FORBIDDEN',
        'operatorId': 27011,
        'operatorName': '彭迪',
        'createTime': 1575009116000,
        'giftArea': null,
        'giftAreaCityList': null
      }, {
        'id': 1001,
        'giftName': '测试1',
        'giftType': 'cash',
        'giftGiveWay': 'coupon',
        'giftDescribe': '我就佛风捉放',
        'giftStatus': 'USING',
        'operatorId': 27011,
        'operatorName': '彭迪',
        'createTime': 1574768726000,
        'giftArea': null,
        'giftAreaCityList': null
      }],
      total: 54,
      loading: ''
    }
  },
  methods: {
    getTableData (val) {
      console.log(val)
    },
    getDetail (row, column, e) {
      console.log('双击了行')
      console.log(row)
    },
    addGift () {
      console.log('添加礼品')
    },
    editGift () {
      console.log('编辑礼品信息')
    },
    changeStatus (row) {
      console.log('修改状态')
    },
    configGift (row) {console.log(row)},
    getGiveType ({ cellValue }) {
      return this.giftTypeMap[cellValue] || '-'
    },
    getGiveWay ({ cellValue }) {
      return this.giftGivingWayMap[cellValue] || '-'
    },
    getGiftStatusType (status) {
      const map = {
        USING: 'success',
        FORBIDDEN: 'warning'
      }
      return map[status]
    },
    getGiftStatusText (status) {
      const map = {
        USING: '使用中',
        FORBIDDEN: '已禁用'
      }
      return map[status] || '-'
    }
  },
  computed: {
    formItems () {
      return [
        { type: 'input', label: '礼品名称', prop: 'giftName' },
        {
          type: 'select', label: '礼品类型', prop: 'giftType',
          options: [
            { label: '现金', value: 'cash' },
            { label: '预付卡', value: 'prepaid_card' },
            { label: '实物', value: 'entity' },
            { label: '保养', value: 'maintenance' },
            { label: '美容', value: 'cosmetology' },
            { label: '洗车', value: 'car_wash' }
          ]
        },
        {
          type: 'select',
          label: '赠送方式',
          prop: 'giftGiveWay',
          options: [
            { label: '优惠券', value: 'coupon' },
            { label: '现金', value: 'cash' },
            { label: '实物', value: 'entity' },
            { label: '代金券', value: 'cash_coupon' },
            { label: '兑换码', value: 'redeem_code' }
          ]
        },
        {
          type: 'select',
          label: '状态',
          prop: 'giftStatus',
          options: [
            { label: '使用中', value: 'USING' },
            { label: '已禁用', value: 'FORBIDDEN' }
          ]
        }]
    },
    columns () {
      return [
        { label: 'ID', prop: 'id' },
        { label: '礼品名称', prop: 'giftName' },
        { label: '类型', prop: 'giftType', formatter: this.getGiveType },
        { label: '赠送方式', prop: 'giftGiveWay', formatter: this.getGiveWay },
        { label: '说明', prop: 'giftDescribe', attrs: { minWidth: 200 } },
        { label: '创建时间', prop: 'createTime', formatter: 'time', attrs: { minWidth: 140 } },
        { label: '创建人', prop: 'operatorName' },
        { label: '状态', prop: 'giftStatus', slot: 'status' },
        { label: '使用地区', slot: 'giftArea', attrs: { minWidth: 400 } },
        { label: '操作', slot: 'handle', attrs: { minWidth: 120, fixed: 'right' } }
      ]
    },
    giftTypeMap () {
      return {
        'cash': '现金',
        'prepaid_card': '预付卡',
        'entity': '实物',
        'maintenance': '保养',
        'cosmetology': '美容',
        'car_wash': '洗车'
      }

    },
    giftGivingWayMap () {
      return {
        'coupon': '优惠券',
        'cash': '现金',
        'entity': '实物',
        'cash_coupon': '代金券',
        'redeem_code': '兑换码'
      }
    }
  }
}
</script>
<style scoped lang="stylus">
  .test-pf-table {
    >>> table {
      margin: 0
    }
  }
  .operatespan {
    color: #409EFF;
  }
</style>
