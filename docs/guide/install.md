---
title: 安装使用
sidebarDepth: 2
---
## 全部引入
组件暂未上传npm,可克隆仓库使用
```js
import PlElement from '../pl-element'
Vue.use(PlElement, {
  tableConfig: {
    stripe: true,
    border: true,
    highlightCurrentRow: true
  },
  selectConfig: {
    filterable: true,
    clearable: true,
    'default-first-option': true
  },
  inputConfig: {
    clearable: true,
    trim: true,
  },
  pageConfig: {
    background: true,
    layout: 'total, sizes, prev, pager, next, jumper',
    'page-sizes': [10, 50, 100, 400],
    pageSize: 50
  },
  formConfig: {
    'label-position': 'right',
    'label-width': '120px',
    'label-suffix': '：'
  },
  dateConfig: {
    format: 'yyyy-MM-dd',
    clearable: true,
    'value-format': 'yyyy-MM-dd',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    placeholder: '请选择日期'
  }
})
```
注意以上配置上都是全局配置, 你可根据业务需要自行配置相关的`element-ui`的相关组件的属性,比如`element-ui`的`el-table`的`border`属性默认是`false`你的业务中产品经理希望默认是`true`,就可以在此处设置`tableConfig`中的`border`属性为`true`,这样你使用`pl-table`默认`border`属性为`true`
