<template>
  <div>
    <el-dialog :visible="visible" @close="visible=false" fullscreen>
      <pl-search-list
          :columns="columns"
          :form-items="formItems"
          @get-table-data="getTableData"
          v-model="formData"
          ref="plSearchList"
      >
        <template #test-form-item="{form,item}">
          <el-form-item label="测试slot" prop="testValue">
            <el-cascader
                style="width:100%"
                v-model="form.testValue"
                :options="options"
                clearable
                @change="handleChange"></el-cascader>
          </el-form-item>
        </template>
        <template #name="{row}">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ row.name }}</p>
            <p>住址: {{ row.address }}</p>
            <div class="name-wrapper" slot="reference">
              <el-tag size="medium">{{ row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </pl-search-list>
    </el-dialog>
    <el-alert type="warning" :closable="false" center>此例请全屏查看</el-alert>
    <el-button @click="visible=true">全屏展示</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import { filterObject } from '../util'

const jobDict = {
  designer: '设计',
  programmer: '程序员',
  testers: '测试',
  product: '产品'
}
const sexDict = {
  0: '女',
  1: '男'
}
export default {
  name: 'search-list-demo-01',
  data() {
    return {
      formData: {
        id: '',
        name: '',
        birth: '',
        sex: '',
        job: '',
        testValue: []
      },
      visible: false
    }
  },
  methods: {
    async getTableData({ currentPage, pageSize, sex, ...val }, done) {
      console.log(val)
      let res = await axios.post('/search-table', filterObject({
        ...val,
        currentPage,
        pageSize,
        sex: sex ? parseInt(sex) : '',
        testValue: undefined
      }))
      if (res.status === 200) {
        res = res.data
        console.log(res)
        done({
          data: res.list,
          total: res.total
        })
      }
    },
    async deleteData(row) {
      let res = await axios.post('/delete-user', { id: row.id })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.$refs.plSearchList.search()
      }
    },
    handleChange() {

    }
  },
  computed: {
    columns() {
      return [
        { prop: 'index', label: '序号', type: 'index' },
        { prop: 'id', label: 'id' },
        { slotName: 'name', label: '姓名', attrs: { width: 100 } },
        { prop: 'address', label: '地址', attrs: { minWidth: 140 } },
        { prop: 'birth', label: '生日', formatter: 'date' },
        { prop: 'job', label: '职位', dict: jobDict, options: jobDict },
        {
          prop: 'sex',
          label: '性别',
          tagMap: {
            1: { text: '男', type: 'primary' },
            0: { text: '女', type: 'success' }
          }
        },
        {
          actions: [
            {
              action: 'del',
              text: '删除',
              btnConfig: { type: 'danger' },
              confirm: ({ row, col, index }) => {
                this.deleteData(row)
              }
            },
            {
              text: '查看',
              onClick: ({ row, col, index }) => {
                this.$message.success(JSON.stringify(row))
              }
            },
            {
              text: '编辑',
              onClick: ({ row, col, index }) => {

              }
            }
          ],
          label: '操作', attrs: { minWidth: 180 }
        }
      ]
    },
    formItems() {
      return [
        { comp: 'input', prop: 'id', label: 'id' },
        { comp: 'input', prop: 'name', label: '姓名' },
        { comp: 'date', prop: 'birth', label: '生日' },
        { comp: 'select', prop: 'job', label: '职位', options: jobDict },
        { comp: 'select', prop: 'sex', label: '性别', options: sexDict },
        { slotName: 'test-form-item', prop: 'test', label: '测试slot' }
      ]
    },
    options() {
      return [
        {
          value: 'zhinan', label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                { value: 'yizhi', label: '一致' },
                { value: 'fankui', label: '反馈' },
                { value: 'xiaolv', label: '效率' },
                { value: 'kekong', label: '可控' }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                { value: 'cexiangdaohang', label: '侧向导航' },
                { value: 'dingbudaohang', label: '顶部导航' }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                { value: 'layout', label: 'Layout 布局' },
                { value: 'color', label: 'Color 色彩' },
                { value: 'typography', label: 'Typography 字体' },
                { value: 'icon', label: 'Icon 图标' },
                { value: 'button', label: 'Button 按钮' }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                { value: 'radio', label: 'Radio 单选框' },
                { value: 'checkbox', label: 'Checkbox 多选框' },
                { value: 'input', label: 'Input 输入框' },
                { value: 'input-number', label: 'InputNumber 计数器' },
                { value: 'select', label: 'Select 选择器' },
                { value: 'cascader', label: 'Cascader 级联选择器' },
                { value: 'switch', label: 'Switch 开关' },
                { value: 'slider', label: 'Slider 滑块' },
                { value: 'time-picker', label: 'TimePicker 时间选择器' },
                { value: 'date-picker', label: 'DatePicker 日期选择器' },
                { value: 'datetime-picker', label: 'DateTimePicker 日期时间选择器' },
                { value: 'upload', label: 'Upload 上传' },
                { value: 'rate', label: 'Rate 评分' },
                { value: 'form', label: 'Form 表单' }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                { value: 'table', label: 'Table 表格' },
                { value: 'tag', label: 'Tag 标签' },
                { value: 'progress', label: 'Progress 进度条' },
                { value: 'tree', label: 'Tree 树形控件' },
                { value: 'pagination', label: 'Pagination 分页' },
                { value: 'badge', label: 'Badge 标记' }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                { value: 'alert', label: 'Alert 警告' },
                { value: 'loading', label: 'Loading 加载' },
                { value: 'message', label: 'Message 消息提示' },
                { value: 'message-box', label: 'MessageBox 弹框' },
                { value: 'notification', label: 'Notification 通知' }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                { value: 'menu', label: 'NavMenu 导航菜单' },
                { value: 'tabs', label: 'Tabs 标签页' },
                { value: 'breadcrumb', label: 'Breadcrumb 面包屑' },
                { value: 'dropdown', label: 'Dropdown 下拉菜单' },
                { value: 'steps', label: 'Steps 步骤条' }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                { value: 'dialog', label: 'Dialog 对话框' },
                { value: 'tooltip', label: 'Tooltip 文字提示' },
                { value: 'popover', label: 'Popover 弹出框' },
                { value: 'card', label: 'Card 卡片' },
                { value: 'carousel', label: 'Carousel 走马灯' },
                { value: 'collapse', label: 'Collapse 折叠面板' }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            { value: 'axure', label: 'Axure Components' },
            { value: 'sketch', label: 'Sketch Templates' },
            { value: 'jiaohu', label: '组件交互文档' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
